import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ContrastInspector } from '../../core/a11y/contrast-inspector';

@Component({
  selector: 'app-contrast-toggle',
  imports: [MatButton, MatIcon],
  template: `
    @if (inspector.available()) {
      <button
        matButton="tonal"
        type="button"
        title="Inspecteur de contraste"
        [attr.aria-pressed]="inspector.active()"
        [class.actif]="inspector.active()"
        (click)="inspector.toggle()"
      >
        <mat-icon>contrast</mat-icon>
        <span class="libelle">Contraste</span>
      </button>
    }
  `,
  styles: `
    // Mode actif : anneau en plus de aria-pressed
    .actif {
      outline: 2px solid var(--mat-sys-on-primary);
      outline-offset: 2px;
    }

    @media (max-width: 599.98px) {
      // Libellé conservé pour les technologies d'assistance, masqué visuellement.
      .libelle {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
      }
    }
  `,
})
export class ContrastToggle {
  protected readonly inspector = inject(ContrastInspector);
}
