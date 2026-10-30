import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  releve: `<mat-card appearance="raised">
  <mat-card-header>
    <mat-card-title>Titre</mat-card-title>
    <mat-card-subtitle>Sous-titre</mat-card-subtitle>
  </mat-card-header>
  <mat-card-content>Contenu de la carte.</mat-card-content>
</mat-card>`,
  contour: `<mat-card appearance="outlined">
  <mat-card-header>
    <mat-card-title>Titre</mat-card-title>
    <mat-card-subtitle>Sous-titre</mat-card-subtitle>
  </mat-card-header>
  <mat-card-content>Contenu de la carte.</mat-card-content>
</mat-card>`,
  remplie: `<mat-card appearance="filled">
  <mat-card-header>
    <mat-card-title>Titre</mat-card-title>
    <mat-card-subtitle>Sous-titre</mat-card-subtitle>
  </mat-card-header>
  <mat-card-content>Contenu de la carte.</mat-card-content>
</mat-card>`,
  actions: `<mat-card appearance="outlined">
  <mat-card-header>
    <mat-card-title>Titre</mat-card-title>
  </mat-card-header>
  <mat-card-content>Contenu de la carte.</mat-card-content>
  <mat-card-actions>
    <button matButton>Annuler</button>
    <button matButton="filled">Valider</button>
  </mat-card-actions>
</mat-card>`,
  avatar: `<mat-card appearance="outlined">
  <mat-card-header>
    <mat-icon matCardAvatar>account_circle</mat-icon>
    <mat-card-title>Marie Dupont</mat-card-title>
    <mat-card-subtitle>Cheffe de projet</mat-card-subtitle>
  </mat-card-header>
</mat-card>`,
};

@Component({
  selector: 'app-carte-page',
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatIcon,
    Specimen,
    SpecimenSection,
  ],
  template: `
    <h1>Carte</h1>

    <app-specimen-section minWidth="360px" title="Apparences">
      <app-specimen label="Relevée" api='appearance="raised"' [snippet]="snippets.releve">
        <mat-card appearance="raised">
          <mat-card-header>
            <mat-card-title>Titre</mat-card-title>
            <mat-card-subtitle>Sous-titre</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>Contenu de la carte.</mat-card-content>
        </mat-card>
      </app-specimen>
      <app-specimen label="Contour" api='appearance="outlined"' [snippet]="snippets.contour">
        <mat-card appearance="outlined">
          <mat-card-header>
            <mat-card-title>Titre</mat-card-title>
            <mat-card-subtitle>Sous-titre</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>Contenu de la carte.</mat-card-content>
        </mat-card>
      </app-specimen>
      <app-specimen label="Remplie" api='appearance="filled"' [snippet]="snippets.remplie">
        <mat-card appearance="filled">
          <mat-card-header>
            <mat-card-title>Titre</mat-card-title>
            <mat-card-subtitle>Sous-titre</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>Contenu de la carte.</mat-card-content>
        </mat-card>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section minWidth="360px" title="Contenu">
      <app-specimen label="Avec actions" api="mat-card-actions" [snippet]="snippets.actions">
        <mat-card appearance="outlined">
          <mat-card-header>
            <mat-card-title>Titre</mat-card-title>
          </mat-card-header>
          <mat-card-content>Contenu de la carte.</mat-card-content>
          <mat-card-actions>
            <button matButton>Annuler</button>
            <button matButton="filled">Valider</button>
          </mat-card-actions>
        </mat-card>
      </app-specimen>
      <app-specimen label="Avec avatar" api="matCardAvatar" [snippet]="snippets.avatar">
        <mat-card appearance="outlined">
          <mat-card-header>
            <mat-icon matCardAvatar>account_circle</mat-icon>
            <mat-card-title>Marie Dupont</mat-card-title>
            <mat-card-subtitle>Cheffe de projet</mat-card-subtitle>
          </mat-card-header>
        </mat-card>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    mat-card {
      width: 100%;
    }
  `,
})
export class CartePage {
  protected readonly snippets = SNIPPETS;
}
