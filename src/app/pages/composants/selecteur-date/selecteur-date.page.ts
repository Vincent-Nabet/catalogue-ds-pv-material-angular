import { Component, computed, inject } from '@angular/core';
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
import { injectColorFamilies } from '../../../core/tokens/color-families';
import { ColorFamilyScope } from '../../../shared/color-family-scope/color-family-scope';
import { OverlayFamily } from '../../../shared/color-family-scope/overlay-family';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';
import { ComposantRef } from '../../../shared/composant-ref/composant-ref';

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
  calendrierTertiaire: `<mat-calendar class="perso-calendrier-tertiaire" [selected]="selection" [startAt]="selection" />

@use '@angular/material' as mat;

.perso-calendrier-tertiaire {
  @include mat.datepicker-overrides((
    calendar-date-selected-state-background-color: var(--mat-sys-tertiary),
    calendar-date-selected-state-text-color: var(--mat-sys-on-tertiary),
  ));
}`,
  plageSecondaire: `<mat-form-field>
  <mat-label>Période</mat-label>
  <mat-date-range-input [rangePicker]="picker">
    <input matStartDate placeholder="Début" />
    <input matEndDate placeholder="Fin" />
  </mat-date-range-input>
  <mat-datepicker-toggle matIconSuffix [for]="picker" />
  <mat-date-range-picker #picker panelClass="perso-calendrier-secondaire" />
</mat-form-field>

@use '@angular/material' as mat;

/* Le calendrier est rendu dans une surcouche : règle globale (::ng-deep dans un composant) */
.perso-calendrier-secondaire {
  @include mat.datepicker-overrides((
    calendar-date-selected-state-background-color: var(--mat-sys-secondary),
    calendar-date-selected-state-text-color: var(--mat-sys-on-secondary),
    calendar-date-in-range-state-background-color: var(--mat-sys-secondary-container),
    calendar-date-today-outline-color: var(--mat-sys-secondary),
    calendar-date-preview-state-outline-color: var(--mat-sys-secondary),
  ));
}`,
  calendrierTexte: `<mat-calendar class="perso-calendrier-texte" [selected]="selection" [startAt]="selection" />

@use '@angular/material' as mat;

.perso-calendrier-texte {
  @include mat.datepicker-overrides((
    calendar-text-size: var(--mat-sys-body-large-size),
    calendar-period-button-text-size: var(--mat-sys-title-large-size),
  ));
}`,
};

/** Snippet d'une famille personnalisée, dérivé de son nom (la liste des familles est détectée, pas écrite à la main). */
function customSnippet(id: string): string {
  return `<mat-calendar class="perso-calendrier-${id}" [selected]="selection" [startAt]="selection" />

<mat-form-field>
  <mat-label>Période</mat-label>
  <mat-date-range-input [rangePicker]="picker">
    <input matStartDate placeholder="Début" />
    <input matEndDate placeholder="Fin" />
  </mat-date-range-input>
  <mat-datepicker-toggle matIconSuffix [for]="picker" />
  <mat-date-range-picker #picker panelClass="perso-calendrier-${id}" />
</mat-form-field>

@use '@angular/material' as mat;

/* Dans un champ, le calendrier est rendu dans une surcouche : règle globale (::ng-deep dans un composant) */
.perso-calendrier-${id} {
  @include mat.datepicker-overrides((
    calendar-date-selected-state-background-color: var(--app-color-${id}),
    calendar-date-selected-state-text-color: var(--app-color-on-${id}),
    calendar-date-in-range-state-background-color: var(--app-color-${id}-container),
    calendar-date-today-outline-color: var(--app-color-${id}),
    calendar-date-preview-state-outline-color: var(--app-color-${id}),
  ));
}`;
}

@Component({
  selector: 'app-selecteur-date-page',
  imports: [
    ComposantRef,
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
    ColorFamilyScope,
  ],
  providers: [{ provide: MatDatepickerIntl, useClass: DatepickerIntlFr }],
  template: `
    <h1>Sélecteur de date</h1>
    <app-composant-ref />

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

    <app-specimen-section
      minWidth="360px"
      title="Personnalisation (jetons)"
      description="Le mixin mat.datepicker-overrides reçoit les jetons système --mat-sys-* ; les noms de jetons sont validés à la compilation. Dans un champ, le calendrier est rendu dans une surcouche : sa classe passe par panelClass (elle s’applique au calendrier, pas à son conteneur : fond, forme et ombre du conteneur ne sont donc pas modifiables ainsi)."
    >
      <app-specimen label="Date sélectionnée en tertiaire" api="mat.datepicker-overrides : calendar-date-selected-state-background-color" [snippet]="snippets.calendrierTertiaire">
        <mat-calendar class="calendrier perso-calendrier-tertiaire" [selected]="selection" [startAt]="selection" />
      </app-specimen>
      <app-specimen label="Plage en secondaire (panelClass)" api="mat.datepicker-overrides : calendar-date-in-range-state-background-color" [snippet]="snippets.plageSecondaire">
        <mat-form-field>
          <mat-label>Période</mat-label>
          <mat-date-range-input [rangePicker]="plageSecondaire">
            <input matStartDate placeholder="Début" />
            <input matEndDate placeholder="Fin" />
          </mat-date-range-input>
          <mat-datepicker-toggle matIconSuffix [for]="plageSecondaire" />
          <mat-date-range-picker #plageSecondaire panelClass="perso-calendrier-secondaire" />
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Texte du calendrier agrandi" api="mat.datepicker-overrides : calendar-text-size" [snippet]="snippets.calendrierTexte">
        <mat-calendar class="calendrier perso-calendrier-texte" [selected]="selection" [startAt]="selection" />
      </app-specimen>
    </app-specimen-section>

    @if (families().length > 0) {
      <app-specimen-section
        minWidth="360px"
        title="Couleurs personnalisées"
        description="Familles de couleur propres au design system (--app-color-*), détectées dans le CSS chargé : même principe que les rôles M3, appliqué avec les jetons du design system (sélection, plage et texte de la même famille ensemble). Dans un champ, le calendrier s’ouvre dans le champ ou dans une surcouche : la famille est posée sur les deux (sur la surcouche, à l’ouverture), et la classe s’applique au calendrier, pas à son conteneur."
      >
        @for (family of families(); track family.id) {
          <app-specimen [label]="family.label" [api]="family.api" [snippet]="family.snippet" [custom]="true">
            <span [appColorFamily]="family.id">
              <mat-calendar class="calendrier perso-calendrier-famille" [selected]="selection" [startAt]="selection" />
              <mat-form-field>
                <mat-label>Période {{ family.label }}</mat-label>
                <mat-date-range-input [rangePicker]="plageFamille">
                  <input matStartDate placeholder="Début" />
                  <input matEndDate placeholder="Fin" />
                </mat-date-range-input>
                <mat-datepicker-toggle matIconSuffix [for]="plageFamille" />
                <mat-date-range-picker #plageFamille panelClass="perso-calendrier-famille" (opened)="overlayFamily.apply(family.id)" />
              </mat-form-field>
              <mat-form-field>
                <mat-label>Date {{ family.label }}</mat-label>
                <input matInput [matDatepicker]="dateFamille" />
                <mat-datepicker-toggle matIconSuffix [for]="dateFamille" />
                <mat-datepicker #dateFamille panelClass="perso-calendrier-famille" (opened)="overlayFamily.apply(family.id)" />
              </mat-form-field>
            </span>
          </app-specimen>
        }
      </app-specimen-section>
    }
  `,
  styles: `
    @use '@angular/material' as mat;
    @use 'roles';

    .calendrier {
      width: 296px;
    }

    .perso-calendrier-tertiaire {
      @include mat.datepicker-overrides(
        (
          calendar-date-selected-state-background-color: var(--mat-sys-tertiary),
          calendar-date-selected-state-text-color: var(--mat-sys-on-tertiary),
        )
      );
    }

    .perso-calendrier-texte {
      @include mat.datepicker-overrides(
        (
          calendar-text-size: var(--mat-sys-body-large-size),
          calendar-period-button-text-size: var(--mat-sys-title-large-size),
        )
      );
    }

    /* Le calendrier d’un champ est rendu dans une surcouche, hors de l’encapsulation du composant : d’où ::ng-deep
       (cette règle sert aussi au mat-calendar posé dans la page). */
    ::ng-deep .perso-calendrier-famille {
      @include roles.datepicker(custom);
    }

    ::ng-deep .perso-calendrier-secondaire {
      @include mat.datepicker-overrides(
        (
          calendar-date-selected-state-background-color: var(--mat-sys-secondary),
          calendar-date-selected-state-text-color: var(--mat-sys-on-secondary),
          calendar-date-in-range-state-background-color: var(--mat-sys-secondary-container),
          calendar-date-today-outline-color: var(--mat-sys-secondary),
          calendar-date-preview-state-outline-color: var(--mat-sys-secondary),
        )
      );
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
  protected readonly overlayFamily = inject(OverlayFamily);

  private readonly detected = injectColorFamilies();

  /** Une famille par jeu `--app-color-*` complet (vide avec un thème Angular Material). */
  protected readonly families = computed(() =>
    this.detected().map(({ id, label }) => ({
      id,
      label,
      api: `mat.datepicker-overrides : --app-color-${id}`,
      snippet: customSnippet(id),
    })),
  );
}
