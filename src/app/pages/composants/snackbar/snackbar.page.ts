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
  erreur: `this.snackBar.open('Échec de l’envoi', 'Réessayer', {
  duration: 5000,
  panelClass: 'perso-snack-erreur',
});

@use '@angular/material' as mat;

/* La snackbar est rendue dans une surcouche : règle globale (::ng-deep dans un composant) */
.perso-snack-erreur {
  @include mat.snack-bar-overrides((
    container-color: var(--mat-sys-error),
    supporting-text-color: var(--mat-sys-on-error),
    button-color: var(--mat-sys-on-error),
  ));
}`,
  pilule: `this.snackBar.open('Message en pilule', 'Fermer', {
  duration: 5000,
  panelClass: 'perso-snack-pilule',
});

@use '@angular/material' as mat;

/* La snackbar est rendue dans une surcouche : règle globale (::ng-deep dans un composant) */
.perso-snack-pilule {
  @include mat.snack-bar-overrides((
    container-shape: var(--mat-sys-corner-full),
    supporting-text-size: var(--mat-sys-body-large-size),
    supporting-text-line-height: var(--mat-sys-body-large-line-height),
  ));
}`,
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

    <app-specimen-section
      title="Personnalisation (jetons)"
      description="Le mixin mat.snack-bar-overrides reçoit les jetons système --mat-sys-* ; les noms de jetons sont validés à la compilation. La snackbar étant rendue dans une surcouche, sa classe passe par panelClass."
    >
      <app-specimen label="Rôle erreur" api="mat.snack-bar-overrides : container-color" [snippet]="snippets.erreur">
        <button matButton="outlined" (click)="afficher('Échec de l’envoi', 'Réessayer', 5000, 'perso-snack-erreur')">Afficher</button>
      </app-specimen>
      <app-specimen label="Pilule, texte agrandi" api="mat.snack-bar-overrides : container-shape" [snippet]="snippets.pilule">
        <button matButton="outlined" (click)="afficher('Message en pilule', 'Fermer', 5000, 'perso-snack-pilule')">Afficher</button>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    @use '@angular/material' as mat;

    /* La snackbar est rendue dans une surcouche, hors de l’encapsulation du composant : d’où ::ng-deep. */
    ::ng-deep .perso-snack-erreur {
      @include mat.snack-bar-overrides(
        (
          container-color: var(--mat-sys-error),
          supporting-text-color: var(--mat-sys-on-error),
          button-color: var(--mat-sys-on-error),
        )
      );
    }

    ::ng-deep .perso-snack-pilule {
      @include mat.snack-bar-overrides(
        (
          container-shape: var(--mat-sys-corner-full),
          supporting-text-size: var(--mat-sys-body-large-size),
          supporting-text-line-height: var(--mat-sys-body-large-line-height),
        )
      );
    }
  `,
})
export class SnackbarPage {
  protected readonly snippets = SNIPPETS;
  private readonly snackBar = inject(MatSnackBar);

  protected afficher(message: string, action?: string, duration?: number, panelClass?: string): void {
    this.snackBar.open(message, action, { duration, panelClass });
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
