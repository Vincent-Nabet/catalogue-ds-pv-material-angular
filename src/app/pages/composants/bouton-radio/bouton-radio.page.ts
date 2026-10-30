import { Component } from '@angular/core';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  groupe: `<mat-radio-group aria-label="Taille" value="m">
  <mat-radio-button value="s">Petite</mat-radio-button>
  <mat-radio-button value="m">Moyenne</mat-radio-button>
  <mat-radio-button value="l">Grande</mat-radio-button>
</mat-radio-group>`,
  horizontal: `<mat-radio-group aria-label="Réponse" value="oui">
  <mat-radio-button value="oui">Oui</mat-radio-button>
  <mat-radio-button value="non">Non</mat-radio-button>
</mat-radio-group>`,
  avant: `<mat-radio-group aria-label="Taille" value="m" labelPosition="before">
  <mat-radio-button value="s">Petite</mat-radio-button>
  <mat-radio-button value="m">Moyenne</mat-radio-button>
</mat-radio-group>`,
  optionDesactivee: `<mat-radio-group aria-label="Taille" value="s">
  <mat-radio-button value="s">Petite</mat-radio-button>
  <mat-radio-button value="m" disabled>Moyenne (indisponible)</mat-radio-button>
</mat-radio-group>`,
  desactive: `<mat-radio-group aria-label="Taille" value="m" disabled>
  <mat-radio-button value="s">Petite</mat-radio-button>
  <mat-radio-button value="m">Moyenne</mat-radio-button>
</mat-radio-group>`,
};

@Component({
  selector: 'app-bouton-radio-page',
  imports: [MatRadioGroup, MatRadioButton, Specimen, SpecimenSection],
  template: `
    <h1>Bouton radio</h1>

    <app-specimen-section title="Groupes">
      <app-specimen label="Vertical" api="mat-radio-group" [snippet]="snippets.groupe">
        <mat-radio-group aria-label="Taille" value="m" class="colonne">
          <mat-radio-button value="s">Petite</mat-radio-button>
          <mat-radio-button value="m">Moyenne</mat-radio-button>
          <mat-radio-button value="l">Grande</mat-radio-button>
        </mat-radio-group>
      </app-specimen>
      <app-specimen label="Horizontal" api="mat-radio-group" [snippet]="snippets.horizontal">
        <mat-radio-group aria-label="Réponse" value="oui">
          <mat-radio-button value="oui">Oui</mat-radio-button>
          <mat-radio-button value="non">Non</mat-radio-button>
        </mat-radio-group>
      </app-specimen>
      <app-specimen label="Libellé avant" api='labelPosition="before"' [snippet]="snippets.avant">
        <mat-radio-group aria-label="Taille" value="m" labelPosition="before" class="colonne">
          <mat-radio-button value="s">Petite</mat-radio-button>
          <mat-radio-button value="m">Moyenne</mat-radio-button>
        </mat-radio-group>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="États">
      <app-specimen label="Option désactivée" api="mat-radio-button disabled" [snippet]="snippets.optionDesactivee">
        <mat-radio-group aria-label="Taille" value="s" class="colonne">
          <mat-radio-button value="s">Petite</mat-radio-button>
          <mat-radio-button value="m" disabled>Moyenne (indisponible)</mat-radio-button>
        </mat-radio-group>
      </app-specimen>
      <app-specimen label="Groupe désactivé" api="disabled" [snippet]="snippets.desactive">
        <mat-radio-group aria-label="Taille" value="m" disabled class="colonne">
          <mat-radio-button value="s">Petite</mat-radio-button>
          <mat-radio-button value="m">Moyenne</mat-radio-button>
        </mat-radio-group>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    .colonne {
      display: flex;
      flex-direction: column;
    }
  `,
})
export class BoutonRadioPage {
  protected readonly snippets = SNIPPETS;
}
