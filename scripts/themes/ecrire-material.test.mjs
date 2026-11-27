import assert from 'node:assert/strict';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { controlerMaterial, genererMaterial, palettesMaterial, validerPaletteRepli } from './ecrire-material.mjs';
import { ELEVATIONS } from './elevations.mjs';
import { genererVariables } from './ecrire-variables.mjs';
import { lireSource } from './lire-source.mjs';

const source = lireSource(fileURLToPath(new URL('../../tokens', import.meta.url)));
const { variables } = genererVariables(source, { nom: 'app' });
const material = genererMaterial({ nom: 'app', variables });
const scss = material.fichiers.get('_themes-app.scss');

test('fichier produit et mixin documenté', () => {
  assert.deepEqual([...material.fichiers.keys()], ['_themes-app.scss', 'index.scss']);
  assert.match(scss, /@mixin theme\(\$densite: 0\)/);
  assert.match(scss, /primary: mat\.\$chartreuse-palette/);
  assert.match(scss, /plain-family: var\(--md-ref-typeface-plain\)/);
  assert.match(scss, /neutral10: var\(--app-color-neutral-900\)/);
  assert.match(scss, /body-large: var\(--md-sys-typescale-body-large-weight\) var\(--md-sys-typescale-body-large-size\) \/ var\(--md-sys-typescale-body-large-line-height\) var\(--md-sys-typescale-body-large-font\)/);
  assert.match(scss, /corner-large-top: var\(--md-sys-shape-corner-large\) var\(--md-sys-shape-corner-large\) 0 0/);
});

test('seules les variables sans source restent en repli', () => {
  assert.deepEqual(material.rapport.repliInattendu, []);
  assert.deepEqual(material.rapport.repliAttendu, ['--mat-sys-neutral-variant20']);
  // 165 variables Material - 1 en repli - 6 élévations (table `elevations.mjs`).
  assert.equal(material.rapport.surcharges, 165 - 1 - 6);
  assert.equal(material.rapport.elevations, 6);
});

test('élévations : level0 à level5 viennent de la table, pas du repli', () => {
  for (const niveau of [0, 1, 2, 3, 4, 5]) {
    assert.equal(material.surcharges.get(`level${niveau}`), ELEVATIONS[niveau]);
  }
  const { css } = controlerMaterial({ nom: 'app', scss, surcharges: material.surcharges });
  assert.match(css, /--mat-sys-level0: none;/);
  assert.match(css, /--mat-sys-level1: 0 1px 2px 0 rgba\(0, ?0, ?0, ?0?\.3\), 0 1px 3px 1px rgba\(0, ?0, ?0, ?0?\.15\);/);
});

test('table des élévations : niveaux 0 à 5, niveaux 1 à 5 à deux couches', () => {
  assert.deepEqual(Object.keys(ELEVATIONS), ['0', '1', '2', '3', '4', '5']);
  assert.equal(ELEVATIONS[0], 'none');
  const couche = /^0 \d+px \d+px \d+(?:px)? rgba\(0,0,0,\.\d+\)$/;
  for (const niveau of [1, 2, 3, 4, 5]) {
    const couches = ELEVATIONS[niveau].split(/,\s*(?=0 )/);
    assert.equal(couches.length, 2, `niveau ${niveau}`);
    for (const c of couches) assert.match(c, couche, `niveau ${niveau}`);
  }
});

test('compilation témoin : chaque surcharge est la valeur finale, rien de littéral hors repli attendu', () => {
  const { css, ecarts } = controlerMaterial({ nom: 'app', scss, surcharges: material.surcharges });
  assert.deepEqual(ecarts, []);
  const litterales = [...css.matchAll(/--mat-sys-([\w-]+):\s*([^;]+);/g)]
    .filter(([, cle, valeur]) => !/var\(--(md|app)-/.test(valeur) && !/^neutral-variant20$/.test(cle) && !/^level[0-5]$/.test(cle))
    .map(([, cle, valeur]) => `${cle}: ${valeur}`);
  assert.deepEqual(litterales, []);
  assert.match(css, /--mat-sys-neutral-variant20: #[0-9a-f]{6};/);
});

test('mixin utilisable avec une densité négative', () => {
  const { ecarts, css } = controlerMaterial({ nom: 'app', scss, surcharges: material.surcharges, densite: -3 });
  assert.deepEqual(ecarts, []);
  assert.match(css, /--mat-button-/);
});

test('--nom pv : mixin et variables sans « app »', () => {
  const pv = genererVariables(source, { nom: 'pv' });
  const m = genererMaterial({ nom: 'pv', variables: pv.variables });
  const texte = m.fichiers.get('_themes-pv.scss');
  assert.match(texte, /themes-pv\.theme\(\)/);
  assert.match(texte, /neutral10: var\(--pv-color-neutral-900\)/);
  assert.doesNotMatch(texte, /\bapp\b|-app-/);
  assert.deepEqual(controlerMaterial({ nom: 'pv', scss: texte, surcharges: m.surcharges }).ecarts, []);
});

test('palette de repli : validée contre les palettes Material', () => {
  assert.ok(palettesMaterial().includes('chartreuse') && palettesMaterial().length >= 12);
  assert.equal(validerPaletteRepli('azure'), 'azure');
  assert.throws(() => validerPaletteRepli('fuchsia'), /inconnue.*chartreuse/);
});

test('une variable absente de l\'étape 1 est signalée en repli inattendu', () => {
  const sans = new Set([...variables].filter((v) => v !== '--md-sys-color-primary'));
  const m = genererMaterial({ nom: 'app', variables: sans });
  assert.deepEqual(m.rapport.repliInattendu, ['--mat-sys-primary']);
});
