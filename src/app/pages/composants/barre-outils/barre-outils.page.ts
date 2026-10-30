import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  simple: `<mat-toolbar>Titre de la page</mat-toolbar>`,
  primaire: `<mat-toolbar color="primary">Titre de la page</mat-toolbar>`,
  actions: `<mat-toolbar>
  <button matIconButton aria-label="Menu"><mat-icon>menu</mat-icon></button>
  <span>Titre de la page</span>
  <span class="espace"></span>
  <button matIconButton aria-label="Rechercher"><mat-icon>search</mat-icon></button>
  <button matIconButton aria-label="Favori"><mat-icon>favorite</mat-icon></button>
</mat-toolbar>`,
  lignes: `<mat-toolbar>
  <mat-toolbar-row>Première ligne</mat-toolbar-row>
  <mat-toolbar-row>Seconde ligne</mat-toolbar-row>
</mat-toolbar>`,
};

@Component({
  selector: 'app-barre-outils-page',
  imports: [MatToolbar, MatToolbarRow, MatIconButton, MatIcon, Specimen, SpecimenSection],
  template: `
    <h1>Barre d’outils</h1>

    <app-specimen-section minWidth="320px" title="Variantes">
      <app-specimen label="Simple" api="mat-toolbar" [snippet]="snippets.simple">
        <mat-toolbar>Titre de la page</mat-toolbar>
      </app-specimen>
      <app-specimen label="Couleur primaire" api='color="primary"' [snippet]="snippets.primaire">
        <mat-toolbar color="primary">Titre de la page</mat-toolbar>
      </app-specimen>
      <app-specimen label="Avec actions" api="matIconButton" [snippet]="snippets.actions">
        <mat-toolbar>
          <button matIconButton aria-label="Menu"><mat-icon>menu</mat-icon></button>
          <span>Titre de la page</span>
          <span class="espace"></span>
          <button matIconButton aria-label="Rechercher"><mat-icon>search</mat-icon></button>
          <button matIconButton aria-label="Favori"><mat-icon>favorite</mat-icon></button>
        </mat-toolbar>
      </app-specimen>
      <app-specimen label="Plusieurs lignes" api="mat-toolbar-row" [snippet]="snippets.lignes">
        <mat-toolbar>
          <mat-toolbar-row>Première ligne</mat-toolbar-row>
          <mat-toolbar-row>Seconde ligne</mat-toolbar-row>
        </mat-toolbar>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    mat-toolbar {
      width: 100%;
    }

    .espace {
      flex: 1;
    }
  `,
})
export class BarreOutilsPage {
  protected readonly snippets = SNIPPETS;
}
