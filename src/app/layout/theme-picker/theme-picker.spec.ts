import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TestBed } from '@angular/core/testing';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { provideRouter } from '@angular/router';
import { ImportedFamily, ImportedThemes } from '../../core/theme/imported-themes';
import { ThemeService } from '../../core/theme/theme.service';
import { ThemePicker } from './theme-picker';

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

describe('ThemePicker: imported themes', () => {
  let loader: HarnessLoader;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  function render() {
    const fixture = TestBed.createComponent(ThemePicker);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
    return fixture;
  }

  const add = (id: string, name: string, families: ImportedFamily[]) =>
    TestBed.inject(ImportedThemes).add(
      {
        id,
        name,
        createdAt: '2026-11-03T08:00:00.000Z',
        sourceName: 'tokens.zip',
        families,
        warnings: [],
      },
      'css',
    );

  async function importedMenu() {
    const menu = await loader.getHarness(MatMenuHarness);
    await menu.open();
    const [entry] = await menu.getItems({ text: /Thèmes importés/ });
    await entry.click();
    return { menu, submenu: (await entry.getSubmenu())! };
  }

  it('should offer an empty disabled entry and the management link when nothing is imported', async () => {
    render();
    const { submenu } = await importedMenu();
    const items = await submenu.getItems();
    expect(await Promise.all(items.map((item) => item.getText()))).toEqual([
      'Aucun thème importé',
      'Importer et gérer les thèmes…',
    ]);
    expect(await items[0].isDisabled()).toBe(true);
    expect(await items[1].isDisabled()).toBe(false);
    const link = document.querySelector('a[mat-menu-item]');
    expect(link?.getAttribute('href')).toBe('/themes-importes');
  });

  it('should show a single-family import as a direct radio item', async () => {
    add('imp-aaaaaa', 'Simple', [STANDARD]);
    render();
    const { submenu } = await importedMenu();
    const [simple] = await submenu.getItems({ text: /Simple/ });
    expect(await simple.getSubmenu()).toBeNull();
    expect(document.querySelector('[role="menuitemradio"][aria-checked="false"]')).not.toBeNull();

    await simple.click();
    expect(TestBed.inject(ThemeService).theme()).toBe('imp-aaaaaa-standard');
  });

  it('should show a multi-family import as a submenu with one radio item per family', async () => {
    add('imp-aaaaaa', 'Mon thème', [STANDARD, MOYEN]);
    render();
    const { submenu } = await importedMenu();
    const [theme] = await submenu.getItems({ text: /Mon thème/ });
    await theme.click();
    const familles = (await theme.getSubmenu())!;
    const items = await familles.getItems();
    expect(await Promise.all(items.map((item) => item.getText()))).toEqual([
      'Standard',
      'Contraste moyen',
    ]);

    await items[1].click();
    expect(TestBed.inject(ThemeService).theme()).toBe('imp-aaaaaa-contraste-moyen');
  });

  it('should show the imported theme in the button, as plain text', () => {
    add('imp-aaaaaa', '<img src=x onerror=alert(1)>', [STANDARD]);
    const fixture = render();
    TestBed.inject(ThemeService).theme.set('imp-aaaaaa-standard');
    fixture.detectChanges();
    const button: HTMLElement = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Thème : <img src=x onerror=alert(1)>');
    expect(button.querySelector('img')).toBeNull();
  });
});
