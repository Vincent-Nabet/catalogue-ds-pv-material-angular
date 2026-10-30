import { Component } from '@angular/core';
import {
  MatChip,
  MatChipAvatar,
  MatChipGrid,
  MatChipInput,
  MatChipListbox,
  MatChipOption,
  MatChipRemove,
  MatChipRow,
  MatChipSet,
  MatChipTrailingIcon,
} from '@angular/material/chips';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  ensemble: `<mat-chip-set aria-label="Technologies">
  <mat-chip>Angular</mat-chip>
  <mat-chip>TypeScript</mat-chip>
  <mat-chip>RxJS</mat-chip>
</mat-chip-set>`,
  icones: `<mat-chip-set aria-label="Avec icônes">
  <mat-chip>
    <mat-icon matChipAvatar>person</mat-icon>
    Avatar
  </mat-chip>
  <mat-chip>
    Icône finale
    <mat-icon matChipTrailingIcon>info</mat-icon>
  </mat-chip>
</mat-chip-set>`,
  desactive: `<mat-chip-set aria-label="Désactivés">
  <mat-chip disabled>Désactivé</mat-chip>
</mat-chip-set>`,
  selection: `<mat-chip-listbox aria-label="Couleur">
  <mat-chip-option>Rouge</mat-chip-option>
  <mat-chip-option selected>Vert</mat-chip-option>
  <mat-chip-option>Bleu</mat-chip-option>
</mat-chip-listbox>`,
  selectionMultiple: `<mat-chip-listbox aria-label="Options" multiple>
  <mat-chip-option selected>Wi-Fi</mat-chip-option>
  <mat-chip-option selected>Parking</mat-chip-option>
  <mat-chip-option>Piscine</mat-chip-option>
</mat-chip-listbox>`,
  selectionDesactivee: `<mat-chip-listbox aria-label="Couleur">
  <mat-chip-option>Rouge</mat-chip-option>
  <mat-chip-option disabled>Vert</mat-chip-option>
</mat-chip-listbox>`,
  saisie: `<mat-form-field>
  <mat-label>Étiquettes</mat-label>
  <mat-chip-grid #grille aria-label="Étiquettes">
    <mat-chip-row>
      Angular
      <button matChipRemove aria-label="Retirer Angular">
        <mat-icon>cancel</mat-icon>
      </button>
    </mat-chip-row>
    <mat-chip-row>
      Material
      <button matChipRemove aria-label="Retirer Material">
        <mat-icon>cancel</mat-icon>
      </button>
    </mat-chip-row>
  </mat-chip-grid>
  <input placeholder="Ajouter…" [matChipInputFor]="grille" />
</mat-form-field>`,
};

@Component({
  selector: 'app-chips-page',
  imports: [
    MatChip,
    MatChipAvatar,
    MatChipGrid,
    MatChipInput,
    MatChipListbox,
    MatChipOption,
    MatChipRemove,
    MatChipRow,
    MatChipSet,
    MatChipTrailingIcon,
    MatFormField,
    MatLabel,
    MatIcon,
    Specimen,
    SpecimenSection,
  ],
  template: `
    <h1>Chips</h1>

    <app-specimen-section title="Informatifs">
      <app-specimen label="Ensemble" api="mat-chip-set" [snippet]="snippets.ensemble">
        <mat-chip-set aria-label="Technologies">
          <mat-chip>Angular</mat-chip>
          <mat-chip>TypeScript</mat-chip>
          <mat-chip>RxJS</mat-chip>
        </mat-chip-set>
      </app-specimen>
      <app-specimen label="Avec icônes" api="matChipAvatar / matChipTrailingIcon" [snippet]="snippets.icones">
        <mat-chip-set aria-label="Avec icônes">
          <mat-chip>
            <mat-icon matChipAvatar>person</mat-icon>
            Avatar
          </mat-chip>
          <mat-chip>
            Icône finale
            <mat-icon matChipTrailingIcon>info</mat-icon>
          </mat-chip>
        </mat-chip-set>
      </app-specimen>
      <app-specimen label="Désactivé" api="disabled" [snippet]="snippets.desactive">
        <mat-chip-set aria-label="Désactivés">
          <mat-chip disabled>Désactivé</mat-chip>
        </mat-chip-set>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Sélection">
      <app-specimen label="Choix unique" api="mat-chip-listbox" [snippet]="snippets.selection">
        <mat-chip-listbox aria-label="Couleur">
          <mat-chip-option>Rouge</mat-chip-option>
          <mat-chip-option selected>Vert</mat-chip-option>
          <mat-chip-option>Bleu</mat-chip-option>
        </mat-chip-listbox>
      </app-specimen>
      <app-specimen label="Choix multiple" api="multiple" [snippet]="snippets.selectionMultiple">
        <mat-chip-listbox aria-label="Options" multiple>
          <mat-chip-option selected>Wi-Fi</mat-chip-option>
          <mat-chip-option selected>Parking</mat-chip-option>
          <mat-chip-option>Piscine</mat-chip-option>
        </mat-chip-listbox>
      </app-specimen>
      <app-specimen label="Option désactivée" api="mat-chip-option disabled" [snippet]="snippets.selectionDesactivee">
        <mat-chip-listbox aria-label="Couleur désactivée">
          <mat-chip-option>Rouge</mat-chip-option>
          <mat-chip-option disabled>Vert</mat-chip-option>
        </mat-chip-listbox>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Saisie">
      <app-specimen label="Chips amovibles" api="mat-chip-grid / matChipRemove" [snippet]="snippets.saisie">
        <mat-form-field>
          <mat-label>Étiquettes</mat-label>
          <mat-chip-grid #grille aria-label="Étiquettes">
            <mat-chip-row>
              Angular
              <button matChipRemove aria-label="Retirer Angular">
                <mat-icon>cancel</mat-icon>
              </button>
            </mat-chip-row>
            <mat-chip-row>
              Material
              <button matChipRemove aria-label="Retirer Material">
                <mat-icon>cancel</mat-icon>
              </button>
            </mat-chip-row>
          </mat-chip-grid>
          <input placeholder="Ajouter…" [matChipInputFor]="grille" />
        </mat-form-field>
      </app-specimen>
    </app-specimen-section>
  `,
})
export class ChipsPage {
  protected readonly snippets = SNIPPETS;
}
