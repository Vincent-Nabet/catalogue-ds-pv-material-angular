import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOptgroup, MatOption } from '@angular/material/core';
import { MatError, MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatSelect, MatSelectTrigger } from '@angular/material/select';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';
import { MatIcon } from '@angular/material/icon';

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
  placeholder: `<mat-form-field>
  <mat-select placeholder="Choisir un fruit" aria-label="Fruit">
    <mat-option value="pomme">Pomme</mat-option>
    <mat-option value="poire">Poire</mat-option>
  </mat-select>
</mat-form-field>`,
  sansCoche: `<mat-form-field>
  <mat-label>Fruit</mat-label>
  <mat-select value="pomme" hideSingleSelectionIndicator>
    <mat-option value="pomme">Pomme</mat-option>
    <mat-option value="poire">Poire</mat-option>
  </mat-select>
</mat-form-field>`,
  sousChamp: `<mat-form-field>
  <mat-label>Fruit</mat-label>
  <mat-select disableOptionCentering>
    <mat-option value="pomme">Pomme</mat-option>
    <mat-option value="poire">Poire</mat-option>
  </mat-select>
</mat-form-field>`,
  nullable: `<mat-form-field>
  <mat-label>Fruit</mat-label>
  <mat-select [canSelectNullableOptions]="true" value="pomme">
    <mat-option [value]="null">Aucun</mat-option>
    <mat-option value="pomme">Pomme</mat-option>
  </mat-select>
</mat-form-field>`,
  largeurAuto: `<mat-form-field>
  <mat-label>Fruit</mat-label>
  <mat-select panelWidth="auto">
    <mat-option value="pomme">Pomme golden bien mûre</mat-option>
    <mat-option value="poire">Poire</mat-option>
  </mat-select>
</mat-form-field>`,
  declencheur: `<mat-form-field>
  <mat-label>Fruits</mat-label>
  <mat-select multiple [value]="['pomme', 'cerise']">
    <mat-select-trigger>Pomme (+1 autre)</mat-select-trigger>
    <mat-option value="pomme">Pomme</mat-option>
    <mat-option value="poire">Poire</mat-option>
    <mat-option value="cerise">Cerise</mat-option>
  </mat-select>
</mat-form-field>`,
  prefixe: `<mat-form-field>
  <mat-label>Fruit</mat-label>
  <mat-icon matPrefix>nutrition</mat-icon>
  <mat-select>
    <mat-option value="pomme">Pomme</mat-option>
  </mat-select>
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
    MatSelectTrigger,
    MatIcon,
    MatPrefix,
  ],
  template: `
    <h1>Liste déroulante</h1>

    <app-specimen-section minWidth="340px" title="Sélection" description="Cliquer sur le champ pour ouvrir la liste.">
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

    <app-specimen-section minWidth="340px" title="États">
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

    <app-specimen-section minWidth="340px" title="Présentation et comportements">
      <app-specimen label="Placeholder seul" api="placeholder" [snippet]="snippets.placeholder">
        <mat-form-field>
          <mat-select placeholder="Choisir un fruit" aria-label="Fruit">
            <mat-option value="pomme">Pomme</mat-option>
            <mat-option value="poire">Poire</mat-option>
          </mat-select>
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Avec icône préfixe" api="matPrefix" [snippet]="snippets.prefixe">
        <mat-form-field>
          <mat-label>Fruit</mat-label>
          <mat-icon matPrefix>nutrition</mat-icon>
          <mat-select>
            <mat-option value="pomme">Pomme</mat-option>
          </mat-select>
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Déclencheur personnalisé" api="mat-select-trigger" [snippet]="snippets.declencheur">
        <mat-form-field>
          <mat-label>Fruits</mat-label>
          <mat-select multiple [value]="['pomme', 'cerise']">
            <mat-select-trigger>Pomme (+1 autre)</mat-select-trigger>
            <mat-option value="pomme">Pomme</mat-option>
            <mat-option value="poire">Poire</mat-option>
            <mat-option value="cerise">Cerise</mat-option>
          </mat-select>
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Sans coche de sélection" api="hideSingleSelectionIndicator" [snippet]="snippets.sansCoche">
        <mat-form-field>
          <mat-label>Fruit</mat-label>
          <mat-select value="pomme" hideSingleSelectionIndicator>
            <mat-option value="pomme">Pomme</mat-option>
            <mat-option value="poire">Poire</mat-option>
          </mat-select>
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Panneau sous le champ" api="disableOptionCentering" [snippet]="snippets.sousChamp">
        <mat-form-field>
          <mat-label>Fruit</mat-label>
          <mat-select disableOptionCentering>
            <mat-option value="pomme">Pomme</mat-option>
            <mat-option value="poire">Poire</mat-option>
          </mat-select>
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Option vide sélectionnable" api="canSelectNullableOptions" [snippet]="snippets.nullable">
        <mat-form-field>
          <mat-label>Fruit</mat-label>
          <mat-select [canSelectNullableOptions]="true" value="pomme">
            <mat-option [value]="null">Aucun</mat-option>
            <mat-option value="pomme">Pomme</mat-option>
          </mat-select>
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Panneau à largeur du contenu" api='panelWidth="auto"' [snippet]="snippets.largeurAuto">
        <mat-form-field>
          <mat-label>Fruit</mat-label>
          <mat-select panelWidth="auto">
            <mat-option value="pomme">Pomme golden bien mûre</mat-option>
            <mat-option value="poire">Poire</mat-option>
          </mat-select>
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
