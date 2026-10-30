// Étape 2 : thème Angular Material (`_themes-<nom>.scss`) qui branche les `--mat-sys-*` sur les
// variables CSS de l'étape 1.
//
// `mat.theme()` exige une palette pour générer ses variables ; ses valeurs sont presque toutes
// remplacées par la table de surcharges passée en second argument. La table est construite à partir
// des variables que la version installée de Material émet réellement (compilation d'un thème
// témoin) : une variable sans source est listée dans le rapport au lieu d'être oubliée.
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as sass from 'sass';
import { OPACITES_ETAT, variableOpacite } from './correspondance.mjs';

const MATERIAL = fileURLToPath(new URL('../../node_modules/@angular/material', import.meta.url));
const NODE_MODULES = fileURLToPath(new URL('../../node_modules', import.meta.url));

export const PALETTE_REPLI_DEFAUT = 'chartreuse';

/** Variables Material sans équivalent dans les tokens, laissées à la palette de repli. */
const REPLI_ATTENDU = /^(neutral-variant20|level[0-5])$/;

const COINS = { top: (v) => `${v} ${v} 0 0`, start: (v) => `${v} 0 0 ${v}`, end: (v) => `0 ${v} ${v} 0` };
const STYLE_TYPO = /^((?:display|headline|title|body|label)-(?:large|medium|small))(?:-(font|weight|size|tracking|line-height|weight-prominent))?$/;
const ETAT = /^(hover|focus|pressed|dragged)-state-layer-opacity$/;

/** Palettes Material prédéfinies (`mat.$<nom>-palette`), lues dans les sources installées. */
export function palettesMaterial() {
  const source = readFileSync(join(MATERIAL, 'core/theming/_palettes.scss'), 'utf8');
  return [...source.matchAll(/^\$([a-z-]+)-palette:/gm)].map((m) => m[1]);
}

export function validerPaletteRepli(palette) {
  const palettes = palettesMaterial();
  if (!palettes.includes(palette)) {
    throw new Error(`Palette de repli « ${palette} » inconnue. Valeurs possibles : ${palettes.join(', ')}.`);
  }
  return palette;
}

/** Compile du SCSS avec Angular Material ; `dossier` s'ajoute aux chemins de résolution. */
function compiler(scss, dossier) {
  return sass.compileString(scss, { loadPaths: [...(dossier ? [dossier] : []), NODE_MODULES], quietDeps: true }).css;
}

/** `--mat-sys-*` émises par la version installée de Material avec une palette de repli. */
function variablesMaterial(palette) {
  const css = compiler(`@use '@angular/material' as mat;
html { @include mat.theme((color: (primary: mat.$${palette}-palette, theme-type: color-scheme), typography: Poppins, density: 0)); }`);
  return [...new Set([...css.matchAll(/--mat-sys-([\w-]+):/g)].map((m) => m[1]))];
}

/**
 * Source (valeur CSS) d'une variable Material, ou `null` si les tokens n'en fournissent pas.
 * `variables` : variables CSS de l'étape 1 ; `nom` : paramètre de nommage.
 */
function sourceDe(nomMat, variables, nom) {
  const a = (variable) => (variables.has(variable) ? `var(${variable})` : null);

  if (nomMat === 'neutral10') return a(`--${nom}-color-neutral-900`);
  const couleur = a(`--md-sys-color-${nomMat}`);
  if (couleur) return couleur;

  const typo = STYLE_TYPO.exec(nomMat);
  if (typo) {
    const [, style, propriete] = typo;
    if (propriete) return a(`--md-sys-typescale-${style}-${propriete}`);
    const [poids, taille, hauteur, police] = ['weight', 'size', 'line-height', 'font'].map((p) => a(`--md-sys-typescale-${style}-${p}`));
    return poids && taille && hauteur && police ? `${poids} ${taille} / ${hauteur} ${police}` : null;
  }

  const coin = /^corner-(.+?)(?:-(top|start|end))?$/.exec(nomMat);
  if (coin) {
    const rayon = a(`--md-sys-shape-corner-${coin[1]}`);
    return rayon && coin[2] ? COINS[coin[2]](rayon) : rayon;
  }

  const etat = ETAT.exec(nomMat);
  if (etat && etat[1] in OPACITES_ETAT) return a(variableOpacite(etat[1]));
  return null;
}

/**
 * Génère `_themes-<nom>.scss`.
 * Retourne `{ fichiers, surcharges: Map nom Material → valeur, rapport: { surcharges, repliAttendu, repliInattendu } }`.
 */
export function genererMaterial({ nom, variables, paletteRepli = PALETTE_REPLI_DEFAUT }) {
  validerPaletteRepli(paletteRepli);
  const surcharges = new Map();
  const repliAttendu = [];
  const repliInattendu = [];
  for (const nomMat of variablesMaterial(paletteRepli)) {
    const valeur = sourceDe(nomMat, variables, nom);
    if (valeur) surcharges.set(nomMat, valeur);
    else (REPLI_ATTENDU.test(nomMat) ? repliAttendu : repliInattendu).push(`--mat-sys-${nomMat}`);
  }

  const police = [['plain-family', '--md-ref-typeface-plain'], ['brand-family', '--md-ref-typeface-brand'],
    ['bold-weight', '--md-ref-typeface-weight-bold'], ['medium-weight', '--md-ref-typeface-weight-medium'],
    ['regular-weight', '--md-ref-typeface-weight-regular']].filter(([, variable]) => variables.has(variable));
  if (!police.some(([cle]) => cle === 'plain-family')) {
    throw new Error('Variable --md-ref-typeface-plain absente : la typographie Material ne peut pas être branchée.');
  }

  const scss = `@use '@angular/material' as mat;

/// Thème Angular Material branché sur les variables CSS de \`index.css\` (--md-sys-*, --md-ref-*).
/// Les valeurs de la palette de repli (${paletteRepli}) ne subsistent que pour les variables sans source dans les tokens.
///
/// Usage : charger \`index.css\`, puis \`html { @include themes-${nom}.theme(); }\`
/// (clair/sombre : \`color-scheme\` ; contraste : classes \`theme-${nom}-*\`).
///
/// @param {Number} $densite [0] Échelle de densité Material (0 à -5).
@mixin theme($densite: 0) {
  @include mat.theme(
    (
      color: (
        primary: mat.$${paletteRepli}-palette,
        theme-type: color-scheme,
      ),
      typography: (
${police.map(([cle, variable]) => `        ${cle}: var(${variable}),\n`).join('')}      ),
      density: $densite,
    ),
    (
${[...surcharges].map(([cle, valeur]) => `      ${cle}: ${valeur},\n`).join('')}    )
  );
}
`;
  return {
    fichiers: new Map([[`_themes-${nom}.scss`, scss]]),
    surcharges,
    rapport: { surcharges: surcharges.size, repliAttendu, repliInattendu },
  };
}

/**
 * Compile une feuille témoin qui inclut le mixin et contrôle chaque surcharge : la valeur finale
 * de la variable Material doit être celle attendue (aucune valeur littérale de la palette de repli).
 * Retourne `{ css, ecarts }` ; `densite` permet de tester d'autres échelles.
 */
export function controlerMaterial({ nom, scss, surcharges, densite = 0 }) {
  const dossier = mkdtempSync(join(tmpdir(), 'themes-temoin-'));
  try {
    writeFileSync(join(dossier, `_themes-${nom}.scss`), scss);
    const css = compiler(`@use 'themes-${nom}';\nhtml { @include themes-${nom}.theme(${densite}); }\n`, dossier);
    const sansEspaces = (texte) => texte.replace(/\s+/g, '');
    const ecarts = [];
    for (const [nomMat, attendu] of surcharges) {
      const finales = [...css.matchAll(new RegExp(`--mat-sys-${nomMat}:([^;]+);`, 'g'))].map((m) => m[1]);
      if (finales.length === 0 || sansEspaces(finales.at(-1)) !== sansEspaces(attendu)) {
        ecarts.push(`--mat-sys-${nomMat} : « ${finales.at(-1)?.trim() ?? 'absente'} » au lieu de « ${attendu} »`);
      }
    }
    return { css, ecarts };
  } finally {
    rmSync(dossier, { recursive: true, force: true });
  }
}
