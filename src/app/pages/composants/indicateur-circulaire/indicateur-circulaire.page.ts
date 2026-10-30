import { Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  determine: `<mat-progress-spinner mode="determinate" value="65" aria-label="Chargement" />`,
  indetermine: `<mat-progress-spinner mode="indeterminate" aria-label="Chargement" />`,
  diametre: `<mat-progress-spinner mode="indeterminate" diameter="24" aria-label="Chargement" />
<mat-progress-spinner mode="indeterminate" diameter="48" aria-label="Chargement" />
<mat-progress-spinner mode="indeterminate" diameter="96" aria-label="Chargement" />`,
  epaisseur: `<mat-progress-spinner mode="determinate" value="65" strokeWidth="2" aria-label="Chargement" />
<mat-progress-spinner mode="determinate" value="65" strokeWidth="10" aria-label="Chargement" />`,
};

@Component({
  selector: 'app-indicateur-circulaire-page',
  imports: [MatProgressSpinner, Specimen, SpecimenSection],
  template: `
    <h1>Indicateur circulaire</h1>

    <app-specimen-section title="Modes">
      <app-specimen label="Déterminé" api='mode="determinate"' [snippet]="snippets.determine">
        <mat-progress-spinner mode="determinate" value="65" aria-label="Chargement" />
      </app-specimen>
      <app-specimen label="Indéterminé" api='mode="indeterminate"' [snippet]="snippets.indetermine">
        <mat-progress-spinner mode="indeterminate" aria-label="Chargement" />
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Dimensions">
      <app-specimen label="Diamètres" api="diameter" [snippet]="snippets.diametre">
        <mat-progress-spinner mode="indeterminate" diameter="24" aria-label="Chargement" />
        <mat-progress-spinner mode="indeterminate" diameter="48" aria-label="Chargement" />
        <mat-progress-spinner mode="indeterminate" diameter="96" aria-label="Chargement" />
      </app-specimen>
      <app-specimen label="Épaisseurs" api="strokeWidth" [snippet]="snippets.epaisseur">
        <mat-progress-spinner mode="determinate" value="65" strokeWidth="2" aria-label="Chargement" />
        <mat-progress-spinner mode="determinate" value="65" strokeWidth="10" aria-label="Chargement" />
      </app-specimen>
    </app-specimen-section>
  `,
})
export class IndicateurCirculairePage {
  protected readonly snippets = SNIPPETS;
}
