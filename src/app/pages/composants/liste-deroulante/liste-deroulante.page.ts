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
  panneauSecondaire: `<mat-form-field>
  <mat-label>Fruit</mat-label>
  <mat-select value="poire" panelClass="perso-liste-secondaire">
    <mat-option value="pomme">Pomme</mat-option>
    <mat-option value="poire">Poire</mat-option>
    <mat-option value="cerise">Cerise</mat-option>
  </mat-select>
</mat-form-field>

@use '@angular/material' as mat;

/* Le panneau est rendu dans une surcouche : règle globale (::ng-deep dans un composant) */
.perso-liste-secondaire {
  @include mat.select-overrides((
    panel-background-color: var(--mat-sys-secondary-container),
    container-elevation-shadow: var(--mat-sys-level3),
  ));
  @include mat.option-overrides((
    label-text-color: var(--mat-sys-on-secondary-container),
    hover-state-layer-color: color-mix(in srgb, var(--mat-sys-on-secondary-container) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent),
    focus-state-layer-color: color-mix(in srgb, var(--mat-sys-on-secondary-container) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent),
    selected-state-layer-color: var(--mat-sys-secondary),
    selected-state-label-text-color: var(--mat-sys-on-secondary),
  ));
}`,
  texteOptions: `<mat-form-field>
  <mat-label>Aliment</mat-label>
  <mat-select panelClass="perso-liste-texte">
    <mat-optgroup label="Fruits">
      <mat-option value="pomme">Pomme</mat-option>
      <mat-option value="poire">Poire</mat-option>
    </mat-optgroup>
    <mat-optgroup label="Légumes">
      <mat-option value="carotte">Carotte</mat-option>
    </mat-optgroup>
  </mat-select>
</mat-form-field>

@use '@angular/material' as mat;

/* Le panneau est rendu dans une surcouche : règle globale (::ng-deep dans un composant) */
.perso-liste-texte {
  @include mat.option-overrides((
    label-text-size: var(--mat-sys-title-large-size),
    label-text-line-height: var(--mat-sys-title-large-line-height),
  ));
  @include mat.optgroup-overrides((
    label-text-color: var(--mat-sys-primary),
    label-text-size: var(--mat-sys-title-medium-size),
  ));
}`,
  declencheurTertiaire: `<mat-form-field appearance="outline">
  <mat-label>Fruit</mat-label>
  <mat-select value="poire" class="perso-liste-declencheur">
    <mat-option value="pomme">Pomme</mat-option>
    <mat-option value="poire">Poire</mat-option>
  </mat-select>
</mat-form-field>

@use '@angular/material' as mat;

.perso-liste-declencheur {
  @include mat.select-overrides((
    enabled-trigger-text-color: var(--mat-sys-tertiary),
    enabled-arrow-color: var(--mat-sys-tertiary),
    focused-arrow-color: var(--mat-sys-tertiary),
    trigger-text-weight: var(--mat-sys-title-medium-weight),
  ));
}`,
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

    <app-specimen-section
      minWidth="340px"
      title="Personnalisation (jetons)"
      description="Les mixins mat.select-overrides, mat.option-overrides et mat.optgroup-overrides reçoivent les jetons système --mat-sys-* ; les noms de jetons sont validés à la compilation. Le panneau étant rendu dans une surcouche, sa classe passe par panelClass."
    >
      <app-specimen label="Panneau et options secondaires" api="mat.select-overrides : panel-background-color" [snippet]="snippets.panneauSecondaire">
        <mat-form-field>
          <mat-label>Fruit</mat-label>
          <mat-select value="poire" panelClass="perso-liste-secondaire">
            <mat-option value="pomme">Pomme</mat-option>
            <mat-option value="poire">Poire</mat-option>
            <mat-option value="cerise">Cerise</mat-option>
          </mat-select>
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Texte des options et des groupes" api="mat.option-overrides : label-text-size" [snippet]="snippets.texteOptions">
        <mat-form-field>
          <mat-label>Aliment</mat-label>
          <mat-select panelClass="perso-liste-texte">
            <mat-optgroup label="Fruits">
              <mat-option value="pomme">Pomme</mat-option>
              <mat-option value="poire">Poire</mat-option>
            </mat-optgroup>
            <mat-optgroup label="Légumes">
              <mat-option value="carotte">Carotte</mat-option>
            </mat-optgroup>
          </mat-select>
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Couleur et graisse du déclencheur" api="mat.select-overrides : enabled-trigger-text-color" [snippet]="snippets.declencheurTertiaire">
        <mat-form-field appearance="outline">
          <mat-label>Fruit</mat-label>
          <mat-select value="poire" class="perso-liste-declencheur">
            <mat-option value="pomme">Pomme</mat-option>
            <mat-option value="poire">Poire</mat-option>
          </mat-select>
        </mat-form-field>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    @use '@angular/material' as mat;

    /* Le panneau est rendu dans une surcouche, hors de l’encapsulation du composant : d’où ::ng-deep. */
    ::ng-deep .perso-liste-secondaire {
      @include mat.select-overrides(
        (
          panel-background-color: var(--mat-sys-secondary-container),
          container-elevation-shadow: var(--mat-sys-level3),
        )
      );
      @include mat.option-overrides(
        (
          label-text-color: var(--mat-sys-on-secondary-container),
          hover-state-layer-color: color-mix(in srgb, var(--mat-sys-on-secondary-container) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent),
          focus-state-layer-color: color-mix(in srgb, var(--mat-sys-on-secondary-container) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent),
          selected-state-layer-color: var(--mat-sys-secondary),
          selected-state-label-text-color: var(--mat-sys-on-secondary),
        )
      );
    }

    ::ng-deep .perso-liste-texte {
      @include mat.option-overrides(
        (
          label-text-size: var(--mat-sys-title-large-size),
          label-text-line-height: var(--mat-sys-title-large-line-height),
        )
      );
      @include mat.optgroup-overrides(
        (
          label-text-color: var(--mat-sys-primary),
          label-text-size: var(--mat-sys-title-medium-size),
        )
      );
    }

    .perso-liste-declencheur {
      @include mat.select-overrides(
        (
          enabled-trigger-text-color: var(--mat-sys-tertiary),
          enabled-arrow-color: var(--mat-sys-tertiary),
          focused-arrow-color: var(--mat-sys-tertiary),
          trigger-text-weight: var(--mat-sys-title-medium-weight),
        )
      );
    }
  `,
})
export class ListeDeroulantePage {
  protected readonly snippets = SNIPPETS;
  protected readonly fruit = new FormControl('', { nonNullable: true, validators: Validators.required });

  constructor() {
    this.fruit.markAsTouched();
  }
}
