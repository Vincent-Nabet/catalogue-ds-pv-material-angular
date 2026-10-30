import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, effect, inject, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MatListItem,
  MatListItemIcon,
  MatListItemTitle,
  MatListSubheaderCssMatStyler,
  MatNavList,
} from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map, skip } from 'rxjs';
import { CATALOG_GROUPS } from '../../core/catalog/catalog.registry';
import { ContrastOverlay } from '../contrast-inspector/contrast-overlay';
import { ContrastPanel } from '../contrast-inspector/contrast-panel';
import { ContrastToggle } from '../contrast-inspector/contrast-toggle';
import { ThemePicker } from '../theme-picker/theme-picker';

@Component({
  selector: 'app-shell',
  imports: [
    MatToolbar,
    MatIconButton,
    MatIcon,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatNavList,
    MatListItem,
    MatListItemIcon,
    MatListItemTitle,
    MatListSubheaderCssMatStyler,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    ContrastOverlay,
    ContrastPanel,
    ContrastToggle,
    ThemePicker,
  ],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  protected readonly groups = CATALOG_GROUPS;
  protected readonly isMobile = toSignal(
    inject(BreakpointObserver)
      .observe('(max-width: 959.98px)')
      .pipe(map((state) => state.matches)),
    { initialValue: false },
  );

  private readonly main = viewChild.required<ElementRef<HTMLElement>>('main');
  private readonly navigationEnd = toSignal(
    inject(Router).events.pipe(
      filter((event) => event instanceof NavigationEnd),
      skip(1),
    ),
  );

  constructor() {
    // Gestion du focus à chaque changement de route (a11y).
    effect(() => {
      if (this.navigationEnd()) {
        this.main().nativeElement.focus({ preventScroll: true });
      }
    });
  }
}
