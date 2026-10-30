import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

@Component({
  selector: 'app-message-snack',
  imports: [MatButton, MatIcon, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel],
  template: `
    <span matSnackBarLabel class="message"><mat-icon>check_circle</mat-icon>Fichier envoyé</span>
    <span matSnackBarActions>
      <button matButton matSnackBarAction (click)="ref.dismissWithAction()">Voir</button>
    </span>
  `,
  styles: `
    .message {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `,
})
export class MessageSnack {
  protected readonly ref = inject<MatSnackBarRef<MessageSnack>>(MatSnackBarRef);
}

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
  composant: `// Composant affiché dans la snackbar
@Component({
  imports: [MatButton, MatIcon, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel],
  template: \`
    <span matSnackBarLabel><mat-icon>check_circle</mat-icon>Fichier envoyé</span>
    <span matSnackBarActions>
      <button matButton matSnackBarAction (click)="ref.dismissWithAction()">Voir</button>
    </span>
  \`,
})
export class MessageSnack {
  ref = inject(MatSnackBarRef);
}

this.snackBar.openFromComponent(MessageSnack, { duration: 5000 });`,
  basGauche: `this.snackBar.open('En bas à gauche', 'Fermer', {
  duration: 4000,
  horizontalPosition: 'start',
  verticalPosition: 'bottom',
});`,
  hautCentre: `this.snackBar.open('En haut au centre', 'Fermer', {
  duration: 4000,
  horizontalPosition: 'center',
  verticalPosition: 'top',
});`,
  assertive: `this.snackBar.open('Erreur de connexion', 'Réessayer', {
  politeness: 'assertive',
});
// Annonce immédiate par les lecteurs d'écran`,
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

    <app-specimen-section title="Position et contenu">
      <app-specimen label="En bas à gauche" api="horizontalPosition: 'start'" [snippet]="snippets.basGauche">
        <button matButton="outlined" (click)="placer('En bas à gauche', 'start', 'bottom')">Afficher</button>
      </app-specimen>
      <app-specimen label="En haut au centre" api="verticalPosition: 'top'" [snippet]="snippets.hautCentre">
        <button matButton="outlined" (click)="placer('En haut au centre', 'center', 'top')">Afficher</button>
      </app-specimen>
      <app-specimen label="Composant personnalisé" api="openFromComponent" [snippet]="snippets.composant">
        <button matButton="outlined" (click)="afficherComposant()">Afficher</button>
      </app-specimen>
      <app-specimen label="Annonce assertive" api="politeness: 'assertive'" [snippet]="snippets.assertive">
        <button matButton="outlined" (click)="afficherAssertive()">Afficher</button>
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
  protected placer(message: string, horizontal: 'start' | 'center', vertical: 'top' | 'bottom'): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 4000,
      horizontalPosition: horizontal,
      verticalPosition: vertical,
    });
  }

  protected afficherComposant(): void {
    this.snackBar.openFromComponent(MessageSnack, { duration: 5000 });
  }

  protected afficherAssertive(): void {
    this.snackBar.open('Erreur de connexion', 'Réessayer', { politeness: 'assertive' });
  }
}
