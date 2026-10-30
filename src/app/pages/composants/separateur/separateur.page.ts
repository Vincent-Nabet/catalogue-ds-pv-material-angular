import { Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatListItem, MatListSubheaderCssMatStyler, MatList } from '@angular/material/list';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  horizontal: `<p>Au-dessus</p>
<mat-divider />
<p>En dessous</p>`,
  vertical: `<div style="display: flex; align-items: center; gap: 16px; height: 40px">
  <span>Gauche</span>
  <mat-divider vertical style="height: 100%" />
  <span>Droite</span>
</div>`,
  inset: `<mat-list>
  <mat-list-item>Premier</mat-list-item>
  <mat-divider inset />
  <mat-list-item>Second</mat-list-item>
</mat-list>`,
  liste: `<mat-list>
  <div mat-subheader>Dossiers</div>
  <mat-list-item>Photos</mat-list-item>
  <mat-divider />
  <mat-list-item>Documents</mat-list-item>
</mat-list>`,
};

@Component({
  selector: 'app-separateur-page',
  imports: [MatDivider, MatList, MatListItem, MatListSubheaderCssMatStyler, Specimen, SpecimenSection],
  template: `
    <h1>Séparateur</h1>

    <app-specimen-section minWidth="340px" title="Orientations">
      <app-specimen label="Horizontal" api="mat-divider" [snippet]="snippets.horizontal">
        <div class="bloc">
          <p>Au-dessus</p>
          <mat-divider />
          <p>En dessous</p>
        </div>
      </app-specimen>
      <app-specimen label="Vertical" api="vertical" [snippet]="snippets.vertical">
        <div class="ligne">
          <span>Gauche</span>
          <mat-divider vertical class="vertical" />
          <span>Droite</span>
        </div>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section minWidth="340px" title="Dans une liste">
      <app-specimen label="Décalé" api="inset" [snippet]="snippets.inset">
        <mat-list class="bloc">
          <mat-list-item>Premier</mat-list-item>
          <mat-divider inset />
          <mat-list-item>Second</mat-list-item>
        </mat-list>
      </app-specimen>
      <app-specimen label="Avec sous-titre" api="mat-subheader" [snippet]="snippets.liste">
        <mat-list class="bloc">
          <div mat-subheader>Dossiers</div>
          <mat-list-item>Photos</mat-list-item>
          <mat-divider />
          <mat-list-item>Documents</mat-list-item>
        </mat-list>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    .bloc {
      width: 100%;
    }

    .ligne {
      display: flex;
      align-items: center;
      gap: 16px;
      height: 40px;
    }

    .vertical {
      height: 100%;
    }
  `,
})
export class SeparateurPage {
  protected readonly snippets = SNIPPETS;
}
