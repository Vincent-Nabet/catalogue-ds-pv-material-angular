import assert from 'node:assert/strict';
import { test } from 'node:test';
import { strToU8 } from 'fflate';
import { genererThemeImporte } from './navigateur.mjs';
import { fichiersTokens, fichiersUneFamille, modifierSemantiques, zipDe } from './fixtures-tokens.mjs';

const BASE = 'imp-k3f9a2';
const generer = (fichiers, prefixe) => genererThemeImporte(zipDe(fichiers, prefixe), { base: BASE, nomSource: 'essai.zip' });

test('tokens/ : 4 familles, aucun avertissement, CSS sans :root', () => {
  const { css, familles, rapport } = generer(fichiersTokens());
  assert.deepEqual(familles.map((f) => f.id), ['standard', 'contraste-moyen', 'contraste-eleve', 'monochrome']);
  assert.deepEqual(familles.map((f) => f.libelle), ['Standard', 'Contraste moyen', 'Contraste élevé', 'Monochrome']);
  assert.ok(familles.every((f) => /^#[0-9a-f]{6}$/.test(f.apercu)));
  assert.equal(familles.filter((f) => f.defaut).length, 1);
  assert.equal(familles[0].defaut, true);
  assert.deepEqual(familles.map((f) => f.progression), [true, true, true, false]);
  assert.deepEqual(rapport.inconnus, []);
  assert.deepEqual(rapport.avertissements, []);
  assert.deepEqual(rapport.modesIgnores, []);
  assert.equal(rapport.modes, 8);
  assert.equal(rapport.md3, 142);
  assert.equal(rapport.custom, 41);
  assert.equal(rapport.police, 'Poppins');
  assert.doesNotMatch(css, /:root/);
  assert.doesNotMatch(css, /@import/);
  assert.ok(css.includes(`html.theme-${BASE}-contraste-eleve {`));
});

test('zip avec un sous-dossier racine', () => {
  assert.equal(generer(fichiersTokens(), 'tokens/').familles.length, 4);
});

test('une seule paire clair/sombre : une seule famille', () => {
  const { familles, css } = generer(fichiersUneFamille());
  assert.equal(familles.length, 1);
  assert.deepEqual([familles[0].id, familles[0].defaut], ['standard', true]);
  assert.ok(css.includes(`html.theme-${BASE}-standard {`));
});

test('une variable indispensable absente : erreur nommant la variable et le token', () => {
  const fichiers = modifierSemantiques(fichiersTokens(), (json) => {
    delete json.Colors.Schemes['Surface Dim'];
    delete json.Colors['State Layers']['Surface Dim'];
  });
  assert.throws(
    () => generer(fichiers),
    (erreur) => /--md-sys-color-surface-dim absent : token Colors\.Schemes\.Surface Dim/.test(erreur.message) && /absentes/.test(erreur.message),
  );
});

test('une variable du design system absente : avertissement seulement', () => {
  const fichiers = modifierSemantiques(fichiersTokens(), (json) => {
    delete json.Colors.Schemes.Success;
  });
  const { rapport } = generer(fichiers);
  assert.equal(rapport.custom, 40);
  assert.deepEqual(rapport.avertissements.length, 1);
  assert.match(rapport.avertissements[0], /--app-color-success \(token Colors\.Schemes\.Success\)/);
});

test('un token non reconnu et un mode sans clair/sombre : avertissements', () => {
  const fichiers = modifierSemantiques(fichiersTokens(), (json) => {
    json.Divers = { Truc: { $type: 'color', $value: '#123456' } };
  });
  fichiers['semantics/notes.tokens.json'] = '{}';
  const { rapport } = generer(fichiers);
  assert.deepEqual(rapport.inconnus, ['Divers.Truc']);
  assert.ok(rapport.avertissements.some((a) => a.includes('Token non reconnu') && a.includes('Divers.Truc')));
  assert.deepEqual(rapport.modesIgnores, ['notes']);
  assert.ok(rapport.avertissements.some((a) => a.includes('Mode non utilisé') && a.includes('notes')));
});

test('alias en cycle : erreur française', () => {
  const fichiers = modifierSemantiques(fichiersTokens(), (json, chemin) => {
    if (chemin.endsWith('semantics/light.tokens.json')) json.Colors.Schemes.Primary.$value = '{Colors.Schemes.Primary}';
  });
  assert.throws(() => generer(fichiers), /Cycle d'alias : Colors\.Schemes\.Primary → Colors\.Schemes\.Primary/);
});

test('famille incomplète (clair sans sombre) : erreur française', () => {
  const { 'semantics/dark-medium-contrast.tokens.json': _, ...fichiers } = fichiersTokens();
  assert.throws(() => generer(fichiers), /Famille incomplète : « light-medium-contrast » n'a pas de mode sombre/);
});

test('refus : pas un zip, pas de primitives, JSON invalide', () => {
  assert.throws(() => genererThemeImporte(strToU8('texte'), { base: BASE, nomSource: 'a.txt' }), /Archive illisible : « a\.txt »/);
  const { 'primitives.tokens.json': _, ...sansPrimitives } = fichiersTokens();
  assert.throws(() => generer(sansPrimitives), /primitives\.tokens\.json » introuvable/);
  assert.throws(() => generer({ ...fichiersTokens(), 'semantics/dark.tokens.json': '{ nope' }), /JSON invalide/);
});

test('une valeur de token malveillante est refusée par validerCss', () => {
  const fichiers = modifierSemantiques(fichiersTokens(), (json, chemin) => {
    if (chemin.endsWith('semantics/light.tokens.json')) json.Colors.Schemes.Primary.$value = 'red; } body { display: none';
  });
  assert.throws(() => generer(fichiers), /CSS généré invalide ligne \d+/);
});

test('un token mal formé donne un message français, pas une erreur technique', () => {
  const fichiers = modifierSemantiques(fichiersTokens(), (json, chemin) => {
    if (chemin.endsWith('semantics/light.tokens.json')) json.Colors.Schemes.Primary = null;
  });
  assert.throws(() => generer(fichiers), /Valeur inattendue pour « Colors\.Schemes\.Primary »/);
});

test('identifiant de thème invalide', () => {
  assert.throws(() => genererThemeImporte(zipDe(fichiersTokens()), { base: 'Imp X', nomSource: 'a.zip' }), /Identifiant de thème/);
});
