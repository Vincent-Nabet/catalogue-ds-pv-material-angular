import { ComponentFixture, TestBed } from '@angular/core/testing';
import type { ThemeGenere } from '../../../../scripts/themes/navigateur.mjs';
import { ImportedThemes, MAX_IMPORTED_THEMES } from '../../core/theme/imported-themes';
import { ThemeService } from '../../core/theme/theme.service';
import { ImportForm, THEME_GENERATOR } from './import-form';

const RESULTAT: ThemeGenere = {
  css: 'html.theme-imp-x-standard { --app-x: 1; }',
  familles: [
    { id: 'standard', libelle: 'Standard', apercu: '#86a315', defaut: true, progression: true },
    {
      id: 'contraste-moyen',
      libelle: 'Contraste moyen',
      apercu: '#657c08',
      defaut: false,
      progression: true,
    },
  ],
  rapport: {
    modes: 8,
    md3: 142,
    custom: 41,
    inconnus: [],
    ignores: 357,
    modesIgnores: [],
    police: 'Poppins',
    avertissements: ['Un avertissement'],
  },
};

describe('ImportForm', () => {
  let fixture: ComponentFixture<ImportForm>;
  let generer: ReturnType<typeof vi.fn>;
  const root = (): HTMLElement => fixture.nativeElement;
  const q = <T extends HTMLElement>(selector: string) => root().querySelector<T>(selector);
  const importButton = () => q<HTMLButtonElement>('button')!;
  const nameInput = () => q<HTMLInputElement>('input[matInput]');
  const alerts = () =>
    Array.from(root().querySelectorAll('[role="alert"]')).map((e) => e.textContent?.trim());

  beforeEach(() => {
    localStorage.clear();
    generer = vi.fn((_octets: Uint8Array, options: { base: string }) => ({
      ...RESULTAT,
      css: `html.theme-${options.base}-standard { --app-x: 1; }`,
    }));
    TestBed.configureTestingModule({
      providers: [
        {
          provide: THEME_GENERATOR,
          useValue: () => Promise.resolve({ genererThemeImporte: generer }),
        },
      ],
    });
    fixture = TestBed.createComponent(ImportForm);
  });

  const settle = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };

  async function choose(name = 'mes-tokens.zip', size?: number) {
    const input = q<HTMLInputElement>('input[type="file"]')!;
    const file = new File([new Uint8Array([1, 2, 3])], name);
    if (size !== undefined) Object.defineProperty(file, 'size', { value: size });
    Object.defineProperty(input, 'files', { value: [file], configurable: true });
    input.dispatchEvent(new Event('change'));
    await new Promise((resolve) => setTimeout(resolve));
    await settle();
  }

  async function type(name: string) {
    const input = nameInput()!;
    input.value = name;
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('blur'));
    await settle();
  }

  it('should wait for a file: no name field, "Importer" disabled', async () => {
    await settle();
    expect(importButton().textContent?.trim()).toBe('Importer');
    expect(importButton().disabled).toBe(true);
    expect(nameInput()).toBeNull();
    expect(q('input[type="file"]')?.getAttribute('accept')).toBe('.zip');
    expect(generer).not.toHaveBeenCalled();
  });

  it('should analyse the zip and show the report', async () => {
    await choose();
    const [octets, options] = generer.mock.calls[0] as [
      Uint8Array,
      { base: string; nomSource: string },
    ];
    expect(octets).toBeInstanceOf(Uint8Array);
    expect(options.nomSource).toBe('mes-tokens.zip');
    expect(options.base).toMatch(/^imp-[a-z0-9]{6}$/);

    const text = root().textContent ?? '';
    expect(text).toContain(
      '8 modes lus · 2 familles : Standard, Contraste moyen · 142 variables MD3 · 41 variables du design system',
    );
    expect(text).toContain('1 avertissement :');
    expect(text).toContain('Un avertissement');
    expect(text).toContain('Police : Poppins.');
    expect(text).not.toContain('Le catalogue ne charge que Poppins');
    expect(root().querySelectorAll('.familles li').length).toBe(2);
    expect(q('[role="status"]')?.textContent).toContain('Analyse terminée');
  });

  it('should warn when the font is not Poppins', async () => {
    generer.mockImplementation(() => ({
      ...RESULTAT,
      rapport: { ...RESULTAT.rapport, police: '"Fira Sans", sans-serif' },
    }));
    await choose();
    expect(root().textContent).toContain('Police : "Fira Sans", sans-serif.');
    expect(root().textContent).toContain(
      "Le catalogue ne charge que Poppins : une autre police ne s'affichera que si elle est installée",
    );
  });

  it('should pre-fill the name from the zip name, cleaned and truncated to 40 characters', async () => {
    await choose('  mes   tokens \t essai.ZIP');
    expect(nameInput()?.value).toBe('mes tokens essai');
    await choose(`${'a'.repeat(60)}.zip`);
    expect(nameInput()?.value).toBe('a'.repeat(40));
  });

  it('should show the generator error in an alert and keep "Importer" disabled', async () => {
    generer.mockImplementation(() => {
      throw new Error('« primitives.tokens.json » introuvable dans « x.zip ».');
    });
    await choose('x.zip');
    expect(alerts()).toEqual(['« primitives.tokens.json » introuvable dans « x.zip ».']);
    expect(importButton().disabled).toBe(true);
    expect(nameInput()).toBeNull();
    expect(TestBed.inject(ImportedThemes).themes()).toEqual([]);
  });

  it('should refuse a zip of more than 5 MB without analysing it', async () => {
    await choose('gros.zip', 6 * 1024 * 1024);
    expect(alerts()[0]).toContain('« gros.zip » dépasse 5 Mo');
    expect(generer).not.toHaveBeenCalled();
    expect(importButton().disabled).toBe(true);
  });

  it('should forget the previous analysis when the selection is cleared', async () => {
    await choose();
    const input = q<HTMLInputElement>('input[type="file"]')!;
    Object.defineProperty(input, 'files', { value: [], configurable: true });
    input.dispatchEvent(new Event('change'));
    await settle();
    expect(nameInput()).toBeNull();
    expect(importButton().disabled).toBe(true);
  });

  describe('name', () => {
    it('should be required', async () => {
      await choose();
      await type('');
      expect(importButton().disabled).toBe(true);
      expect(root().textContent).toContain('Saisissez un nom pour ce thème.');
    });

    it('should not accept blank spaces only', async () => {
      await choose();
      await type('    ');
      expect(importButton().disabled).toBe(true);
      expect(root().textContent).toContain('Saisissez un nom pour ce thème.');
    });

    it('should not exceed 40 characters', async () => {
      await choose();
      await type('b'.repeat(41));
      expect(importButton().disabled).toBe(true);
      expect(root().textContent).toContain('Le nom ne peut pas dépasser 40 caractères.');
      await type('b'.repeat(40));
      expect(importButton().disabled).toBe(false);
    });

    it('should be unique, ignoring case and surrounding spaces', async () => {
      TestBed.inject(ImportedThemes).add(
        {
          id: 'imp-aaaaaa',
          name: 'Mon Thème',
          createdAt: '2026-11-03T08:00:00.000Z',
          sourceName: 'a.zip',
          families: RESULTAT.familles,
          warnings: [],
        },
        'css',
      );
      await choose();
      await type('  mon thème ');
      expect(importButton().disabled).toBe(true);
      expect(root().textContent).toContain('Un thème importé porte déjà ce nom.');
      await type('Autre nom');
      expect(importButton().disabled).toBe(false);
    });
  });

  describe('import', () => {
    it('should store the theme, apply its default family, announce it and empty the form', async () => {
      await choose();
      const base = (generer.mock.calls[0][1] as { base: string }).base;
      await type('  Mon thème  ');
      const imported = vi.fn();
      fixture.componentInstance.importe.subscribe(imported);

      expect(importButton().disabled).toBe(false);
      importButton().click();
      await settle();

      const stored = TestBed.inject(ImportedThemes);
      expect(stored.themes().length).toBe(1);
      expect(stored.themes()[0]).toMatchObject({
        id: base,
        name: 'Mon thème',
        sourceName: 'mes-tokens.zip',
        warnings: ['Un avertissement'],
      });
      expect(stored.css(base)).toBe(`html.theme-${base}-standard { --app-x: 1; }`);
      expect(TestBed.inject(ThemeService).theme()).toBe(`${base}-standard`);
      expect(imported).toHaveBeenCalledWith(base);

      expect(q('[role="status"]')?.textContent).toBe('Thème « Mon thème » importé et appliqué.');
      expect(nameInput()).toBeNull();
      expect(importButton().disabled).toBe(true);
      expect(root().querySelector('.rapport')).toBeNull();
    });

    it('should allow importing a second zip without reloading', async () => {
      await choose('un.zip');
      await type('Premier');
      importButton().click();
      await settle();

      await choose('deux.zip');
      expect(nameInput()?.value).toBe('deux');
      await type('Second');
      importButton().click();
      await settle();

      const stored = TestBed.inject(ImportedThemes).themes();
      expect(stored.map((theme) => theme.name)).toEqual(['Premier', 'Second']);
      expect(new Set(stored.map((theme) => theme.id)).size).toBe(2);
    });

    const failures = [
      ['quota', 'Espace de stockage plein : supprimez un thème importé.'],
      ['stockage', 'Stockage du navigateur indisponible : le thème ne pourrait pas être conservé.'],
    ] as const;
    for (const [reason, message] of failures) {
      it(`should show "${message}" and keep the form when the storage says ${reason}`, async () => {
        vi.spyOn(TestBed.inject(ImportedThemes), 'add').mockReturnValue({ ok: false, reason });
        const theme = TestBed.inject(ThemeService).theme();
        await choose();
        await type('Mon thème');
        importButton().click();
        await settle();

        expect(alerts()).toEqual([message]);
        expect(nameInput()?.value).toBe('Mon thème');
        expect(TestBed.inject(ThemeService).theme()).toBe(theme);
        expect(importButton().disabled).toBe(false);
      });
    }

    it('should show the limit message when 20 themes are already imported', async () => {
      const stored = TestBed.inject(ImportedThemes);
      for (let i = 0; i < MAX_IMPORTED_THEMES; i++) {
        stored.add(
          {
            id: `imp-${String(i).padStart(6, '0')}`,
            name: `Thème ${i}`,
            createdAt: '2026-11-03T08:00:00.000Z',
            sourceName: 'a.zip',
            families: RESULTAT.familles,
            warnings: [],
          },
          'css',
        );
      }
      await choose();
      await type('Un de trop');
      importButton().click();
      await settle();

      expect(alerts()).toEqual(['Limite de 20 thèmes importés atteinte.']);
      expect(stored.themes().length).toBe(MAX_IMPORTED_THEMES);
    });
  });

  it('should give the focus to the file field on request', async () => {
    await settle();
    fixture.componentInstance.focusFichier();
    expect(document.activeElement).toBe(q('input[type="file"]'));
  });
});
