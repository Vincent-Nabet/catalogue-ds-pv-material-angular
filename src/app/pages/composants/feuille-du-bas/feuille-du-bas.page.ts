import { Component, inject } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatListItemIcon, MatListItemTitle, MatNavList } from '@angular/material/list';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

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
};

@Component({
  selector: 'app-feuille-du-bas-page',
  imports: [MatButton, Specimen, SpecimenSection],
  template: `
    <h1>Feuille du bas</h1>

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
}
