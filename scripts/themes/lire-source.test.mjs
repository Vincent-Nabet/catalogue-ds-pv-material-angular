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
