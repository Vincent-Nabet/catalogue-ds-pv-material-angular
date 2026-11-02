// Banc d'essai de robustesse de scripts/themes : crée des variantes de `tokens/` (copie, jamais modifié)
// dans testing/variantes/<cas>/ puis lance le générateur sur chacune (sortie dans un dossier temporaire).
//   node testing/run-variantes.mjs
import { cpSync, mkdtempSync, readdirSync, renameSync, rmSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const racine = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const base = join(racine, 'tokens');
const variantes = join(racine, 'testing/variantes');
rmSync(variantes, { recursive: true, force: true });

const cas = {
  'ref-identique': () => {},
  'sans-monochrome': (d) => { rmSync(join(d, 'semantics/monochrome-lt.tokens.json')); rmSync(join(d, 'semantics/monochrome-dt.tokens.json')); },
  'sans-contraste-eleve': (d) => { rmSync(join(d, 'semantics/light-high-contrast.tokens.json')); rmSync(join(d, 'semantics/dark-high-contrast.tokens.json')); },
  'clair-sombre-seulement': (d) => { for (const f of readdirSync(join(d, 'semantics'))) if (!['light.tokens.json', 'dark.tokens.json'].includes(f)) rmSync(join(d, 'semantics', f)); },
  'sans-mode-sombre': (d) => rmSync(join(d, 'semantics/dark.tokens.json')),
  'noms-renommes': (d) => { for (const f of readdirSync(join(d, 'semantics'))) renameSync(join(d, 'semantics', f), join(d, 'semantics', 'theme-' + f.replace('monochrome-lt', 'mono-clair').replace('monochrome-dt', 'mono-sombre'))); },
  'mode-supplementaire': (d) => cpSync(join(d, 'semantics/light.tokens.json'), join(d, 'semantics/brand-extra.tokens.json')),
  'sans-semantics': (d) => rmSync(join(d, 'semantics'), { recursive: true }),
  'sans-primitives': (d) => rmSync(join(d, 'primitives.tokens.json')),
  'json-invalide': (d) => writeFileSync(join(d, 'semantics/light.tokens.json'), '{ pas du json'),
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
  } catch (e) {
    res = 'ÉCHEC ' + (e.stderr || e.message).trim().split('\n').slice(0, 2).join(' / ');
  }
  console.log(`${nom.padEnd(24)} ${res}`);
}
rmSync(sortie, { recursive: true, force: true });
