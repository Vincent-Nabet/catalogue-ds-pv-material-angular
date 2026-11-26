// Banc de comparaison des deux formats d'entrée du générateur de thèmes : génère depuis `tokens/` (ancien format) et
// depuis l'export natif de Figma (`Primitives.zip` + `Semantics.zip`), compare les sorties et échoue si un écart de
// valeur sort de la liste attendue. Contrôle aussi que `tokens/` régénéré est identique aux fichiers versionnés de
// `src/styles/themes-app/`. N'écrit que dans un dossier temporaire du système (jamais sous `src/`).
//
//   node testing/comparer-formats.mjs
//   node testing/comparer-formats.mjs --primitives-zip chemin/Primitives.zip --semantiques-zip chemin/Semantics.zip
//
// Attendu (cf. docs/generation-themes.md) : `index.css`, `md3/ref.css`, `md3/sys.css`, `md3/couleurs.css`,
// `_themes-app.scss` et `familles.ts` identiques ; `app.css` équivalent à l'ordre des déclarations près, avec pour seuls
// écarts de valeur ceux de ECARTS_ATTENDUS (évolutions du design system depuis l'ancien zip, confirmées par les UX designers).
import { mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { comparerSorties } from '../scripts/themes/comparer-sorties.mjs';
import { generer } from '../scripts/themes/generer-themes.mjs';

const racine = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');

/** Écarts de valeur attendus entre `tokens/` (ancien) et l'export natif : `bloc : variable : ancien → natif`. */
export const ECARTS_ATTENDUS = [
  'Standard (light / dark) | :root, .theme-app : --app-color-success : light-dark(#73C322, #A5D66A) → light-dark(#477A14, #A5D66A)',
  'Standard (light / dark) | :root, .theme-app : --app-color-warning : light-dark(#FF9900, #FFB95C) → light-dark(#A85F00, #FFB95C)',
];
const FICHIER_AVEC_ECARTS = 'app.css';

const lister = (dossier, prefixe = '') =>
  readdirSync(dossier, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? lister(join(dossier, e.name), `${prefixe}${e.name}/`) : [`${prefixe}${e.name}`],
  );
const lireDossier = (dossier) => new Map(lister(dossier).map((f) => [f, readFileSync(join(dossier, f), 'utf8')]));

/** Refuse un dossier de sortie situé sous `src/` : le banc ne doit jamais toucher aux thèmes versionnés. */
function verifierSortie(dossier) {
  const relatif = relative(join(racine, 'src'), resolve(dossier));
  if (relatif === '' || (!relatif.startsWith('..') && !isAbsolute(relatif))) {
    throw new Error(`Dossier de sortie « ${dossier} » refusé : il est sous src/.`);
  }
}

function main() {
  const { values } = parseArgs({
    options: {
      'primitives-zip': { type: 'string', default: join(racine, 'temp/Primitives.zip') },
      'semantiques-zip': { type: 'string', default: join(racine, 'temp/Semantics.zip') },
      sortie: { type: 'string' },
    },
  });
  const dossier = values.sortie ?? mkdtempSync(join(tmpdir(), 'themes-formats-'));
  verifierSortie(dossier);
  const [p, s] = [values['primitives-zip'], values['semantiques-zip']];
  const echecs = [];

  try {
    const sorties = {
      ancien: join(dossier, 'ancien'),
      natif: join(dossier, 'natif'),
      inverse: join(dossier, 'natif-inverse'),
    };
    generer({ source: join(racine, 'tokens'), sortie: sorties.ancien });
    generer({ source: [p, s], sortie: sorties.natif });
    generer({ source: [s, p], sortie: sorties.inverse });
    const [ancien, natif, inverse] = [sorties.ancien, sorties.natif, sorties.inverse].map(lireDossier);

    console.log('tokens/ régénéré ↔ src/styles/themes-app/ (fichiers versionnés) :');
    for (const [fichier, { statut, ecarts }] of comparerSorties(lireDossier(join(racine, 'src/styles/themes-app')), ancien)) {
      console.log(`  ${statut.padEnd(10)} ${fichier}`);
      if (statut !== 'identique') echecs.push(`themes-app/${fichier} : ${statut} (${ecarts.slice(0, 3).join(' ; ')})`);
    }

    console.log('tokens/ (ancien) ↔ export natif :');
    const vus = [];
    for (const [fichier, { statut, ecarts }] of comparerSorties(ancien, natif)) {
      console.log(`  ${statut.padEnd(10)} ${fichier}${ecarts.length > 0 ? ` (${ecarts.length} écart(s))` : ''}`);
      if (fichier === FICHIER_AVEC_ECARTS) {
        vus.push(...ecarts);
        for (const ecart of ecarts) if (!ECARTS_ATTENDUS.includes(ecart)) echecs.push(`${fichier} : écart inattendu : ${ecart}`);
      } else if (statut !== 'identique') {
        echecs.push(`${fichier} : ${statut} (${ecarts.slice(0, 3).join(' ; ')})`);
      }
    }
    for (const ecart of ECARTS_ATTENDUS) if (!vus.includes(ecart)) echecs.push(`écart attendu absent : ${ecart}`);
    for (const ecart of vus) console.log(`    ${ecart}`);

    console.log('export natif, archives dans l\'ordre inverse :');
    for (const [fichier, { statut, ecarts }] of comparerSorties(natif, inverse)) {
      console.log(`  ${statut.padEnd(10)} ${fichier}`);
      if (statut !== 'identique') echecs.push(`ordre inverse : ${fichier} : ${statut} (${ecarts.slice(0, 3).join(' ; ')})`);
    }
  } catch (erreur) {
    echecs.push(erreur.message);
  } finally {
    if (!values.sortie) rmSync(dossier, { recursive: true, force: true });
  }

  if (echecs.length > 0) {
    console.error(`\nÉCHEC (${echecs.length}) :\n  ${echecs.join('\n  ')}`);
    process.exitCode = 1;
  } else {
    console.log('\nOK : 6 fichiers identiques, app.css équivalent avec exactement les écarts attendus.');
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (erreur) {
    console.error(`Erreur : ${erreur.message}`);
    process.exitCode = 1;
  }
}
