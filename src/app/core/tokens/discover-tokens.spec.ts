import { classifyToken, declaredProperties, missing, unlisted } from './discover-tokens';

/** Feuille réelle construite par l'environnement de test (jsdom). */
function sheetOf(css: string): CSSStyleSheet {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(css);
  return sheet;
}

describe('declaredProperties', () => {
  it('should find the custom properties of a simple rule and ignore other names', () => {
    const sheet = sheetOf(':root { --app-a: 1px; --other: 2px; --application: 3px; color: red; }');
    expect([...declaredProperties([sheet], 'app')]).toEqual(['--app-a']);
  });

  it('should go through @media and @layer groups', () => {
    const sheet = sheetOf(`
      @media (min-width: 1px) { .x { --app-b: 3px; } }
      @layer base { .y { --app-c: 4px; } }
      @supports (display: grid) { .z { --app-d: 5px; } }
    `);
    expect([...declaredProperties([sheet], 'app')]).toEqual(['--app-b', '--app-c', '--app-d']);
  });

  it('should follow an @import rule to its sheet', () => {
    const imported = sheetOf(':root { --app-imported: 1px; }');
    const importRule = { styleSheet: imported } as unknown as CSSRule;
    const parent = { cssRules: [importRule] } as unknown as CSSStyleSheet;
    expect([...declaredProperties([parent], 'app')]).toEqual(['--app-imported']);
  });

  it('should ignore a sheet whose rules cannot be read', () => {
    const blocked = {
      get cssRules(): CSSRuleList {
        throw new DOMException('Blocked', 'SecurityError');
      },
    } as unknown as CSSStyleSheet;
    const sheet = sheetOf(':root { --app-a: 1px; }');
    expect(() => declaredProperties([blocked, sheet], 'app')).not.toThrow();
    expect([...declaredProperties([blocked, sheet], 'app')]).toEqual(['--app-a']);
  });

  it('should make the union over several theme classes, without duplicates', () => {
    const sheet = sheetOf(`
      .theme-a { --app-color-x: red; --app-color-y: red; }
      .theme-b { --app-color-x: blue; --app-color-z: blue; }
    `);
    expect([...declaredProperties([sheet], 'app')]).toEqual([
      '--app-color-x',
      '--app-color-y',
      '--app-color-z',
    ]);
  });

  it('should use the given prefix', () => {
    const sheet = sheetOf(':root { --app-a: 1; --ds-b: 2; }');
    expect([...declaredProperties([sheet], 'ds')]).toEqual(['--ds-b']);
  });

  it('should work on the sheets of the document', () => {
    const style = document.createElement('style');
    style.textContent = ':root { --app-in-document: 1px; }';
    document.head.append(style);
    try {
      expect(declaredProperties(Array.from(document.styleSheets), 'app').has('--app-in-document')).toBe(
        true,
      );
    } finally {
      style.remove();
    }
  });
});

describe('classifyToken', () => {
  it('should recognize the known families', () => {
    expect(classifyToken('--app-color-on-success', 'app')).toEqual({ kind: 'color', id: 'on-success' });
    expect(classifyToken('--app-shape-corner-extra-extra-large', 'app')).toEqual({
      kind: 'corner',
      id: 'extra-extra-large',
    });
    expect(classifyToken('--app-spacing-large-increased', 'app')).toEqual({
      kind: 'spacing',
      id: 'large-increased',
    });
    expect(classifyToken('--app-typescale-emphasized-title-medium-weight', 'app')).toEqual({
      kind: 'weight',
      id: 'title-medium',
    });
  });

  it('should return other for an unknown shape of name or a name outside the prefix', () => {
    expect(classifyToken('--app-elevation-1', 'app').kind).toBe('other');
    expect(classifyToken('--app-color-', 'app').kind).toBe('other');
    expect(classifyToken('--app-typescale-body-size', 'app').kind).toBe('other');
    expect(classifyToken('--mat-sys-primary', 'app')).toEqual({ kind: 'other', id: '--mat-sys-primary' });
  });
});

describe('unlisted and missing', () => {
  it('should keep the order of appearance', () => {
    expect(unlisted(new Set(['--a', '--b', '--c']), ['--b'])).toEqual(['--a', '--c']);
    expect(missing(['--x', '--b', '--y'], new Set(['--b']))).toEqual(['--x', '--y']);
  });

  it('should return nothing when both sides agree', () => {
    expect(unlisted(['--a'], ['--a'])).toEqual([]);
    expect(missing(['--a'], ['--a'])).toEqual([]);
  });
});
