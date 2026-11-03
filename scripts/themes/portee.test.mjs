import assert from 'node:assert/strict';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { genererVariables, selecteurFamille } from './ecrire-variables.mjs';
import { assembler } from './lire-source-memoire.mjs';
import { lireSource } from './lire-source.mjs';
import { fichiersUneFamille } from './fixtures-tokens.mjs';

const BASE = 'imp-k3f9a2';
const portee = { base: BASE };
const source = lireSource(fileURLToPath(new URL('../../tokens', import.meta.url)));
const sourceUneFamille = assembler(
  new Map(Object.entries(fichiersUneFamille()).map(([chemin, texte]) => [chemin, () => texte])),
  'une-famille',
);

/** Lignes de sélecteur (`… {`) d'un CSS. */
const selecteurs = (css) => css.split('\n').filter((ligne) => ligne.endsWith(' {'));
/** Déclarations (`  --x: valeur;`) de chaque fichier, dans l'ordre. */
const declarations = (fichiers) =>
  new Map([...fichiers].map(([chemin, corps]) => [chemin, corps.split('\n').filter((ligne) => ligne.startsWith('  --'))]));

test('selecteurFamille avec portée : html.theme-<base>-<famille>, jamais :root', () => {
  assert.equal(selecteurFamille({ suffixe: '', defaut: true }, 'app', portee), `html.theme-${BASE}-standard`);
  assert.equal(selecteurFamille({ suffixe: 'contraste-eleve', defaut: false }, 'app', portee), `html.theme-${BASE}-contraste-eleve`);
  assert.equal(selecteurFamille({ suffixe: '', defaut: true }, 'app'), ':root, .theme-app');
});

test('portée : tous les sélecteurs sont html.theme-<base>-<famille> (4 familles de tokens/)', () => {
  const { fichiers, rapport } = genererVariables(source, { nom: 'app', portee });
  const ids = rapport.familles.map((f) => f.id);
  assert.deepEqual(ids, ['standard', 'contraste-moyen', 'contraste-eleve', 'monochrome']);
  const un = `html\\.theme-${BASE}-(?:${ids.join('|')})`;
  const attendu = new RegExp(`^${un}(?:, ${un})* \\{$`);
  let total = 0;
  for (const [chemin, corps] of fichiers) {
    if (chemin === 'index.css') continue;
    assert.doesNotMatch(corps, /:root/, chemin);
    for (const s of selecteurs(corps)) {
      assert.match(s, attendu, chemin);
      total++;
    }
  }
  assert.ok(total >= 4 * 2, `blocs de couleur de chaque famille (${total})`);
});

test('portée : les blocs communs prennent la liste des sélecteurs de toutes les familles', () => {
  const { fichiers } = genererVariables(source, { nom: 'app', portee });
  const liste = ['standard', 'contraste-moyen', 'contraste-eleve', 'monochrome'].map((id) => `html.theme-${BASE}-${id}`).join(', ');
  for (const chemin of ['md3/ref.css', 'md3/sys.css']) {
    assert.ok(selecteurs(fichiers.get(chemin)).every((s) => s === `${liste} {`), chemin);
  }
  assert.ok(fichiers.get('app.css').includes(`${liste} {`));
});

test('portée : une seule famille', () => {
  const { fichiers, rapport } = genererVariables(sourceUneFamille, { nom: 'app', portee });
  assert.equal(rapport.familles.length, 1);
  for (const [chemin, corps] of fichiers) {
    if (chemin === 'index.css') continue;
    assert.ok(selecteurs(corps).length > 0, chemin);
    assert.ok(selecteurs(corps).every((s) => s === `html.theme-${BASE}-standard {`), chemin);
  }
});

test('portée : les déclarations sont celles de la génération sans portée (tokens/ et une famille)', () => {
  for (const jeu of [source, sourceUneFamille]) {
    const sans = genererVariables(jeu, { nom: 'app' });
    const avec = genererVariables(jeu, { nom: 'app', portee });
    assert.deepEqual(declarations(avec.fichiers), declarations(sans.fichiers));
    assert.deepEqual([...avec.variables], [...sans.variables]);
    assert.deepEqual(avec.rapport, sans.rapport);
  }
});
