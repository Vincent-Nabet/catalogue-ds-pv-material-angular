// Manifeste des familles pour le catalogue : `familles.ts` (importé par `core/theme/themes.ts`), pour que
// le sélecteur de thème suive les familles réellement générées.
import { selecteurFamille } from './ecrire-variables.mjs';

const texte = (valeur) => `'${String(valeur).replaceAll('\\', '\\\\').replaceAll("'", "\\'")}'`;

/** Classe CSS (sans point) d'une famille. */
export const classeFamille = (famille, nom) => (famille.suffixe ? `theme-${nom}-${famille.suffixe}` : `theme-${nom}`);

/** Identifiant de thème du catalogue : `<nom>` pour la standard, `<nom>-<suffixe>` sinon (classe `theme-<id>`). */
export const idFamille = (famille, nom) => (famille.suffixe ? `${nom}-${famille.suffixe}` : nom);

/** Retourne le corps de `familles.ts` (sans en-tête). */
export function genererManifeste({ nom, familles }) {
  const lignes = familles.map(
    (f) =>
      `  { id: ${texte(idFamille(f, nom))}, libelle: ${texte(f.libelle)}, apercu: ${texte(f.apercu)}, defaut: ${f.defaut}, progression: ${f.progression} },\n`,
  );
  return `export interface FamilleDesignSystem {
  /** Identifiant de thème (classe \`theme-<id>\` sur <html>). */
  readonly id: string;
  /** Libellé de la famille (« Standard », « Contraste moyen »…). */
  readonly libelle: string;
  /** Couleur primaire claire, pour la pastille d'aperçu. */
  readonly apercu: string;
  /** Famille standard : appliquée aussi sur \`:root\`. */
  readonly defaut: boolean;
  /** Fait partie de la progression du contraste (standard, moyen, élevé). */
  readonly progression: boolean;
}

/** Familles de contraste générées depuis les tokens (la défaut d'abord). Sélecteur : ${familles.map((f) => selecteurFamille(f, nom)).join(' ; ')}. */
export const FAMILLES_DESIGN_SYSTEM: readonly FamilleDesignSystem[] = [
${lignes.join('')}];
`;
}
