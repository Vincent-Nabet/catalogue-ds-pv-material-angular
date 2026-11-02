/**
 * Source unique des rôles de couleur et des paires (texte / fond) contrôlées, utilisée par les
 * pages Couleurs et Matrice de contraste. Ajouter une paire ou un rôle = une ligne ici.
 */
import { classifyToken } from './discover-tokens';

/**
 * Préfixe des variables propres au design system (`--app-color-*`), le `--nom` de
 * `npm run themes` (voir docs/generation-themes.md). À changer ici seulement.
 */
export const DS_PREFIX = 'app';

export type RoleOrigin = 'md3' | 'design-system';

export interface ColorRoleGroup {
  id: string;
  label: string;
  origin: RoleOrigin;
  /** Suffixe des rôles : `on-primary` donne `--mat-sys-on-primary` ou `--app-color-on-primary`. */
  roles: readonly string[];
}

const FAMILY = (name: string) => [name, `on-${name}`, `${name}-container`, `on-${name}-container`];
const FIXED = (name: string) => [
  `${name}-fixed`,
  `${name}-fixed-dim`,
  `on-${name}-fixed`,
  `on-${name}-fixed-variant`,
];

export const COLOR_ROLES: readonly ColorRoleGroup[] = [
  { id: 'primaire', label: 'Primaire', origin: 'md3', roles: FAMILY('primary') },
  { id: 'secondaire', label: 'Secondaire', origin: 'md3', roles: FAMILY('secondary') },
  { id: 'tertiaire', label: 'Tertiaire', origin: 'md3', roles: FAMILY('tertiary') },
  { id: 'erreur', label: 'Erreur', origin: 'md3', roles: FAMILY('error') },
  {
    id: 'surfaces',
    label: 'Surfaces',
    origin: 'md3',
    roles: [
      'surface',
      'on-surface',
      'surface-variant',
      'on-surface-variant',
      'surface-dim',
      'surface-bright',
      'surface-container-lowest',
      'surface-container-low',
      'surface-container',
      'surface-container-high',
      'surface-container-highest',
      'background',
      'on-background',
    ],
  },
  {
    id: 'contours-inverses',
    label: 'Contours et inverses',
    origin: 'md3',
    roles: ['outline', 'outline-variant', 'inverse-surface', 'inverse-on-surface', 'inverse-primary'],
  },
  {
    id: 'fixes',
    label: 'Couleurs fixes',
    origin: 'md3',
    roles: [...FIXED('primary'), ...FIXED('secondary'), ...FIXED('tertiary')],
  },
  { id: 'autres', label: 'Autres', origin: 'md3', roles: ['shadow', 'scrim', 'surface-tint'] },
  { id: 'succes', label: 'Succès', origin: 'design-system', roles: FAMILY('success') },
  { id: 'info', label: 'Info', origin: 'design-system', roles: FAMILY('info') },
  { id: 'alerte', label: 'Alerte', origin: 'design-system', roles: FAMILY('warning') },
  {
    id: 'neutres',
    label: 'Neutres et fond de section',
    origin: 'design-system',
    roles: ['neutral-0', 'neutral-900', 'section-background'],
  },
];

export type PairKind = 'texte' | 'interface' | 'decoratif';

export interface ColorPair {
  id: string;
  /** Suffixe du rôle de premier plan. */
  fg: string;
  /** Suffixe du rôle d'arrière-plan. */
  bg: string;
  kind: PairKind;
  /** Rapport minimal WCAG ; `null` pour un élément décoratif. */
  min: 4.5 | 3 | null;
  usage: string;
  origin: RoleOrigin;
}

const pair = (
  fg: string,
  bg: string,
  kind: PairKind,
  usage: string,
  origin: RoleOrigin = 'md3',
): ColorPair => ({
  id: `${fg}/${bg}`,
  fg,
  bg,
  kind,
  min: kind === 'texte' ? 4.5 : kind === 'interface' ? 3 : null,
  usage,
  origin,
});

const text = (fg: string, bg: string, usage: string, origin?: RoleOrigin) =>
  pair(fg, bg, 'texte', usage, origin);

const FAMILIES = [
  ['primary', 'primaire'],
  ['secondary', 'secondaire'],
  ['tertiary', 'tertiaire'],
] as const;

const SURFACES = [
  'surface',
  'surface-container-lowest',
  'surface-container-low',
  'surface-container',
  'surface-container-high',
  'surface-container-highest',
  'surface-dim',
  'surface-bright',
];

export const COLOR_PAIRS: readonly ColorPair[] = [
  // Rôle et son « on- »
  ...[...FAMILIES, ['error', 'erreur'] as const].flatMap(([role, name]) => [
    text(`on-${role}`, role, `Texte sur un fond ${name}`),
    text(`on-${role}-container`, `${role}-container`, `Texte sur un conteneur ${name}`),
  ]),
  // Rôles fixes
  ...FAMILIES.flatMap(([role, name]) => [
    text(`on-${role}-fixed`, `${role}-fixed`, `Texte sur un fond ${name} fixe`),
    text(
      `on-${role}-fixed-variant`,
      `${role}-fixed`,
      `Texte secondaire sur un fond ${name} fixe`,
    ),
  ]),
  // Surfaces
  ...SURFACES.map((bg) => text('on-surface', bg, `Texte courant sur ${bg}`)),
  text('on-surface-variant', 'surface', 'Texte secondaire, libellés'),
  text('on-surface-variant', 'surface-variant', 'Texte sur une surface variante'),
  text('on-surface-variant', 'surface-container-highest', 'Texte secondaire sur une surface haute'),
  text('on-background', 'background', "Texte sur l'arrière-plan"),
  // Inverses
  text('inverse-on-surface', 'inverse-surface', 'Texte des infobulles et des snackbars'),
  text('inverse-primary', 'inverse-surface', 'Action dans un snackbar'),
  // Rôle en texte
  ...[...FAMILIES, ['error', 'erreur'] as const].map(([role, name]) =>
    text(role, 'surface', `Boutons texte et contour, liens (${name})`),
  ),
  // Usages observés dans les composants
  text('on-surface', 'secondary-container', 'Ligne sélectionnée du tableau'),
  text('primary', 'surface-container-low', 'Sous-titres du menu latéral'),
  // Éléments d'interface et décoratif
  pair('outline', 'surface', 'interface', "Contour d'un champ ou d'une case"),
  pair('outline-variant', 'surface', 'decoratif', 'Séparateurs et contours discrets'),
  // Design system
  ...(['success', 'info', 'warning'] as const).flatMap((role) => [
    text(`on-${role}`, role, `Texte sur le fond ${role}`, 'design-system'),
    text(`on-${role}-container`, `${role}-container`, `Texte sur un conteneur ${role}`, 'design-system'),
  ]),
  ...(['success', 'info', 'warning'] as const).map((role) =>
    text(role, 'surface', `Texte ${role} sur la surface`, 'design-system'),
  ),
];

/** Les deux préfixes possibles des rôles MD3 : la page lit le thème courant, la matrice les sondes. */
export type Md3Prefix = '--mat-sys-' | '--md-sys-color-';

export function findGroup(role: string): ColorRoleGroup | undefined {
  return COLOR_ROLES.find((group) => group.roles.includes(role));
}

export function roleOrigin(role: string): RoleOrigin {
  return findGroup(role)?.origin ?? 'md3';
}

/**
 * Nom de la variable CSS d'un rôle (`on-primary` → `--mat-sys-on-primary`, `--app-color-success`…).
 * L'origine se déduit de `COLOR_ROLES` ; un rôle détecté dans le CSS mais absent de la liste doit
 * la recevoir explicitement (sinon il serait pris pour un rôle MD3).
 */
export function colorVar(
  role: string,
  md3Prefix: Md3Prefix,
  origin: RoleOrigin = roleOrigin(role),
): string {
  return origin === 'md3' ? `${md3Prefix}${role}` : `--${DS_PREFIX}-color-${role}`;
}

/** Variables `--app-color-*` attendues : les rôles du design system de `COLOR_ROLES`. */
export function listedDesignSystemColorVars(): string[] {
  return COLOR_ROLES.filter((group) => group.origin === 'design-system').flatMap((group) =>
    group.roles.map((role) => colorVar(role, '--mat-sys-')),
  );
}

/**
 * Rôles `--app-color-*` présents dans `found` (noms de variables CSS) mais absents de `COLOR_ROLES`,
 * dans l'ordre d'apparition. Un nom déjà listé (même en MD3) est ignoré : le rôle serait ambigu.
 */
export function detectedRoles(found: Iterable<string>): string[] {
  const known = new Set(COLOR_ROLES.flatMap((group) => group.roles));
  return Array.from(found)
    .map((name) => classifyToken(name, DS_PREFIX))
    .filter(({ kind, id }) => kind === 'color' && !known.has(id))
    .map(({ id }) => id);
}

export interface ColorFamily {
  /** Suffixe de base : `success` pour `--app-color-success`. */
  id: string;
  label: string;
}

/**
 * Familles `--app-color-*` complètes présentes dans `found` (noms de variables CSS) : le rôle, son
 * `on-`, son `-container` et son `on-…-container`, soit de quoi colorer un composant comme le font
 * `secondary` ou `tertiary` en MD3. Détectées dans le CSS, donc une nouvelle famille du design
 * system apparaît sans toucher à ce fichier ; le libellé vient de `COLOR_ROLES` quand il y est.
 */
export function detectedColorFamilies(found: Iterable<string>): ColorFamily[] {
  const ids = new Set(
    Array.from(found)
      .map((name) => classifyToken(name, DS_PREFIX))
      .filter(({ kind }) => kind === 'color')
      .map(({ id }) => id),
  );
  return Array.from(ids)
    .filter(
      (id) =>
        !id.startsWith('on-') &&
        !id.endsWith('-container') &&
        FAMILY(id).slice(1).every((role) => ids.has(role)),
    )
    .map((id) => ({
      id,
      label: COLOR_ROLES.find((group) => group.origin === 'design-system' && group.roles[0] === id)?.label ?? id,
    }));
}

/** Groupe d'une paire : celui de son rôle de premier plan. */
export function pairGroup(colorPair: ColorPair): ColorRoleGroup {
  return findGroup(colorPair.fg) as ColorRoleGroup;
}

/** Les paires d'un groupe, dans l'ordre de `COLOR_PAIRS`. */
export function pairsOfGroup(group: ColorRoleGroup): ColorPair[] {
  return COLOR_PAIRS.filter((p) => pairGroup(p) === group);
}

/** « `on-primary` sur `primary` ». */
export function pairLabel(colorPair: ColorPair): string {
  return `${colorPair.fg} sur ${colorPair.bg}`;
}

/** Rôles qui n'entrent dans aucune paire (`shadow`, `scrim`, `*-fixed-dim`…), groupés par origine. */
export function unpairedRoles(): { group: ColorRoleGroup; role: string }[] {
  const used = new Set(COLOR_PAIRS.flatMap((p) => [p.fg, p.bg]));
  return COLOR_ROLES.flatMap((group) =>
    group.roles.filter((role) => !used.has(role)).map((role) => ({ group, role })),
  );
}
