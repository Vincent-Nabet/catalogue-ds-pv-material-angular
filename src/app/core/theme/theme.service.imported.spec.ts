import { TestBed } from '@angular/core/testing';
import { injectIsDesignSystem } from '../tokens/theme-key';
import { ImportedFamily, ImportedThemeMeta, ImportedThemes } from './imported-themes';
import { ThemeService } from './theme.service';
import { DEFAULT_THEME_ID } from './themes';

const STYLE_ID = 'catalogue-theme-importe';
const STANDARD: ImportedFamily = {
  id: 'standard',
  libelle: 'Standard',
  apercu: '#86a315',
  defaut: true,
  progression: true,
};
const MOYEN: ImportedFamily = {
  id: 'contraste-moyen',
  libelle: 'Contraste moyen',
  apercu: '#657c08',
  defaut: false,
  progression: true,
};

const meta = (id: string, name: string): ImportedThemeMeta => ({
  id,
  name,
  createdAt: '2026-11-03T08:00:00.000Z',
  sourceName: 'tokens.zip',
  families: [STANDARD, MOYEN],
  warnings: [],
});

describe('ThemeService with imported themes', () => {
  const html = document.documentElement;
  const style = () => document.getElementById(STYLE_ID);

  beforeEach(() => {
    localStorage.clear();
    html.className = '';
    style()?.remove();
  });

  /** Importe deux thèmes avant de créer le service (comme après un rechargement de la page). */
  function seed() {
    const imported = TestBed.inject(ImportedThemes);
    imported.add(meta('imp-aaaaaa', 'Premier'), 'html.theme-imp-aaaaaa-standard { --app-x: 1; }');
    imported.add(meta('imp-bbbbbb', 'Second'), 'html.theme-imp-bbbbbb-standard { --app-x: 2; }');
    return imported;
  }

  it('should apply an imported theme: classes and <style> with its CSS', () => {
    seed();
    const service = TestBed.inject(ThemeService);
    service.theme.set('imp-aaaaaa-standard');
    TestBed.tick();

    expect(html.classList).toContain('theme-imp-aaaaaa-standard');
    expect(html.classList).toContain('theme-importe');
    expect(html.classList).toContain('scheme-light');
    expect(style()?.tagName).toBe('STYLE');
    expect(style()?.textContent).toBe('html.theme-imp-aaaaaa-standard { --app-x: 1; }');
    expect(document.head.contains(style())).toBe(true);
  });

  it('should remove classes and <style> when going back to another theme', () => {
    seed();
    const service = TestBed.inject(ThemeService);
    service.theme.set('imp-aaaaaa-contraste-moyen');
    TestBed.tick();
    service.theme.set('azur');
    TestBed.tick();

    expect(html.classList).toContain('theme-azur');
    expect(html.classList).not.toContain('theme-importe');
    expect([...html.classList].some((c) => c.startsWith('theme-imp-'))).toBe(false);
    expect(style()).toBeNull();
  });

  it('should replace the <style> content when switching between two imports', () => {
    seed();
    const service = TestBed.inject(ThemeService);
    service.theme.set('imp-aaaaaa-standard');
    TestBed.tick();
    service.theme.set('imp-bbbbbb-standard');
    TestBed.tick();

    expect(html.classList).toContain('theme-imp-bbbbbb-standard');
    expect(html.classList).not.toContain('theme-imp-aaaaaa-standard');
    expect(document.querySelectorAll(`#${STYLE_ID}`).length).toBe(1);
    expect(style()?.textContent).toContain('--app-x: 2');
    expect(style()?.textContent).not.toContain('--app-x: 1');
  });

  it('should keep an imported theme across a reload', () => {
    seed();
    const service = TestBed.inject(ThemeService);
    service.theme.set('imp-bbbbbb-standard');
    TestBed.tick();

    TestBed.resetTestingModule();
    html.className = '';
    style()?.remove();
    const restored = TestBed.inject(ThemeService);
    expect(restored.theme()).toBe('imp-bbbbbb-standard');
    TestBed.tick();
    expect(html.classList).toContain('theme-importe');
    expect(style()?.textContent).toContain('--app-x: 2');
  });

  it('should fall back to the default theme when the stored imported theme no longer exists', () => {
    localStorage.setItem(
      'catalogue-material-theme',
      JSON.stringify({ theme: 'imp-zzzzzz-standard', scheme: 'dark', density: 1 }),
    );
    const service = TestBed.inject(ThemeService);
    expect(service.theme()).toBe(DEFAULT_THEME_ID);
    expect(service.scheme()).toBe('dark');
    TestBed.tick();
    expect(html.classList).not.toContain('theme-importe');
    expect(style()).toBeNull();
  });

  it('should fall back to the default theme when the family of an imported theme no longer exists', () => {
    seed();
    localStorage.setItem(
      'catalogue-material-theme',
      JSON.stringify({ theme: 'imp-aaaaaa-monochrome' }),
    );
    TestBed.resetTestingModule();
    expect(TestBed.inject(ThemeService).theme()).toBe(DEFAULT_THEME_ID);
  });

  describe('removeImportedTheme', () => {
    it('should switch to the default theme first when the active theme is removed', () => {
      const imported = seed();
      const service = TestBed.inject(ThemeService);
      service.theme.set('imp-aaaaaa-contraste-moyen');
      TestBed.tick();

      service.removeImportedTheme('imp-aaaaaa');
      TestBed.tick();

      expect(service.theme()).toBe(DEFAULT_THEME_ID);
      expect(imported.has('imp-aaaaaa-standard')).toBe(false);
      expect(localStorage.getItem('catalogue-material-theme-importe-css:imp-aaaaaa')).toBeNull();
      expect(style()).toBeNull();
      expect(html.classList).not.toContain('theme-importe');
      expect(html.classList).toContain(`theme-${DEFAULT_THEME_ID}`);
      expect(JSON.parse(localStorage.getItem('catalogue-material-theme') ?? '{}').theme).toBe(
        DEFAULT_THEME_ID,
      );
    });

    it('should keep the active theme when another import is removed', () => {
      const imported = seed();
      const service = TestBed.inject(ThemeService);
      service.theme.set('imp-bbbbbb-standard');
      TestBed.tick();

      service.removeImportedTheme('imp-aaaaaa');
      TestBed.tick();

      expect(service.theme()).toBe('imp-bbbbbb-standard');
      expect(imported.themes().map((theme) => theme.id)).toEqual(['imp-bbbbbb']);
      expect(style()?.textContent).toContain('--app-x: 2');
    });

    it('should keep a non-imported active theme', () => {
      seed();
      const service = TestBed.inject(ThemeService);
      service.theme.set('violet');
      service.removeImportedTheme('imp-aaaaaa');
      expect(service.theme()).toBe('violet');
    });
  });

  describe('themeCourant', () => {
    it('should describe a design system theme', () => {
      const service = TestBed.inject(ThemeService);
      expect(service.themeCourant().id).toBe(DEFAULT_THEME_ID);
      expect(service.themeCourant().group).toBe('design-system');
    });

    it('should describe an Angular Material theme', () => {
      const service = TestBed.inject(ThemeService);
      service.theme.set('violet');
      expect(service.themeCourant()).toMatchObject({
        id: 'violet',
        group: 'angular-material',
        label: 'Violet',
      });
    });

    it('should describe an imported theme', () => {
      seed();
      const service = TestBed.inject(ThemeService);
      service.theme.set('imp-aaaaaa-contraste-moyen');
      expect(service.themeCourant()).toMatchObject({
        id: 'imp-aaaaaa-contraste-moyen',
        group: 'imported',
        label: 'Premier, contraste moyen',
        color: '#657c08',
      });
    });
  });

  describe('injectIsDesignSystem', () => {
    it('should be true for a design system theme and for an imported theme, false for Angular Material', () => {
      seed();
      const service = TestBed.inject(ThemeService);
      const isDesignSystem = TestBed.runInInjectionContext(() => injectIsDesignSystem());

      expect(isDesignSystem()).toBe(true);
      service.theme.set('azur');
      expect(isDesignSystem()).toBe(false);
      service.theme.set('imp-aaaaaa-standard');
      expect(isDesignSystem()).toBe(true);
    });
  });
});
