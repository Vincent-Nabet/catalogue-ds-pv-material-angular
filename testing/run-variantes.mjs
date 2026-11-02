// Banc d'essai de robustesse de scripts/themes : crée des variantes de `tokens/` (copie, jamais modifié)
// dans testing/variantes/<cas>/ puis lance le générateur sur chacune (sortie dans un dossier temporaire).
//   node testing/run-variantes.mjs
import { cpSync, mkdtempSync, readdirSync, readFileSync, renameSync, rmSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
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
rmSync(sortie, { recursive: true, force: true });
