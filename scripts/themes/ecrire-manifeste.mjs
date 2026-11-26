// Manifeste des familles pour le catalogue : `families.ts` (importé par `core/theme/themes.ts`), pour que
// le sélecteur de thème suive les familles réellement générées.
import { selecteurFamille } from './ecrire-variables.mjs';

const texte = (valeur) => `'${String(valeur).replaceAll('\\', '\\\\').replaceAll("'", "\\'")}'`;

/** Classe CSS (sans point) d'une famille. */
export const classeFamille = (famille, nom) => (famille.suffixe ? `theme-${nom}-${famille.suffixe}` : `theme-${nom}`);

/** Identifiant de thème du catalogue : `<nom>` pour la standard, `<nom>-<suffixe>` sinon (classe `theme-<id>`). */
export const idFamille = (famille, nom) => (famille.suffixe ? `${nom}-${famille.suffixe}` : nom);

/** Retourne le corps de `families.ts` (sans en-tête). */
export function genererManifeste({ nom, familles }) {
  const lignes = familles.map(
    (f) =>
      `  { id: ${texte(idFamille(f, nom))}, label: ${texte(f.libelle)}, preview: ${texte(f.apercu)}, isDefault: ${f.defaut}, progression: ${f.progression} },\n`,
  );
  return `export interface DesignSystemFamily {
  /** Theme identifier (class \`theme-<id>\` on <html>). */
  readonly id: string;
  /** Family label, in French (« Standard », « Contraste moyen »…). */
  readonly label: string;
  /** Light primary color, for the preview swatch. */
  readonly preview: string;
  /** Default family: also applied on \`:root\`. */
  readonly isDefault: boolean;
  /** Part of the contrast progression (standard, medium, high). */
  readonly progression: boolean;
}

/** Contrast families generated from the tokens (default first). Selectors: ${familles.map((f) => selecteurFamille(f, nom)).join(' ; ')}. */
export const DESIGN_SYSTEM_FAMILIES: readonly DesignSystemFamily[] = [
${lignes.join('')}];
`;
}
