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
  assert.deepEqual(depuisDossier.ecriture.ecrits.sort(), ['_themes-app.scss', 'app.css', 'index.css', 'md3/couleurs.css', 'md3/ref.css', 'md3/sys.css']);
  const depuisZip = generer({ source: zipDeTokens(), sortie: join(temp, 'zip') });
  assert.deepEqual(corps(join(temp, 'zip')), corps(join(temp, 'dossier')));
  assert.deepEqual(depuisZip.variables.inconnus, []);

  const seconde = generer({ source: tokens, sortie: join(temp, 'dossier') });
  assert.deepEqual(seconde.ecriture.ecrits, []);
  assert.equal(seconde.ecriture.inchanges.length, 6);
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
  assert.match(sortie, /Fichiers : 6 écrit\(s\)/);
  assert.throws(
    () => execFileSync(process.execPath, [script, '--nom', 'MD'], { encoding: 'utf8', stdio: 'pipe' }),
    (erreur) => erreur.status === 1 && /Erreur : Nom « MD » invalide/.test(erreur.stderr),
  );
  assert.match(execFileSync(process.execPath, [script, '--help'], { encoding: 'utf8' }), /--palette-repli/);
});
