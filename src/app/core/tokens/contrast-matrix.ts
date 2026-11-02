import { THEMES, ThemeId } from '../theme/themes';
import { ColorPair, PairKind } from './color-roles';
import { Rgba, contrastRatio, meetsMinimum } from './contrast';

export type ModeScheme = 'light' | 'dark';

export interface Mode {
  /** `app-contraste-moyen:dark`. */
  id: string;
  family: ThemeId;
  scheme: ModeScheme;
}

/** Familles du design system dans l'ordre de la progression du contraste (Monochrome en dernier, hors progression). */
export const FAMILIES: readonly ThemeId[] = [
  'app',
  'app-contraste-moyen',
  'app-contraste-eleve',
  'app-monochrome',
];

/** Les 8 modes du design system : 4 familles × clair / sombre. */
export const MODES: readonly Mode[] = FAMILIES.flatMap((family) =>
  (['light', 'dark'] as const).map((scheme) => ({ id: `${family}:${scheme}`, family, scheme })),
);

export function familyLabel(family: ThemeId): string {
  return THEMES.find((theme) => theme.id === family)?.shortLabel ?? family;
}

/** Les familles dont une régression se mesure par rapport à la précédente (Monochrome exclu). */
const PROGRESSION: readonly ThemeId[] = ['app', 'app-contraste-moyen', 'app-contraste-eleve'];

/** Tolérance sur l'écart entre deux familles avant de parler de régression. */
const REGRESSION_TOLERANCE = 0.01;

export type CellStatus = 'ok' | 'echec' | 'sans-seuil' | 'absent';

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

function statusOf(ratio: number | null, pair: ColorPair): CellStatus {
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
        status: statusOf(ratio, pair),
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
