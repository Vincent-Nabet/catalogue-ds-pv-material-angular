import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, test } from 'node:test';
import { strToU8, zipSync } from 'fflate';
import { lireSource } from './lire-source.mjs';

const racine = mkdtempSync(join(tmpdir(), 'themes-source-'));
after(() => rmSync(racine, { recursive: true, force: true }));

const primitives = { Radius: { None: { $type: 'dimension', $value: '0px' } } };
const clair = { Colors: { Schemes: { Primary: { $type: 'color', $value: '#86A315' } } } };
const sombre = { Colors: { Schemes: { Primary: { $type: 'color', $value: '#BDCE80' } } } };

const contenus = {
  'primitives.tokens.json': JSON.stringify(primitives),
  'semantics/light.tokens.json': JSON.stringify(clair),
  'semantics/dark.tokens.json': JSON.stringify(sombre),
};

function ecrireDossier(nom, fichiers = contenus) {
  const dossier = join(racine, nom);
  for (const [chemin, texte] of Object.entries(fichiers)) {
    mkdirSync(join(dossier, chemin, '..'), { recursive: true });
    writeFileSync(join(dossier, chemin), texte);
  }
  return dossier;
}

function ecrireZip(nom, fichiers, prefixe = '') {
  const entrees = Object.fromEntries(Object.entries(fichiers).map(([c, t]) => [`${prefixe}${c}`, strToU8(t)]));
  const chemin = join(racine, nom);
  writeFileSync(chemin, zipSync(entrees));
  return chemin;
}

test('dossier : primitives et sémantiques par mode', () => {
  const source = lireSource(ecrireDossier('dossier'));
  assert.deepEqual(source.primitives, primitives);
  assert.deepEqual(Object.keys(source.semantiques).sort(), ['dark', 'light']);
  assert.deepEqual(source.semantiques.light, clair);
});

test('zip à la racine = dossier', () => {
  const dossier = lireSource(ecrireDossier('d1'));
  const zip = lireSource(ecrireZip('racine.zip', contenus));
  assert.deepEqual({ ...zip, origine: '' }, { ...dossier, origine: '' });
});

test('zip avec un sous-dossier racine = dossier', () => {
  const dossier = lireSource(ecrireDossier('d2'));
  const zip = lireSource(ecrireZip('sous-dossier.zip', contenus, 'tokens/'));
  assert.deepEqual({ ...zip, origine: '' }, { ...dossier, origine: '' });
});

test('zip : les entrées __MACOSX sont ignorées', () => {
  const zip = lireSource(
    ecrireZip('macos.zip', { ...contenus, '__MACOSX/._primitives.tokens.json': 'binaire', '__MACOSX/semantics/._light.tokens.json': 'binaire' }),
  );
  assert.deepEqual(Object.keys(zip.semantiques).sort(), ['dark', 'light']);
});

test('source introuvable', () => {
  assert.throws(() => lireSource(join(racine, 'absent')), /Source introuvable/);
});

test('primitives absentes', () => {
  const { 'primitives.tokens.json': _, ...reste } = contenus;
  assert.throws(() => lireSource(ecrireDossier('sans-primitives', reste)), /primitives\.tokens\.json » introuvable/);
  assert.throws(() => lireSource(ecrireZip('sans-primitives.zip', reste)), /primitives\.tokens\.json » introuvable/);
});

test('aucune sémantique', () => {
  const fichiers = { 'primitives.tokens.json': contenus['primitives.tokens.json'] };
  assert.throws(() => lireSource(ecrireDossier('sans-semantiques', fichiers)), /Aucun fichier « semantics/);
});

test('JSON invalide : le fichier fautif est nommé', () => {
  const fichiers = { ...contenus, 'semantics/dark.tokens.json': '{ pas du json' };
  assert.throws(() => lireSource(ecrireDossier('json-invalide', fichiers)), /JSON invalide dans « semantics\/dark\.tokens\.json »/);
});

test('zip illisible', () => {
  const chemin = join(racine, 'casse.zip');
  writeFileSync(chemin, 'ceci n\'est pas un zip');
  assert.throws(() => lireSource(chemin), /Archive illisible/);
});

test('arborescence trop profonde dans un zip', () => {
  assert.throws(() => lireSource(ecrireZip('profond.zip', contenus, 'a/b/')), /trop profonde/);
});

// --- Export natif de Figma (plusieurs sources, détection par le contenu) ----------------------------------------
import { fichiersNatifs } from './fixtures-natif.mjs';
import { fichiersTokens } from './fixtures-tokens.mjs';

const natif = fichiersNatifs();
const nativeComplet = { ...natif.primitives, ...natif.semantiques };
const zipPrimitives = () => ecrireZip('Primitives.zip', natif.primitives);
const zipSemantiques = () => ecrireZip('Semantics.zip', natif.semantiques);

test('ancien format : le résultat garde exactement ses trois clés (ni format ni avertissements)', () => {
  const source = lireSource(ecrireDossier('ancien-cles'));
  assert.deepEqual(Object.keys(source).sort(), ['origine', 'primitives', 'semantiques']);
});

test('natif : deux zips (dans un ordre ou dans l\'autre), zip combiné et dossier donnent la même forme interne', () => {
  const p = zipPrimitives();
  const s = zipSemantiques();
  const normal = lireSource([p, s]);
  const inverse = lireSource([s, p]);
  const combine = lireSource([ecrireZip('combine.zip', nativeComplet)]);
  const dossier = lireSource([ecrireDossier('natif-dossier', nativeComplet)]);
  assert.equal(normal.format, 'natif');
  assert.deepEqual(normal.avertissements, []);
  assert.deepEqual(Object.keys(normal.semantiques).sort(), ['dark', 'dark-high-contrast', 'dark-medium-contrast', 'light', 'light-high-contrast', 'light-medium-contrast', 'monochrome-dt', 'monochrome-lt']);
  for (const autre of [inverse, combine, dossier]) {
    assert.deepEqual(autre.primitives, normal.primitives);
    assert.deepEqual(autre.semantiques, normal.semantiques);
  }
  assert.equal(normal.origine, 'Primitives.zip + Semantics.zip');
  assert.equal(inverse.origine, 'Semantics.zip + Primitives.zip');
  assert.equal(combine.origine, 'combine.zip');
});

test('natif : un seul zip (primitives seules ou sémantiques seules) → export incomplet', () => {
  assert.throws(() => lireSource(zipPrimitives()), /Export Figma incomplet : aucun mode sémantique/);
  assert.throws(() => lireSource([zipSemantiques()]), /Export Figma incomplet : aucun fichier de primitives.*--source Primitives\.zip/);
});

test('natif : primitives en double, mode dupliqué après normalisation', () => {
  assert.throws(() => lireSource([zipPrimitives(), ecrireZip('Primitives2.zip', { 'Autres.tokens.json': natif.primitives['Baseline.tokens.json'] }), zipSemantiques()]), /Plusieurs fichiers de primitives/);
  const doublon = ecrireZip('doublon.zip', { 'light.tokens.json': natif.semantiques['Light.tokens.json'] });
  assert.throws(() => lireSource([zipPrimitives(), zipSemantiques(), doublon]), /Mode « light » défini deux fois/);
});

test('formats mélangés, plusieurs sources de l\'ancien format, format non reconnu', () => {
  const ancien = ecrireZip('ancien.zip', contenus);
  assert.throws(() => lireSource([zipPrimitives(), ancien]), /Formats mélangés/);
  assert.throws(() => lireSource([ancien, ecrireZip('ancien2.zip', contenus)]), /Une seule source est acceptée pour l'ancien format/);
  assert.throws(() => lireSource([ecrireDossier('ancien-d', contenus), ecrireZip('rien.zip', { 'notes.json': '{}' })]), /Une seule source est acceptée/);
  assert.throws(() => lireSource([ecrireZip('inconnu.zip', { 'a.json': '{"x":1}' }), ecrireZip('inconnu2.zip', { 'b.json': '{}' })]), /Format de tokens non reconnu dans « .*inconnu\.zip », « .*inconnu2\.zip »/);
  assert.throws(() => lireSource(ecrireZip('inconnu3.zip', { 'a.json': '{"x":1}' })), /Format de tokens non reconnu.*Exporter depuis Figma/);
});

test('natif : un JSON parasite est ignoré avec avertissement ; un JSON invalide dans un .tokens.json est une erreur', () => {
  const avecParasite = ecrireZip('parasite.zip', { ...nativeComplet, 'package.json': '{ pas du json', '__MACOSX/._Light.tokens.json': 'binaire' });
  const source = lireSource([avecParasite]);
  assert.deepEqual(source.avertissements, ['Fichier JSON ignoré (hors « *.tokens.json ») : package.json (dans « ' + avecParasite + ' »)']);
  assert.throws(() => lireSource([zipPrimitives(), ecrireZip('casse.zip', { ...natif.semantiques, 'Dark.tokens.json': '{ pas du json' })]), /JSON invalide dans « Dark\.tokens\.json »/);
});

test('ancien format : un JSON parasite illisible reste ignoré', () => {
  const fichiers = { ...contenus, 'package.json': '{ pas du json' };
  assert.deepEqual(Object.keys(lireSource(ecrireDossier('ancien-parasite', fichiers)).semantiques).sort(), ['dark', 'light']);
});

test('ancien format réel (tokens/) : mêmes primitives et modes qu\'avant', () => {
  const source = lireSource(ecrireDossier('tokens-reels', fichiersTokens()));
  assert.equal(Object.keys(source.semantiques).length, 8);
  assert.deepEqual(Object.keys(source).sort(), ['origine', 'primitives', 'semantiques']);
});

test('total de JSON sur plusieurs sources limité à 40', () => {
  const beaucoup = (prefixe) => Object.fromEntries(Array.from({ length: 25 }, (_, i) => [`${prefixe}${i}.tokens.json`, '{}']));
  assert.throws(() => lireSource([ecrireZip('a.zip', beaucoup('a')), ecrireZip('b.zip', beaucoup('b'))]), /Trop de fichiers JSON.*40 au plus au total \(50\)/);
});

test('source introuvable parmi plusieurs', () => {
  assert.throws(() => lireSource([zipPrimitives(), join(racine, 'absent.zip')]), /Source introuvable : « .*absent\.zip »/);
});
