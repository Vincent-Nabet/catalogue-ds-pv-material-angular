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
  inactifFocalisable: `<mat-checkbox [disabledInteractive]="true" disabled>Désactivée, focalisable</mat-checkbox>`,
  sansRipple: `<mat-checkbox [disableRipple]="true">Sans effet d'ondulation</mat-checkbox>`,
  imbriquees: `<mat-checkbox [indeterminate]="true">Tout sélectionner</mat-checkbox>
<ul>
  <li><mat-checkbox checked>Premier</mat-checkbox></li>
  <li><mat-checkbox>Second</mat-checkbox></li>
</ul>`,
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

    <app-specimen-section title="Options">
      <app-specimen label="Désactivée mais focalisable" api="disabledInteractive" [snippet]="snippets.inactifFocalisable">
        <mat-checkbox [disabledInteractive]="true" disabled>Désactivée, focalisable</mat-checkbox>
      </app-specimen>
      <app-specimen label="Sans ondulation" api="disableRipple" [snippet]="snippets.sansRipple">
        <mat-checkbox [disableRipple]="true">Sans effet d’ondulation</mat-checkbox>
      </app-specimen>
      <app-specimen label="Cases imbriquées" api="indeterminate" [snippet]="snippets.imbriquees">
        <ul class="imbriquees">
          <li>
            <mat-checkbox [indeterminate]="true">Tout sélectionner</mat-checkbox>
            <ul>
              <li><mat-checkbox checked>Premier</mat-checkbox></li>
              <li><mat-checkbox>Second</mat-checkbox></li>
            </ul>
          </li>
        </ul>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    .imbriquees,
    .imbriquees ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .imbriquees ul {
      padding-inline-start: 32px;
    }
  `,
})
export class CaseACocherPage {
  protected readonly snippets = SNIPPETS;
}
