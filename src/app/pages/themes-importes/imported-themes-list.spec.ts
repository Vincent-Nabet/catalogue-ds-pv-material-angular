import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportedFamily, ImportedThemes } from '../../core/theme/imported-themes';
import { ThemeService } from '../../core/theme/theme.service';
import { DEFAULT_THEME_ID } from '../../core/theme/themes';
import { ImportedThemesList } from './imported-themes-list';

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

describe('ImportedThemesList', () => {
  let fixture: ComponentFixture<ImportedThemesList>;
  const root = (): HTMLElement => fixture.nativeElement;
  const buttons = () => Array.from(root().querySelectorAll('button'));
  const buttonByText = (text: string) =>
    buttons().find((button) => button.textContent?.trim() === text);
  const deleteButton = (name: string) =>
    root().querySelector<HTMLButtonElement>(`button[aria-label="Supprimer le thème ${name}"]`);
  const status = () => root().querySelector('[role="status"]')?.textContent?.trim();

  beforeEach(() => localStorage.clear());

  function add(id: string, name: string, families = [STANDARD, MOYEN], warnings: string[] = []) {
    TestBed.inject(ImportedThemes).add(
      {
        id,
        name,
        createdAt: '2026-11-03T08:00:00.000Z',
        sourceName: `${name}.zip`,
        families,
        warnings,
      },
      'css',
    );
  }

  async function render() {
    fixture = TestBed.createComponent(ImportedThemesList);
    await fixture.whenStable();
    return fixture;
  }

  /** Laisse l'effet de focus et `afterNextRender` s'exécuter. */
  const settle = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };

  it('should show the empty state', async () => {
    await render();
    expect(root().querySelector('h2')?.textContent).toContain('Thèmes importés (0)');
    expect(root().textContent).toContain(
      'Aucun thème importé. Importez un zip de tokens ci-dessus.',
    );
    expect(root().querySelector('ul.liste')).toBeNull();
  });

  it('should list the imported themes with their families and a delete button', async () => {
    add('imp-aaaaaa', 'Premier');
    add('imp-bbbbbb', 'Second', [STANDARD]);
    await render();

    expect(root().querySelector('h2')?.textContent).toContain('Thèmes importés (2)');
    const items = root().querySelectorAll('ul.liste > li');
    expect(items.length).toBe(2);
    expect(items[0].querySelector('h3')?.textContent).toBe('Premier');
    expect(items[0].textContent).toContain('Importé le 03/11/2026 · Premier.zip');
    expect(items[0].querySelectorAll('.familles li').length).toBe(2);
    expect(items[1].querySelectorAll('.familles li').length).toBe(1);
    expect(deleteButton('Premier')).not.toBeNull();
    expect(deleteButton('Second')).not.toBeNull();
  });

  it('should flag the active family with text', async () => {
    add('imp-aaaaaa', 'Premier');
    TestBed.inject(ThemeService).theme.set('imp-aaaaaa-contraste-moyen');
    await render();
    const families = root().querySelectorAll('.familles li');
    expect(families[0].textContent).not.toContain('thème actif');
    expect(families[1].textContent).toContain('Contraste moyen');
    expect(families[1].textContent).toContain('(thème actif)');
  });

  it('should show warnings in a details element', async () => {
    add('imp-aaaaaa', 'Premier', [STANDARD], ['Un avertissement', 'Un autre']);
    add('imp-bbbbbb', 'Second', [STANDARD], ['Seul']);
    add('imp-cccccc', 'Troisième');
    await render();
    const summaries = Array.from(root().querySelectorAll('details summary')).map((s) =>
      s.textContent?.replace(/\s+/g, ' ').trim(),
    );
    expect(summaries).toEqual(['2 avertissements', '1 avertissement']);
    expect(root().querySelectorAll('details').length).toBe(2);
  });

  it('should display a name as plain text, never as markup', async () => {
    add('imp-aaaaaa', '<img src=x onerror=alert(1)>');
    await render();
    expect(root().querySelector('h3')?.textContent).toBe('<img src=x onerror=alert(1)>');
    expect(root().querySelector('img')).toBeNull();
  });

  describe('inline confirmation', () => {
    it('should replace the row by a question and focus "Annuler"', async () => {
      add('imp-aaaaaa', 'Premier');
      await render();
      deleteButton('Premier')!.click();
      await settle();

      expect(root().textContent).toContain('Supprimer « Premier » ?');
      expect(root().querySelector('h3')).toBeNull();
      expect(buttonByText('Annuler')).toBeDefined();
      expect(document.activeElement).toBe(buttonByText('Annuler'));
      expect(TestBed.inject(ImportedThemes).themes().length).toBe(1);
    });

    it('should cancel without deleting and give the focus back to the delete button', async () => {
      add('imp-aaaaaa', 'Premier');
      await render();
      deleteButton('Premier')!.click();
      await settle();
      buttonByText('Annuler')!.click();
      await settle();

      expect(TestBed.inject(ImportedThemes).themes().length).toBe(1);
      expect(root().querySelector('h3')?.textContent).toBe('Premier');
      expect(document.activeElement).toBe(deleteButton('Premier'));
    });

    it('should delete, announce it and focus the delete button of the next row', async () => {
      add('imp-aaaaaa', 'Premier');
      add('imp-bbbbbb', 'Second');
      await render();
      deleteButton('Premier')!.click();
      await settle();
      buttonByText('Supprimer')!.click();
      await settle();

      expect(
        TestBed.inject(ImportedThemes)
          .themes()
          .map((theme) => theme.name),
      ).toEqual(['Second']);
      expect(status()).toBe('Thème « Premier » supprimé.');
      expect(document.activeElement).toBe(deleteButton('Second'));
    });

    it('should focus the previous row when the last one is deleted', async () => {
      add('imp-aaaaaa', 'Premier');
      add('imp-bbbbbb', 'Second');
      await render();
      deleteButton('Second')!.click();
      await settle();
      buttonByText('Supprimer')!.click();
      await settle();

      expect(document.activeElement).toBe(deleteButton('Premier'));
    });

    it('should tell the caller when the list becomes empty', async () => {
      add('imp-aaaaaa', 'Premier');
      await render();
      const emptied = vi.fn();
      fixture.componentInstance.videe.subscribe(emptied);
      deleteButton('Premier')!.click();
      await settle();
      buttonByText('Supprimer')!.click();
      await settle();

      expect(emptied).toHaveBeenCalledOnce();
      expect(root().textContent).toContain('Aucun thème importé.');
    });

    it('should announce the return to the default theme when the active theme is deleted', async () => {
      add('imp-aaaaaa', 'Premier');
      const service = TestBed.inject(ThemeService);
      service.theme.set('imp-aaaaaa-standard');
      await render();
      deleteButton('Premier')!.click();
      await settle();
      buttonByText('Supprimer')!.click();
      await settle();

      expect(service.theme()).toBe(DEFAULT_THEME_ID);
      expect(status()).toBe(
        'Thème « Premier » supprimé. Retour au thème Design system, contraste moyen.',
      );
    });
  });
});
