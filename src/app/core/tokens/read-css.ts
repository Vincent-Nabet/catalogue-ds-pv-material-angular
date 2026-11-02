import { Rgba, parseCssColor } from './contrast';

/**
 * Lit une couleur dans le CSS réellement chargé. `getComputedStyle` ne résout pas une propriété
 * personnalisée (`getPropertyValue('--x')` renverrait le texte `light-dark(…)`) : on passe par une
 * vraie propriété, `color`, sur une sonde. Le navigateur résout alors `var()` et `light-dark()`
 * selon le `color-scheme` de la sonde.
 *
 * Le repli `transparent` signale une variable absente (alpha 0, donc `null`) : sans lui, la sonde
 * hériterait la couleur de son parent et on afficherait un faux rapport.
 */
export function readColor(probe: HTMLElement, cssVar: string): Rgba | null {
  probe.style.color = `var(${cssVar}, transparent)`;
  const color = parseCssColor(getComputedStyle(probe).color);
  return color && color.a > 0 ? color : null;
}

/** Valeur calculée d'une propriété (`fontSize`, `borderTopLeftRadius`, `boxShadow`…). */
export function readValue(element: HTMLElement, property: keyof CSSStyleDeclaration & string): string {
  return String(getComputedStyle(element)[property]);
}

/** `57px` → `57 px`, `-0.25px` → `-0,25 px`, `0.08` → `0,08` : valeur calculée, à la française. */
export function formatCssValue(value: string): string {
  return value.replace('.', ',').replace(/px$/, ' px');
}
