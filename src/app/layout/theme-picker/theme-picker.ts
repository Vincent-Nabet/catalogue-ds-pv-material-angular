import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { ImportedThemes } from '../../core/theme/imported-themes';
import { ThemeService } from '../../core/theme/theme.service';
import { DENSITIES, SCHEMES, THEME_GROUPS, THEMES } from '../../core/theme/themes';

@Component({
  selector: 'app-theme-picker',
  imports: [MatButton, MatIcon, MatDivider, MatMenu, MatMenuItem, MatMenuTrigger, RouterLink],
  templateUrl: './theme-picker.html',
  styleUrl: './theme-picker.scss',
})
export class ThemePicker {
  protected readonly service = inject(ThemeService);
  private readonly imported = inject(ImportedThemes);
  protected readonly groupes = THEME_GROUPS.map((groupe) => ({
    ...groupe,
    themes: THEMES.filter((theme) => theme.group === groupe.id),
  }));
  protected readonly schemes = SCHEMES;
  protected readonly densities = DENSITIES;
  protected readonly courant = this.service.themeCourant;
  /** Thèmes importés et leurs familles, avec l'identifiant de thème de chaque famille. */
  protected readonly importes = computed(() =>
    this.imported.themes().map((theme) => ({
      id: theme.id,
      name: theme.name,
      families: theme.families.map((f) => ({ ...f, themeId: `${theme.id}-${f.id}` })),
    })),
  );
}
