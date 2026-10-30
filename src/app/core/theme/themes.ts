export type ThemeId = 'azur' | 'violet' | 'rose' | 'vert' | 'orange' | 'cyan';
export type Scheme = 'light' | 'dark' | 'system';
export type Density = 0 | 1 | 2 | 3 | 4;

export interface ThemeInfo {
  id: ThemeId;
  label: string;
  /** Couleur d'aperçu (pastille du sélecteur). */
  color: string;
}

export interface SchemeInfo {
  id: Scheme;
  label: string;
  icon: string;
}

export const THEMES: readonly ThemeInfo[] = [
  { id: 'azur', label: 'Azur', color: '#005cbb' },
  { id: 'violet', label: 'Violet', color: '#6750a4' },
  { id: 'rose', label: 'Rose', color: '#b4236b' },
  { id: 'vert', label: 'Vert', color: '#146c2e' },
  { id: 'orange', label: 'Orange', color: '#a04a00' },
  { id: 'cyan', label: 'Cyan', color: '#006874' },
];

export const SCHEMES: readonly SchemeInfo[] = [
  { id: 'light', label: 'Clair', icon: 'light_mode' },
  { id: 'dark', label: 'Sombre', icon: 'dark_mode' },
  { id: 'system', label: 'Système', icon: 'contrast' },
];

export const DENSITIES: readonly Density[] = [0, 1, 2, 3, 4];
