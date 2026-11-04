import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';
import { ComposantRef } from '../../../shared/composant-ref/composant-ref';

interface ContenuDialogData {
  titre: string;
  paragraphes: number;
  actions: boolean;
  align?: 'start' | 'center' | 'end';
}

interface OptionsOuverture extends Pick<MatDialogConfig, 'width' | 'height' | 'maxWidth' | 'maxHeight' | 'disableClose' | 'position' | 'panelClass'> {
  align?: 'start' | 'center' | 'end';
}

@Component({
  selector: 'app-contenu-dialog',
  imports: [MatButton, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle],
  template: `
    @if (data.titre) {
      <h2 mat-dialog-title>{{ data.titre }}</h2>
    }
    <mat-dialog-content>
      @for (_ of paragraphes; track $index) {
        <p>Ceci est le contenu de la boîte de dialogue. Elle se ferme avec le bouton ou la touche Échap.</p>
      }
    </mat-dialog-content>
    <mat-dialog-actions [align]="data.align ?? 'start'">
      @if (data.actions) {
        <button matButton mat-dialog-close>Annuler</button>
        <button matButton="filled" mat-dialog-close>Valider</button>
      } @else {
        <button matButton mat-dialog-close>Fermer</button>
      }
    </mat-dialog-actions>
  `,
})
export class ContenuDialog {
  protected readonly data = inject<ContenuDialogData>(MAT_DIALOG_DATA);
  protected readonly paragraphes = Array.from({ length: this.data.paragraphes });
}

const SNIPPETS = {
  simple: `// Composant ouvert dans la boîte de dialogue
@Component({
  imports: [MatButton, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle],
  template: \`
    <h2 mat-dialog-title>Titre</h2>
    <mat-dialog-content>Contenu de la boîte de dialogue.</mat-dialog-content>
    <mat-dialog-actions>
      <button matButton mat-dialog-close>Fermer</button>
    </mat-dialog-actions>
  \`,
})
export class MonDialogue {}

// Ouverture
private readonly dialog = inject(MatDialog);
ouvrir() {
  this.dialog.open(MonDialogue);
}`,
  actions: `<h2 mat-dialog-title>Confirmation</h2>
<mat-dialog-content>Voulez-vous continuer ?</mat-dialog-content>
<mat-dialog-actions>
  <button matButton mat-dialog-close>Annuler</button>
  <button matButton="filled" [mat-dialog-close]="true">Valider</button>
</mat-dialog-actions>`,
  long: `<h2 mat-dialog-title>Conditions</h2>
<mat-dialog-content>
  <!-- Contenu long : la zone défile, titre et actions restent visibles -->
</mat-dialog-content>
<mat-dialog-actions>
  <button matButton mat-dialog-close>Fermer</button>
</mat-dialog-actions>`,
  large: `this.dialog.open(MonDialogue, { width: '640px', maxWidth: '95vw' });`,
  donnees: `this.dialog.open(MonDialogue, { data: { titre: 'Titre dynamique' } });

// Dans MonDialogue
protected readonly data = inject(MAT_DIALOG_DATA);`,
  actionsFin: `<h2 mat-dialog-title>Confirmation</h2>
<mat-dialog-content>Voulez-vous continuer ?</mat-dialog-content>
<mat-dialog-actions align="end">
  <button matButton mat-dialog-close>Annuler</button>
  <button matButton="filled" mat-dialog-close>Valider</button>
</mat-dialog-actions>`,
  actionsCentre: `<mat-dialog-actions align="center">…</mat-dialog-actions>`,
  sansTitre: `<mat-dialog-content>Boîte de dialogue sans titre.</mat-dialog-content>
<mat-dialog-actions>
  <button matButton mat-dialog-close>Fermer</button>
</mat-dialog-actions>`,
  bloquee: `this.dialog.open(MonDialogue, { disableClose: true });
// Ni Échap ni un clic à l'extérieur ne ferment la boîte.`,
  pleinEcran: `this.dialog.open(MonDialogue, {
  width: '100vw',
  height: '100vh',
  maxWidth: '100vw',
  maxHeight: '100vh',
});`,
  enHaut: `this.dialog.open(MonDialogue, { position: { top: '24px' } });`,
  tertiaire: `this.dialog.open(MonDialogue, { panelClass: 'perso-dialogue-tertiaire' });

@use '@angular/material' as mat;

/* La boîte est rendue dans une surcouche : règle globale (::ng-deep dans un composant) */
.perso-dialogue-tertiaire {
  @include mat.dialog-overrides((
    container-color: var(--mat-sys-tertiary-container),
    subhead-color: var(--mat-sys-on-tertiary-container),
    supporting-text-color: var(--mat-sys-on-tertiary-container),
  ));
  /* Les boutons reprennent la même paire de rôle, pour garder le contraste */
  @include mat.button-overrides((
    text-label-text-color: var(--mat-sys-on-tertiary-container),
    text-state-layer-color: var(--mat-sys-on-tertiary-container),
    filled-container-color: var(--mat-sys-tertiary),
    filled-label-text-color: var(--mat-sys-on-tertiary),
    filled-state-layer-color: var(--mat-sys-on-tertiary),
  ));
}`,
  angulaire: `this.dialog.open(MonDialogue, { panelClass: 'perso-dialogue-angulaire' });

@use '@angular/material' as mat;

/* La boîte est rendue dans une surcouche : règle globale (::ng-deep dans un composant) */
.perso-dialogue-angulaire {
  @include mat.dialog-overrides((
    container-shape: var(--mat-sys-corner-none),
    container-elevation-shadow: var(--mat-sys-level5),
  ));
}`,
  texteAgrandi: `this.dialog.open(MonDialogue, { panelClass: 'perso-dialogue-texte' });

@use '@angular/material' as mat;

/* La boîte est rendue dans une surcouche : règle globale (::ng-deep dans un composant) */
.perso-dialogue-texte {
  @include mat.dialog-overrides((
    subhead-size: var(--mat-sys-headline-medium-size),
    subhead-line-height: var(--mat-sys-headline-medium-line-height),
    supporting-text-size: var(--mat-sys-body-large-size),
    supporting-text-line-height: var(--mat-sys-body-large-line-height),
  ));
}`,
};

@Component({
  selector: 'app-boite-dialogue-page',
  imports: [ComposantRef, MatButton, Specimen, SpecimenSection],
  template: `
    <h1>Boîte de dialogue</h1>
    <app-composant-ref />

    <app-specimen-section title="Dialogues" description="Utiliser les boutons pour ouvrir chaque boîte de dialogue.">
      <app-specimen label="Simple" api="MatDialog.open()" [snippet]="snippets.simple">
        <button matButton="outlined" (click)="ouvrir('Dialogue simple', 1, false)">Ouvrir</button>
      </app-specimen>
      <app-specimen label="Avec actions" api="mat-dialog-actions" [snippet]="snippets.actions">
        <button matButton="outlined" (click)="ouvrir('Confirmation', 1, true)">Ouvrir</button>
      </app-specimen>
      <app-specimen label="Contenu long" api="mat-dialog-content" [snippet]="snippets.long">
        <button matButton="outlined" (click)="ouvrir('Conditions', 12, true)">Ouvrir</button>
      </app-specimen>
      <app-specimen label="Largeur personnalisée" api="width / maxWidth" [snippet]="snippets.large">
        <button matButton="outlined" (click)="ouvrir('Dialogue large', 1, false, { width: '640px' })">Ouvrir</button>
      </app-specimen>
      <app-specimen label="Données injectées" api="MAT_DIALOG_DATA" [snippet]="snippets.donnees">
        <button matButton="outlined" (click)="ouvrir('Titre dynamique', 1, false)">Ouvrir</button>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section minWidth="300px" title="Mise en page et comportement">
      <app-specimen label="Actions à droite" api='mat-dialog-actions align="end"' [snippet]="snippets.actionsFin">
        <button matButton="outlined" (click)="ouvrir('Confirmation', 1, true, { align: 'end' })">Ouvrir</button>
      </app-specimen>
      <app-specimen label="Actions centrées" api='align="center"' [snippet]="snippets.actionsCentre">
        <button matButton="outlined" (click)="ouvrir('Confirmation', 1, true, { align: 'center' })">Ouvrir</button>
      </app-specimen>
      <app-specimen label="Sans titre" api="sans mat-dialog-title" [snippet]="snippets.sansTitre">
        <button matButton="outlined" (click)="ouvrir('', 1, false)">Ouvrir</button>
      </app-specimen>
      <app-specimen label="Fermeture bloquée" api="disableClose" [snippet]="snippets.bloquee">
        <button matButton="outlined" (click)="ouvrir('Fermeture bloquée', 1, true, { disableClose: true })">Ouvrir</button>
      </app-specimen>
      <app-specimen label="Plein écran" api="width / height: 100vw / 100vh" [snippet]="snippets.pleinEcran">
        <button
          matButton="outlined"
          (click)="ouvrir('Plein écran', 3, true, { width: '100vw', height: '100vh', maxWidth: '100vw', maxHeight: '100vh' })"
        >
          Ouvrir
        </button>
      </app-specimen>
      <app-specimen label="Position en haut" api="position" [snippet]="snippets.enHaut">
        <button matButton="outlined" (click)="ouvrir('Position en haut', 1, false, { position: { top: '24px' } })">Ouvrir</button>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section
      minWidth="300px"
      title="Personnalisation (jetons)"
      description="Le mixin mat.dialog-overrides reçoit les jetons système --mat-sys-* ; les noms de jetons sont validés à la compilation. La boîte étant rendue dans une surcouche, sa classe passe par panelClass."
    >
      <app-specimen label="Teinte tertiaire" api="mat.dialog-overrides : container-color" [snippet]="snippets.tertiaire">
        <button matButton="outlined" (click)="ouvrir('Confirmation', 1, true, { panelClass: 'perso-dialogue-tertiaire' })">Ouvrir</button>
      </app-specimen>
      <app-specimen label="Angles droits et élévation" api="mat.dialog-overrides : container-shape" [snippet]="snippets.angulaire">
        <button matButton="outlined" (click)="ouvrir('Angles droits', 1, true, { panelClass: 'perso-dialogue-angulaire' })">Ouvrir</button>
      </app-specimen>
      <app-specimen label="Titre et texte agrandis" api="mat.dialog-overrides : subhead-size" [snippet]="snippets.texteAgrandi">
        <button matButton="outlined" (click)="ouvrir('Texte agrandi', 1, true, { panelClass: 'perso-dialogue-texte' })">Ouvrir</button>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    @use '@angular/material' as mat;

    /* La boîte est rendue dans une surcouche, hors de l’encapsulation du composant : d’où ::ng-deep. */
    ::ng-deep .perso-dialogue-tertiaire {
      @include mat.dialog-overrides(
        (
          container-color: var(--mat-sys-tertiary-container),
          subhead-color: var(--mat-sys-on-tertiary-container),
          supporting-text-color: var(--mat-sys-on-tertiary-container),
        )
      );
      @include mat.button-overrides(
        (
          text-label-text-color: var(--mat-sys-on-tertiary-container),
          text-state-layer-color: var(--mat-sys-on-tertiary-container),
          filled-container-color: var(--mat-sys-tertiary),
          filled-label-text-color: var(--mat-sys-on-tertiary),
          filled-state-layer-color: var(--mat-sys-on-tertiary),
        )
      );
    }

    ::ng-deep .perso-dialogue-angulaire {
      @include mat.dialog-overrides(
        (
          container-shape: var(--mat-sys-corner-none),
          container-elevation-shadow: var(--mat-sys-level5),
        )
      );
    }

    ::ng-deep .perso-dialogue-texte {
      @include mat.dialog-overrides(
        (
          subhead-size: var(--mat-sys-headline-medium-size),
          subhead-line-height: var(--mat-sys-headline-medium-line-height),
          supporting-text-size: var(--mat-sys-body-large-size),
          supporting-text-line-height: var(--mat-sys-body-large-line-height),
        )
      );
    }
  `,
})
export class BoiteDialoguePage {
  protected readonly snippets = SNIPPETS;
  private readonly dialog = inject(MatDialog);

  protected ouvrir(titre: string, paragraphes: number, actions: boolean, options: OptionsOuverture = {}): void {
    const { align, ...config } = options;
    this.dialog.open<ContenuDialog, ContenuDialogData>(ContenuDialog, {
      maxWidth: '95vw',
      ...config,
      data: { titre, paragraphes, actions, align },
    });
  }
}
