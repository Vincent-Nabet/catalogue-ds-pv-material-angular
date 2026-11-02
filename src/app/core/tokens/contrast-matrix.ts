import { THEMES, ThemeId, themeInfo } from '../theme/themes';
import { ColorPair, PairKind } from './color-roles';
import { Rgba, contrastRatio, meetsMinimum } from './contrast';

export type ModeScheme = 'light' | 'dark';

export interface Mode {
  /** `app-contraste-moyen:dark`. */
  id: string;
  family: ThemeId;
  scheme: ModeScheme;
}

/** Familles du design system (générées) dans l'ordre de la progression du contraste, les familles libres (Monochrome…) ensuite. */
export const FAMILIES: readonly ThemeId[] = THEMES.filter((t) => t.group === 'design-system').map((t) => t.id);

/** Les modes du design system : chaque famille générée × clair / sombre. */
export const MODES: readonly Mode[] = FAMILIES.flatMap((family) =>
  (['light', 'dark'] as const).map((scheme) => ({ id: `${family}:${scheme}`, family, scheme })),
);

export function familyLabel(family: ThemeId): string {
  return themeInfo(family)?.shortLabel ?? family;
}

/** Les familles dont une régression se mesure par rapport à la précédente (Monochrome exclu). */
const PROGRESSION: readonly ThemeId[] = THEMES.filter((t) => t.group === 'design-system' && t.progression).map((t) => t.id);

/** Tolérance sur l'écart entre deux familles avant de parler de régression. */
const REGRESSION_TOLERANCE = 0.01;

export type CellStatus = 'ok' | 'echec' | 'sans-seuil' | 'absent';

/** Icône et texte d'un statut : il n'est jamais porté par la couleur seule. */
export const STATUS_VIEW: Record<CellStatus, { icon: string; text: string }> = {
  ok: { icon: 'check_circle', text: 'Conforme' },
  echec: { icon: 'error', text: 'Insuffisant' },
  'sans-seuil': { icon: 'remove_circle', text: 'Décoratif' },
  absent: { icon: 'help', text: 'Indisponible' },
};

export interface MatrixCell {
  mode: Mode;
  /** Valeur brute ; `null` quand une des deux couleurs est absente ou transparente. */
  ratio: number | null;
  status: CellStatus;
  regression: boolean;
  /** Ratio de la famille précédente, quand il y a régression. */
  previousRatio: number | null;
}

export interface MatrixRow {
  pair: ColorPair;
  cells: MatrixCell[];
}

/** Couleurs lues par mode : `values[mode.id][rôle]`. */
export type ModeValues = Record<string, Record<string, Rgba | null>>;

/** Statut d'une paire pour un rapport brut (`null` : une des deux couleurs est absente). */
export function pairStatus(ratio: number | null, pair: ColorPair): CellStatus {
  if (ratio === null) {
    return 'absent';
  }
  if (pair.min === null) {
    return 'sans-seuil';
  }
  return meetsMinimum(ratio, pair.min) ? 'ok' : 'echec';
}

export function buildMatrix(values: ModeValues, pairs: readonly ColorPair[]): MatrixRow[] {
  return pairs.map((pair) => {
    const ratios = new Map(
      MODES.map((mode) => [
        mode.id,
        contrastRatio(values[mode.id]?.[pair.fg] ?? null, values[mode.id]?.[pair.bg] ?? null),
      ]),
    );
    const cells = MODES.map((mode): MatrixCell => {
      const ratio = ratios.get(mode.id) ?? null;
      const index = PROGRESSION.indexOf(mode.family);
      const previous = index > 0 ? `${PROGRESSION[index - 1]}:${mode.scheme}` : null;
      const previousRatio = previous ? (ratios.get(previous) ?? null) : null;
      const regression =
        ratio !== null && previousRatio !== null && ratio < previousRatio - REGRESSION_TOLERANCE;
      return {
        mode,
        ratio,
        status: pairStatus(ratio, pair),
        regression,
        previousRatio: regression ? previousRatio : null,
      };
    });
    return { pair, cells };
  });
}

export interface ModeSummary {
  echecs: Record<PairKind, number>;
  total: number;
  regressions: number;
}

/** Nombre d'échecs (par type de paire) et de régressions, par mode. */
export function summary(rows: readonly MatrixRow[]): Record<string, ModeSummary> {
  const result = Object.fromEntries(
    MODES.map((mode) => [
      mode.id,
      { echecs: { texte: 0, interface: 0, decoratif: 0 }, total: 0, regressions: 0 },
    ]),
  );
  for (const row of rows) {
    for (const cell of row.cells) {
      const entry = result[cell.mode.id];
      if (cell.status === 'echec') {
        entry.echecs[row.pair.kind]++;
        entry.total++;
      }
      if (cell.regression) {
        entry.regressions++;
      }
    }
  }
  return result;
}
