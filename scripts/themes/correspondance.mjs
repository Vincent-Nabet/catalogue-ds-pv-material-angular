// Correspondance « chemin de token DTCG → variable CSS », d'après les analyses
// TOKENS-MD3.md et TOKENS-NON-APPLICABLES-MD3.md (règle générale en kebab-case + exceptions).
//
// `classer(chemin, nom)` retourne :
//   { cible: 'md3' | 'custom', variable, fichier }   le token est écrit
//   { cible: 'ignore', raison }                      le token est volontairement ignoré
//   { cible: 'inconnu' }                             non reconnu : signalé dans le rapport
// `fichier` désigne le fichier de sortie : 'md3/ref', 'md3/sys', 'md3/couleurs' ou 'app'.

const NOM_VALIDE = /^[a-z][a-z0-9]*$/;
/** Préfixes déjà pris : `--md-*` (Material Design 3) et `--mat-*` (Angular Material). */
const NOMS_RESERVES = ['md', 'mat'];

export function validerNom(nom) {
  if (!NOM_VALIDE.test(nom)) {
    throw new Error(`Nom « ${nom} » invalide : lettres minuscules et chiffres, commençant par une lettre.`);
  }
  if (NOMS_RESERVES.includes(nom)) {
    throw new Error(`Nom « ${nom} » réservé (préfixe --${nom}-* déjà utilisé par Material).`);
  }
  return nom;
}

const kebab = (texte) => texte.trim().toLowerCase().replace(/\s+/g, '-');

/** Les 49 rôles de couleur MD3 que `mat.theme()` consomme. */
export const ROLES_MD3 = new Set([
  'primary', 'surface-tint', 'on-primary', 'primary-container', 'on-primary-container',
  'secondary', 'on-secondary', 'secondary-container', 'on-secondary-container',
  'tertiary', 'on-tertiary', 'tertiary-container', 'on-tertiary-container',
  'error', 'on-error', 'error-container', 'on-error-container',
  'background', 'on-background', 'surface', 'on-surface', 'surface-variant', 'on-surface-variant',
  'outline', 'outline-variant', 'shadow', 'scrim',
  'inverse-surface', 'inverse-on-surface', 'inverse-primary',
  'primary-fixed', 'on-primary-fixed', 'primary-fixed-dim', 'on-primary-fixed-variant',
  'secondary-fixed', 'on-secondary-fixed', 'secondary-fixed-dim', 'on-secondary-fixed-variant',
  'tertiary-fixed', 'on-tertiary-fixed', 'tertiary-fixed-dim', 'on-tertiary-fixed-variant',
  'surface-dim', 'surface-bright',
  'surface-container-lowest', 'surface-container-low', 'surface-container',
  'surface-container-high', 'surface-container-highest',
]);

/** Couleurs hors MD3 : Success / Info / Warning et leurs variantes. */
export const ROLES_CUSTOM = new Set(
  ['success', 'info', 'warning'].flatMap((f) => [f, `on-${f}`, `${f}-container`, `on-${f}-container`]),
);

export const STYLES_TYPO = new Set(
  ['display', 'headline', 'title', 'body', 'label'].flatMap((famille) =>
    ['large', 'medium', 'small'].map((taille) => `${famille}-${taille}`),
  ),
);
export const PROPRIETES_TYPO = { Font: 'font', Weight: 'weight', Size: 'size', Tracking: 'tracking', 'Line Height': 'line-height' };
/** Styles dont `Weight-emphasized` correspond à la graisse `prominent` de MD3 de base. */
export const STYLES_PROMINENT = new Set(['label-large', 'label-medium']);

export const RAYONS_MD3 = new Set(['none', 'extra-small', 'small', 'medium', 'large', 'extra-large', 'full']);
export const RAYONS_CUSTOM = new Set(['large-increased', 'extra-large-increased', 'extra-extra-large']);
export const ESPACEMENTS = new Set([
  'none', 'extra-small', 'small', 'medium', 'large', 'large-increased',
  'extra-large', 'extra-large-increased', 'extra-extra-large', 'full',
]);

/**
 * Opacités d'état MD3 : absentes des tokens (les `State Layers` sont des alias sans opacité),
 * donc posées ici avec les valeurs MD3 actuelles. État → valeur.
 */
export const OPACITES_ETAT = {
  hover: '0.08',
  focus: '0.10',
  pressed: '0.10',
  dragged: '0.16',
};
export const variableOpacite = (etat) => `--md-sys-state-${etat}-state-layer-opacity`;

const md3 = (variable, fichier) => ({ cible: 'md3', variable, fichier });
const custom = (variable, fichier = 'app') => ({ cible: 'custom', variable, fichier });
const ignore = (raison) => ({ cible: 'ignore', raison });
const INCONNU = { cible: 'inconnu' };

const RAISON_ETATS = "alias de couleur sans opacité : remplacé par les opacités d'état MD3";
const RAISON_NON_REFERENCE = 'non référencé par Material ni par le design system';
const RAISON_PALETTE = 'primitive de palette : exposée uniquement avec --palettes';

/**
 * Classe un token. `nom` est le paramètre de nommage (préfixe des variables custom) ;
 * `palettes` expose aussi les primitives `Colors.<palette>.Shade-NNN`.
 */
export function classer(chemin, nom, { palettes = false } = {}) {
  const segments = chemin.split('.');
  const [racine, groupe, ...reste] = segments;

  if (racine === 'Number' || racine === 'Number 2') {
    return segments.length === 1 ? ignore(RAISON_NON_REFERENCE) : INCONNU;
  }

  if (racine === 'Font theme') {
    if (groupe === 'Tracking' && reste.length === 1) return ignore(RAISON_NON_REFERENCE);
    if (groupe === 'Static' && reste.length === 2) {
      const [famille, cle] = reste;
      if (famille === 'Font' && ['Brand', 'Plain'].includes(cle)) return md3(`--md-ref-typeface-${kebab(cle)}`, 'md3/ref');
      if (famille === 'Weight') return md3(`--md-ref-typeface-weight-${kebab(cle)}`, 'md3/ref');
    }
    return INCONNU;
  }

  if (racine === 'Radius' && segments.length === 2) {
    const cle = kebab(groupe);
    if (RAYONS_MD3.has(cle)) return md3(`--md-sys-shape-corner-${cle}`, 'md3/sys');
    if (RAYONS_CUSTOM.has(cle)) return custom(`--${nom}-shape-corner-${cle}`);
    return INCONNU;
  }

  if (racine === 'Spacing' && segments.length === 2) {
    const cle = kebab(groupe);
    return ESPACEMENTS.has(cle) ? custom(`--${nom}-spacing-${cle}`) : INCONNU;
  }

  if (racine === 'Typescale' && groupe === 'Static' && reste.length === 2) {
    const style = kebab(reste[0]);
    if (!STYLES_TYPO.has(style)) return INCONNU;
    const propriete = PROPRIETES_TYPO[reste[1]];
    if (propriete) return md3(`--md-sys-typescale-${style}-${propriete}`, 'md3/sys');
    if (reste[1] === 'Weight-emphasized') {
      return STYLES_PROMINENT.has(style)
        ? md3(`--md-sys-typescale-${style}-weight-prominent`, 'md3/sys')
        : custom(`--${nom}-typescale-emphasized-${style}-weight`);
    }
    return INCONNU;
  }

  if (racine === 'Colors') {
    if (groupe === 'Schemes') {
      if (reste.length === 1) {
        const role = kebab(reste[0]);
        if (ROLES_MD3.has(role)) return md3(`--md-sys-color-${role}`, 'md3/couleurs');
        if (ROLES_CUSTOM.has(role)) return custom(`--${nom}-color-${role}`);
        return INCONNU;
      }
      if (reste.length === 2 && reste[0] === 'Neutral' && ['0', '900'].includes(reste[1])) {
        return custom(`--${nom}-color-neutral-${reste[1]}`);
      }
      return INCONNU;
    }
    if (groupe === 'State Layers') return ignore(RAISON_ETATS);
    if (groupe === 'Add-ons') {
      return reste.length === 1 && reste[0] === 'Section background'
        ? custom(`--${nom}-color-section-background`)
        : INCONNU;
    }
    if (reste.length === 1 && /^Shade-\d+$/.test(reste[0])) {
      return palettes
        ? custom(`--${nom}-ref-${kebab(groupe)}-${reste[0].slice('Shade-'.length)}`, 'md3/ref')
        : ignore(RAISON_PALETTE);
    }
  }

  return INCONNU;
}

/** Classe une liste de chemins ; retourne `{ entrees: Map chemin → classement, inconnus: [chemin] }`. */
export function classerTous(chemins, nom, options) {
  const entrees = new Map();
  const inconnus = [];
  for (const chemin of chemins) {
    const classement = classer(chemin, nom, options);
    entrees.set(chemin, classement);
    if (classement.cible === 'inconnu') inconnus.push(chemin);
  }
  return { entrees, inconnus };
}

const capitaliser = (texte) => texte.charAt(0).toUpperCase() + texte.slice(1);
/** Inverse de `kebab` : `surface-dim` → `Surface Dim`. */
const titre = (cle) => cle.split('-').map(capitaliser).join(' ');

/**
 * Variables que le pont Material (`_themes-<nom>.scss`) référence sans repli : une variable absente
 * laisserait un `var()` invalide, donc un thème cassé en silence.
 * Retourne `[{ variable, token }]` (`token` : chemin DTCG attendu).
 */
export function variablesRequises() {
  return [
    ...[...ROLES_MD3].map((role) => ({ variable: `--md-sys-color-${role}`, token: `Colors.Schemes.${titre(role)}` })),
    ...[...STYLES_TYPO].flatMap((style) =>
      Object.entries(PROPRIETES_TYPO).map(([propriete, cle]) => ({
        variable: `--md-sys-typescale-${style}-${cle}`,
        token: `Typescale.Static.${titre(style)}.${propriete}`,
      })),
    ),
    ...[...RAYONS_MD3].map((rayon) => ({ variable: `--md-sys-shape-corner-${rayon}`, token: `Radius.${titre(rayon)}` })),
    { variable: '--md-ref-typeface-plain', token: 'Font theme.Static.Font.Plain' },
  ];
}

/**
 * Variables custom (`--<nom>-*`) que les pages du catalogue lisent : leur absence n'est pas bloquante
 * (avertissement). Retourne `[{ variable, token }]`.
 */
export function variablesCustomAttendues(nom) {
  return [
    ...[...RAYONS_CUSTOM].map((rayon) => ({ variable: `--${nom}-shape-corner-${rayon}`, token: `Radius.${titre(rayon)}` })),
    ...[...ESPACEMENTS].map((cle) => ({ variable: `--${nom}-spacing-${cle}`, token: `Spacing.${titre(cle)}` })),
    ...[...ROLES_CUSTOM].map((role) => ({ variable: `--${nom}-color-${role}`, token: `Colors.Schemes.${titre(role)}` })),
    ...['0', '900'].map((n) => ({ variable: `--${nom}-color-neutral-${n}`, token: `Colors.Schemes.Neutral.${n}` })),
    { variable: `--${nom}-color-section-background`, token: 'Colors.Add-ons.Section background' },
    ...[...STYLES_TYPO]
      .filter((style) => !STYLES_PROMINENT.has(style))
      .map((style) => ({ variable: `--${nom}-typescale-emphasized-${style}-weight`, token: `Typescale.Static.${titre(style)}.Weight-emphasized` })),
  ];
}
