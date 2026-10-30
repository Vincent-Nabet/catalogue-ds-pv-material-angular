import { Component, inject, input } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { SnippetDialog, SnippetDialogData } from '../snippet-dialog/snippet-dialog';

@Component({
  selector: 'app-specimen',
  imports: [MatIconButton, MatIcon],
  template: `
    <div class="rendu">
      <ng-content />
    </div>
    <div class="legende">
      <span class="nom">{{ label() }}</span>
      @if (api()) {
        <code>{{ api() }}</code>
      }
    </div>
    @if (snippet()) {
      <button
        mat-icon-button
        class="code"
        [attr.aria-label]="'Voir le code : ' + label()"
        (click)="openSnippet()"
      >
        <mat-icon>code</mat-icon>
      </button>
    }
  `,
  styles: `
    :host {
      position: relative;
      display: flex;
      flex-direction: column;
      border: 1px solid var(--mat-sys-outline-variant);
      border-radius: var(--mat-sys-corner-medium);
      background: var(--mat-sys-surface-container-low);
    }

    .rendu {
      display: flex;
      flex: 1;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 12px;
      min-height: 96px;
      padding: 24px 16px;
    }

    .legende {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 8px 16px 12px;
      border-top: 1px solid var(--mat-sys-outline-variant);
      font: var(--mat-sys-label-large);
    }

    code {
      color: var(--mat-sys-on-surface-variant);
      font-size: 12px;
      overflow-wrap: anywhere;
    }

    .code {
      position: absolute;
      top: 4px;
      right: 4px;
      opacity: 0.4;
    }

    :host(:hover) .code,
    .code:focus-visible {
      opacity: 1;
    }
  `,
})
export class Specimen {
  readonly label = input.required<string>();
  readonly api = input<string>();
  readonly snippet = input<string>();

  private readonly dialog = inject(MatDialog);

  protected openSnippet(): void {
    this.dialog.open<SnippetDialog, SnippetDialogData>(SnippetDialog, {
      data: { label: this.label(), code: this.snippet() ?? '' },
      width: '640px',
      maxWidth: '95vw',
    });
  }
}
