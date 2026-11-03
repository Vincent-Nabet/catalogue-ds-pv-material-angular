import assert from 'node:assert/strict';
import { test } from 'node:test';
import { strToU8, zipSync } from 'fflate';
import { assembler, lireZipOctets, NOMBRE_MAX_JSON, TAILLE_MAX_JSON } from './lire-source-memoire.mjs';
import { zipDe } from './fixtures-tokens.mjs';

const contenus = {
  'primitives.tokens.json': JSON.stringify({ Radius: { None: { $type: 'dimension', $value: '0px' } } }),
  'semantics/light.tokens.json': JSON.stringify({ Colors: { Schemes: { Primary: { $type: 'color', $value: '#86A315' } } } }),
  'semantics/dark.tokens.json': JSON.stringify({ Colors: { Schemes: { Primary: { $type: 'color', $value: '#BDCE80' } } } }),
};
const lire = (octets) => assembler(lireZipOctets(octets, 'essai.zip'), 'essai.zip');

test('zip à la racine et zip avec un sous-dossier : même résultat', () => {
  const racine = lire(zipDe(contenus));
  const dossier = lire(zipDe(contenus, 'tokens/'));
  assert.deepEqual(Object.keys(racine.semantiques).sort(), ['dark', 'light']);
  assert.deepEqual(dossier, racine);
  assert.equal(racine.origine, 'essai.zip');
});

test('__MACOSX et ._* sont ignorés', () => {
  const source = lire(
    zipDe({ ...contenus, '__MACOSX/._primitives.tokens.json': 'binaire', '__MACOSX/semantics/._light.tokens.json': 'binaire', 'semantics/._dark.tokens.json': 'binaire' }),
  );
  assert.deepEqual(Object.keys(source.semantiques).sort(), ['dark', 'light']);
});

test('seuls les .json sont lus', () => {
  const fichiers = lireZipOctets(zipDe({ ...contenus, 'LISEZMOI.txt': 'texte' }), 'essai.zip');
  assert.deepEqual([...fichiers.keys()].sort(), Object.keys(contenus).sort());
});

test('zip illisible', () => {
  assert.throws(() => lireZipOctets(strToU8("ceci n'est pas un zip"), 'faux.zip'), /Archive illisible : « faux\.zip »/);
});

test('primitives absentes, sémantiques absentes, JSON invalide, JSON qui n\'est pas un objet', () => {
  const { 'primitives.tokens.json': _, ...sansPrimitives } = contenus;
  assert.throws(() => lire(zipDe(sansPrimitives)), /primitives\.tokens\.json » introuvable/);
  assert.throws(() => lire(zipDe({ 'primitives.tokens.json': contenus['primitives.tokens.json'] })), /Aucun fichier « semantics/);
  assert.throws(() => lire(zipDe({ ...contenus, 'semantics/dark.tokens.json': '{ pas du json' })), /JSON invalide dans « semantics\/dark\.tokens\.json »/);
  assert.throws(() => lire(zipDe({ ...contenus, 'semantics/dark.tokens.json': '[]' })), /« semantics\/dark\.tokens\.json » doit contenir un objet JSON/);
  assert.throws(() => lire(zipDe({ ...contenus, 'semantics/dark.tokens.json': 'null' })), /doit contenir un objet JSON/);
});

test('arborescence trop profonde', () => {
  assert.throws(() => lire(zipDe(contenus, 'a/b/')), /trop profonde/);
});

test('fichier JSON de plus de 5 Mo décompressé : refusé, avant décompression', () => {
  const gros = `{"a":"${'x'.repeat(TAILLE_MAX_JSON + 10)}"}`;
  const zip = zipDe({ ...contenus, 'semantics/gros.tokens.json': gros });
  assert.ok(zip.length < 100_000, 'le zip est petit : seule la taille décompressée compte');
  assert.throws(() => lireZipOctets(zip, 'gros.zip'), /semantics\/gros\.tokens\.json » dépasse 5 Mo/);
});

test(`plus de ${NOMBRE_MAX_JSON} fichiers JSON : refusé ; ${NOMBRE_MAX_JSON} passent`, () => {
  const supplementaires = (n) => Object.fromEntries(Array.from({ length: n }, (_, i) => [`semantics/extra-${i}.tokens.json`, '{}']));
  const trois = Object.keys(contenus).length;
  assert.doesNotThrow(() => lireZipOctets(zipDe({ ...contenus, ...supplementaires(NOMBRE_MAX_JSON - trois) }), 'ok.zip'));
  assert.throws(() => lireZipOctets(zipDe({ ...contenus, ...supplementaires(NOMBRE_MAX_JSON - trois + 1) }), 'trop.zip'), /Trop de fichiers JSON dans « trop\.zip » : 40 au plus/);
});

test('zipSync direct : les entrées avec antislash sont normalisées', () => {
  const octets = zipSync({ 'semantics\\light.tokens.json': strToU8('{}') });
  assert.deepEqual([...lireZipOctets(octets, 'x.zip').keys()], ['semantics/light.tokens.json']);
});
