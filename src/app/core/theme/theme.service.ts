import { DOCUMENT } from '@angular/common';
import { Service, computed, effect, inject, signal } from '@angular/core';
import { ImportedThemes } from './imported-themes';
import {
  DEFAULT_THEME_ID,
  DENSITIES,
  Density,
  SCHEMES,
  Scheme,
  THEMES,
  ThemeId,
  ThemeInfo,
  parseImportedThemeId,
  themeInfo,
} from './themes';

const STORAGE_KEY = 'catalogue-material-theme';
/** Classe de pont Material des thèmes importés (cf. `styles.scss`) et élément `<style>` portant leur CSS. */
const IMPORTED_CLASS = 'theme-importe';
const IMPORTED_STYLE_ID = 'catalogue-theme-importe';

interface StoredPreferences {
  theme: ThemeId;
  scheme: Scheme;
  density: Density;
}

@Service()
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  // Avant `read()` : la validation d'un identifiant de thème importé stocké est synchrone.
  private readonly imported = inject(ImportedThemes);
  private readonly stored = this.read();

  readonly theme = signal<ThemeId>(this.stored.theme ?? DEFAULT_THEME_ID);
  readonly scheme = signal<Scheme>(this.stored.scheme ?? 'light');
  readonly density = signal<Density>(this.stored.density ?? 0);

  /** Thème actif, quelle que soit sa source (design system, Angular Material ou thème importé). */
  readonly themeCourant = computed<ThemeInfo>(
    () => themeInfo(this.theme()) ?? this.imported.info(this.theme()) ?? themeInfo(DEFAULT_THEME_ID) ?? THEMES[0],
  );

  constructor() {
    effect(() => {
      const theme = this.theme();
      const scheme = this.scheme();
      const density = this.density();

      const classes = this.document.documentElement.classList;
      classes.remove(
        ...THEMES.map((t) => `theme-${t.id}`),
        ...Array.from(classes).filter((c) => c.startsWith('theme-imp-')),
        IMPORTED_CLASS,
        ...SCHEMES.map((s) => `scheme-${s.id}`),
        ...DENSITIES.map((d) => `density-${d}`),
      );
      classes.add(`theme-${theme}`, `scheme-${scheme}`, `density-${density}`);
      this.applyImportedTheme(theme);

      this.write({ theme, scheme, density });
    });
  }

  /** Supprime un thème importé ; si le thème actif en est un, repasse d'abord au thème par défaut. */
  removeImportedTheme(importId: string): void {
    if (parseImportedThemeId(this.theme())?.importId === importId) {
      this.theme.set(DEFAULT_THEME_ID);
    }
    this.imported.remove(importId);
  }

  /** Pose (ou retire) `theme-importe` et l'élément `<style>` qui porte le CSS du seul thème importé actif. */
  private applyImportedTheme(theme: ThemeId): void {
    const importId = parseImportedThemeId(theme)?.importId;
    const css = importId ? this.imported.css(importId) : null;
    let style = this.document.getElementById(IMPORTED_STYLE_ID);

    if (css === null) {
      style?.remove();
      return;
    }
    this.document.documentElement.classList.add(IMPORTED_CLASS);
    if (!style) {
      style = this.document.createElement('style');
      style.id = IMPORTED_STYLE_ID;
      this.document.head.appendChild(style);
    }
    if (style.textContent !== css) {
      style.textContent = css;
    }
  }

  private read(): Partial<StoredPreferences> {
    try {
      const raw = this.document.defaultView?.localStorage.getItem(STORAGE_KEY);
      const value: Partial<StoredPreferences> = raw ? JSON.parse(raw) : {};
      return {
        theme:
          THEMES.some((t) => t.id === value.theme) || (value.theme && this.imported.has(value.theme))
            ? value.theme
            : undefined,
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
