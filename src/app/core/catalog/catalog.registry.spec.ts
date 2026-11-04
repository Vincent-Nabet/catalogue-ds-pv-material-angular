import { routes } from '../../app.routes';
import { CATALOG, CATALOG_CATEGORIES, CATALOG_GROUPS, COMPONENT_ENTRIES } from './catalog.registry';
import { COMPONENT_REFS } from './component-refs';

describe('catalog registry', () => {
  it('should generate one route per entry', () => {
    const paths = routes.map((route) => route.path);
    for (const entry of CATALOG) {
      expect(paths).toContain(`composants/${entry.id}`);
    }
    expect(paths.filter((path) => path?.startsWith('composants/')).length).toBe(CATALOG.length);
  });

  it('should have unique ids and known categories', () => {
    const ids = CATALOG.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
    const categories = CATALOG_CATEGORIES.map((category) => category.id);
    for (const entry of CATALOG) {
      expect(categories).toContain(entry.category);
    }
  });

  it('should group every entry exactly once', () => {
    const grouped = CATALOG_GROUPS.flatMap((group) => group.entries);
    expect(grouped.length).toBe(CATALOG.length);
  });

  it('should list Fondations first, with 3 pages', () => {
    expect(CATALOG_CATEGORIES[0].id).toBe('fondations');
    expect(CATALOG_GROUPS[0].entries.length).toBe(3);
  });

  it('should have a Material reference (VO name + API) for every component page, and only those', () => {
    const ids = COMPONENT_ENTRIES.map((entry) => entry.id).sort();
    expect(Object.keys(COMPONENT_REFS).sort()).toEqual(ids);
    for (const ref of Object.values(COMPONENT_REFS)) {
      expect(ref.vo).not.toBe('');
      expect(ref.api).not.toBe('');
    }
  });

  it('should count the 35 component pages apart from Fondations', () => {
    expect(COMPONENT_ENTRIES.length).toBe(35);
    expect(COMPONENT_ENTRIES.every((entry) => entry.category !== 'fondations')).toBe(true);
  });
});
