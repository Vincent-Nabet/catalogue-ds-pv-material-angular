// Captures d'écran pleine page des pages du catalogue, par thème et par mode.
//
//   npm run captures
//   npm run captures -- --routes=bouton,champ-saisie,tableau --themes=azur,violet --schemes=light,dark
//   npm run captures -- --width=480 --density=4 --out=captures/mobile
//
// Les images sont écrites dans `captures/` (ignoré par git) : <page>-<thème>-<mode>.png
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { avecServeur, charger, lancerNavigateur, liste, ouvrirPage, racine, resoudreRoutes, themesDisponibles } from './lib.mjs';

const { values } = parseArgs({
  options: {
    themes: { type: 'string' },
    schemes: { type: 'string' },
    routes: { type: 'string' },
    density: { type: 'string', default: '0' },
    width: { type: 'string', default: '1280' },
    out: { type: 'string', default: 'captures' },
    help: { type: 'boolean', default: false },
  },
});

if (values.help) {
  console.log(`Options :
  --themes=azur,violet     thèmes (défaut : azur ; « tous » pour les ${themesDisponibles().length} thèmes)
  --schemes=light,dark     modes (défaut : light)
  --routes=bouton,accueil  pages (défaut : toutes)
  --density=0..4           densité (défaut : 0)
  --width=1280             largeur du viewport en px
  --out=captures           dossier de sortie
Variables : BASE_URL (serveur déjà lancé), PORT (défaut 4300), CHROME_PATH.`);
  process.exit(0);
}

const themes = values.themes === 'tous' ? themesDisponibles() : liste(values.themes, ['azur']);
const schemes = liste(values.schemes, ['light']);
const routes = resoudreRoutes(liste(values.routes, null));
const density = Number(values.density);
const width = Number(values.width);
if (!Number.isInteger(density) || density < 0 || density > 4) throw new Error('--density doit valoir 0, 1, 2, 3 ou 4.');
if (!Number.isInteger(width) || width < 320) throw new Error('--width doit être un entier d’au moins 320.');

const sortie = resolve(racine, values.out);
mkdirSync(sortie, { recursive: true });

let total = 0;
await avecServeur(async (baseUrl) => {
  const navigateur = await lancerNavigateur();
  try {
    for (const theme of themes) {
      for (const scheme of schemes) {
        const { page, erreurs } = await ouvrirPage(navigateur, { theme, scheme, density, width });
        for (const route of routes) {
          await page.setViewport({ width, height: 900 });
          await charger(page, baseUrl, route);
          // Le contenu défile dans mat-sidenav-content : agrandir le viewport pour tout capturer.
          const hauteur = await page.evaluate(
            () => document.querySelector('header').offsetHeight + document.querySelector('mat-sidenav-content').scrollHeight,
          );
          await page.setViewport({ width, height: Math.min(hauteur, 8000) });
          await new Promise((r) => setTimeout(r, 250));
          const fichier = resolve(sortie, `${route ? route.slice(11) : 'accueil'}-${theme}-${scheme}.png`);
          await page.screenshot({ path: fichier });
          total++;
          console.log(fichier);
        }
        if (erreurs.length) console.log(`  ${erreurs.length} message(s) console pour ${theme}/${scheme} :\n  ${erreurs.slice(0, 5).join('\n  ')}`);
        await page.close();
      }
    }
  } finally {
    await navigateur.close();
  }
});

console.log(`\n${total} capture(s) dans ${sortie}`);
