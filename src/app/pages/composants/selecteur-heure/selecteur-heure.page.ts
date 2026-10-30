import { Component } from '@angular/core';
import { MatFormField, MatHint, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatTimepicker, MatTimepickerInput, MatTimepickerToggle } from '@angular/material/timepicker';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  simple: `<mat-form-field>
  <mat-label>Heure</mat-label>
  <input matInput [matTimepicker]="picker" />
  <mat-timepicker-toggle matIconSuffix [for]="picker" />
  <mat-timepicker #picker />
</mat-form-field>`,
  intervalle: `<mat-form-field>
  <mat-label>Heure</mat-label>
  <input matInput [matTimepicker]="picker" />
  <mat-hint>Pas de 15 minutes</mat-hint>
  <mat-timepicker-toggle matIconSuffix [for]="picker" />
  <mat-timepicker #picker interval="15m" />
</mat-form-field>`,
  desactive: `<mat-form-field>
  <mat-label>Heure</mat-label>
  <input matInput [matTimepicker]="picker" disabled />
  <mat-timepicker-toggle matIconSuffix [for]="picker" />
  <mat-timepicker #picker />
</mat-form-field>`,
  bornes: `<mat-form-field>
  <mat-label>Heure (8 h – 18 h)</mat-label>
  <input matInput [matTimepicker]="picker" matTimepickerMin="08:00" matTimepickerMax="18:00" />
  <mat-timepicker-toggle matIconSuffix [for]="picker" />
  <mat-timepicker #picker />
</mat-form-field>`,
  heure: `<mat-form-field>
  <mat-label>Heure</mat-label>
  <input matInput [matTimepicker]="picker" />
  <mat-timepicker-toggle matIconSuffix [for]="picker" />
  <mat-timepicker #picker interval="1h" />
</mat-form-field>`,
  ouvertureBouton: `<mat-form-field>
  <mat-label>Heure</mat-label>
  <input matInput [matTimepicker]="picker" [matTimepickerOpenOnClick]="false" />
  <mat-timepicker-toggle matIconSuffix [for]="picker" />
  <mat-timepicker #picker />
</mat-form-field>`,
};

@Component({
  selector: 'app-selecteur-heure-page',
  imports: [
    MatFormField,
    MatLabel,
    MatHint,
    MatSuffix,
    MatInput,
    MatTimepicker,
    MatTimepickerInput,
    MatTimepickerToggle,
    Specimen,
    SpecimenSection,
  ],
  template: `
    <h1>Sélecteur d’heure</h1>

    <app-specimen-section title="Champs">
      <app-specimen label="Heure" api="matTimepicker" [snippet]="snippets.simple">
        <mat-form-field>
          <mat-label>Heure</mat-label>
          <input matInput [matTimepicker]="picker" />
          <mat-timepicker-toggle matIconSuffix [for]="picker" />
          <mat-timepicker #picker />
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Pas personnalisé" api='interval="15m"' [snippet]="snippets.intervalle">
        <mat-form-field>
          <mat-label>Heure</mat-label>
          <input matInput [matTimepicker]="quart" />
          <mat-hint>Pas de 15 minutes</mat-hint>
          <mat-timepicker-toggle matIconSuffix [for]="quart" />
          <mat-timepicker #quart interval="15m" />
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Désactivé" api="disabled" [snippet]="snippets.desactive">
        <mat-form-field>
          <mat-label>Heure</mat-label>
          <input matInput [matTimepicker]="inactif" disabled />
          <mat-timepicker-toggle matIconSuffix [for]="inactif" />
          <mat-timepicker #inactif />
        </mat-form-field>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Restrictions et ouverture">
      <app-specimen label="Heures min et max" api="matTimepickerMin / matTimepickerMax" [snippet]="snippets.bornes">
        <mat-form-field>
          <mat-label>Heure (8 h – 18 h)</mat-label>
          <input matInput [matTimepicker]="borne" matTimepickerMin="08:00" matTimepickerMax="18:00" />
          <mat-timepicker-toggle matIconSuffix [for]="borne" />
          <mat-timepicker #borne />
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Pas d’une heure" api='interval="1h"' [snippet]="snippets.heure">
        <mat-form-field>
          <mat-label>Heure</mat-label>
          <input matInput [matTimepicker]="heure" />
          <mat-timepicker-toggle matIconSuffix [for]="heure" />
          <mat-timepicker #heure interval="1h" />
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Ouverture par le bouton seul" api="matTimepickerOpenOnClick" [snippet]="snippets.ouvertureBouton">
        <mat-form-field>
          <mat-label>Heure</mat-label>
          <input matInput [matTimepicker]="bouton" [matTimepickerOpenOnClick]="false" />
          <mat-timepicker-toggle matIconSuffix [for]="bouton" />
          <mat-timepicker #bouton />
        </mat-form-field>
      </app-specimen>
    </app-specimen-section>
  `,
})
export class SelecteurHeurePage {
  protected readonly snippets = SNIPPETS;
}
