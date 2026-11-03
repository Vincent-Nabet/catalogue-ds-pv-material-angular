import assert from 'node:assert/strict';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { genererVariables } from './ecrire-variables.mjs';
import { lireSource } from './lire-source.mjs';
import { validerCss } from './valider-css.mjs';

const BASE = 'imp-k3f9a2';
const source = lireSource(fileURLToPath(new URL('../../tokens', import.meta.url)));
const generer = () =>
  [...genererVariables(source, { nom: 'app', portee: { base: BASE } }).fichiers]
    .filter(([chemin]) => chemin !== 'index.css')
    .map(([, corps]) => corps)
    .join('\n');

const bloc = (declaration) => `html.theme-${BASE}-standard {\n${declaration}\n}\n`;
const valider = (css) => validerCss(css, { base: BASE });

test('accepte la sortie générée depuis tokens/', () => {
  const css = generer();
  assert.equal(valider(css), css);
});

test('accepte une déclaration ordinaire', () => {
  assert.doesNotThrow(() => valider(bloc('  --app-color-x: light-dark(#86A315, #BCD078);')));
  assert.doesNotThrow(() => valider(bloc('  --md-ref-typeface-plain: "Fira Sans", Poppins;')));
});

for (const [nom, valeur] of [
  ['point-virgule', 'red; color: blue'],
  ['accolade fermante', 'red } body { display: none'],
  ['accolade ouvrante', 'red {'],
  ['url(', 'url(https://exemple.fr/x.png)'],
  ['URL( en majuscules', 'URL(https://exemple.fr/x.png)'],
  ['src(', 'src("https://exemple.fr/x")'],
  ['image-set(', 'image-set("x" 1x)'],
  ['@import', '@import "x"'],
  ['commentaire', 'red /* x */'],
  ['antislash', 'u\\72l(x)'],
  ['balise', '</style><img>'],
  ['chevron', 'a > b'],
  ['parenthèse non fermée', 'calc(1px'],
  ['parenthèse fermante seule', '1px)'],
  ['guillemet impair', '"abc'],
  ['caractère de contrôle', 'a\rb'],
]) {
  test(`refuse une valeur avec : ${nom}`, () => {
    assert.throws(() => valider(bloc(`  --app-color-x: ${valeur};`)), /CSS généré invalide ligne 2/);
  });
}

for (const [nom, css] of [
  ['sélecteur :root', ':root {\n  --app-x: 1;\n}\n'],
  ['sélecteur d\'une autre base', 'html.theme-imp-autre1-standard {\n  --app-x: 1;\n}\n'],
  ['sélecteur sans html', `.theme-${BASE}-standard {\n  --app-x: 1;\n}\n`],
  ['sélecteur avec famille hors a-z0-9-', `html.theme-${BASE}-Standard {\n  --app-x: 1;\n}\n`],
  ['règle étrangère', `body {\n  --app-x: 1;\n}\n`],
  ['déclaration hors bloc', '  --app-x: 1;\n'],
  ['propriété ordinaire', bloc('  display: none;')],
  ['nom de variable invalide', bloc('  --App-x: 1;')],
  ['ligne inattendue', `${bloc('  --app-x: 1;')}@media print {}\n`],
  ['accolade fermante seule', '}\n'],
  ['bloc imbriqué', `html.theme-${BASE}-standard {\nhtml.theme-${BASE}-standard {\n}\n}\n`],
  ['commentaire avec */ interne', '/* a */ b */\n'],
  ['commentaire avec balise', '/* </style> */\n'],
]) {
  test(`refuse : ${nom}`, () => {
    assert.throws(() => valider(css), /CSS généré invalide/);
  });
}

test('refuse un bloc non fermé', () => {
  assert.throws(() => valider(`html.theme-${BASE}-standard {\n  --app-x: 1;\n`), /bloc non fermé/);
});

test('refuse une base invalide', () => {
  assert.throws(() => validerCss('', { base: 'a b' }), /Identifiant de thème/);
});

test('un jeton de couleur malveillant, une fois généré, est refusé', () => {
  const clair = structuredClone(source);
  clair.semantiques.light.Colors.Schemes.Primary.$value = 'red; } body { display: none';
  const css = [...genererVariables(clair, { nom: 'app', portee: { base: BASE } }).fichiers]
    .filter(([chemin]) => chemin !== 'index.css')
    .map(([, corps]) => corps)
    .join('\n');
  assert.throws(() => valider(css), /CSS généré invalide ligne \d+ : valeur refusée pour --md-sys-color-primary/);
});
