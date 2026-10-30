import { Component, computed, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { ThemeService } from '../../core/theme/theme.service';
import { DENSITIES, SCHEMES, THEMES } from '../../core/theme/themes';

@Component({
  selector: 'app-theme-picker',
  imports: [MatButton, MatIcon, MatDivider, MatMenu, MatMenuItem, MatMenuTrigger],
  templateUrl: './theme-picker.html',
  styleUrl: './theme-picker.scss',
})
export class ThemePicker {
  protected readonly service = inject(ThemeService);
  protected readonly themes = THEMES;
  protected readonly schemes = SCHEMES;
  protected readonly densities = DENSITIES;
  protected readonly courant = computed(
    () => THEMES.find((theme) => theme.id === this.service.theme()) ?? THEMES[0],
  );
}
