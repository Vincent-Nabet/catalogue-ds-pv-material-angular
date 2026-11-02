import { Component, input } from '@angular/core';

/**
 * Indique l'origine d'un jeton dans un exemple : « Jeton personnalisé » pour une variable `--app-*`
 * (absente de Material Design 3, générée par le design system), « Jeton MD3 » pour une variable
 * native. Pastille inverse : lisible dans tous les thèmes (paire `inverse-on-surface` /
 * `inverse-surface`).
 */
@Component({
  selector: 'app-token-badge',
  host: { '[class.perso]': 'custom()' },
  template: `{{ custom() ? 'Jeton personnalisé' : 'Jeton MD3' }}`,
  styles: `
    :host {
      display: inline-block;
      justify-self: start;
      padding: 2px 10px;
      border: 1px solid var(--mat-sys-outline);
      border-radius: var(--mat-sys-corner-small);
      color: var(--mat-sys-on-surface-variant);
      font: var(--mat-sys-label-medium);
    }

    :host(.perso) {
      border-color: transparent;
      background: var(--mat-sys-inverse-surface);
      color: var(--mat-sys-inverse-on-surface);
      font-weight: 600;
    }
  `,
})
export class TokenBadge {
  /** Vrai pour une variable personnalisée du design system, faux pour un jeton MD3 natif. */
  readonly custom = input(true);
}
