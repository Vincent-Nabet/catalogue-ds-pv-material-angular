import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import {
  ImportedFamily,
  ImportedThemeMeta,
  ImportedThemes,
  MAX_IMPORTED_THEMES,
} from './imported-themes';
import { parseImportedThemeId } from './themes';

const INDEX_KEY = 'catalogue-material-themes-importes';
const cssKey = (id: string) => `catalogue-material-theme-importe-css:${id}`;
const CATALOGUE_KEYS = () =>
  Object.keys(localStorage).filter((key) => key.startsWith('catalogue-material-theme'));

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

function meta(
  id: string,
  name = `Thème ${id}`,
  families: ImportedFamily[] = [STANDARD, MOYEN],
): ImportedThemeMeta {
  return {
    id,
    name,
    createdAt: '2026-11-03T08:00:00.000Z',
    sourceName: 'tokens.zip',
    families,
    warnings: [],
  };
}

const quotaError = () => new DOMException('quota', 'QuotaExceededError');

describe('ImportedThemes', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.restoreAllMocks());

  it('should start empty', () => {
    const service = TestBed.inject(ImportedThemes);
    expect(service.themes()).toEqual([]);
    expect(service.infos()).toEqual([]);
  });

  it('should keep a theme after a reload', () => {
    const service = TestBed.inject(ImportedThemes);
    expect(service.add(meta('imp-aaaaaa', 'Essai'), '.css-a {}')).toEqual({ ok: true });

    TestBed.resetTestingModule();
    const reloaded = TestBed.inject(ImportedThemes);
    expect(reloaded.themes().map((theme) => theme.name)).toEqual(['Essai']);
    expect(reloaded.css('imp-aaaaaa')).toBe('.css-a {}');
  });

  it('should store the CSS under its own key and only metadata in the index', () => {
    TestBed.inject(ImportedThemes).add(meta('imp-aaaaaa'), '.css-a {}');
    expect(localStorage.getItem(cssKey('imp-aaaaaa'))).toBe('.css-a {}');
    expect(localStorage.getItem(INDEX_KEY)).not.toContain('css-a');
    expect(JSON.parse(localStorage.getItem(INDEX_KEY) ?? '{}').version).toBe(1);
  });

  it('should keep several themes, in import order', () => {
    const service = TestBed.inject(ImportedThemes);
    service.add(meta('imp-aaaaaa', 'Un'), 'a');
    service.add(meta('imp-bbbbbb', 'Deux'), 'b');
    expect(service.themes().map((theme) => theme.name)).toEqual(['Un', 'Deux']);
    expect(service.css('imp-bbbbbb')).toBe('b');
  });

  it('should remove a theme and its CSS', () => {
    const service = TestBed.inject(ImportedThemes);
    service.add(meta('imp-aaaaaa'), 'a');
    service.add(meta('imp-bbbbbb'), 'b');
    service.remove('imp-aaaaaa');
    expect(service.themes().map((theme) => theme.id)).toEqual(['imp-bbbbbb']);
    expect(localStorage.getItem(cssKey('imp-aaaaaa'))).toBeNull();
    expect(service.css('imp-aaaaaa')).toBeNull();

    TestBed.resetTestingModule();
    expect(
      TestBed.inject(ImportedThemes)
        .themes()
        .map((theme) => theme.id),
    ).toEqual(['imp-bbbbbb']);
  });

  it('should ignore the removal of an unknown theme', () => {
    const service = TestBed.inject(ImportedThemes);
    service.add(meta('imp-aaaaaa'), 'a');
    service.remove('imp-zzzzzz');
    expect(service.themes().length).toBe(1);
  });

  it('should refuse more than the maximum number of themes', () => {
    const service = TestBed.inject(ImportedThemes);
    for (let i = 0; i < MAX_IMPORTED_THEMES; i++) {
      expect(service.add(meta(`imp-${String(i).padStart(6, '0')}`), 'x').ok).toBe(true);
    }
    expect(service.add(meta('imp-zzzzzz'), 'x')).toEqual({ ok: false, reason: 'limite' });
    expect(service.themes().length).toBe(MAX_IMPORTED_THEMES);
    expect(localStorage.getItem(cssKey('imp-zzzzzz'))).toBeNull();
  });

  it('should not check the uniqueness of names (the form does)', () => {
    const service = TestBed.inject(ImportedThemes);
    expect(service.add(meta('imp-aaaaaa', 'Même nom'), 'a').ok).toBe(true);
    expect(service.add(meta('imp-bbbbbb', 'Même nom'), 'b').ok).toBe(true);
  });

  it('should keep at most 20 warnings', () => {
    const service = TestBed.inject(ImportedThemes);
    const warnings = Array.from({ length: 30 }, (_, i) => `avertissement ${i}`);
    service.add({ ...meta('imp-aaaaaa'), warnings }, 'a');
    expect(service.themes()[0].warnings.length).toBe(20);
  });

  describe('storage failures', () => {
    it('should report a full quota when writing the CSS and leave no key', () => {
      const service = TestBed.inject(ImportedThemes);
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw quotaError();
      });
      expect(service.add(meta('imp-aaaaaa'), 'a')).toEqual({ ok: false, reason: 'quota' });
      vi.restoreAllMocks();
      expect(CATALOGUE_KEYS()).toEqual([]);
      expect(service.themes()).toEqual([]);
    });

    it('should remove the CSS key when the index cannot be written', () => {
      const service = TestBed.inject(ImportedThemes);
      const original = Storage.prototype.setItem;
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(function (
        this: Storage,
        key: string,
        value: string,
      ) {
        if (key === INDEX_KEY) throw quotaError();
        original.call(this, key, value);
      });
      expect(service.add(meta('imp-aaaaaa'), 'a')).toEqual({ ok: false, reason: 'quota' });
      vi.restoreAllMocks();
      expect(CATALOGUE_KEYS()).toEqual([]);
      expect(service.themes()).toEqual([]);
    });

    it('should report an unavailable storage', () => {
      const blocked = {
        defaultView: {
          get localStorage(): Storage {
            throw new DOMException('denied', 'SecurityError');
          },
        },
      };
      TestBed.overrideProvider(DOCUMENT, { useValue: blocked });
      const service = TestBed.inject(ImportedThemes);
      expect(service.themes()).toEqual([]);
      expect(service.add(meta('imp-aaaaaa'), 'a')).toEqual({ ok: false, reason: 'stockage' });
      expect(service.css('imp-aaaaaa')).toBeNull();
      expect(() => service.remove('imp-aaaaaa')).not.toThrow();
    });

    it('should report a failing write as unavailable storage', () => {
      const service = TestBed.inject(ImportedThemes);
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new DOMException('refusé', 'SecurityError');
      });
      expect(service.add(meta('imp-aaaaaa'), 'a')).toEqual({ ok: false, reason: 'stockage' });
    });
  });

  describe('tolerant reading', () => {
    const seed = (index: unknown, css: Record<string, string> = { 'imp-aaaaaa': 'a' }) => {
      localStorage.setItem(INDEX_KEY, typeof index === 'string' ? index : JSON.stringify(index));
      for (const [id, value] of Object.entries(css)) localStorage.setItem(cssKey(id), value);
    };

    it('should return an empty list for corrupted JSON', () => {
      seed('{ pas du json');
      expect(TestBed.inject(ImportedThemes).themes()).toEqual([]);
    });

    it('should return an empty list for an unknown version', () => {
      seed({ version: 2, themes: [meta('imp-aaaaaa')] });
      expect(TestBed.inject(ImportedThemes).themes()).toEqual([]);
    });

    it('should return an empty list when a metadata is malformed', () => {
      seed(
        { version: 1, themes: [meta('imp-aaaaaa'), { ...meta('imp-bbbbbb'), families: 'non' }] },
        { 'imp-aaaaaa': 'a', 'imp-bbbbbb': 'b' },
      );
      expect(TestBed.inject(ImportedThemes).themes()).toEqual([]);
    });

    it('should reject an identifier that is not imp-xxxxxx', () => {
      seed({ version: 1, themes: [meta('imp-<script>')] }, { 'imp-<script>': 'a' });
      expect(TestBed.inject(ImportedThemes).themes()).toEqual([]);
    });

    it('should reject a preview colour that is not a hex colour', () => {
      const family = { ...STANDARD, apercu: 'red; background: url(x)' };
      seed({ version: 1, themes: [meta('imp-aaaaaa', 'X', [family])] });
      expect(TestBed.inject(ImportedThemes).themes()).toEqual([]);
    });

    it('should discard an entry whose CSS key is missing', () => {
      seed({ version: 1, themes: [meta('imp-aaaaaa'), meta('imp-bbbbbb')] }, { 'imp-bbbbbb': 'b' });
      expect(
        TestBed.inject(ImportedThemes)
          .themes()
          .map((theme) => theme.id),
      ).toEqual(['imp-bbbbbb']);
    });

    it('should return an empty list for a non-object index', () => {
      seed('null');
      expect(TestBed.inject(ImportedThemes).themes()).toEqual([]);
    });
  });

  describe('infos', () => {
    it('should expose one entry per theme and per family', () => {
      const service = TestBed.inject(ImportedThemes);
      service.add(meta('imp-aaaaaa', 'Mon thème'), 'a');
      service.add(meta('imp-bbbbbb', 'Simple', [STANDARD]), 'b');

      expect(service.infos()).toEqual([
        {
          id: 'imp-aaaaaa-standard',
          group: 'imported',
          label: 'Mon thème',
          shortLabel: 'Standard',
          color: '#86a315',
          progression: true,
        },
        {
          id: 'imp-aaaaaa-contraste-moyen',
          group: 'imported',
          label: 'Mon thème, contraste moyen',
          shortLabel: 'Contraste moyen',
          color: '#657c08',
          progression: true,
        },
        {
          id: 'imp-bbbbbb-standard',
          group: 'imported',
          label: 'Simple',
          shortLabel: 'Standard',
          color: '#86a315',
          progression: true,
        },
      ]);
    });

    it('should look themes up by identifier', () => {
      const service = TestBed.inject(ImportedThemes);
      service.add(meta('imp-aaaaaa', 'Mon thème'), 'a');
      expect(service.has('imp-aaaaaa-contraste-moyen')).toBe(true);
      expect(service.info('imp-aaaaaa-contraste-moyen')?.shortLabel).toBe('Contraste moyen');
      expect(service.has('imp-aaaaaa-inconnue')).toBe(false);
      expect(service.has('azur')).toBe(false);
      service.remove('imp-aaaaaa');
      expect(service.has('imp-aaaaaa-standard')).toBe(false);
    });

    it('should show a name as plain text data, never as an identifier', () => {
      const service = TestBed.inject(ImportedThemes);
      service.add(meta('imp-aaaaaa', '<img src=x onerror=alert(1)>'), 'a');
      expect(service.infos()[0].label).toBe('<img src=x onerror=alert(1)>');
      expect(service.infos()[0].id).toBe('imp-aaaaaa-standard');
    });
  });
});

describe('parseImportedThemeId', () => {
  it('should parse an imported theme identifier', () => {
    expect(parseImportedThemeId('imp-k3f9a2-standard')).toEqual({
      importId: 'imp-k3f9a2',
      family: 'standard',
    });
  });

  it('should keep dashes inside the family', () => {
    expect(parseImportedThemeId('imp-k3f9a2-contraste-moyen')).toEqual({
      importId: 'imp-k3f9a2',
      family: 'contraste-moyen',
    });
  });

  it('should reject anything else', () => {
    for (const id of [
      'imp-k3f9a2',
      'imp-k3f9a2-',
      'imp-k3f9a-standard',
      'imp-k3f9a2x-standard',
      'imp-K3F9A2-standard',
      'imp-k3f9a2-Standard',
      'imp-k3f9a2--x',
      'azur',
      'app-contraste-moyen',
      '',
    ]) {
      expect(parseImportedThemeId(id), id).toBeNull();
    }
  });
});
