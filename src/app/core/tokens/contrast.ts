import { formatRatio } from '../a11y/contrast-items';

export interface Rgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

const CHANNELS = String.raw`(\d+(?:\.\d+)?)`;
const RGB_PATTERN = new RegExp(
  String.raw`^rgba?\(\s*${CHANNELS}[\s,]+${CHANNELS}[\s,]+${CHANNELS}(?:\s*[,/]\s*(\d+(?:\.\d+)?)(%)?)?\s*\)$`,
);

/**
 * Lit `rgb(r, g, b)` ou `rgba(r, g, b, a)`, c'est-à-dire ce que `getComputedStyle().color`
 * renvoie pour une couleur hexadécimale. Renvoie `null` pour une chaîne vide ou non reconnue.
 */
export function parseCssColor(value: string): Rgba | null {
  const match = RGB_PATTERN.exec(value.trim());
  if (!match) {
    return null;
  }
  const [r, g, b] = [match[1], match[2], match[3]].map(Number);
  const alpha = match[4] === undefined ? 1 : Number(match[4]) / (match[5] ? 100 : 1);
  return { r, g, b, a: alpha };
}

function linearize(channel: number): number {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

/** Luminance relative WCAG 2.x (seuil de linéarisation 0,03928, comme axe-core). */
export function relativeLuminance(color: Rgba): number {
  return 0.2126 * linearize(color.r) + 0.7152 * linearize(color.g) + 0.0722 * linearize(color.b);
}

/**
 * Rapport de contraste WCAG 2.x, valeur brute (de 1 à 21). Une couleur avec alpha < 1 n'a pas
 * de rapport (il dépendrait du fond) : le résultat est alors `null`.
 */
export function contrastRatio(a: Rgba | null, b: Rgba | null): number | null {
  if (!a || !b || a.a < 1 || b.a < 1) {
    return null;
  }
  const [lighter, darker] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x);
  return (lighter + 0.05) / (darker + 0.05);
}

/** Compare la valeur **brute** au seuil : 4,495 n'atteint jamais 4,5. */
export function meetsMinimum(ratio: number, min: number): boolean {
  return ratio >= min;
}

/**
 * Tronque à 2 décimales (et non arrondit) : un échec à 4,4996 ne doit pas s'afficher « 4,50 : 1 ».
 * axe-core tronque de la même façon ; son calcul peut malgré tout différer de 0,01 du nôtre
 * (arrondis intermédiaires des couleurs).
 */
export function truncateRatio(ratio: number): number {
  return Math.floor(ratio * 100 + 1e-9) / 100;
}

/** `4.4996` → `4,49 : 1`. */
export function formatContrast(ratio: number): string {
  return formatRatio(truncateRatio(ratio));
}

/** `#86A315`, majuscules (la transparence est ignorée). */
export function toHex(color: Rgba): string {
  const hex = (channel: number) =>
    Math.round(channel).toString(16).padStart(2, '0').toUpperCase();
  return `#${hex(color.r)}${hex(color.g)}${hex(color.b)}`;
}
