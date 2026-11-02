import { familyVariables } from './color-families';

describe('familyVariables', () => {
  it('should map a family to the four intermediate variables read by the pages', () => {
    expect(familyVariables('success')).toEqual({
      '--r-f': 'var(--app-color-success)',
      '--r-sf': 'var(--app-color-on-success)',
      '--r-c': 'var(--app-color-success-container)',
      '--r-sc': 'var(--app-color-on-success-container)',
    });
  });
});
