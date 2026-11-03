import { DOCUMENT } from '@angular/common';
import { Service, computed, inject, signal } from '@angular/core';
import { ThemeId, ThemeInfo } from './themes';

/** Famille de contraste d'un thème importé (cf. `scripts/themes/familles.mjs`). */
export interface ImportedFamily {
  /** Suffixe de classe : `standard`, `contraste-moyen`… */
  id: string;
  libelle: string;
  /** Couleur primaire claire (hex), pour la pastille d'aperçu. */
  apercu: string;
  defaut: boolean;
  progression: boolean;
}

/** Métadonnées d'un thème importé (le CSS est stocké à part, sous sa propre clé). */
export interface ImportedThemeMeta {
  /** Identifiant technique : `imp-` + 6 caractères a-z0-9. Jamais le nom saisi. */
  id: string;
  /** Nom saisi (1 à 40 caractères) : libellé d'affichage seulement. */
  name: string;
  /** Date d'import (ISO). */
  createdAt: string;
  /** Nom du zip importé. */
  sourceName: string;
  /** Familles du zip, la défaut d'abord. */
  families: ImportedFamily[];
  /** Avertissements du rapport d'import (20 au plus). */
  warnings: string[];
}

export type AddResult = { ok: true } | { ok: false; reason: 'limite' | 'quota' | 'stockage' };

export const MAX_IMPORTED_THEMES = 20;
const MAX_WARNINGS = 20;
const INDEX_KEY = 'catalogue-material-themes-importes';
const CSS_KEY_PREFIX = 'catalogue-material-theme-importe-css:';
const INDEX_VERSION = 1;

const IMPORT_ID = /^imp-[a-z0-9]{6}$/;
const FAMILY_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HEX_COLOR = /^#[0-9a-f]{3,8}$/;

const cssKey = (importId: string) => `${CSS_KEY_PREFIX}${importId}`;
const isString = (value: unknown): value is string => typeof value === 'string';

function isFamily(value: unknown): value is ImportedFamily {
  const family = value as Partial<ImportedFamily> | null;
  return (
    !!family &&
    isString(family.id) &&
    FAMILY_ID.test(family.id) &&
    isString(family.libelle) &&
    isString(family.apercu) &&
    HEX_COLOR.test(family.apercu) &&
    typeof family.defaut === 'boolean' &&
    typeof family.progression === 'boolean'
  );
}

function isMeta(value: unknown): value is ImportedThemeMeta {
  const meta = value as Partial<ImportedThemeMeta> | null;
  return (
    !!meta &&
    isString(meta.id) &&
    IMPORT_ID.test(meta.id) &&
    isString(meta.name) &&
    meta.name.length > 0 &&
    isString(meta.createdAt) &&
    isString(meta.sourceName) &&
    Array.isArray(meta.families) &&
    meta.families.length > 0 &&
    meta.families.every(isFamily) &&
    Array.isArray(meta.warnings) &&
    meta.warnings.every(isString)
  );
}

function isQuotaError(error: unknown): boolean {
  return (
    error instanceof DOMException &&
    (error.name === 'QuotaExceededError' ||
      error.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
      error.code === 22 ||
      error.code === 1014)
  );
}

/**
 * Thèmes importés depuis un zip de tokens (page « Thèmes importés ») : métadonnées et CSS générés,
 * conservés dans `localStorage` (lecture synchrone : le CSS du thème actif doit être posé avant le premier
 * rendu). Reste volontairement minimal : il est dans le bundle initial, la génération n'y est pas.
 */
@Service()
export class ImportedThemes {
  private readonly document = inject(DOCUMENT);
  private readonly list = signal<ImportedThemeMeta[]>(this.readIndex());
  private readonly cache = new Map<string, string>();

  /** Thèmes importés, dans l'ordre d'import. */
  readonly themes = this.list.asReadonly();

  /** Une entrée de thème (`ThemeInfo`) par thème et par famille ; identifiant `<id de l'import>-<famille>`. */
  readonly infos = computed<ThemeInfo[]>(() =>
    this.list().flatMap((theme) =>
      theme.families.map((family) => ({
        id: `${theme.id}-${family.id}`,
        group: 'imported' as const,
        label: family.defaut ? theme.name : `${theme.name}, ${family.libelle.toLowerCase()}`,
        shortLabel: family.libelle,
        color: family.apercu,
        progression: family.progression,
      })),
    ),
  );
  private readonly infosById = computed(() => new Map(this.infos().map((info) => [info.id, info])));

  info(themeId: ThemeId): ThemeInfo | undefined {
    return this.infosById().get(themeId);
  }

  has(themeId: ThemeId): boolean {
    return this.infosById().has(themeId);
  }

  /** CSS du thème importé, lu une seule fois par session ; `null` s'il est introuvable. */
  css(importId: string): string | null {
    const cached = this.cache.get(importId);
    if (cached !== undefined) return cached;
    try {
      const css = this.storage()?.getItem(cssKey(importId)) ?? null;
      if (css !== null) this.cache.set(importId, css);
      return css;
    } catch {
      return null;
    }
  }

  /**
   * Enregistre un thème : d'abord le CSS, puis l'index ; si l'index échoue, le CSS est retiré (rien ne reste
   * à moitié écrit). L'unicité du nom est vérifiée par l'appelant (formulaire), pas ici.
   */
  add(meta: ImportedThemeMeta, css: string): AddResult {
    if (this.list().length >= MAX_IMPORTED_THEMES) return { ok: false, reason: 'limite' };
    const storage = this.storage();
    if (!storage) return { ok: false, reason: 'stockage' };

    const next = [...this.list(), { ...meta, warnings: meta.warnings.slice(0, MAX_WARNINGS) }];
    try {
      storage.setItem(cssKey(meta.id), css);
    } catch (error) {
      return { ok: false, reason: isQuotaError(error) ? 'quota' : 'stockage' };
    }
    try {
      this.writeIndex(storage, next);
    } catch (error) {
      try {
        storage.removeItem(cssKey(meta.id));
      } catch {
        // Rien de plus à faire : la clé orpheline sera ignorée à la lecture (aucune entrée d'index).
      }
      return { ok: false, reason: isQuotaError(error) ? 'quota' : 'stockage' };
    }
    this.cache.set(meta.id, css);
    this.list.set(next);
    return { ok: true };
  }

  /** Supprime un thème : l'index d'abord, puis son CSS. Le basculement du thème actif est fait par `ThemeService`. */
  remove(importId: string): void {
    if (!this.list().some((theme) => theme.id === importId)) return;
    const next = this.list().filter((theme) => theme.id !== importId);
    this.list.set(next);
    this.cache.delete(importId);
    try {
      const storage = this.storage();
      if (storage) {
        this.writeIndex(storage, next);
        storage.removeItem(cssKey(importId));
      }
    } catch {
      // Stockage indisponible : le thème disparaît de la session, mais pas du stockage.
    }
  }

  private storage(): Storage | null {
    try {
      return this.document.defaultView?.localStorage ?? null;
    } catch {
      return null;
    }
  }

  private writeIndex(storage: Storage, themes: ImportedThemeMeta[]): void {
    storage.setItem(INDEX_KEY, JSON.stringify({ version: INDEX_VERSION, themes }));
  }

  /** Lecture tolérante : tout ce qui n'est pas exactement attendu donne une liste vide, sans lever. */
  private readIndex(): ImportedThemeMeta[] {
    try {
      const storage = this.storage();
      const raw = storage?.getItem(INDEX_KEY);
      if (!storage || !raw) return [];
      const stored = JSON.parse(raw) as { version?: unknown; themes?: unknown } | null;
      if (stored?.version !== INDEX_VERSION || !Array.isArray(stored.themes)) return [];
      if (!stored.themes.every(isMeta)) return [];
      const themes = stored.themes.slice(0, MAX_IMPORTED_THEMES);
      return themes.filter((theme) => storage.getItem(cssKey(theme.id)) !== null);
    } catch {
      return [];
    }
  }
}
