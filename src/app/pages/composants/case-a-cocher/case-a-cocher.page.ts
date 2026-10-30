import { Component } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  decochee: `<mat-checkbox>Décochée</mat-checkbox>`,
  cochee: `<mat-checkbox checked>Cochée</mat-checkbox>`,
  indeterminee: `<mat-checkbox [indeterminate]="true">Indéterminée</mat-checkbox>`,
  decocheeDesactivee: `<mat-checkbox disabled>Décochée</mat-checkbox>`,
  cocheeDesactivee: `<mat-checkbox checked disabled>Cochée</mat-checkbox>`,
  apres: `<mat-checkbox labelPosition="before">Libellé avant</mat-checkbox>`,
  requise: `<mat-checkbox required>J’accepte les conditions</mat-checkbox>`,
};

@Component({
  selector: 'app-case-a-cocher-page',
  imports: [MatCheckbox, Specimen, SpecimenSection],
  template: `
    <h1>Case à cocher</h1>

    <app-specimen-section title="États">
      <app-specimen label="Décochée" api="mat-checkbox" [snippet]="snippets.decochee">
        <mat-checkbox>Décochée</mat-checkbox>
      </app-specimen>
      <app-specimen label="Cochée" api="checked" [snippet]="snippets.cochee">
        <mat-checkbox checked>Cochée</mat-checkbox>
      </app-specimen>
      <app-specimen label="Indéterminée" api="indeterminate" [snippet]="snippets.indeterminee">
        <mat-checkbox [indeterminate]="true">Indéterminée</mat-checkbox>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Désactivées">
      <app-specimen label="Décochée" api="disabled" [snippet]="snippets.decocheeDesactivee">
        <mat-checkbox disabled>Décochée</mat-checkbox>
      </app-specimen>
      <app-specimen label="Cochée" api="checked disabled" [snippet]="snippets.cocheeDesactivee">
        <mat-checkbox checked disabled>Cochée</mat-checkbox>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Variantes">
      <app-specimen label="Libellé avant" api='labelPosition="before"' [snippet]="snippets.apres">
        <mat-checkbox labelPosition="before">Libellé avant</mat-checkbox>
      </app-specimen>
      <app-specimen label="Requise" api="required" [snippet]="snippets.requise">
        <mat-checkbox required>J’accepte les conditions</mat-checkbox>
      </app-specimen>
    </app-specimen-section>
  `,
})
export class CaseACocherPage {
  protected readonly snippets = SNIPPETS;
}
