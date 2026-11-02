import {
  contrastRatio,
  formatContrast,
  meetsMinimum,
  parseCssColor,
  relativeLuminance,
  toHex,
  truncateRatio,
} from './contrast';

const rgb = (r: number, g: number, b: number, a = 1) => ({ r, g, b, a });

describe('contrast', () => {
  it('should give 21 for black on white', () => {
    expect(contrastRatio(rgb(0, 0, 0), rgb(255, 255, 255))).toBeCloseTo(21, 5);
    expect(contrastRatio(rgb(255, 255, 255), rgb(0, 0, 0))).toBeCloseTo(21, 5);
  });

  it('should compute the olive of the design system on its surface', () => {
    // #86A315 sur #FAFAF5
    expect(contrastRatio(rgb(0x86, 0xa3, 0x15), rgb(0xfa, 0xfa, 0xf5))).toBeCloseTo(2.76, 2);
  });

  it('should have a luminance of 0 for black and 1 for white', () => {
    expect(relativeLuminance(rgb(0, 0, 0))).toBe(0);
    expect(relativeLuminance(rgb(255, 255, 255))).toBeCloseTo(1, 10);
  });

  it('should parse rgb() and rgba()', () => {
    expect(parseCssColor('rgb(134, 163, 21)')).toEqual(rgb(134, 163, 21));
    expect(parseCssColor('rgba(0, 0, 0, 0.5)')).toEqual(rgb(0, 0, 0, 0.5));
    expect(parseCssColor('rgb(1 2 3 / 25%)')).toEqual(rgb(1, 2, 3, 0.25));
    expect(parseCssColor('rgba(0, 0, 0, 0)')).toEqual(rgb(0, 0, 0, 0));
  });

  it('should return null for an empty or unknown string', () => {
    expect(parseCssColor('')).toBeNull();
    expect(parseCssColor('transparent')).toBeNull();
    expect(parseCssColor('light-dark(#fff, #000)')).toBeNull();
  });

  it('should give no ratio for a transparent color', () => {
    expect(contrastRatio(rgb(0, 0, 0, 0.5), rgb(255, 255, 255))).toBeNull();
    expect(contrastRatio(rgb(0, 0, 0), rgb(255, 255, 255, 0.99))).toBeNull();
    expect(contrastRatio(null, rgb(255, 255, 255))).toBeNull();
  });

  it('should truncate instead of rounding', () => {
    expect(truncateRatio(4.4999)).toBe(4.49);
    expect(truncateRatio(4.5)).toBe(4.5);
    expect(truncateRatio(2.76)).toBe(2.76);
    expect(formatContrast(4.4999)).toBe('4,49 : 1');
    expect(formatContrast(21)).toBe('21,00 : 1');
  });

  it('should compare the raw value to the minimum', () => {
    expect(meetsMinimum(4.5, 4.5)).toBe(true);
    expect(meetsMinimum(4.4999, 4.5)).toBe(false);
    expect(meetsMinimum(3, 3)).toBe(true);
  });

  it('should format a color as uppercase hex', () => {
    expect(toHex(rgb(134, 163, 21))).toBe('#86A315');
    expect(toHex(rgb(0, 0, 0))).toBe('#000000');
  });
});
