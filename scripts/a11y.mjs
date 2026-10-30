// Audit d'accessibilité (axe-core) et erreurs console sur toutes les pages du catalogue.
//
//   npm run a11y
//   npm run a11y -- --themes=azur,violet --schemes=dark --routes=bouton,carte
//   npm run a11y -- --strict        (ne tolère aucune exception connue)
//
// Sortie : un résumé par page ; code de retour 1 s'il reste des violations ou des erreurs console.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { parseArgs } from 'node:util';
import { avecServeur, charger, lancerNavigateur, liste, ouvrirPage, resoudreRoutes, themesDisponibles } from './lib.mjs';

const { values } = parseArgs({
  options: {
    themes: { type: 'string' },
    schemes: { type: 'string' },
    routes: { type: 'string' },
    strict: { type: 'boolean', default: false },
    help: { type: 'boolean', default: false },
  },
});

if (values.help) {
  console.log(`Options :
  --themes=azur,violet     thèmes testés (défaut : azur ; « tous » pour les ${themesDisponibles().length} thèmes)
  --schemes=light,dark     modes testés (défaut : light,dark)
  --routes=bouton,accueil  pages testées (défaut : toutes)
  --strict                 ne tolère aucune exception connue
Variables : BASE_URL (serveur déjà lancé), PORT (défaut 4300), CHROME_PATH.`);
  process.exit(0);
}

/** Violations connues, dues à Angular Material et non corrigeables côté application. */
const EXCEPTIONS = [
  {
    route: 'composants/selecteur-date',
    regle: 'label-content-name-mismatch',
    cible: 'mat-calendar-period-label',
    raison: "bouton de période du mat-calendar natif : aria-label fixe qui ne reprend pas le texte visible",
  },
];

const themes = values.themes === 'tous' ? themesDisponibles() : liste(values.themes, ['azur']);
const schemes = liste(values.schemes, ['light', 'dark']);
const routes = resoudreRoutes(liste(values.routes, null));
const axeSource = readFileSync(createRequire(import.meta.url).resolve('axe-core/axe.min.js'), 'utf8');

let echecs = 0;
let tolerees = 0;
let pages = 0;

await avecServeur(async (baseUrl) => {
  const navigateur = await lancerNavigateur();
  try {
    for (const theme of themes) {
      for (const scheme of schemes) {
        const { page, erreurs } = await ouvrirPage(navigateur, { theme, scheme });
        for (const route of routes) {
          erreurs.length = 0;
          await charger(page, baseUrl, route);
          await page.evaluate(axeSource);
          const resultat = await page.evaluate(() =>
            // @ts-ignore axe est injecté dans la page
            axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] }),
          );

          const retenues = [];
          for (const violation of resultat.violations) {
            const noeuds = violation.nodes.filter((noeud) => {
              const exception = EXCEPTIONS.find(
                (e) => !values.strict && e.route === route && e.regle === violation.id && noeud.target.join(' ').includes(e.cible),
              );
              if (exception) tolerees++;
              return !exception;
            });
            if (noeuds.length) retenues.push({ violation, noeuds });
          }

          pages++;
          const nom = route || 'accueil';
          const etat = retenues.length || erreurs.length ? 'ÉCHEC' : 'ok';
          console.log(`${etat.padEnd(5)} ${nom.padEnd(36)} ${theme}/${scheme}`);
          for (const { violation, noeuds } of retenues) {
            console.log(`        - ${violation.id} [${violation.impact}] ×${noeuds.length} : ${noeuds[0].target.join(' ')}`);
            console.log(`          ${violation.help}`);
          }
          for (const erreur of erreurs) console.log(`        - console ${erreur}`);
          if (retenues.length || erreurs.length) echecs++;
        }
        await page.close();
      }
    }
  } finally {
    await navigateur.close();
  }
});

console.log(`\n${pages} page(s) testée(s), ${echecs} en échec, ${tolerees} violation(s) connue(s) tolérée(s).`);
if (tolerees) {
  for (const e of EXCEPTIONS) console.log(`  tolérée : ${e.regle} sur ${e.route} (${e.raison})`);
}
process.exit(echecs ? 1 : 0);
