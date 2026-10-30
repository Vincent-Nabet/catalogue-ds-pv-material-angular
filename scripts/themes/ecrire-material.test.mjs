import assert from 'node:assert/strict';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { controlerMaterial, genererMaterial, palettesMaterial, validerPaletteRepli } from './ecrire-material.mjs';
import { genererVariables } from './ecrire-variables.mjs';
import { lireSource } from './lire-source.mjs';

const source = lireSource(fileURLToPath(new URL('../../tokens', import.meta.url)));
const { variables } = genererVariables(source, { nom: 'app' });
const material = genererMaterial({ nom: 'app', variables });
const scss = material.fichiers.get('_themes-app.scss');

test('fichier produit et mixin documenté', () => {
  assert.deepEqual([...material.fichiers.keys()], ['_themes-app.scss']);
  assert.match(scss, /@mixin theme\(\$densite: 0\)/);
  assert.match(scss, /primary: mat\.\$chartreuse-palette/);
  assert.match(scss, /plain-family: var\(--md-ref-typeface-plain\)/);
  assert.match(scss, /neutral10: var\(--app-color-neutral-900\)/);
  assert.match(scss, /body-large: var\(--md-sys-typescale-body-large-weight\) var\(--md-sys-typescale-body-large-size\) \/ var\(--md-sys-typescale-body-large-line-height\) var\(--md-sys-typescale-body-large-font\)/);
  assert.match(scss, /corner-large-top: var\(--md-sys-shape-corner-large\) var\(--md-sys-shape-corner-large\) 0 0/);
});

test('seules les variables sans équivalent dans les tokens restent en repli', () => {
  assert.deepEqual(material.rapport.repliInattendu, []);
  assert.deepEqual(material.rapport.repliAttendu.sort(), [
    '--mat-sys-level0', '--mat-sys-level1', '--mat-sys-level2', '--mat-sys-level3', '--mat-sys-level4', '--mat-sys-level5',
    '--mat-sys-neutral-variant20',
  ]);
  // 165 variables Material - 7 en repli.
  assert.equal(material.rapport.surcharges, 165 - 7);
});

test('compilation témoin : chaque surcharge est la valeur finale, rien de littéral hors repli attendu', () => {
  const { css, ecarts } = controlerMaterial({ nom: 'app', scss, surcharges: material.surcharges });
  assert.deepEqual(ecarts, []);
  const litterales = [...css.matchAll(/--mat-sys-([\w-]+):\s*([^;]+);/g)]
    .filter(([, cle, valeur]) => !/var\(--(md|app)-/.test(valeur) && !/^(neutral-variant20|level[0-5])$/.test(cle))
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
