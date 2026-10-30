import { Clipboard } from '@angular/cdk/clipboard';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface SnippetDialogData {
  label: string;
  code: string;
}

@Component({
  selector: 'app-snippet-dialog',
  imports: [MatButton, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle],
  template: `
    <h2 mat-dialog-title>Code — {{ data.label }}</h2>
    <mat-dialog-content>
      <pre tabindex="0"><code>{{ data.code }}</code></pre>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button matButton (click)="copy()">Copier</button>
      <button matButton="filled" mat-dialog-close>Fermer</button>
    </mat-dialog-actions>
  `,
  styles: `
    pre {
      margin: 0;
      padding: 16px;
      overflow: auto;
      border-radius: var(--mat-sys-corner-small);
      background: var(--mat-sys-surface-container);
      font: 14px / 1.5 monospace;
    }
  `,
})
export class SnippetDialog {
  protected readonly data = inject<SnippetDialogData>(MAT_DIALOG_DATA);
  private readonly clipboard = inject(Clipboard);
  private readonly snackBar = inject(MatSnackBar);

  protected copy(): void {
    if (this.clipboard.copy(this.data.code)) {
      this.snackBar.open('Code copié', undefined, { duration: 2500 });
    } else {
      this.snackBar.open('Copie impossible', undefined, { duration: 2500 });
    }
  }
}
