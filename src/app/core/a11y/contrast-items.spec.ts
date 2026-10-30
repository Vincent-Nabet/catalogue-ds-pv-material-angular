import type { NodeResult, Result } from 'axe-core';
import { formatRatio, toContrastItems } from './contrast-items';

function node(element: HTMLElement | undefined, data: Record<string, unknown>): NodeResult {
  return {
    html: '',
    target: [],
    element,
    any: [{ id: 'color-contrast', impact: 'serious', message: '', data }],
    all: [],
    none: [],
  };
}

function rule(nodes: NodeResult[], id = 'color-contrast'): Result {
  return { id, nodes } as Result;
}

const span = () => document.createElement('span');

describe('toContrastItems', () => {
  it('should map violations, passes and incomplete results with their statuses', () => {
    const [a, b, c] = [span(), span(), span()];
    const items = toContrastItems({
      violations: [
        rule([
          node(a, {
            contrastRatio: 2.66,
            expectedContrastRatio: '4.5:1',
            fgColor: '#86a315',
            bgColor: '#f5f6ef',
          }),
        ]),
      ],
      passes: [rule([node(b, { contrastRatio: 12.6, expectedContrastRatio: '4.5:1' })])],
      incomplete: [rule([node(c, { messageKey: 'bgGradient' })])],
    });

    expect(items.map((item) => item.status)).toEqual(['fail', 'unknown', 'pass']);
    expect(items[0]).toMatchObject({
      element: a,
      ratio: 2.66,
      expected: 4.5,
      foreground: '#86a315',
      background: '#f5f6ef',
      reason: null,
    });
    expect(items[1]).toMatchObject({ element: c, ratio: null, reason: 'fond en dégradé' });
    expect(items[2]).toMatchObject({ element: b, ratio: 12.6 });
  });

  it('should list the weakest failures first', () => {
    const [a, b, c] = [span(), span(), span()];
    const items = toContrastItems({
      violations: [
        rule([
          node(a, { contrastRatio: 3.9 }),
          node(b, { contrastRatio: 2.1 }),
          node(c, { contrastRatio: 3.2 }),
        ]),
      ],
      passes: [],
      incomplete: [],
    });
    expect(items.map((item) => item.element)).toEqual([b, c, a]);
  });

  it('should ignore nodes without an element and other rules', () => {
    const items = toContrastItems({
      violations: [
        rule([node(undefined, { contrastRatio: 1.5 })]),
        rule([node(span(), { contrastRatio: 1.5 })], 'label'),
      ],
      passes: [],
      incomplete: [],
    });
    expect(items).toEqual([]);
  });

  it('should fall back to a generic reason for an unknown message key', () => {
    const [item] = toContrastItems({
      violations: [],
      passes: [],
      incomplete: [rule([node(span(), { messageKey: 'nouvelleCle' })])],
    });
    expect(item.reason).toBe('contraste indéterminé');
  });
});

describe('formatRatio', () => {
  it('should format with a decimal comma and the ": 1" suffix', () => {
    expect(formatRatio(2.66)).toBe('2,66 : 1');
    expect(formatRatio(4.5)).toBe('4,50 : 1');
    expect(formatRatio(21)).toBe('21,00 : 1');
  });
});
