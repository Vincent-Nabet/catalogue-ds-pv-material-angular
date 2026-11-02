import { FAMILLES_DESIGN_SYSTEM } from '../../../styles/themes-app/familles';

/** Identifiant de thème : familles du design system (générées, cf. `npm run themes`) ou thème Angular Material. */
export type ThemeId = string;
export type ThemeGroupId = 'design-system' | 'angular-material';
export type Scheme = 'light' | 'dark' | 'system';
export type Density = 0 | 1 | 2 | 3 | 4;

export interface ThemeInfo {
  id: ThemeId;
  group: ThemeGroupId;
  /** Libellé complet (bouton du sélecteur). */
  label: string;
  /** Libellé dans le sous-menu de son groupe. */
  shortLabel: string;
  /** Couleur d'aperçu (pastille du sélecteur). */
  color: string;
  /** Famille du design system faisant partie de la progression du contraste (standard, moyen, élevé). */
  progression?: boolean;
}

export interface SchemeInfo {
  id: Scheme;
  label: string;
  icon: string;
}

export const THEME_GROUPS: readonly { id: ThemeGroupId; label: string }[] = [
  { id: 'design-system', label: 'Design system' },
  { id: 'angular-material', label: 'Thèmes Angular Material' },
];

/** Thèmes du design system : une entrée par famille générée (la famille par défaut d'abord). */
const DESIGN_SYSTEM_THEMES: readonly ThemeInfo[] = FAMILLES_DESIGN_SYSTEM.map((famille) => ({
  id: famille.id,
  group: 'design-system',
  label: famille.defaut ? 'Design system' : `Design system, ${famille.libelle.toLowerCase()}`,
  shortLabel: famille.libelle,
  color: famille.apercu,
  progression: famille.progression,
}));

const ANGULAR_MATERIAL_THEMES: readonly ThemeInfo[] = [
  { id: 'azur', group: 'angular-material', label: 'Azur', shortLabel: 'Azur', color: '#005cbb' },
  { id: 'violet', group: 'angular-material', label: 'Violet', shortLabel: 'Violet', color: '#6750a4' },
  { id: 'rose', group: 'angular-material', label: 'Rose', shortLabel: 'Rose', color: '#b4236b' },
  { id: 'vert', group: 'angular-material', label: 'Vert', shortLabel: 'Vert', color: '#146c2e' },
  { id: 'orange', group: 'angular-material', label: 'Orange', shortLabel: 'Orange', color: '#a04a00' },
  { id: 'cyan', group: 'angular-material', label: 'Cyan', shortLabel: 'Cyan', color: '#006874' },
];

export const THEMES: readonly ThemeInfo[] = [...DESIGN_SYSTEM_THEMES, ...ANGULAR_MATERIAL_THEMES];

/** Thème par défaut : « contraste moyen » du design system s'il existe, sinon sa première famille. */
export const DEFAULT_THEME_ID: ThemeId = (DESIGN_SYSTEM_THEMES.find((t) => t.id === 'app-contraste-moyen') ?? DESIGN_SYSTEM_THEMES[0]).id;

export function themeInfo(id: ThemeId): ThemeInfo | undefined {
  return THEMES.find((theme) => theme.id === id);
}

export const SCHEMES: readonly SchemeInfo[] = [
  { id: 'light', label: 'Clair', icon: 'light_mode' },
  { id: 'dark', label: 'Sombre', icon: 'dark_mode' },
  { id: 'system', label: 'Système', icon: 'contrast' },
];

export const DENSITIES: readonly Density[] = [0, 1, 2, 3, 4];
