import { Component } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  determine: `<mat-progress-bar mode="determinate" value="60" aria-label="Chargement" />`,
  indetermine: `<mat-progress-bar mode="indeterminate" aria-label="Chargement" />`,
  tampon: `<mat-progress-bar mode="buffer" value="40" bufferValue="70" aria-label="Chargement" />`,
  requete: `<mat-progress-bar mode="query" aria-label="Chargement" />`,
  zero: `<mat-progress-bar mode="determinate" value="0" aria-label="Chargement" />`,
  complet: `<mat-progress-bar mode="determinate" value="100" aria-label="Chargement" />`,
};

@Component({
  selector: 'app-barre-progression-page',
  imports: [MatProgressBar, Specimen, SpecimenSection],
  template: `
    <h1>Barre de progression</h1>

    <app-specimen-section title="Modes">
      <app-specimen label="Déterminé" api='mode="determinate"' [snippet]="snippets.determine">
        <mat-progress-bar mode="determinate" value="60" aria-label="Chargement" />
      </app-specimen>
      <app-specimen label="Indéterminé" api='mode="indeterminate"' [snippet]="snippets.indetermine">
        <mat-progress-bar mode="indeterminate" aria-label="Chargement" />
      </app-specimen>
      <app-specimen label="Tampon" api='mode="buffer"' [snippet]="snippets.tampon">
        <mat-progress-bar mode="buffer" value="40" bufferValue="70" aria-label="Chargement" />
      </app-specimen>
      <app-specimen label="Requête" api='mode="query"' [snippet]="snippets.requete">
        <mat-progress-bar mode="query" aria-label="Chargement" />
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Valeurs limites">
      <app-specimen label="0 %" api='value="0"' [snippet]="snippets.zero">
        <mat-progress-bar mode="determinate" value="0" aria-label="Chargement" />
      </app-specimen>
      <app-specimen label="100 %" api='value="100"' [snippet]="snippets.complet">
        <mat-progress-bar mode="determinate" value="100" aria-label="Chargement" />
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    mat-progress-bar {
      min-width: 160px;
    }
  `,
})
export class BarreProgressionPage {
  protected readonly snippets = SNIPPETS;
}
