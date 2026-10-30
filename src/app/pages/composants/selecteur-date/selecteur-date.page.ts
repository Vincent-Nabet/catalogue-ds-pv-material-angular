import { Component } from '@angular/core';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import {
  MatCalendar,
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker,
  MatEndDate,
  MatStartDate,
} from '@angular/material/datepicker';
import { MatFormField, MatHint, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { DatepickerIntlFr } from '../../../core/i18n/intl-fr';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  simple: `<mat-form-field>
  <mat-label>Date</mat-label>
  <input matInput [matDatepicker]="picker" />
  <mat-hint>JJ/MM/AAAA</mat-hint>
  <mat-datepicker-toggle matIconSuffix [for]="picker" />
  <mat-datepicker #picker />
</mat-form-field>`,
  plage: `<mat-form-field>
  <mat-label>Période</mat-label>
  <mat-date-range-input [rangePicker]="picker">
    <input matStartDate placeholder="Début" />
    <input matEndDate placeholder="Fin" />
  </mat-date-range-input>
  <mat-datepicker-toggle matIconSuffix [for]="picker" />
  <mat-date-range-picker #picker />
</mat-form-field>`,
  desactive: `<mat-form-field>
  <mat-label>Date</mat-label>
  <input matInput [matDatepicker]="picker" disabled />
  <mat-datepicker-toggle matIconSuffix [for]="picker" />
  <mat-datepicker #picker />
</mat-form-field>`,
  calendrier: `<mat-calendar />`,
};

@Component({
  selector: 'app-selecteur-date-page',
  imports: [
    MatCalendar,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDateRangeInput,
    MatDateRangePicker,
    MatStartDate,
    MatEndDate,
    MatFormField,
    MatLabel,
    MatHint,
    MatSuffix,
    MatInput,
    Specimen,
    SpecimenSection,
  ],
  providers: [{ provide: MatDatepickerIntl, useClass: DatepickerIntlFr }],
  template: `
    <h1>Sélecteur de date</h1>

    <app-specimen-section title="Champs" description="Locale française (fr-FR), via l’adaptateur de date natif.">
      <app-specimen label="Date" api="matDatepicker" [snippet]="snippets.simple">
        <mat-form-field>
          <mat-label>Date</mat-label>
          <input matInput [matDatepicker]="picker" />
          <mat-hint>JJ/MM/AAAA</mat-hint>
          <mat-datepicker-toggle matIconSuffix [for]="picker" />
          <mat-datepicker #picker />
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Plage de dates" api="mat-date-range-input" [snippet]="snippets.plage">
        <mat-form-field>
          <mat-label>Période</mat-label>
          <mat-date-range-input [rangePicker]="plage">
            <input matStartDate placeholder="Début" />
            <input matEndDate placeholder="Fin" />
          </mat-date-range-input>
          <mat-datepicker-toggle matIconSuffix [for]="plage" />
          <mat-date-range-picker #plage />
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Désactivé" api="disabled" [snippet]="snippets.desactive">
        <mat-form-field>
          <mat-label>Date</mat-label>
          <input matInput [matDatepicker]="inactif" disabled />
          <mat-datepicker-toggle matIconSuffix [for]="inactif" />
          <mat-datepicker #inactif />
        </mat-form-field>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Calendrier">
      <app-specimen label="Calendrier intégré" api="mat-calendar" [snippet]="snippets.calendrier">
        <mat-calendar class="calendrier" />
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    .calendrier {
      width: 296px;
    }
  `,
})
export class SelecteurDatePage {
  protected readonly snippets = SNIPPETS;
}
