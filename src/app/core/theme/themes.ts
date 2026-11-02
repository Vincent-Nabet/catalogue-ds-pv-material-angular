export type ThemeId =
  | 'app'
  | 'app-contraste-moyen'
  | 'app-contraste-eleve'
  | 'app-monochrome'
  | 'azur'
  | 'violet'
  | 'rose'
  | 'vert'
  | 'orange'
  | 'cyan';
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

export const THEMES: readonly ThemeInfo[] = [
  { id: 'app', group: 'design-system', label: 'Design system', shortLabel: 'Standard', color: '#86a315' },
  { id: 'app-contraste-moyen', group: 'design-system', label: 'Design system, contraste moyen', shortLabel: 'Contraste moyen', color: '#657c08' },
  { id: 'app-contraste-eleve', group: 'design-system', label: 'Design system, contraste élevé', shortLabel: 'Contraste élevé', color: '#465900' },
  { id: 'app-monochrome', group: 'design-system', label: 'Design system, monochrome', shortLabel: 'Monochrome', color: '#1a1a1a' },
  { id: 'azur', group: 'angular-material', label: 'Azur', shortLabel: 'Azur', color: '#005cbb' },
  { id: 'violet', group: 'angular-material', label: 'Violet', shortLabel: 'Violet', color: '#6750a4' },
  { id: 'rose', group: 'angular-material', label: 'Rose', shortLabel: 'Rose', color: '#b4236b' },
  { id: 'vert', group: 'angular-material', label: 'Vert', shortLabel: 'Vert', color: '#146c2e' },
  { id: 'orange', group: 'angular-material', label: 'Orange', shortLabel: 'Orange', color: '#a04a00' },
  { id: 'cyan', group: 'angular-material', label: 'Cyan', shortLabel: 'Cyan', color: '#006874' },
];

export function themeInfo(id: ThemeId): ThemeInfo | undefined {
  return THEMES.find((theme) => theme.id === id);
}

export const SCHEMES: readonly SchemeInfo[] = [
  { id: 'light', label: 'Clair', icon: 'light_mode' },
  { id: 'dark', label: 'Sombre', icon: 'dark_mode' },
  { id: 'system', label: 'Système', icon: 'contrast' },
];

export const DENSITIES: readonly Density[] = [0, 1, 2, 3, 4];
