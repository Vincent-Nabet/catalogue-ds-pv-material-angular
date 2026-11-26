import assert from 'node:assert/strict';
import { test } from 'node:test';
import { comparerSorties } from './comparer-sorties.mjs';

const ENTETE = '/* Fichier généré par `npm run themes` — ne pas modifier.\n * Source : tokens — 2026-11-26 */\n\n';
const css = (declarations, selecteur = ':root, .theme-app') =>
  `/* Standard (light / dark) */\n${selecteur} {\n${declarations.map(([v, x]) => `  ${v}: ${x};\n`).join('')}}\n`;
const un = (a, b) => comparerSorties(a, b).get('css');

test('textes égaux : identique', () => {
  const texte = css([['--a', '1'], ['--b', '2']]);
  assert.deepEqual(un(texte, texte), { statut: 'identique', ecarts: [] });
});

test("l'en-tête « Fichier généré… Source… » est ignoré", () => {
  const corps = css([['--a', '1']]);
  assert.deepEqual(un(ENTETE + corps, corps), { statut: 'identique', ecarts: [] });
  assert.equal(un(ENTETE + corps, ENTETE.replace('tokens', 'Primitives.zip + Semantics.zip') + corps).statut, 'identique');
});

test('ordre des déclarations différent : équivalent', () => {
  const resultat = un(css([['--a', '1'], ['--b', '2']]), css([['--b', '2'], ['--a', '1']]));
  assert.deepEqual(resultat, { statut: 'equivalent', ecarts: [] });
});

test('valeur différente : écart nommé « bloc : variable : ancien → natif »', () => {
  const resultat = un(css([['--a', '#73C322']]), css([['--a', '#477A14']]));
  assert.equal(resultat.statut, 'different');
  assert.deepEqual(resultat.ecarts, ['Standard (light / dark) | :root, .theme-app : --a : #73C322 → #477A14']);
});

test("variable absente d'un côté, bloc absent d'un côté", () => {
  const resultat = un(css([['--a', '1'], ['--b', '2']]), css([['--a', '1']]));
  assert.deepEqual(resultat.ecarts, ['Standard (light / dark) | :root, .theme-app : --b : 2 → (absente)']);
  const autre = un(css([['--a', '1']]), css([['--a', '1']], '.theme-autre'));
  assert.equal(autre.statut, 'different');
  assert.equal(autre.ecarts.length, 2);
});

test('commentaire de section différent : blocs différents', () => {
  const resultat = un(css([['--a', '1']]), css([['--a', '1']]).replace('Standard (light / dark)', 'Standard (Light / Dark)'));
  assert.equal(resultat.statut, 'different');
});

test('CSS concaténé de plusieurs fichiers : blocs comparés un à un', () => {
  const a = `${css([['--a', '1']])}\n${css([['--c', '3']], 'html.theme-imp-x-standard')}`;
  const b = `${css([['--a', '1']])}\n${css([['--c', '4']], 'html.theme-imp-x-standard')}`;
  assert.deepEqual(un(a, b).ecarts, ['Standard (light / dark) | html.theme-imp-x-standard : --c : 3 → 4']);
});

test('CSS concaténé : des blocs de même commentaire et même sélecteur sont comparés rang par rang', () => {
  const selecteur = 'html.theme-imp-x-standard';
  const a = `${css([['--a', '1']], selecteur)}\n${css([['--b', '2']], selecteur)}`;
  assert.deepEqual(un(a, `${css([['--a', '1']], selecteur)}\n${css([['--b', '2']], selecteur)}`), { statut: 'identique', ecarts: [] });
  assert.deepEqual(un(a, `${css([['--a', '1']], selecteur)}\n${css([['--b', '3']], selecteur)}`).ecarts, [
    `Standard (light / dark) | ${selecteur} (bloc 2) : --b : 2 → 3`,
  ]);
  assert.deepEqual(un(a, `${css([['--a', '1']], selecteur)}\n${css([['--b', '2'], ['--a', '1']], selecteur)}`).ecarts, [
    `Standard (light / dark) | ${selecteur} (bloc 2) : --a : (absente) → 1`,
  ]);
});

test('ordre des blocs différent : signalé', () => {
  const a = `${css([['--a', '1']])}\n${css([['--c', '3']], '.theme-b')}`;
  const b = `${css([['--c', '3']], '.theme-b')}\n${css([['--a', '1']])}`;
  assert.deepEqual(un(a, b), { statut: 'different', ecarts: ['ordre des blocs différent'] });
});

test('Map de fichiers : statut par fichier, fichier manquant, SCSS et TS comparés texte à texte', () => {
  const a = new Map([['app.css', css([['--a', '1']])], ['_themes-app.scss', 'a\nb\n'], ['families.ts', 'x\n'], ['seul-a.css', '']]);
  const b = new Map([['app.css', ENTETE + css([['--a', '1']])], ['_themes-app.scss', 'a\nc\n'], ['families.ts', `${ENTETE}x\n`], ['seul-b.css', '']]);
  const resultat = comparerSorties(a, b);
  assert.equal(resultat.get('app.css').statut, 'identique');
  assert.deepEqual(resultat.get('_themes-app.scss'), { statut: 'different', ecarts: ['ligne 2 : « b » → « c »'] });
  assert.equal(resultat.get('families.ts').statut, 'identique');
  assert.deepEqual(resultat.get('seul-a.css').ecarts, ['fichier absent de la seconde sortie']);
  assert.deepEqual(resultat.get('seul-b.css').ecarts, ['fichier absent de la première sortie']);
});

test('fins de ligne CRLF ignorées', () => {
  const texte = css([['--a', '1']]);
  assert.equal(un(texte.replaceAll('\n', '\r\n'), texte).statut, 'identique');
});
