import assert from 'node:assert/strict';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { classer, classerTous, validerNom } from './correspondance.mjs';
import { lireSource } from './lire-source.mjs';
import { aplatir } from './resoudre-tokens.mjs';

const source = lireSource(fileURLToPath(new URL('../../tokens', import.meta.url)));
const chemins = [
  ...aplatir(source.primitives).keys(),
  ...Object.values(source.semantiques).flatMap((json) => [...aplatir(json).keys()]),
];
const uniques = [...new Set(chemins)];

test('tous les tokens actuels sont classés, aucun inconnu', () => {
  const { inconnus } = classerTous(uniques, 'app');
  assert.deepEqual(inconnus, []);
});

test('comptes sur un fichier sémantique : 49 MD3 couleur, 147 State Layers ignorés', () => {
  const { entrees } = classerTous([...aplatir(source.semantiques.light).keys()], 'app');
  const valeurs = [...entrees.values()];
  assert.equal(valeurs.filter((e) => e.fichier === 'md3/couleurs').length, 49);
  assert.equal(valeurs.filter((e) => e.cible === 'ignore').length, 147);
  assert.equal(valeurs.filter((e) => e.fichier === 'md3/sys').length, 15 * 5 + 2);
});

test('échantillon de noms attendus (TOKENS-MD3.md)', () => {
  const attendus = {
    'Colors.Schemes.Primary': '--md-sys-color-primary',
    'Colors.Schemes.Surface Tint': '--md-sys-color-surface-tint',
    'Colors.Schemes.Inverse On Surface': '--md-sys-color-inverse-on-surface',
    'Colors.Schemes.Primary Fixed Dim': '--md-sys-color-primary-fixed-dim',
    'Colors.Schemes.Surface Container Lowest': '--md-sys-color-surface-container-lowest',
    'Typescale.Static.Display Large.Line Height': '--md-sys-typescale-display-large-line-height',
    'Typescale.Static.Label Large.Weight-emphasized': '--md-sys-typescale-label-large-weight-prominent',
    'Typescale.Static.Label Medium.Weight-emphasized': '--md-sys-typescale-label-medium-weight-prominent',
    'Typescale.Static.Body Small.Weight-emphasized': '--app-typescale-emphasized-body-small-weight',
    'Radius.Extra-small': '--md-sys-shape-corner-extra-small',
    'Radius.Large-increased': '--app-shape-corner-large-increased',
    'Font theme.Static.Font.Brand': '--md-ref-typeface-brand',
    'Font theme.Static.Weight.Bold': '--md-ref-typeface-weight-bold',
    'Spacing.Extra-large-increased': '--app-spacing-extra-large-increased',
    'Colors.Schemes.Success': '--app-color-success',
    'Colors.Schemes.On Success Container': '--app-color-on-success-container',
    'Colors.Schemes.Neutral.0': '--app-color-neutral-0',
    'Colors.Schemes.Neutral.900': '--app-color-neutral-900',
    'Colors.Add-ons.Section background': '--app-color-section-background',
  };
  for (const [chemin, variable] of Object.entries(attendus)) {
    assert.equal(classer(chemin, 'app').variable, variable, chemin);
  }
});

test('--palettes : primitives exposées en --<nom>-ref-<palette>-<NNN>', () => {
  assert.equal(classer('Colors.Olive.Shade-012', 'app').cible, 'ignore');
  const avec = classer('Colors.Neutral Variant.Shade-062', 'app', { palettes: true });
  assert.deepEqual(avec, { cible: 'custom', variable: '--app-ref-neutral-variant-062', fichier: 'md3/ref' });
});

test('token non reconnu = inconnu, jamais ignoré en silence', () => {
  assert.equal(classer('Colors.Schemes.Nouveau Role', 'app').cible, 'inconnu');
  assert.equal(classer('Elevation.Level1', 'app').cible, 'inconnu');
  assert.equal(classer('Typescale.Static.Body Large.Italique', 'app').cible, 'inconnu');
});

test('--nom pv : aucune variable ne contient « app »', () => {
  const { entrees } = classerTous(uniques, 'pv', { palettes: true });
  const variables = [...entrees.values()].filter((e) => e.variable).map((e) => e.variable);
  assert.ok(variables.some((v) => v.startsWith('--pv-')));
  assert.deepEqual(variables.filter((v) => /(^|-)app(-|$)/.test(v)), []);
});

test('validerNom', () => {
  assert.equal(validerNom('pv'), 'pv');
  assert.equal(validerNom('app2'), 'app2');
  for (const mauvais of ['', 'Pv', '2pv', 'a-b', 'a_b', 'md', 'mat']) {
    assert.throws(() => validerNom(mauvais), /invalide|réservé/, mauvais);
  }
});
