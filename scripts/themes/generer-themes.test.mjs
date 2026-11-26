import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { zipSync, strToU8 } from 'fflate';
import { formaterRapport, generer } from './generer-themes.mjs';

const tokens = fileURLToPath(new URL('../../tokens', import.meta.url));
const script = fileURLToPath(new URL('./generer-themes.mjs', import.meta.url));
const temp = mkdtempSync(join(tmpdir(), 'themes-generer-'));
after(() => rmSync(temp, { recursive: true, force: true }));

const lister = (dossier, prefixe = '') =>
  readdirSync(dossier, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? lister(join(dossier, e.name), `${prefixe}${e.name}/`) : [`${prefixe}${e.name}`],
  );
/** Contenu sans l'en-tête (qui porte le nom de la source et la date). */
const corps = (dossier) =>
  Object.fromEntries(lister(dossier).map((f) => [f, readFileSync(join(dossier, f), 'utf8').replace(/^\/\*[^]*?\*\/\n\n/, '')]));

function zipDeTokens() {
  const fichiers = { 'primitives.tokens.json': readFileSync(join(tokens, 'primitives.tokens.json')) };
  for (const f of readdirSync(join(tokens, 'semantics'))) fichiers[`tokens/semantics/${f}`] = readFileSync(join(tokens, 'semantics', f));
  fichiers['tokens/primitives.tokens.json'] = fichiers['primitives.tokens.json'];
  delete fichiers['primitives.tokens.json'];
  const chemin = join(temp, 'tokens.zip');
  writeFileSync(chemin, zipSync(Object.fromEntries(Object.entries(fichiers).map(([c, b]) => [c, new Uint8Array(b)]))));
  return chemin;
}

test('dossier et zip donnent des sorties identiques ; seconde exécution : aucun fichier modifié', () => {
  const depuisDossier = generer({ source: tokens, sortie: join(temp, 'dossier') });
  assert.deepEqual(depuisDossier.ecriture.ecrits.sort(), ['_themes-app.scss', 'app.css', 'familles.ts', 'index.css', 'md3/couleurs.css', 'md3/ref.css', 'md3/sys.css']);
  const depuisZip = generer({ source: zipDeTokens(), sortie: join(temp, 'zip') });
  assert.deepEqual(corps(join(temp, 'zip')), corps(join(temp, 'dossier')));
  assert.deepEqual(depuisZip.variables.inconnus, []);

  const seconde = generer({ source: tokens, sortie: join(temp, 'dossier') });
  assert.deepEqual(seconde.ecriture.ecrits, []);
  assert.equal(seconde.ecriture.inchanges.length, 7);
});

test('--nom pv : dossier, fichiers et contenu sans « app »', () => {
  generer({ source: tokens, nom: 'pv', sortie: join(temp, 'pv'), palettes: true, paletteRepli: 'azure' });
  const fichiers = corps(join(temp, 'pv'));
  assert.ok('pv.css' in fichiers && '_themes-pv.scss' in fichiers && !('app.css' in fichiers));
  for (const [f, c] of Object.entries(fichiers)) assert.doesNotMatch(c, /\bapp\b|-app-/, f);
  assert.match(fichiers['_themes-pv.scss'], /mat\.\$azure-palette/);
});

test('rapport : comptes et section Material', () => {
  const texte = formaterRapport(generer({ source: tokens, sortie: join(temp, 'rapport') }));
  assert.match(texte, /MD3 : 142/);
  assert.match(texte, /custom : 41/);
  assert.match(texte, /147 : alias de couleur sans opacité/);
  assert.match(texte, /non reconnus : 0/);
  assert.match(texte, /branchées sur les tokens : 158/);
  assert.doesNotMatch(texte, /Avertissement/);
});

test('erreurs : nom invalide, palette inconnue, source absente', () => {
  assert.throws(() => generer({ source: tokens, nom: 'Pv', sortie: join(temp, 'x') }), /invalide/);
  assert.throws(() => generer({ source: tokens, paletteRepli: 'fuchsia', sortie: join(temp, 'x') }), /inconnue/);
  assert.throws(() => generer({ source: join(temp, 'absent'), sortie: join(temp, 'x') }), /Source introuvable/);
});

test('un token non reconnu est signalé dans le rapport, jamais ignoré en silence', () => {
  const copie = join(temp, 'copie.zip');
  const entrees = {};
  entrees['primitives.tokens.json'] = new Uint8Array(readFileSync(join(tokens, 'primitives.tokens.json')));
  for (const f of readdirSync(join(tokens, 'semantics'))) {
    const json = JSON.parse(readFileSync(join(tokens, 'semantics', f), 'utf8'));
    json.Colors.Schemes['Nouveau Role'] = { $type: 'color', $value: '#123456' };
    entrees[`semantics/${f}`] = strToU8(JSON.stringify(json));
  }
  writeFileSync(copie, zipSync(entrees));
  const texte = formaterRapport(generer({ source: copie, sortie: join(temp, 'sortie-modifiee') }));
  assert.match(texte, /non reconnus : 1/);
  assert.match(texte, /Avertissement : token non reconnu, non écrit : Colors\.Schemes\.Nouveau Role/);
});

test('CLI : code de sortie 0 avec rapport, 1 avec message d\'erreur', () => {
  const sortie = execFileSync(process.execPath, [script, '--sortie', join(temp, 'cli')], { encoding: 'utf8' });
  assert.match(sortie, /Fichiers : 7 écrit\(s\)/);
  assert.throws(
    () => execFileSync(process.execPath, [script, '--nom', 'MD'], { encoding: 'utf8', stdio: 'pipe' }),
    (erreur) => erreur.status === 1 && /Erreur : Nom « MD » invalide/.test(erreur.stderr),
  );
  assert.match(execFileSync(process.execPath, [script, '--help'], { encoding: 'utf8' }), /--palette-repli/);
});

// --- Export natif de Figma : bout en bout --------------------------------------------------------------------
import { unzipSync } from 'fflate';
import { zipsNatifs } from './fixtures-natif.mjs';

function ecrireZipsNatifs() {
  const { primitives, semantiques } = zipsNatifs();
  const chemins = [join(temp, 'Primitives.zip'), join(temp, 'Semantics.zip')];
  writeFileSync(chemins[0], primitives);
  writeFileSync(chemins[1], semantiques);
  return chemins;
}

test('natif : deux --source donnent les mêmes fichiers que tokens/ (app.css : ordre des rôles seul), l\'en-tête nomme les deux archives', () => {
  generer({ source: tokens, sortie: join(temp, 'natif-ref') });
  const [p, s] = ecrireZipsNatifs();
  const rapport = generer({ source: [p, s], sortie: join(temp, 'natif') });
  assert.equal(rapport.format, 'natif');
  assert.equal(rapport.sources, 2);
  const [attendu, obtenu] = [corps(join(temp, 'natif-ref')), corps(join(temp, 'natif'))];
  for (const fichier of Object.keys(attendu)) {
    if (fichier === 'app.css') continue;
    assert.equal(obtenu[fichier], attendu[fichier], fichier);
  }
  assert.deepEqual(obtenu['app.css'].split('\n').sort(), attendu['app.css'].split('\n').sort());
  assert.match(readFileSync(join(temp, 'natif', 'md3/ref.css'), 'utf8'), /Source : Primitives\.zip \+ Semantics\.zip/);
  // Même résultat avec les archives dans l'ordre inverse.
  generer({ source: [s, p], sortie: join(temp, 'natif-inverse') });
  assert.deepEqual(corps(join(temp, 'natif-inverse')), obtenu);
});

test('natif : rapport avec le format et les avertissements de la source ; l\'ancien format n\'ajoute rien', () => {
  const [p, s] = ecrireZipsNatifs();
  const texte = formaterRapport(generer({ source: [p, s], sortie: join(temp, 'natif-rapport') }));
  assert.match(texte, /Format : export natif Figma \(2 sources\)/);
  assert.match(texte, /branchées sur les tokens : 158/);
  assert.match(texte, /non reconnus : 0/);
  assert.doesNotMatch(texte, /Avertissement/);
  assert.doesNotMatch(formaterRapport(generer({ source: tokens, sortie: join(temp, 'ancien-rapport') })), /Format :/);

  const combine = join(temp, 'combine.zip');
  writeFileSync(combine, zipsNatifs().combine);
  const rapportCombine = formaterRapport(generer({ source: combine, sortie: join(temp, 'natif-combine') }));
  assert.match(rapportCombine, /Format : export natif Figma \(1 source\)/);

  const avecParasite = join(temp, 'parasite.zip');
  writeFileSync(avecParasite, zipSync({ ...unzipSync(zipsNatifs().combine), 'package.json': strToU8('{}') }));
  assert.match(formaterRapport(generer({ source: avecParasite, sortie: join(temp, 'natif-parasite') })), /Avertissement : Fichier JSON ignoré .*package\.json/);
});

test('natif : un seul zip incomplet → erreur, rien n\'est écrit', () => {
  const [p] = ecrireZipsNatifs();
  assert.throws(() => generer({ source: p, sortie: join(temp, 'natif-incomplet') }), /Export Figma incomplet : aucun mode sémantique/);
  assert.equal(readdirSync(temp).includes('natif-incomplet'), false);
});

test('CLI : --source répétable', () => {
  const [p, s] = ecrireZipsNatifs();
  const sortie = execFileSync(process.execPath, [script, '--source', p, '--source', s, '--sortie', join(temp, 'cli-natif')], { encoding: 'utf8' });
  assert.match(sortie, /Format : export natif Figma \(2 sources\)/);
  assert.match(sortie, /Fichiers : 7 écrit\(s\)/);
  assert.throws(
    () => execFileSync(process.execPath, [script, '--source', p, '--sortie', join(temp, 'cli-incomplet')], { encoding: 'utf8', stdio: 'pipe' }),
    (erreur) => erreur.status === 1 && /Erreur : Export Figma incomplet/.test(erreur.stderr),
  );
  assert.match(execFileSync(process.execPath, [script, '--help'], { encoding: 'utf8' }), /Primitives\.zip/);
});
