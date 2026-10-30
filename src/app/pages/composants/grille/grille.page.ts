import { Component } from '@angular/core';
import { MatGridList, MatGridTile, MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  simple: `<mat-grid-list cols="3" rowHeight="64px" gutterSize="8px">
  <mat-grid-tile>1</mat-grid-tile>
  <mat-grid-tile>2</mat-grid-tile>
  <mat-grid-tile>3</mat-grid-tile>
  <mat-grid-tile>4</mat-grid-tile>
  <mat-grid-tile>5</mat-grid-tile>
  <mat-grid-tile>6</mat-grid-tile>
</mat-grid-list>`,
  etendues: `<mat-grid-list cols="3" rowHeight="64px" gutterSize="8px">
  <mat-grid-tile [colspan]="2">Deux colonnes</mat-grid-tile>
  <mat-grid-tile [rowspan]="2">Deux lignes</mat-grid-tile>
  <mat-grid-tile>A</mat-grid-tile>
  <mat-grid-tile>B</mat-grid-tile>
</mat-grid-list>`,
  entete: `<mat-grid-list cols="2" rowHeight="96px" gutterSize="8px">
  <mat-grid-tile>
    <mat-grid-tile-header>Titre</mat-grid-tile-header>
    Contenu
  </mat-grid-tile>
  <mat-grid-tile>
    <mat-grid-tile-header>Titre</mat-grid-tile-header>
    Contenu
  </mat-grid-tile>
</mat-grid-list>`,
  ratio: `<mat-grid-list cols="3" rowHeight="1:1" gutterSize="8px">
  <mat-grid-tile>1</mat-grid-tile>
  <mat-grid-tile>2</mat-grid-tile>
  <mat-grid-tile>3</mat-grid-tile>
</mat-grid-list>`,
};

@Component({
  selector: 'app-grille-page',
  imports: [MatGridList, MatGridTile, MatGridTileHeaderCssMatStyler, Specimen, SpecimenSection],
  template: `
    <h1>Grille</h1>

    <app-specimen-section minWidth="360px" title="Dispositions">
      <app-specimen label="Simple" api="mat-grid-list" [snippet]="snippets.simple">
        <mat-grid-list cols="3" rowHeight="64px" gutterSize="8px">
          <mat-grid-tile>1</mat-grid-tile>
          <mat-grid-tile>2</mat-grid-tile>
          <mat-grid-tile>3</mat-grid-tile>
          <mat-grid-tile>4</mat-grid-tile>
          <mat-grid-tile>5</mat-grid-tile>
          <mat-grid-tile>6</mat-grid-tile>
        </mat-grid-list>
      </app-specimen>
      <app-specimen label="Tuiles étendues" api="colspan / rowspan" [snippet]="snippets.etendues">
        <mat-grid-list cols="3" rowHeight="64px" gutterSize="8px">
          <mat-grid-tile [colspan]="2">Deux colonnes</mat-grid-tile>
          <mat-grid-tile [rowspan]="2">Deux lignes</mat-grid-tile>
          <mat-grid-tile>A</mat-grid-tile>
          <mat-grid-tile>B</mat-grid-tile>
        </mat-grid-list>
      </app-specimen>
      <app-specimen label="Avec en-tête" api="mat-grid-tile-header" [snippet]="snippets.entete">
        <mat-grid-list cols="2" rowHeight="96px" gutterSize="8px">
          <mat-grid-tile>
            <mat-grid-tile-header>Titre</mat-grid-tile-header>
            Contenu
          </mat-grid-tile>
          <mat-grid-tile>
            <mat-grid-tile-header>Titre</mat-grid-tile-header>
            Contenu
          </mat-grid-tile>
        </mat-grid-list>
      </app-specimen>
      <app-specimen label="Ratio carré" api='rowHeight="1:1"' [snippet]="snippets.ratio">
        <mat-grid-list cols="3" rowHeight="1:1" gutterSize="8px">
          <mat-grid-tile>1</mat-grid-tile>
          <mat-grid-tile>2</mat-grid-tile>
          <mat-grid-tile>3</mat-grid-tile>
        </mat-grid-list>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    mat-grid-list {
      width: 100%;
    }

    mat-grid-tile {
      background: var(--mat-sys-primary-container);
      color: var(--mat-sys-on-primary-container);
    }

    mat-grid-tile .mat-grid-tile-header {
      background: var(--mat-sys-primary);
      color: var(--mat-sys-on-primary);
    }
  `,
})
export class GrillePage {
  protected readonly snippets = SNIPPETS;
}
