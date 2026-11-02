import {
  COLOR_PAIRS,
  COLOR_ROLES,
  colorVar,
  pairGroup,
  pairLabel,
  pairsOfGroup,
  unpairedRoles,
} from './color-roles';

const ALL_ROLES = COLOR_ROLES.flatMap((group) => group.roles);

describe('color roles', () => {
  it('should have unique pair ids', () => {
    const ids = COLOR_PAIRS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('should only use known roles in pairs', () => {
    for (const p of COLOR_PAIRS) {
      expect(ALL_ROLES, p.id).toContain(p.fg);
      expect(ALL_ROLES, p.id).toContain(p.bg);
    }
  });

  it('should put each role in a single group', () => {
    expect(new Set(ALL_ROLES).size).toBe(ALL_ROLES.length);
  });

  it('should have the 49 MD3 roles and 15 design system roles', () => {
    const count = (origin: string) =>
      COLOR_ROLES.filter((g) => g.origin === origin).flatMap((g) => g.roles).length;
    expect(count('md3')).toBe(49);
    expect(count('design-system')).toBe(15);
  });

  it('should not pair shadow or scrim, which have no usable ratio', () => {
    for (const p of COLOR_PAIRS) {
      for (const role of ['shadow', 'scrim']) {
        expect([p.fg, p.bg]).not.toContain(role);
      }
    }
  });

  it('should give a minimum matching the kind of pair', () => {
    const expected = { texte: 4.5, interface: 3, decoratif: null };
    for (const p of COLOR_PAIRS) {
      expect(p.min).toBe(expected[p.kind]);
    }
  });

  it('should attach every pair to exactly one group', () => {
    const grouped = COLOR_ROLES.flatMap((group) => pairsOfGroup(group));
    expect(grouped.length).toBe(COLOR_PAIRS.length);
    expect(pairGroup(COLOR_PAIRS[0]).roles).toContain(COLOR_PAIRS[0].fg);
  });

  it('should list the roles that are in no pair', () => {
    const roles = unpairedRoles().map((r) => r.role);
    expect(roles).toContain('shadow');
    expect(roles).toContain('primary-fixed-dim');
    expect(roles).not.toContain('primary');
  });

  it('should build variable names per origin and prefix', () => {
    expect(colorVar('on-primary', '--mat-sys-')).toBe('--mat-sys-on-primary');
    expect(colorVar('on-primary', '--md-sys-color-')).toBe('--md-sys-color-on-primary');
    expect(colorVar('success', '--mat-sys-')).toBe('--app-color-success');
  });

  it('should label a pair from its roles', () => {
    expect(pairLabel(COLOR_PAIRS[0])).toBe('on-primary sur primary');
  });
});
