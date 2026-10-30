import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  simple: `private readonly snackBar = inject(MatSnackBar);

this.snackBar.open('Élément enregistré', undefined, { duration: 3000 });`,
  action: `this.snackBar.open('Élément supprimé', 'Annuler', { duration: 5000 });`,
  longue: `this.snackBar.open('Synchronisation en cours…', 'Fermer', { duration: 10000 });`,
  haut: `this.snackBar.open('Notification en haut', 'Fermer', {
  duration: 4000,
  verticalPosition: 'top',
  horizontalPosition: 'end',
});`,
  persistante: `this.snackBar.open('Connexion perdue', 'Réessayer');`,
};

@Component({
  selector: 'app-snackbar-page',
  imports: [MatButton, Specimen, SpecimenSection],
  template: `
    <h1>Snackbar</h1>

    <app-specimen-section title="Messages" description="Utiliser les boutons pour afficher chaque snackbar.">
      <app-specimen label="Simple" api="MatSnackBar.open()" [snippet]="snippets.simple">
        <button matButton="outlined" (click)="afficher('Élément enregistré', undefined, 3000)">Afficher</button>
      </app-specimen>
      <app-specimen label="Avec action" api="action" [snippet]="snippets.action">
        <button matButton="outlined" (click)="afficher('Élément supprimé', 'Annuler', 5000)">Afficher</button>
      </app-specimen>
      <app-specimen label="Durée longue" api="duration" [snippet]="snippets.longue">
        <button matButton="outlined" (click)="afficher('Synchronisation en cours…', 'Fermer', 10000)">Afficher</button>
      </app-specimen>
      <app-specimen label="Persistante" api="sans duration" [snippet]="snippets.persistante">
        <button matButton="outlined" (click)="afficher('Connexion perdue', 'Réessayer')">Afficher</button>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Position">
      <app-specimen label="En haut à droite" api="verticalPosition / horizontalPosition" [snippet]="snippets.haut">
        <button matButton="outlined" (click)="afficherEnHaut()">Afficher</button>
      </app-specimen>
    </app-specimen-section>
  `,
})
export class SnackbarPage {
  protected readonly snippets = SNIPPETS;
  private readonly snackBar = inject(MatSnackBar);

  protected afficher(message: string, action?: string, duration?: number): void {
    this.snackBar.open(message, action, { duration });
  }

  protected afficherEnHaut(): void {
    this.snackBar.open('Notification en haut', 'Fermer', {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }
}
