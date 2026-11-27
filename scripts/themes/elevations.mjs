// Ombres d'élévation du design system (`--mat-sys-level0` à `--mat-sys-level5`).
//
// Origine : les tokens (et l'export natif des variables de Figma) ne contiennent pas les ombres.
// Elles existent dans la maquette Figma sous forme de styles d'effet : `M3/Elevation Light/1` à `5`
// et `M3/Elevation Dark/1` à `5`. Les valeurs ci-dessous en ont été relevées à la main ; elles sont
// identiques en clair et en sombre, donc une seule table sert les deux modes. Le niveau 0 est
// l'absence d'ombre. Chaque niveau 1 à 5 a deux couches, celle à 30 % d'abord, comme la spécification
// MD3. La couleur est le littéral `rgba(0,0,0,…)` de la maquette (pas de `color-mix` sur
// `--md-sys-color-shadow`).
//
// Mettre à jour à la main si le design change : relire les styles d'effet dans Figma, puis reporter
// les valeurs ici, couche par couche. Correspondance Figma → CSS (`box-shadow`) :
//   offset X, offset Y        → les deux premières longueurs ;
//   « radius » (flou)         → la troisième longueur (flou) ;
//   « spread » (étalement)    → la quatrième longueur ;
//   couleur noire + opacité   → `rgba(0,0,0,<opacité>)`.
// Relancer ensuite `npm run themes` pour régénérer les thèmes (jamais d'édition à la main de
// `src/styles/themes-*/`).
//
// Module JS, pas JSON : `navigateur.mjs` importe le même code dans le navigateur. Aucune API Node ici.

/** Valeur CSS de `--mat-sys-level<n>`, par numéro de niveau (0 à 5). */
export const ELEVATIONS = {
  0: 'none',
  1: '0 1px 2px 0 rgba(0,0,0,.3), 0 1px 3px 1px rgba(0,0,0,.15)',
  2: '0 1px 2px 0 rgba(0,0,0,.3), 0 2px 6px 2px rgba(0,0,0,.15)',
  3: '0 1px 3px 0 rgba(0,0,0,.3), 0 4px 8px 3px rgba(0,0,0,.15)',
  4: '0 2px 3px 0 rgba(0,0,0,.3), 0 6px 10px 4px rgba(0,0,0,.15)',
  5: '0 4px 4px 0 rgba(0,0,0,.3), 0 8px 12px 6px rgba(0,0,0,.15)',
};

/**
 * Variable `--md-sys-*` du socle qui porte l'ombre du niveau `n` (écrite dans `md3/sys.css`).
 * Attention : en MD3, `md.sys.elevation.level<n>` désigne une hauteur en dp ; ici la variable porte
 * l'ombre complète (`box-shadow`), qui est ce qu'Angular Material en tire.
 */
export const variableElevation = (n) => `--md-sys-elevation-level${n}`;
