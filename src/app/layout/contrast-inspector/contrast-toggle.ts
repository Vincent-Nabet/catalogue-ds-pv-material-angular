import { Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ContrastInspector } from '../../core/a11y/contrast-inspector';

@Component({
  selector: 'app-contrast-toggle',
  imports: [MatIconButton, MatIcon],
  template: `
    @if (inspector.available()) {
      <button
        mat-icon-button
        type="button"
        aria-label="Inspecteur de contraste"
        title="Inspecteur de contraste"
        [attr.aria-pressed]="inspector.active()"
        [class.actif]="inspector.active()"
        (click)="inspector.toggle()"
      >
        <mat-icon>contrast</mat-icon>
      </button>
    }
  `,
  styles: `
    .actif {
      background: color-mix(in srgb, var(--mat-sys-on-primary) 24%, transparent);
    }
  `,
})
export class ContrastToggle {
  protected readonly inspector = inject(ContrastInspector);
}
