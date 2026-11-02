/* Fichier généré par `npm run themes` — ne pas modifier.
 * Source : tokens — 2026-11-02 */

export interface FamilleDesignSystem {
  /** Identifiant de thème (classe `theme-<id>` sur <html>). */
  readonly id: string;
  /** Libellé de la famille (« Standard », « Contraste moyen »…). */
  readonly libelle: string;
  /** Couleur primaire claire, pour la pastille d'aperçu. */
  readonly apercu: string;
  /** Famille standard : appliquée aussi sur `:root`. */
  readonly defaut: boolean;
  /** Fait partie de la progression du contraste (standard, moyen, élevé). */
  readonly progression: boolean;
}

/** Familles de contraste générées depuis les tokens (la défaut d'abord). Sélecteur : :root, .theme-app ; .theme-app-contraste-moyen ; .theme-app-contraste-eleve ; .theme-app-monochrome. */
export const FAMILLES_DESIGN_SYSTEM: readonly FamilleDesignSystem[] = [
  { id: 'app', libelle: 'Standard', apercu: '#86a315', defaut: true, progression: true },
  { id: 'app-contraste-moyen', libelle: 'Contraste moyen', apercu: '#657c08', defaut: false, progression: true },
  { id: 'app-contraste-eleve', libelle: 'Contraste élevé', apercu: '#465900', defaut: false, progression: true },
  { id: 'app-monochrome', libelle: 'Monochrome', apercu: '#1a1a1a', defaut: false, progression: false },
];
