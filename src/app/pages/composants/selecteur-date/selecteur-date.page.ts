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
  vueAnnee: `<mat-calendar startView="year" />`,
  vueMultiAnnees: `<mat-calendar startView="multi-year" />`,
  calendrierBorne: `<mat-calendar [selected]="selection" [minDate]="min" [maxDate]="max" />`,
  bornes: `<mat-form-field>
  <mat-label>Date (octobre 2026, du 5 au 25)</mat-label>
  <input matInput [matDatepicker]="picker" [min]="min" [max]="max" />
  <mat-datepicker-toggle matIconSuffix [for]="picker" />
  <mat-datepicker #picker />
</mat-form-field>`,
  filtre: `<mat-form-field>
  <mat-label>Jours ouvrés</mat-label>
  <input matInput [matDatepicker]="picker" [matDatepickerFilter]="joursOuvres" />
  <mat-datepicker-toggle matIconSuffix [for]="picker" />
  <mat-datepicker #picker />
</mat-form-field>

joursOuvres = (date: Date | null) => !!date && date.getDay() !== 0 && date.getDay() !== 6;`,
  tactile: `<mat-form-field>
  <mat-label>Date</mat-label>
  <input matInput [matDatepicker]="picker" />
  <mat-datepicker-toggle matIconSuffix [for]="picker" />
  <mat-datepicker #picker touchUi />
</mat-form-field>`,
  vueAnneeChamp: `<mat-form-field>
  <mat-label>Date de naissance</mat-label>
  <input matInput [matDatepicker]="picker" />
  <mat-datepicker-toggle matIconSuffix [for]="picker" />
  <mat-datepicker #picker startView="multi-year" />
</mat-form-field>`,
  separateur: `<mat-form-field>
  <mat-label>Période</mat-label>
  <mat-date-range-input [rangePicker]="picker" separator="→">
    <input matStartDate placeholder="Début" />
    <input matEndDate placeholder="Fin" />
  </mat-date-range-input>
  <mat-datepicker-toggle matIconSuffix [for]="picker" />
  <mat-date-range-picker #picker />
</mat-form-field>`,
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

    <app-specimen-section minWidth="360px" title="Champs" description="Locale française (fr-FR), via l’adaptateur de date natif.">
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

    <app-specimen-section minWidth="360px" title="Calendrier">
      <app-specimen label="Calendrier intégré" api="mat-calendar" [snippet]="snippets.calendrier">
        <mat-calendar class="calendrier" />
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section minWidth="360px" title="Champs : restrictions et affichage">
      <app-specimen label="Dates min et max" api="min / max" [snippet]="snippets.bornes">
        <mat-form-field>
          <mat-label>Du 5 au 25 octobre 2026</mat-label>
          <input matInput [matDatepicker]="borne" [min]="min" [max]="max" />
          <mat-datepicker-toggle matIconSuffix [for]="borne" />
          <mat-datepicker #borne />
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Filtre (jours ouvrés)" api="matDatepickerFilter" [snippet]="snippets.filtre">
        <mat-form-field>
          <mat-label>Jours ouvrés</mat-label>
          <input matInput [matDatepicker]="ouvres" [matDatepickerFilter]="joursOuvres" />
          <mat-datepicker-toggle matIconSuffix [for]="ouvres" />
          <mat-datepicker #ouvres />
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Interface tactile" api="touchUi" [snippet]="snippets.tactile">
        <mat-form-field>
          <mat-label>Date</mat-label>
          <input matInput [matDatepicker]="tactile" />
          <mat-datepicker-toggle matIconSuffix [for]="tactile" />
          <mat-datepicker #tactile touchUi />
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Ouverture par les années" api='startView="multi-year"' [snippet]="snippets.vueAnneeChamp">
        <mat-form-field>
          <mat-label>Date de naissance</mat-label>
          <input matInput [matDatepicker]="naissance" />
          <mat-datepicker-toggle matIconSuffix [for]="naissance" />
          <mat-datepicker #naissance startView="multi-year" />
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Séparateur de plage" api='separator="→"' [snippet]="snippets.separateur">
        <mat-form-field>
          <mat-label>Période</mat-label>
          <mat-date-range-input [rangePicker]="periode" separator="→">
            <input matStartDate placeholder="Début" />
            <input matEndDate placeholder="Fin" />
          </mat-date-range-input>
          <mat-datepicker-toggle matIconSuffix [for]="periode" />
          <mat-date-range-picker #periode />
        </mat-form-field>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section minWidth="360px" title="Calendriers">
      <app-specimen label="Vue des mois d’une année" api='startView="year"' [snippet]="snippets.vueAnnee">
        <mat-calendar class="calendrier" startView="year" />
      </app-specimen>
      <app-specimen label="Vue des années" api='startView="multi-year"' [snippet]="snippets.vueMultiAnnees">
        <mat-calendar class="calendrier" startView="multi-year" />
      </app-specimen>
      <app-specimen label="Date sélectionnée et bornes" api="selected / minDate / maxDate" [snippet]="snippets.calendrierBorne">
        <mat-calendar class="calendrier" [selected]="selection" [startAt]="selection" [minDate]="min" [maxDate]="max" />
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
  protected readonly min = new Date(2026, 9, 5);
  protected readonly max = new Date(2026, 9, 25);
  protected readonly selection = new Date(2026, 9, 15);
  protected readonly joursOuvres = (date: Date | null): boolean =>
    !!date && date.getDay() !== 0 && date.getDay() !== 6;
}
