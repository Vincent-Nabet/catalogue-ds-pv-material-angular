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
  objets: `<mat-form-field>
  <mat-label>Ville</mat-label>
  <input matInput [matAutocomplete]="auto" />
  <mat-autocomplete #auto="matAutocomplete" [displayWith]="afficher">
    @for (ville of villes; track ville.nom) {
      <mat-option [value]="ville">{{ ville.nom }}</mat-option>
    }
  </mat-autocomplete>
</mat-form-field>

afficher = (ville: { nom: string } | null) => ville?.nom ?? '';`,
  premiere: `<mat-form-field>
  <mat-label>Ville</mat-label>
  <input matInput [matAutocomplete]="auto" />
  <mat-autocomplete #auto="matAutocomplete" autoActiveFirstOption>
    <mat-option value="Rennes">Rennes</mat-option>
    <mat-option value="Nantes">Nantes</mat-option>
  </mat-autocomplete>
</mat-form-field>`,
  obligatoire: `<mat-form-field>
  <mat-label>Ville</mat-label>
  <input matInput [matAutocomplete]="auto" />
  <mat-autocomplete #auto="matAutocomplete" [requireSelection]="true">
    <mat-option value="Rennes">Rennes</mat-option>
    <mat-option value="Nantes">Nantes</mat-option>
  </mat-autocomplete>
</mat-form-field>`,
  largeur: `<mat-form-field>
  <mat-label>Ville</mat-label>
  <input matInput [matAutocomplete]="auto" />
  <mat-autocomplete #auto="matAutocomplete" panelWidth="400px">
    <mat-option value="Rennes">Rennes</mat-option>
  </mat-autocomplete>
</mat-form-field>`,
  inactifAuto: `<mat-form-field>
  <mat-label>Ville</mat-label>
  <input matInput [matAutocomplete]="auto" [matAutocompleteDisabled]="true" />
  <mat-autocomplete #auto="matAutocomplete">
    <mat-option value="Rennes">Rennes</mat-option>
  </mat-autocomplete>
</mat-form-field>`,
  panneauArrondi: `<mat-form-field>
  <mat-label>Ville</mat-label>
  <input matInput [matAutocomplete]="auto" />
  <mat-autocomplete #auto="matAutocomplete" class="perso-panneau-arrondi">
    <mat-option value="Rennes">Rennes</mat-option>
    <mat-option value="Nantes">Nantes</mat-option>
    <mat-option value="Brest">Brest</mat-option>
  </mat-autocomplete>
</mat-form-field>

@use '@angular/material' as mat;

/* Le panneau est rendu dans une surcouche : règle globale (::ng-deep dans un composant) */
.perso-panneau-arrondi {
  @include mat.autocomplete-overrides((
    container-shape: var(--mat-sys-corner-extra-large),
    container-elevation-shadow: var(--mat-sys-level4),
  ));
}`,
  panneauTertiaire: `<mat-form-field>
  <mat-label>Ville</mat-label>
  <input matInput [matAutocomplete]="auto" />
  <mat-autocomplete #auto="matAutocomplete" class="perso-panneau-tertiaire">
    <mat-option value="Rennes">Rennes</mat-option>
    <mat-option value="Nantes">Nantes</mat-option>
    <mat-option value="Brest">Brest</mat-option>
  </mat-autocomplete>
</mat-form-field>

@use '@angular/material' as mat;

/* Le panneau est rendu dans une surcouche : règle globale (::ng-deep dans un composant) */
.perso-panneau-tertiaire {
  @include mat.autocomplete-overrides((
    background-color: var(--mat-sys-tertiary-container),
  ));
  @include mat.option-overrides((
    label-text-color: var(--mat-sys-on-tertiary-container),
    selected-state-layer-color: var(--mat-sys-tertiary),
    selected-state-label-text-color: var(--mat-sys-on-tertiary),
  ));
}`,
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

    <app-specimen-section minWidth="340px" title="Suggestions" description="Cliquer dans le champ pour afficher la liste.">
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

    <app-specimen-section minWidth="340px" title="États">
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

    <app-specimen-section minWidth="340px" title="Comportements">
      <app-specimen label="Valeurs objets (displayWith)" api="displayWith" [snippet]="snippets.objets">
        <mat-form-field>
          <mat-label>Ville</mat-label>
          <input matInput [matAutocomplete]="objets" />
          <mat-autocomplete #objets="matAutocomplete" [displayWith]="afficher">
            @for (ville of villes; track ville.nom) {
              <mat-option [value]="ville">{{ ville.nom }}</mat-option>
            }
          </mat-autocomplete>
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Première option active" api="autoActiveFirstOption" [snippet]="snippets.premiere">
        <mat-form-field>
          <mat-label>Ville</mat-label>
          <input matInput [matAutocomplete]="premiere" />
          <mat-autocomplete #premiere="matAutocomplete" autoActiveFirstOption>
            <mat-option value="Rennes">Rennes</mat-option>
            <mat-option value="Nantes">Nantes</mat-option>
          </mat-autocomplete>
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Sélection obligatoire" api="requireSelection" [snippet]="snippets.obligatoire">
        <mat-form-field>
          <mat-label>Ville</mat-label>
          <input matInput [matAutocomplete]="obligatoire" />
          <mat-autocomplete #obligatoire="matAutocomplete" [requireSelection]="true">
            <mat-option value="Rennes">Rennes</mat-option>
            <mat-option value="Nantes">Nantes</mat-option>
          </mat-autocomplete>
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Largeur du panneau" api='panelWidth="400px"' [snippet]="snippets.largeur">
        <mat-form-field>
          <mat-label>Ville</mat-label>
          <input matInput [matAutocomplete]="large" />
          <mat-autocomplete #large="matAutocomplete" panelWidth="400px">
            <mat-option value="Rennes">Rennes</mat-option>
            <mat-option value="Nantes">Nantes</mat-option>
          </mat-autocomplete>
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Panneau désactivé" api="matAutocompleteDisabled" [snippet]="snippets.inactifAuto">
        <mat-form-field>
          <mat-label>Ville</mat-label>
          <input matInput [matAutocomplete]="sansPanneau" [matAutocompleteDisabled]="true" />
          <mat-autocomplete #sansPanneau="matAutocomplete">
            <mat-option value="Rennes">Rennes</mat-option>
          </mat-autocomplete>
        </mat-form-field>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section
      minWidth="340px"
      title="Personnalisation (jetons)"
      description="Le panneau est rendu dans une surcouche : sa classe passe par l’entrée class de mat-autocomplete, et le style par les mixins mat.autocomplete-overrides et mat.option-overrides (noms de jetons validés à la compilation). Cliquer dans le champ pour voir le panneau."
    >
      <app-specimen label="Forme et élévation du panneau" api="autocomplete-overrides : container-shape" [snippet]="snippets.panneauArrondi">
        <mat-form-field>
          <mat-label>Ville</mat-label>
          <input matInput [matAutocomplete]="arrondi" />
          <mat-autocomplete #arrondi="matAutocomplete" class="perso-panneau-arrondi">
            <mat-option value="Rennes">Rennes</mat-option>
            <mat-option value="Nantes">Nantes</mat-option>
            <mat-option value="Brest">Brest</mat-option>
          </mat-autocomplete>
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Couleurs du panneau et des options" api="autocomplete-overrides : background-color" [snippet]="snippets.panneauTertiaire">
        <mat-form-field>
          <mat-label>Ville</mat-label>
          <input matInput [matAutocomplete]="tertiaire" />
          <mat-autocomplete #tertiaire="matAutocomplete" class="perso-panneau-tertiaire">
            <mat-option value="Rennes">Rennes</mat-option>
            <mat-option value="Nantes">Nantes</mat-option>
            <mat-option value="Brest">Brest</mat-option>
          </mat-autocomplete>
        </mat-form-field>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    @use '@angular/material' as mat;

    /* Le panneau est rendu dans une surcouche, hors de l’encapsulation du composant : d’où ::ng-deep. */
    ::ng-deep .perso-panneau-arrondi {
      @include mat.autocomplete-overrides(
        (
          container-shape: var(--mat-sys-corner-extra-large),
          container-elevation-shadow: var(--mat-sys-level4),
        )
      );
    }

    ::ng-deep .perso-panneau-tertiaire {
      @include mat.autocomplete-overrides(
        (
          background-color: var(--mat-sys-tertiary-container),
        )
      );
      @include mat.option-overrides(
        (
          label-text-color: var(--mat-sys-on-tertiary-container),
          selected-state-layer-color: var(--mat-sys-tertiary),
          selected-state-label-text-color: var(--mat-sys-on-tertiary),
        )
      );
    }
  `,
})
export class AutocompletionPage {
  protected readonly snippets = SNIPPETS;
  protected readonly villes = [{ nom: 'Rennes' }, { nom: 'Nantes' }, { nom: 'Brest' }];
  protected readonly afficher = (ville: { nom: string } | null): string => ville?.nom ?? '';
}
