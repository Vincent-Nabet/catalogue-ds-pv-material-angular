import { Component, input } from '@angular/core';

/**
 * Note discrète des jetons du design system attendus par une page Fondations mais absents du CSS
 * chargé (jeton retiré ou renommé dans le zip des thèmes). Rien n'est affiché s'il n'en manque aucun.
 */
@Component({
  selector: 'app-missing-tokens',
  template: `
    @if (names().length > 0) {
      <p class="note">
        Jetons attendus mais absents du CSS chargé :
        @for (name of names(); track name; let last = $last) {
          <code>{{ name }}</code
          >{{ last ? '.' : ', ' }}
        }
      </p>
    }
  `,
  styles: `
    .note {
      max-width: 80ch;
      margin: 0 0 16px;
      color: var(--mat-sys-on-surface-variant);
      font: var(--mat-sys-body-medium);
    }
  `,
})
export class MissingTokens {
  /** Noms des variables CSS (`--app-spacing-small`…) attendues et absentes. */
  readonly names = input.required<readonly string[]>();
}
