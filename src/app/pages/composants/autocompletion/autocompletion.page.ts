import { Component } from '@angular/core';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatOptgroup, MatOption } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  simple: `<mat-form-field>
  <mat-label>Ville</mat-label>
  <input matInput [matAutocomplete]="auto" />
  <mat-autocomplete #auto="matAutocomplete">
    <mat-option value="Rennes">Rennes</mat-option>
    <mat-option value="Nantes">Nantes</mat-option>
    <mat-option value="Brest">Brest</mat-option>
  </mat-autocomplete>
</mat-form-field>`,
  groupes: `<mat-form-field>
  <mat-label>Région</mat-label>
  <input matInput [matAutocomplete]="auto" />
  <mat-autocomplete #auto="matAutocomplete">
    <mat-optgroup label="Bretagne">
      <mat-option value="Rennes">Rennes</mat-option>
      <mat-option value="Brest">Brest</mat-option>
    </mat-optgroup>
    <mat-optgroup label="Pays de la Loire">
      <mat-option value="Nantes">Nantes</mat-option>
    </mat-optgroup>
  </mat-autocomplete>
</mat-form-field>`,
  desactive: `<mat-form-field>
  <mat-label>Ville</mat-label>
  <input matInput [matAutocomplete]="auto" disabled />
  <mat-autocomplete #auto="matAutocomplete"></mat-autocomplete>
</mat-form-field>`,
  optionDesactivee: `<mat-form-field>
  <mat-label>Ville</mat-label>
  <input matInput [matAutocomplete]="auto" />
  <mat-autocomplete #auto="matAutocomplete">
    <mat-option value="Rennes">Rennes</mat-option>
    <mat-option value="Nantes" disabled>Nantes (indisponible)</mat-option>
  </mat-autocomplete>
</mat-form-field>`,
};

@Component({
  selector: 'app-autocompletion-page',
  imports: [
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatOption,
    MatOptgroup,
    MatFormField,
    MatLabel,
    MatInput,
    Specimen,
    SpecimenSection,
  ],
  template: `
    <h1>Autocomplétion</h1>

    <app-specimen-section title="Suggestions" description="Cliquer dans le champ pour afficher la liste.">
      <app-specimen label="Simple" api="matAutocomplete" [snippet]="snippets.simple">
        <mat-form-field>
          <mat-label>Ville</mat-label>
          <input matInput [matAutocomplete]="auto" />
          <mat-autocomplete #auto="matAutocomplete">
            <mat-option value="Rennes">Rennes</mat-option>
            <mat-option value="Nantes">Nantes</mat-option>
            <mat-option value="Brest">Brest</mat-option>
          </mat-autocomplete>
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Groupes" api="mat-optgroup" [snippet]="snippets.groupes">
        <mat-form-field>
          <mat-label>Région</mat-label>
          <input matInput [matAutocomplete]="groupes" />
          <mat-autocomplete #groupes="matAutocomplete">
            <mat-optgroup label="Bretagne">
              <mat-option value="Rennes">Rennes</mat-option>
              <mat-option value="Brest">Brest</mat-option>
            </mat-optgroup>
            <mat-optgroup label="Pays de la Loire">
              <mat-option value="Nantes">Nantes</mat-option>
            </mat-optgroup>
          </mat-autocomplete>
        </mat-form-field>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="États">
      <app-specimen label="Désactivé" api="disabled" [snippet]="snippets.desactive">
        <mat-form-field>
          <mat-label>Ville</mat-label>
          <input matInput [matAutocomplete]="inactif" disabled />
          <mat-autocomplete #inactif="matAutocomplete"></mat-autocomplete>
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Option désactivée" api="mat-option disabled" [snippet]="snippets.optionDesactivee">
        <mat-form-field>
          <mat-label>Ville</mat-label>
          <input matInput [matAutocomplete]="partiel" />
          <mat-autocomplete #partiel="matAutocomplete">
            <mat-option value="Rennes">Rennes</mat-option>
            <mat-option value="Nantes" disabled>Nantes (indisponible)</mat-option>
          </mat-autocomplete>
        </mat-form-field>
      </app-specimen>
    </app-specimen-section>
  `,
})
export class AutocompletionPage {
  protected readonly snippets = SNIPPETS;
}
