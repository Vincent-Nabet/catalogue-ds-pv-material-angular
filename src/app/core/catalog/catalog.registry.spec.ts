import { routes } from '../../app.routes';
import { CATALOG, CATALOG_CATEGORIES, CATALOG_GROUPS } from './catalog.registry';

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
});
