import { ColorPair } from './color-roles';
import { Rgba } from './contrast';
import { MODES, ModeValues, buildMatrix, summary } from './contrast-matrix';

const BLACK: Rgba = { r: 0, g: 0, b: 0, a: 1 };
const WHITE: Rgba = { r: 255, g: 255, b: 255, a: 1 };
const GRAY: Rgba = { r: 150, g: 150, b: 150, a: 1 };

const pair = (kind: ColorPair['kind'], min: ColorPair['min']): ColorPair => ({
  id: 'fg/bg',
  fg: 'fg',
  bg: 'bg',
  kind,
  min,
  usage: '',
  origin: 'md3',
});

/** Une paire (fg sur bg) par mode : `fg` varie selon le mode (noir par défaut), `bg` reste blanc. */
function values(fgByMode: Record<string, Rgba | null>): ModeValues {
  return Object.fromEntries(
    MODES.map((mode) => [mode.id, { fg: mode.id in fgByMode ? fgByMode[mode.id] : BLACK, bg: WHITE }]),
  );
}

const cell = (rows: ReturnType<typeof buildMatrix>, id: string) =>
  rows[0].cells.find((c) => c.mode.id === id)!;

describe('contrast matrix', () => {
  it('should have 8 modes: 4 families in light and dark', () => {
    expect(MODES.length).toBe(8);
  });

  it('should give a status per cell', () => {
    const rows = buildMatrix(values({ 'app:light': GRAY, 'app:dark': null }), [pair('texte', 4.5)]);
    expect(cell(rows, 'app:light').status).toBe('echec');
    expect(cell(rows, 'app:dark').status).toBe('absent');
    expect(cell(rows, 'app-monochrome:light').status).toBe('ok');
  });

  it('should have no status threshold for a decorative pair', () => {
    const rows = buildMatrix(values({ 'app:light': GRAY }), [pair('decoratif', null)]);
    expect(cell(rows, 'app:light').status).toBe('sans-seuil');
    expect(cell(rows, 'app:light').ratio).toBeGreaterThan(1);
  });

  it('should detect a regression when high contrast is below medium contrast', () => {
    const rows = buildMatrix(
      values({ 'app-contraste-moyen:light': BLACK, 'app-contraste-eleve:light': GRAY }),
      [pair('texte', 4.5)],
    );
    const high = cell(rows, 'app-contraste-eleve:light');
    expect(high.regression).toBe(true);
    expect(high.previousRatio).toBeCloseTo(21, 5);
    expect(cell(rows, 'app-contraste-moyen:light').regression).toBe(false);
    expect(cell(rows, 'app-contraste-eleve:dark').regression).toBe(false);
  });

  it('should compare medium to standard, in the same scheme only', () => {
    const rows = buildMatrix(
      values({ 'app:dark': BLACK, 'app-contraste-moyen:dark': GRAY }),
      [pair('texte', 4.5)],
    );
    expect(cell(rows, 'app-contraste-moyen:dark').regression).toBe(true);
    expect(cell(rows, 'app-contraste-moyen:light').regression).toBe(false);
  });

  it('should not flag a difference within the tolerance', () => {
    const nearBlack: Rgba = { r: 0, g: 0, b: 1, a: 1 };
    const rows = buildMatrix(
      values({ 'app:light': BLACK, 'app-contraste-moyen:light': nearBlack }),
      [pair('texte', 4.5)],
    );
    expect(cell(rows, 'app-contraste-moyen:light').regression).toBe(false);
  });

  it('should never flag Monochrome as a regression', () => {
    const rows = buildMatrix(
      values({ 'app-contraste-eleve:light': BLACK, 'app-monochrome:light': GRAY }),
      [pair('texte', 4.5)],
    );
    expect(cell(rows, 'app-monochrome:light').regression).toBe(false);
  });

  it('should summarise failures per mode and kind, and regressions', () => {
    const rows = buildMatrix(
      values({ 'app:light': BLACK, 'app-contraste-moyen:light': GRAY }),
      [pair('texte', 4.5), pair('interface', 3)],
    );
    const result = summary(rows);
    // Gris 150 sur blanc : 2,95, sous 4,5 comme sous 3.
    expect(result['app-contraste-moyen:light'].echecs).toEqual({
      texte: 1,
      interface: 1,
      decoratif: 0,
    });
    expect(result['app-contraste-moyen:light'].total).toBe(2);
    expect(result['app-contraste-moyen:light'].regressions).toBe(2);
    expect(result['app:light'].total).toBe(0);
  });
});
