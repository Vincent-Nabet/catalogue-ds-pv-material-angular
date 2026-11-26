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

  describe('drop zone', () => {
    const zone = () => q<HTMLElement>('label.zone')!;
    /** Événement de glisser-déposer (jsdom n'a pas `DragEvent`) portant les fichiers donnés. */
    const dragEvent = (
      type: string,
      files: File[] = [],
      relatedTarget: EventTarget | null = null,
    ) => {
      const event = new Event(type, { bubbles: true, cancelable: true });
      Object.defineProperty(event, 'dataTransfer', { value: { files, dropEffect: 'none' } });
      Object.defineProperty(event, 'relatedTarget', { value: relatedTarget });
      zone().dispatchEvent(event);
      return event;
    };

    it('should be the label of the native file field, which stays in the DOM', async () => {
      await settle();
      expect(zone().getAttribute('for')).toBe('import-fichier');
      expect(q('#import-fichier')?.getAttribute('type')).toBe('file');
      expect(zone().textContent).toContain('Glissez-déposez');
    });

    it('should highlight while a file is dragged over it and accept the drop', async () => {
      await settle();
      const over = dragEvent('dragover');
      fixture.detectChanges();
      expect(over.defaultPrevented).toBe(true);
      expect(zone().classList).toContain('survol');

      dragEvent('dragleave');
      fixture.detectChanges();
      expect(zone().classList).not.toContain('survol');
    });

    it('should stay highlighted when the pointer moves onto a child of the zone', async () => {
      await settle();
      dragEvent('dragenter');
      dragEvent('dragleave', [], zone().querySelector('span'));
      fixture.detectChanges();
      expect(zone().classList).toContain('survol');
    });

    it('should analyse a dropped zip like a chosen one', async () => {
      await settle();
      dragEvent('drop', [new File([new Uint8Array([1, 2, 3])], 'depose.zip')]);
      await new Promise((resolve) => setTimeout(resolve));
      await settle();

      expect(generer).toHaveBeenCalledOnce();
      expect(generer.mock.calls[0][1]).toMatchObject({ nomSource: 'depose.zip' });
      expect(nameInput()?.value).toBe('depose');
      expect(zone().textContent).toContain('Fichier choisi : depose.zip');
      expect(zone().classList).not.toContain('survol');
    });

    it('should refuse more than two dropped files', async () => {
      await settle();
      dragEvent('drop', [new File([], 'a.zip'), new File([], 'b.zip'), new File([], 'c.zip')]);
      await settle();

      expect(alerts()).toEqual(['Déposez au plus 2 archives à la fois (Primitives et Semantics).']);
      expect(generer).not.toHaveBeenCalled();
      expect(importButton().disabled).toBe(true);
    });

    it('should show the generator error for a dropped file that is not a zip', async () => {
      generer.mockImplementation(() => {
        throw new Error('Archive illisible : « notes.txt » (invalid zip data).');
      });
      await settle();
      dragEvent('drop', [new File(['texte'], 'notes.txt')]);
      await new Promise((resolve) => setTimeout(resolve));
      await settle();

      expect(alerts()).toEqual(['Archive illisible : « notes.txt » (invalid zip data).']);
    });

    it('should forget the chosen file name once the theme is imported', async () => {
      await choose('un.zip');
      expect(zone().textContent).toContain('Fichier choisi : un.zip');
      await type('Premier');
      importButton().click();
      await settle();
      expect(zone().textContent).not.toContain('Fichier choisi');
    });
  });

  describe('export natif de Figma (deux archives)', () => {
    const RESULTAT_NATIF: ThemeGenere = {
      ...RESULTAT,
      rapport: { ...RESULTAT.rapport, format: 'natif', ignores: 355 },
    };
    const zip = (name: string, size?: number) => {
      const file = new File([new Uint8Array([1, 2, 3])], name);
      if (size !== undefined) Object.defineProperty(file, 'size', { value: size });
      return file;
    };
    async function chooseFiles(files: File[]) {
      const input = q<HTMLInputElement>('input[type="file"]')!;
      Object.defineProperty(input, 'files', { value: files, configurable: true });
      input.dispatchEvent(new Event('change'));
      await new Promise((resolve) => setTimeout(resolve));
      await settle();
    }
    const dropFiles = async (files: File[]) => {
      const event = new Event('drop', { bubbles: true, cancelable: true });
      Object.defineProperty(event, 'dataTransfer', { value: { files, dropEffect: 'none' } });
      q('label.zone')!.dispatchEvent(event);
      await new Promise((resolve) => setTimeout(resolve));
      await settle();
    };

    beforeEach(() => {
      generer.mockImplementation((_sources: unknown, options: { base: string }) => ({
        ...RESULTAT_NATIF,
        css: `html.theme-${options.base}-standard { --app-x: 1; }`,
      }));
    });

    it('should let the native field select several files', async () => {
      await settle();
      expect(q('input[type="file"]')?.hasAttribute('multiple')).toBe(true);
      expect(q('#import-aide')?.textContent).toContain('Primitives.zip');
      expect(q('#import-aide')?.textContent).toContain('ensemble');
    });

    it('should analyse two selected files together, with the sources and the base only', async () => {
      await chooseFiles([zip('Primitives.zip'), zip('Semantics.zip')]);
      expect(generer).toHaveBeenCalledOnce();
      const [sources, options] = generer.mock.calls[0] as [
        { nom: string; octets: Uint8Array }[],
        { base: string; nomSource?: string },
      ];
      expect(sources.map((source) => source.nom)).toEqual(['Primitives.zip', 'Semantics.zip']);
      expect(sources[0].octets).toBeInstanceOf(Uint8Array);
      expect(options.base).toMatch(/^imp-[a-z0-9]{6}$/);
      expect(options.nomSource).toBeUndefined();

      expect(q('label.zone')?.textContent).toContain(
        'Fichiers choisis : Primitives.zip, Semantics.zip',
      );
      expect(root().textContent).toContain(
        '41 variables du design system · Format : export natif Figma',
      );
      expect(q('[role="status"]')?.textContent).toBe(
        'Analyse terminée : 2 familles (export natif Figma).',
      );
    });

    it('should propose "Export Figma jj/mm/aaaa" as the name for two files, and keep it editable', async () => {
      await chooseFiles([zip('Primitives.zip'), zip('Semantics.zip')]);
      expect(nameInput()?.value).toMatch(/^Export Figma \d{2}\/\d{2}\/\d{4}$/);
      await type('Mon export');
      expect(importButton().disabled).toBe(false);
    });

    it('should analyse two dropped files like two selected ones', async () => {
      await settle();
      await dropFiles([zip('Semantics.zip'), zip('Primitives.zip')]);
      const [sources] = generer.mock.calls[0] as [{ nom: string }[]];
      expect(sources.map((source) => source.nom)).toEqual(['Semantics.zip', 'Primitives.zip']);
      expect(q('label.zone')?.textContent).toContain(
        'Fichiers choisis : Semantics.zip, Primitives.zip',
      );
      expect(nameInput()).not.toBeNull();
    });

    it('should call the generator with the original signature for a single file', async () => {
      await chooseFiles([zip('tout.zip')]);
      const [octets, options] = generer.mock.calls[0] as [Uint8Array, { nomSource: string }];
      expect(octets).toBeInstanceOf(Uint8Array);
      expect(options.nomSource).toBe('tout.zip');
      expect(nameInput()?.value).toBe('tout');
      expect(q('label.zone')?.textContent).toContain('Fichier choisi : tout.zip');
    });

    it('should refuse three files selected in the native field', async () => {
      await chooseFiles([zip('a.zip'), zip('b.zip'), zip('c.zip')]);
      expect(alerts()).toEqual(['Déposez au plus 2 archives à la fois (Primitives et Semantics).']);
      expect(generer).not.toHaveBeenCalled();
    });

    it('should name the archive over 5 MB and not analyse anything', async () => {
      await chooseFiles([zip('Primitives.zip'), zip('Semantics.zip', 6 * 1024 * 1024)]);
      expect(alerts()[0]).toContain('« Semantics.zip » dépasse 5 Mo');
      expect(generer).not.toHaveBeenCalled();
    });

    it('should show the "export incomplet" error in an alert when one archive is missing', async () => {
      generer.mockImplementation(() => {
        throw new Error(
          'Export Figma incomplet : aucun fichier de primitives (collection « Primitives ») parmi les sources.',
        );
      });
      await chooseFiles([zip('Semantics.zip')]);
      expect(alerts()[0]).toContain('Export Figma incomplet');
      expect(importButton().disabled).toBe(true);
    });

    it('should replace the previous selection when another one is made', async () => {
      await chooseFiles([zip('Primitives.zip')]);
      await chooseFiles([zip('Primitives.zip'), zip('Semantics.zip')]);
      expect(generer).toHaveBeenCalledTimes(2);
      expect(q('label.zone')?.textContent).toContain(
        'Fichiers choisis : Primitives.zip, Semantics.zip',
      );
    });

    it('should store the joined source names and the generator warnings', async () => {
      generer.mockImplementation((_sources: unknown, options: { base: string }) => ({
        ...RESULTAT_NATIF,
        css: `html.theme-${options.base}-standard { --app-x: 1; }`,
        rapport: {
          ...RESULTAT_NATIF.rapport,
          avertissements: [
            'Les primitives et les sémantiques ne semblent pas issues du même export',
          ],
        },
      }));
      await chooseFiles([zip('Primitives.zip'), zip('Semantics.zip')]);
      expect(root().textContent).toContain('ne semblent pas issues du même export');
      importButton().click();
      await settle();
      expect(TestBed.inject(ImportedThemes).themes()[0]).toMatchObject({
        sourceName: 'Primitives.zip + Semantics.zip',
        warnings: ['Les primitives et les sémantiques ne semblent pas issues du même export'],
      });
      expect(q('[role="status"]')?.textContent).toContain('importé et appliqué');
    });
  });

  it('should give the focus to the file field on request', async () => {
    await settle();
    fixture.componentInstance.focusFichier();
    expect(document.activeElement).toBe(q('input[type="file"]'));
  });
});
