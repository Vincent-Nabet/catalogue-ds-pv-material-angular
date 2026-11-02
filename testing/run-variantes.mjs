// Banc d'essai de robustesse de scripts/themes : crée des variantes de `tokens/` (copie, jamais modifié)
// dans testing/variantes/<cas>/ puis lance le générateur sur chacune (sortie dans un dossier temporaire).
//   node testing/run-variantes.mjs
import { cpSync, mkdtempSync, readdirSync, readFileSync, renameSync, rmSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { zipSync } from 'fflate';
import { fileURLToPath } from 'node:url';

const racine = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const base = join(racine, 'tokens');
const variantes = join(racine, 'testing/variantes');
rmSync(variantes, { recursive: true, force: true });

/** Modifie un fichier sémantique JSON puis le réécrit. */
const modifierJson = (fichier, fn) => {
  const json = JSON.parse(readFileSync(fichier, 'utf8'));
  fn(json);
  writeFileSync(fichier, JSON.stringify(json, null, 2));
};

/** Ajoute une famille « Info » (4 rôles) dans les 8 modes, en réutilisant les valeurs de « Success ». */
const ajouterFamilleInfo = (d) => {
  for (const f of readdirSync(join(d, 'semantics'))) {
    modifierJson(join(d, 'semantics', f), (j) => {
      const s = j.Colors.Schemes;
      for (const [src, cible] of [['Success', 'Info'], ['On Success', 'On Info'], ['Success Container', 'Info Container'], ['On Success Container', 'On Info Container']]) {
        s[cible] = structuredClone(s[src]);
      }
    });
  }
};

const lireSortie = (dossier) => ['essai.css', 'md3/couleurs.css'].map((f) => readFileSync(join(dossier, f), 'utf8')).join('\n');

const cas = {
  'ref-identique': () => {},
  'sans-monochrome': (d) => { rmSync(join(d, 'semantics/monochrome-lt.tokens.json')); rmSync(join(d, 'semantics/monochrome-dt.tokens.json')); },
  'sans-contraste-eleve': (d) => { rmSync(join(d, 'semantics/light-high-contrast.tokens.json')); rmSync(join(d, 'semantics/dark-high-contrast.tokens.json')); },
  'clair-sombre-seulement': (d) => { for (const f of readdirSync(join(d, 'semantics'))) if (!['light.tokens.json', 'dark.tokens.json'].includes(f)) rmSync(join(d, 'semantics', f)); },
  'sans-mode-sombre': (d) => rmSync(join(d, 'semantics/dark.tokens.json')),
  'noms-renommes': (d) => { for (const f of readdirSync(join(d, 'semantics'))) renameSync(join(d, 'semantics', f), join(d, 'semantics', 'theme-' + f.replace('monochrome-lt', 'mono-clair').replace('monochrome-dt', 'mono-sombre'))); },
  'noms-francais-une-paire': (d) => { for (const f of readdirSync(join(d, 'semantics'))) if (!['light.tokens.json', 'dark.tokens.json'].includes(f)) rmSync(join(d, 'semantics', f)); renameSync(join(d, 'semantics/light.tokens.json'), join(d, 'semantics/marque-clair.tokens.json')); renameSync(join(d, 'semantics/dark.tokens.json'), join(d, 'semantics/marque-sombre.tokens.json')); },
  'abreviations-mc-hc': (d) => { for (const [a, b] of [['light-medium-contrast', 'light-mc'], ['dark-medium-contrast', 'dark-mc'], ['light-high-contrast', 'light-hc'], ['dark-high-contrast', 'dark-hc']]) renameSync(join(d, `semantics/${a}.tokens.json`), join(d, `semantics/${b}.tokens.json`)); },
  'famille-sepia-ajoutee': (d) => { for (const [src, cible] of [['light', 'sepia-light'], ['dark', 'sepia-dark']]) cpSync(join(d, `semantics/${src}.tokens.json`), join(d, `semantics/${cible}.tokens.json`)); },
  'mode-supplementaire': (d) => cpSync(join(d, 'semantics/light.tokens.json'), join(d, 'semantics/brand-extra.tokens.json')),
  'sans-semantics': (d) => rmSync(join(d, 'semantics'), { recursive: true }),
  'sans-primitives': (d) => rmSync(join(d, 'primitives.tokens.json')),
  'nouvelle-famille-info': ajouterFamilleInfo,
  'token-absent-du-sombre': (d) => modifierJson(join(d, 'semantics/dark.tokens.json'), (j) => delete j.Colors.Schemes['Success']),
  'json-invalide': (d) => writeFileSync(join(d, 'semantics/light.tokens.json'), '{ pas du json'),
};

// Contrôles de la sortie générée, pour les cas qui doivent réussir.
const controles = {
  'noms-francais-une-paire': (css) => (/:root, \.theme-essai \{/.test(css) && !/theme-essai-/.test(css) ? 'une seule famille, classe .theme-essai' : 'sortie inattendue'),
  'abreviations-mc-hc': (css) => (/\.theme-essai-contraste-moyen \{/.test(css) && /\.theme-essai-contraste-eleve \{/.test(css) ? 'classes contraste-moyen / contraste-eleve' : 'sortie inattendue'),
  'famille-sepia-ajoutee': (css) => (/\.theme-essai-sepia \{/.test(css) ? 'classe .theme-essai-sepia générée' : 'famille sepia NON générée'),
  'nouvelle-famille-info': (css) => (/--essai-color-info:/.test(css) && /--essai-color-on-info-container:/.test(css) ? 'famille --essai-color-info générée' : 'famille Info NON générée'),
};

const sortie = mkdtempSync(join(tmpdir(), 'themes-'));
for (const [nom, modifier] of Object.entries(cas)) {
  const d = join(variantes, nom);
  mkdirSync(variantes, { recursive: true });
  cpSync(base, d, { recursive: true });
  modifier(d);
  let res;
  try {
    res = 'OK  ' + execFileSync('node', ['scripts/themes/generer-themes.mjs', '--source', d, '--nom', 'essai', '--sortie', join(sortie, nom)], { cwd: racine, encoding: 'utf8', stdio: 'pipe' }).split('\n').filter((l) => /Source|Avertissement/.test(l)).join(' | ');
    if (controles[nom]) res += ' | ' + controles[nom](lireSortie(join(sortie, nom)));
  } catch (e) {
    res = 'ÉCHEC ' + (e.stderr || e.message).trim().split('\n').slice(0, 2).join(' / ');
  }
  console.log(`${nom.padEnd(24)} ${res}`);
}

// ───────────────────────── Zips et options du CLI ─────────────────────────
// Chaque cas : [nom, arguments CLI, attendu] avec attendu = 'OK' ou une RegExp du message d'erreur (code 1).
const zips = join(racine, 'testing/zips');
rmSync(zips, { recursive: true, force: true });
mkdirSync(zips, { recursive: true });
const jsons = () => Object.fromEntries([
  ['primitives.tokens.json', readFileSync(join(base, 'primitives.tokens.json'))],
  ...readdirSync(join(base, 'semantics')).map((f) => [`semantics/${f}`, readFileSync(join(base, 'semantics', f))]),
]);
const prefixer = (fichiers, prefixe) => Object.fromEntries(Object.entries(fichiers).map(([c, v]) => [prefixe + c, v]));
const ecrireZip = (nom, fichiers) => { const f = join(zips, `${nom}.zip`); writeFileSync(f, zipSync(fichiers)); return f; };
const octets = (texte) => new TextEncoder().encode(texte);

const zipRacine = ecrireZip('racine', jsons());
const zipSousDossier = ecrireZip('sous-dossier', prefixer(jsons(), 'tokens/'));
const zipDeuxNiveaux = ecrireZip('deux-niveaux', prefixer(jsons(), 'a/b/'));
const zipMacosx = ecrireZip('macosx', { ...jsons(), '__MACOSX/._primitives.tokens.json': octets('x'), '__MACOSX/semantics/._light.tokens.json': octets('x'), 'semantics/._dark.tokens.json': octets('x') });
const zipBomCrlf = ecrireZip('bom-crlf', Object.fromEntries(Object.entries(jsons()).map(([c, v]) => [c, octets('\uFEFF' + new TextDecoder().decode(v).replaceAll('\r\n', '\n').replaceAll('\n', '\r\n'))])));
const zipCorrompu = join(zips, 'corrompu.zip');
writeFileSync(zipCorrompu, 'ceci n\'est pas une archive');
const zipSansPrimitives = ecrireZip('sans-primitives', Object.fromEntries(Object.entries(jsons()).filter(([c]) => c.startsWith('semantics/'))));

// Dossiers avec fichiers parasites ou noms en majuscules.
const parasites = join(variantes, 'fichiers-parasites');
cpSync(base, parasites, { recursive: true });
writeFileSync(join(parasites, 'semantics/notes.md'), '# notes');
writeFileSync(join(parasites, 'semantics/brouillon.json'), '{}');
mkdirSync(join(parasites, 'semantics/archive'));
cpSync(join(base, 'semantics/light.tokens.json'), join(parasites, 'semantics/archive/light.tokens.json'));
const majuscules = join(variantes, 'noms-majuscules');
cpSync(base, majuscules, { recursive: true });
for (const f of readdirSync(join(majuscules, 'semantics'))) if (!['light.tokens.json', 'dark.tokens.json'].includes(f)) rmSync(join(majuscules, 'semantics', f));
renameSync(join(majuscules, 'semantics/light.tokens.json'), join(majuscules, 'semantics/Light.tokens.json'));
renameSync(join(majuscules, 'semantics/dark.tokens.json'), join(majuscules, 'semantics/DARK.tokens.json'));

const etranger = join(sortie, 'dossier-etranger');
mkdirSync(etranger);
writeFileSync(join(etranger, 'perso.txt'), 'important');

const lancer = (args) => spawnSync('node', ['scripts/themes/generer-themes.mjs', ...args], { cwd: racine, encoding: 'utf8' });
const sortieDe = (n) => join(sortie, n);
const lancerCas = [
  ['zip-racine', ['--source', zipRacine, '--nom', 'essai', '--sortie', sortieDe('zip-racine')], 'OK'],
  ['zip-sous-dossier', ['--source', zipSousDossier, '--nom', 'essai', '--sortie', sortieDe('zip-sous-dossier')], 'OK'],
  ['zip-deux-niveaux', ['--source', zipDeuxNiveaux, '--sortie', sortieDe('zip-deux-niveaux')], /trop profonde/],
  ['zip-macosx-et-._', ['--source', zipMacosx, '--nom', 'essai', '--sortie', sortieDe('zip-macosx')], 'OK'],
  ['zip-bom-crlf', ['--source', zipBomCrlf, '--nom', 'essai', '--sortie', sortieDe('zip-bom')], 'OK'],
  ['zip-corrompu', ['--source', zipCorrompu, '--sortie', sortieDe('zip-corrompu')], /Archive illisible/],
  ['zip-sans-primitives', ['--source', zipSansPrimitives, '--sortie', sortieDe('zip-sp')], /introuvable/],
  ['dossier-fichiers-parasites', ['--source', parasites, '--nom', 'essai', '--sortie', sortieDe('parasites')], 'OK'],
  ['dossier-noms-majuscules', ['--source', majuscules, '--nom', 'essai', '--sortie', sortieDe('majuscules')], 'OK'],
  ['source-inexistante', ['--source', join(racine, 'testing/nexiste-pas'), '--sortie', sortieDe('x')], /introuvable/],
  ...['md', 'mat', 'Pv', '1pv', 'a-b', ''].map((n) => [`nom-invalide « ${n} »`, ['--source', base, '--nom', n, '--sortie', sortieDe('nom-invalide')], /nom|Nom/]),
  ['nom-valide pv2', ['--source', base, '--nom', 'pv2', '--sortie', sortieDe('pv2')], 'OK'],
  ['palette-repli inconnue', ['--source', base, '--nom', 'essai', '--palette-repli', 'nexistepas', '--sortie', sortieDe('p1')], /inconnue/],
  ['palette-repli azure', ['--source', base, '--nom', 'essai', '--palette-repli', 'azure', '--sortie', sortieDe('p2')], 'OK'],
  ['sortie = dossier étranger', ['--source', base, '--nom', 'essai', '--sortie', etranger], /aucun fichier généré/],
  ['--palettes', ['--source', base, '--nom', 'essai', '--palettes', '--sortie', sortieDe('palettes')], 'OK'],
  ['theme a', ['--source', base, '--nom', 'a', '--sortie', sortieDe('a')], 'OK'],
  ['theme b', ['--source', base, '--nom', 'b', '--sortie', sortieDe('b')], 'OK'],
];

let echecs = 0;
const verdict = (nom, ok, detail) => { if (!ok) echecs++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${nom.padEnd(28)} ${detail}`); };
console.log('\n── zips et options (attendu → obtenu) ──');
for (const [nom, args, attendu] of lancerCas) {
  const r = lancer(args);
  const message = (r.stderr || '').trim().split('\n')[0];
  if (attendu === 'OK') verdict(nom, r.status === 0, r.status === 0 ? 'OK' : message);
  else verdict(nom, r.status === 1 && attendu.test(message), `échec attendu : ${message.slice(0, 90)}`);
}

// Contrôles sur les sorties produites.
const lire = (dossier, f) => readFileSync(join(dossier, f), 'utf8');
const sansEntete = (t) => t.split('\n').slice(3).join('\n');
const fichiersDe = ['index.css', 'md3/ref.css', 'md3/sys.css', 'md3/couleurs.css', 'essai.css', '_themes-essai.scss'];
const dossierRef = sortieDe('ref-dossier');
lancer(['--source', base, '--nom', 'essai', '--sortie', dossierRef]);
for (const [nom, d] of [['zip-racine', 'zip-racine'], ['zip-sous-dossier', 'zip-sous-dossier'], ['zip-macosx', 'zip-macosx'], ['zip-bom-crlf', 'zip-bom']]) {
  verdict(`sortie ${nom} = dossier`, fichiersDe.every((f) => sansEntete(lire(sortieDe(d), f)) === sansEntete(lire(dossierRef, f))), 'contenu identique hors en-tête');
}
verdict('fichiers parasites ignorés', lire(sortieDe('parasites'), 'essai.css') === lire(dossierRef, 'essai.css') || sansEntete(lire(sortieDe('parasites'), 'essai.css')) === sansEntete(lire(dossierRef, 'essai.css')), 'même sortie que la référence');
verdict('majuscules → 1 famille', !/theme-essai-/.test(lire(sortieDe('majuscules'), 'md3/couleurs.css')), 'classe .theme-essai seule');
verdict('dossier étranger intact', readFileSync(join(etranger, 'perso.txt'), 'utf8') === 'important' && readdirSync(etranger).length === 1, 'perso.txt seul, inchangé');
verdict('--palettes expose les primitives', /--essai-ref-olive-012:/.test(lire(sortieDe('palettes'), 'md3/ref.css')), '--essai-ref-olive-012');
verdict('palette-repli azure dans le scss', /mat\.\$azure-palette/.test(lire(sortieDe('p2'), '_themes-essai.scss')), 'mat.$azure-palette');
const passe2 = lancer(['--source', base, '--nom', 'essai', '--sortie', dossierRef]);
verdict('2e passe idempotente', /0 écrit\(s\), 6 inchangé\(s\)/.test(passe2.stdout), '0 écrit, 6 inchangés');
const tout = (n) => fichiersDe.concat([]).map((f) => f.replace('essai', n)).map((f) => lire(sortieDe(n), f)).join('\n');
verdict('thèmes a et b sans collision', !/-b-|theme-b|--b-/.test(tout('a')) && !/theme-a\b|--a-/.test(tout('b')) && /\.theme-a-contraste-moyen/.test(tout('a')) && /\.theme-b-contraste-moyen/.test(tout('b')), 'préfixes disjoints');
console.log(echecs === 0 ? '\nTout est conforme.' : `\n${echecs} écart(s) par rapport à l'attendu.`);
process.exitCode = echecs === 0 ? 0 : 1;

rmSync(sortie, { recursive: true, force: true });
