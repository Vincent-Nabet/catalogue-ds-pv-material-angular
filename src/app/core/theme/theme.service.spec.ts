import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { DEFAULT_THEME_ID } from './themes';

describe('ThemeService', () => {
  const html = document.documentElement;

  beforeEach(() => {
    localStorage.clear();
    html.className = '';
  });

  it('should apply default classes on <html>', () => {
    TestBed.inject(ThemeService);
    TestBed.tick();
    expect(html.classList).toContain(`theme-${DEFAULT_THEME_ID}`);
    expect(html.classList).toContain('scheme-light');
    expect(html.classList).toContain('density-0');
  });

  it('should swap classes when preferences change', () => {
    const service = TestBed.inject(ThemeService);
    TestBed.tick();
    service.theme.set('violet');
    service.scheme.set('dark');
    service.density.set(3);
    TestBed.tick();
    expect(html.classList).toContain('theme-violet');
    expect(html.classList).not.toContain(`theme-${DEFAULT_THEME_ID}`);
    expect(html.classList).toContain('scheme-dark');
    expect(html.classList).not.toContain('scheme-light');
    expect(html.classList).toContain('density-3');
    expect(html.classList).not.toContain('density-0');
  });

  it('should persist and restore preferences', () => {
    const service = TestBed.inject(ThemeService);
    service.theme.set('vert');
    service.scheme.set('dark');
    service.density.set(2);
    TestBed.tick();

    TestBed.resetTestingModule();
    const restored = TestBed.inject(ThemeService);
    expect(restored.theme()).toBe('vert');
    expect(restored.scheme()).toBe('dark');
    expect(restored.density()).toBe(2);
  });

  it('should ignore invalid stored values', () => {
    localStorage.setItem(
      'catalogue-material-theme',
      JSON.stringify({ theme: 'inconnu', scheme: 'x', density: 9 }),
    );
    const service = TestBed.inject(ThemeService);
    expect(service.theme()).toBe(DEFAULT_THEME_ID);
    expect(service.scheme()).toBe('light');
    expect(service.density()).toBe(0);
  });
});
