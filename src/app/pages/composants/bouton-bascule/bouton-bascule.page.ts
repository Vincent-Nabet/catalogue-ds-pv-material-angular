import { Component } from '@angular/core';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatIcon } from '@angular/material/icon';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  simple: `<mat-button-toggle-group aria-label="Alignement" value="gauche">
  <mat-button-toggle value="gauche">Gauche</mat-button-toggle>
  <mat-button-toggle value="centre">Centre</mat-button-toggle>
  <mat-button-toggle value="droite">Droite</mat-button-toggle>
</mat-button-toggle-group>`,
  multiple: `<mat-button-toggle-group aria-label="Style du texte" multiple>
  <mat-button-toggle value="gras">Gras</mat-button-toggle>
  <mat-button-toggle value="italique">Italique</mat-button-toggle>
  <mat-button-toggle value="souligne">Souligné</mat-button-toggle>
</mat-button-toggle-group>`,
  icones: `<mat-button-toggle-group aria-label="Affichage" value="liste">
  <mat-button-toggle value="liste" aria-label="Liste"><mat-icon>view_list</mat-icon></mat-button-toggle>
  <mat-button-toggle value="grille" aria-label="Grille"><mat-icon>grid_view</mat-icon></mat-button-toggle>
</mat-button-toggle-group>`,
  sansCoche: `<mat-button-toggle-group aria-label="Taille" value="m" hideSingleSelectionIndicator>
  <mat-button-toggle value="s">S</mat-button-toggle>
  <mat-button-toggle value="m">M</mat-button-toggle>
  <mat-button-toggle value="l">L</mat-button-toggle>
</mat-button-toggle-group>`,
  vertical: `<mat-button-toggle-group aria-label="Priorité" value="normale" vertical>
  <mat-button-toggle value="basse">Basse</mat-button-toggle>
  <mat-button-toggle value="normale">Normale</mat-button-toggle>
  <mat-button-toggle value="haute">Haute</mat-button-toggle>
</mat-button-toggle-group>`,
  desactive: `<mat-button-toggle-group aria-label="Groupe désactivé" value="a" disabled>
  <mat-button-toggle value="a">A</mat-button-toggle>
  <mat-button-toggle value="b">B</mat-button-toggle>
</mat-button-toggle-group>`,
};

@Component({
  selector: 'app-bouton-bascule-page',
  imports: [MatButtonToggleGroup, MatButtonToggle, MatIcon, Specimen, SpecimenSection],
  template: `
    <h1>Bouton bascule</h1>

    <app-specimen-section minWidth="300px" title="Sélection">
      <app-specimen label="Choix unique" api="mat-button-toggle-group" [snippet]="snippets.simple">
        <mat-button-toggle-group aria-label="Alignement" value="gauche">
          <mat-button-toggle value="gauche">Gauche</mat-button-toggle>
          <mat-button-toggle value="centre">Centre</mat-button-toggle>
          <mat-button-toggle value="droite">Droite</mat-button-toggle>
        </mat-button-toggle-group>
      </app-specimen>
      <app-specimen label="Choix multiple" api="multiple" [snippet]="snippets.multiple">
        <mat-button-toggle-group aria-label="Style du texte" multiple>
          <mat-button-toggle value="gras" checked>Gras</mat-button-toggle>
          <mat-button-toggle value="italique">Italique</mat-button-toggle>
          <mat-button-toggle value="souligne" checked>Souligné</mat-button-toggle>
        </mat-button-toggle-group>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section minWidth="300px" title="Présentation">
      <app-specimen label="Avec icônes" api="mat-icon" [snippet]="snippets.icones">
        <mat-button-toggle-group aria-label="Affichage" value="liste">
          <mat-button-toggle value="liste" aria-label="Liste"><mat-icon>view_list</mat-icon></mat-button-toggle>
          <mat-button-toggle value="grille" aria-label="Grille"><mat-icon>grid_view</mat-icon></mat-button-toggle>
        </mat-button-toggle-group>
      </app-specimen>
      <app-specimen label="Sans coche" api="hideSingleSelectionIndicator" [snippet]="snippets.sansCoche">
        <mat-button-toggle-group aria-label="Taille" value="m" hideSingleSelectionIndicator>
          <mat-button-toggle value="s">S</mat-button-toggle>
          <mat-button-toggle value="m">M</mat-button-toggle>
          <mat-button-toggle value="l">L</mat-button-toggle>
        </mat-button-toggle-group>
      </app-specimen>
      <app-specimen label="Vertical" api="vertical" [snippet]="snippets.vertical">
        <mat-button-toggle-group aria-label="Priorité" value="normale" vertical>
          <mat-button-toggle value="basse">Basse</mat-button-toggle>
          <mat-button-toggle value="normale">Normale</mat-button-toggle>
          <mat-button-toggle value="haute">Haute</mat-button-toggle>
        </mat-button-toggle-group>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section minWidth="300px" title="États">
      <app-specimen label="Désactivé" api="disabled" [snippet]="snippets.desactive">
        <mat-button-toggle-group aria-label="Groupe désactivé" value="a" disabled>
          <mat-button-toggle value="a">A</mat-button-toggle>
          <mat-button-toggle value="b">B</mat-button-toggle>
        </mat-button-toggle-group>
      </app-specimen>
    </app-specimen-section>
  `,
})
export class BoutonBasculePage {
  protected readonly snippets = SNIPPETS;
}
