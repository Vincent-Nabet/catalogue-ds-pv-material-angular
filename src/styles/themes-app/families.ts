/* Fichier généré par `npm run themes` — ne pas modifier.
 * Source : tokens — 2026-11-26 */

export interface DesignSystemFamily {
  /** Theme identifier (class `theme-<id>` on <html>). */
  readonly id: string;
  /** Family label, in French (« Standard », « Contraste moyen »…). */
  readonly label: string;
  /** Light primary color, for the preview swatch. */
  readonly preview: string;
  /** Default family: also applied on `:root`. */
  readonly isDefault: boolean;
  /** Part of the contrast progression (standard, medium, high). */
  readonly progression: boolean;
}

/** Contrast families generated from the tokens (default first). Selectors: :root, .theme-app ; .theme-app-medium-contrast ; .theme-app-high-contrast ; .theme-app-monochrome. */
export const DESIGN_SYSTEM_FAMILIES: readonly DesignSystemFamily[] = [
  { id: 'app', label: 'Standard', preview: '#86a315', isDefault: true, progression: true },
  { id: 'app-medium-contrast', label: 'Contraste moyen', preview: '#657c08', isDefault: false, progression: true },
  { id: 'app-high-contrast', label: 'Contraste élevé', preview: '#465900', isDefault: false, progression: true },
  { id: 'app-monochrome', label: 'Monochrome', preview: '#1a1a1a', isDefault: false, progression: false },
];
