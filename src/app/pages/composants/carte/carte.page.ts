import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';
import { MatProgressBar } from '@angular/material/progress-bar';

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
  actionsFin: `<mat-card appearance="outlined">
  <mat-card-content>Contenu de la carte.</mat-card-content>
  <mat-card-actions align="end">
    <button matButton>Annuler</button>
    <button matButton="filled">Valider</button>
  </mat-card-actions>
</mat-card>`,
  pied: `<mat-card appearance="outlined">
  <mat-card-header>
    <mat-card-title>Téléversement</mat-card-title>
  </mat-card-header>
  <mat-card-content>Fichier en cours d'envoi.</mat-card-content>
  <mat-card-footer>
    <mat-progress-bar mode="determinate" value="60" aria-label="Progression" />
  </mat-card-footer>
</mat-card>`,
  contenuSeul: `<mat-card appearance="outlined">
  <mat-card-content>Une carte réduite à son contenu.</mat-card-content>
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
    MatCardFooter,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatIcon,
    Specimen,
    SpecimenSection,
    MatProgressBar,
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

    <app-specimen-section minWidth="360px" title="Composition">
      <app-specimen label="Contenu seul" api="mat-card-content" [snippet]="snippets.contenuSeul">
        <mat-card appearance="outlined">
          <mat-card-content>Une carte réduite à son contenu.</mat-card-content>
        </mat-card>
      </app-specimen>
      <app-specimen label="Actions à droite" api='mat-card-actions align="end"' [snippet]="snippets.actionsFin">
        <mat-card appearance="outlined">
          <mat-card-content>Contenu de la carte.</mat-card-content>
          <mat-card-actions align="end">
            <button matButton>Annuler</button>
            <button matButton="filled">Valider</button>
          </mat-card-actions>
        </mat-card>
      </app-specimen>
      <app-specimen label="Avec pied de carte" api="mat-card-footer" [snippet]="snippets.pied">
        <mat-card appearance="outlined">
          <mat-card-header>
            <mat-card-title>Téléversement</mat-card-title>
          </mat-card-header>
          <mat-card-content>Fichier en cours d’envoi.</mat-card-content>
          <mat-card-footer>
            <mat-progress-bar mode="determinate" value="60" aria-label="Progression" />
          </mat-card-footer>
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
