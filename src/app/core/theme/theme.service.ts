import { DOCUMENT } from '@angular/common';
import { Service, effect, inject, signal } from '@angular/core';
import { DENSITIES, Density, SCHEMES, Scheme, THEMES, ThemeId } from './themes';

const STORAGE_KEY = 'catalogue-material-theme';

interface StoredPreferences {
  theme: ThemeId;
  scheme: Scheme;
  density: Density;
}

@Service()
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly stored = this.read();

  readonly theme = signal<ThemeId>(this.stored.theme ?? 'azur');
  readonly scheme = signal<Scheme>(this.stored.scheme ?? 'system');
  readonly density = signal<Density>(this.stored.density ?? 0);

  constructor() {
    effect(() => {
      const theme = this.theme();
      const scheme = this.scheme();
      const density = this.density();

      const classes = this.document.documentElement.classList;
      classes.remove(
        ...THEMES.map((t) => `theme-${t.id}`),
        ...SCHEMES.map((s) => `scheme-${s.id}`),
        ...DENSITIES.map((d) => `density-${d}`),
      );
      classes.add(`theme-${theme}`, `scheme-${scheme}`, `density-${density}`);

      this.write({ theme, scheme, density });
    });
  }

  private read(): Partial<StoredPreferences> {
    try {
      const raw = this.document.defaultView?.localStorage.getItem(STORAGE_KEY);
      const value: Partial<StoredPreferences> = raw ? JSON.parse(raw) : {};
      return {
        theme: THEMES.some((t) => t.id === value.theme) ? value.theme : undefined,
        scheme: SCHEMES.some((s) => s.id === value.scheme) ? value.scheme : undefined,
        density: DENSITIES.includes(value.density as Density) ? value.density : undefined,
      };
    } catch {
      return {};
    }
  }

  private write(preferences: StoredPreferences): void {
    try {
      this.document.defaultView?.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch {
      // Stockage indisponible : les préférences ne sont simplement pas conservées.
    }
  }
}
