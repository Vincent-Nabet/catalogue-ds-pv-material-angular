import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOptgroup, MatOption } from '@angular/material/core';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  simple: `<mat-form-field>
  <mat-label>Fruit</mat-label>
  <mat-select>
    <mat-option value="pomme">Pomme</mat-option>
    <mat-option value="poire">Poire</mat-option>
    <mat-option value="cerise">Cerise</mat-option>
  </mat-select>
</mat-form-field>`,
  contour: `<mat-form-field appearance="outline">
  <mat-label>Fruit</mat-label>
  <mat-select value="poire">
    <mat-option value="pomme">Pomme</mat-option>
    <mat-option value="poire">Poire</mat-option>
  </mat-select>
</mat-form-field>`,
  multiple: `<mat-form-field>
  <mat-label>Fruits</mat-label>
  <mat-select multiple [value]="['pomme', 'cerise']">
    <mat-option value="pomme">Pomme</mat-option>
    <mat-option value="poire">Poire</mat-option>
    <mat-option value="cerise">Cerise</mat-option>
  </mat-select>
</mat-form-field>`,
  groupes: `<mat-form-field>
  <mat-label>Aliment</mat-label>
  <mat-select>
    <mat-optgroup label="Fruits">
      <mat-option value="pomme">Pomme</mat-option>
    </mat-optgroup>
    <mat-optgroup label="Légumes">
      <mat-option value="carotte">Carotte</mat-option>
    </mat-optgroup>
  </mat-select>
</mat-form-field>`,
  optionDesactivee: `<mat-form-field>
  <mat-label>Fruit</mat-label>
  <mat-select>
    <mat-option value="pomme">Pomme</mat-option>
    <mat-option value="poire" disabled>Poire (épuisée)</mat-option>
  </mat-select>
</mat-form-field>`,
  desactive: `<mat-form-field>
  <mat-label>Fruit</mat-label>
  <mat-select disabled>
    <mat-option value="pomme">Pomme</mat-option>
  </mat-select>
</mat-form-field>`,
  erreur: `<mat-form-field>
  <mat-label>Fruit</mat-label>
  <mat-select [formControl]="fruit">
    <mat-option value="pomme">Pomme</mat-option>
  </mat-select>
  <mat-error>Le fruit est obligatoire.</mat-error>
</mat-form-field>`,
};

@Component({
  selector: 'app-liste-deroulante-page',
  imports: [
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatOptgroup,
    MatFormField,
    MatLabel,
    MatError,
    Specimen,
    SpecimenSection,
  ],
  template: `
    <h1>Liste déroulante</h1>

    <app-specimen-section title="Sélection" description="Cliquer sur le champ pour ouvrir la liste.">
      <app-specimen label="Simple" api="mat-select" [snippet]="snippets.simple">
        <mat-form-field>
          <mat-label>Fruit</mat-label>
          <mat-select>
            <mat-option value="pomme">Pomme</mat-option>
            <mat-option value="poire">Poire</mat-option>
            <mat-option value="cerise">Cerise</mat-option>
          </mat-select>
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Contour, avec valeur" api='appearance="outline"' [snippet]="snippets.contour">
        <mat-form-field appearance="outline">
          <mat-label>Fruit</mat-label>
          <mat-select value="poire">
            <mat-option value="pomme">Pomme</mat-option>
            <mat-option value="poire">Poire</mat-option>
          </mat-select>
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Choix multiple" api="multiple" [snippet]="snippets.multiple">
        <mat-form-field>
          <mat-label>Fruits</mat-label>
          <mat-select multiple [value]="['pomme', 'cerise']">
            <mat-option value="pomme">Pomme</mat-option>
            <mat-option value="poire">Poire</mat-option>
            <mat-option value="cerise">Cerise</mat-option>
          </mat-select>
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Groupes" api="mat-optgroup" [snippet]="snippets.groupes">
        <mat-form-field>
          <mat-label>Aliment</mat-label>
          <mat-select>
            <mat-optgroup label="Fruits">
              <mat-option value="pomme">Pomme</mat-option>
            </mat-optgroup>
            <mat-optgroup label="Légumes">
              <mat-option value="carotte">Carotte</mat-option>
            </mat-optgroup>
          </mat-select>
        </mat-form-field>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="États">
      <app-specimen label="Option désactivée" api="mat-option disabled" [snippet]="snippets.optionDesactivee">
        <mat-form-field>
          <mat-label>Fruit</mat-label>
          <mat-select>
            <mat-option value="pomme">Pomme</mat-option>
            <mat-option value="poire" disabled>Poire (épuisée)</mat-option>
          </mat-select>
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Désactivé" api="disabled" [snippet]="snippets.desactive">
        <mat-form-field>
          <mat-label>Fruit</mat-label>
          <mat-select disabled>
            <mat-option value="pomme">Pomme</mat-option>
          </mat-select>
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Avec erreur" api="mat-error" [snippet]="snippets.erreur">
        <mat-form-field>
          <mat-label>Fruit</mat-label>
          <mat-select [formControl]="fruit">
            <mat-option value="pomme">Pomme</mat-option>
          </mat-select>
          <mat-error>Le fruit est obligatoire.</mat-error>
        </mat-form-field>
      </app-specimen>
    </app-specimen-section>
  `,
})
export class ListeDeroulantePage {
  protected readonly snippets = SNIPPETS;
  protected readonly fruit = new FormControl('', { nonNullable: true, validators: Validators.required });

  constructor() {
    this.fruit.markAsTouched();
  }
}
