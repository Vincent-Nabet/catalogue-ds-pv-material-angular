import { Component, inject } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatListItemIcon, MatListItemTitle, MatNavList } from '@angular/material/list';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';
import { ComposantRef } from '../../../shared/composant-ref/composant-ref';

@Component({
  selector: 'app-actions-feuille',
  imports: [MatIcon, MatListItem, MatListItemIcon, MatListItemTitle, MatNavList],
  template: `
    <mat-nav-list>
      <a mat-list-item href="#" (click)="fermer($event)">
        <mat-icon matListItemIcon>share</mat-icon>
        <span matListItemTitle>Partager</span>
      </a>
      <a mat-list-item href="#" (click)="fermer($event)">
        <mat-icon matListItemIcon>link</mat-icon>
        <span matListItemTitle>Copier le lien</span>
      </a>
      <a mat-list-item href="#" (click)="fermer($event)">
        <mat-icon matListItemIcon>download</mat-icon>
        <span matListItemTitle>Télécharger</span>
      </a>
    </mat-nav-list>
  `,
})
export class ActionsFeuille {
  private readonly ref = inject<MatBottomSheetRef<ActionsFeuille>>(MatBottomSheetRef);

  protected fermer(event: MouseEvent): void {
    event.preventDefault();
    this.ref.dismiss();
  }
}

@Component({
  selector: 'app-texte-feuille',
  template: `
    <h2>Détails</h2>
    <p>Contenu libre de la feuille du bas. Elle se ferme avec Échap ou un clic à l’extérieur.</p>
  `,
})
export class TexteFeuille {}

const SNIPPETS = {
  actions: `// Composant ouvert dans la feuille
@Component({
  imports: [MatNavList, MatListItem, MatListItemIcon, MatListItemTitle, MatIcon],
  template: \`
    <mat-nav-list>
      <a mat-list-item href="#" (click)="fermer($event)">
        <mat-icon matListItemIcon>share</mat-icon>
        <span matListItemTitle>Partager</span>
      </a>
    </mat-nav-list>
  \`,
})
export class MesActions {
  private readonly ref = inject(MatBottomSheetRef);
  fermer(event: MouseEvent) {
    event.preventDefault();
    this.ref.dismiss();
  }
}

// Ouverture
private readonly feuille = inject(MatBottomSheet);
ouvrir() {
  this.feuille.open(MesActions);
}`,
  texte: `this.feuille.open(MonContenu);`,
  sansFond: `this.feuille.open(MesActions, { hasBackdrop: false });`,
  bloquee: `this.feuille.open(MesActions, { disableClose: true });
// Échap et le clic à l'extérieur ne ferment plus la feuille.`,
  tertiaire: `this.feuille.open(MonContenu, { panelClass: 'perso-feuille-tertiaire' });

@use '@angular/material' as mat;

/* La feuille est rendue dans une surcouche : règle globale (::ng-deep dans un composant) */
.perso-feuille-tertiaire {
  @include mat.bottom-sheet-overrides((
    container-background-color: var(--mat-sys-tertiary-container),
    container-text-color: var(--mat-sys-on-tertiary-container),
  ));
}`,
  anglesDroits: `this.feuille.open(MonContenu, { panelClass: 'perso-feuille-angulaire' });

@use '@angular/material' as mat;

/* La feuille est rendue dans une surcouche : règle globale (::ng-deep dans un composant) */
.perso-feuille-angulaire {
  @include mat.bottom-sheet-overrides((
    container-shape: var(--mat-sys-corner-none),
  ));
}`,
};

@Component({
  selector: 'app-feuille-du-bas-page',
  imports: [ComposantRef, MatButton, Specimen, SpecimenSection],
  template: `
    <h1>Feuille du bas</h1>
    <app-composant-ref />

    <app-specimen-section title="Feuilles" description="Utiliser les boutons pour ouvrir chaque feuille.">
      <app-specimen label="Liste d’actions" api="MatBottomSheet.open()" [snippet]="snippets.actions">
        <button matButton="outlined" (click)="ouvrirActions()">Ouvrir</button>
      </app-specimen>
      <app-specimen label="Contenu libre" api="MatBottomSheet.open()" [snippet]="snippets.texte">
        <button matButton="outlined" (click)="ouvrirTexte()">Ouvrir</button>
      </app-specimen>
      <app-specimen label="Sans fond" api="hasBackdrop: false" [snippet]="snippets.sansFond">
        <button matButton="outlined" (click)="ouvrirSansFond()">Ouvrir</button>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Comportement">
      <app-specimen label="Fermeture bloquée" api="disableClose" [snippet]="snippets.bloquee">
        <button matButton="outlined" (click)="ouvrirBloquee()">Ouvrir</button>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section
      title="Personnalisation (jetons)"
      description="Le mixin mat.bottom-sheet-overrides reçoit les jetons système --mat-sys-* ; les noms de jetons sont validés à la compilation. La feuille étant rendue dans une surcouche, sa classe passe par panelClass. Les angles arrondis ne s’appliquent qu’aux écrans larges."
    >
      <app-specimen label="Teinte tertiaire" api="mat.bottom-sheet-overrides : container-background-color" [snippet]="snippets.tertiaire">
        <button matButton="outlined" (click)="ouvrirTertiaire()">Ouvrir</button>
      </app-specimen>
      <app-specimen label="Angles droits" api="mat.bottom-sheet-overrides : container-shape" [snippet]="snippets.anglesDroits">
        <button matButton="outlined" (click)="ouvrirAnglesDroits()">Ouvrir</button>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    @use '@angular/material' as mat;

    /* La feuille est rendue dans une surcouche, hors de l’encapsulation du composant : d’où ::ng-deep. */
    ::ng-deep .perso-feuille-tertiaire {
      @include mat.bottom-sheet-overrides(
        (
          container-background-color: var(--mat-sys-tertiary-container),
          container-text-color: var(--mat-sys-on-tertiary-container),
        )
      );
    }

    ::ng-deep .perso-feuille-angulaire {
      @include mat.bottom-sheet-overrides(
        (
          container-shape: var(--mat-sys-corner-none),
        )
      );
    }
  `,
})
export class FeuilleDuBasPage {
  protected readonly snippets = SNIPPETS;
  private readonly feuille = inject(MatBottomSheet);

  protected ouvrirActions(): void {
    this.feuille.open(ActionsFeuille);
  }

  protected ouvrirTexte(): void {
    this.feuille.open(TexteFeuille);
  }

  protected ouvrirSansFond(): void {
    this.feuille.open(ActionsFeuille, { hasBackdrop: false });
  }

  protected ouvrirBloquee(): void {
    this.feuille.open(ActionsFeuille, { disableClose: true });
  }

  protected ouvrirTertiaire(): void {
    this.feuille.open(TexteFeuille, { panelClass: 'perso-feuille-tertiaire' });
  }

  protected ouvrirAnglesDroits(): void {
    this.feuille.open(TexteFeuille, { panelClass: 'perso-feuille-angulaire' });
  }
}
