import { Component, computed, inject } from '@angular/core';
import { MatFormField, MatHint, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatTimepicker, MatTimepickerInput, MatTimepickerToggle } from '@angular/material/timepicker';
import { injectColorFamilies } from '../../../core/tokens/color-families';
import { OverlayFamily } from '../../../shared/color-family-scope/overlay-family';
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
  panneauTertiaire: `<mat-form-field>
  <mat-label>Heure</mat-label>
  <input matInput [matTimepicker]="picker" [value]="heureChoisie" />
  <mat-timepicker-toggle matIconSuffix [for]="picker" />
  <mat-timepicker #picker panelClass="perso-heure-tertiaire" />
</mat-form-field>

heureChoisie = new Date(2026, 9, 15, 9, 30);

@use '@angular/material' as mat;

/* Le panneau est rendu dans une surcouche : règle globale (::ng-deep dans un composant) */
.perso-heure-tertiaire {
  @include mat.timepicker-overrides((
    container-background-color: var(--mat-sys-tertiary-container),
    container-shape: var(--mat-sys-corner-large),
    container-elevation-shadow: var(--mat-sys-level3),
  ));
  @include mat.option-overrides((
    label-text-color: var(--mat-sys-on-tertiary-container),
    hover-state-layer-color: color-mix(in srgb, var(--mat-sys-on-tertiary-container) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent),
    focus-state-layer-color: color-mix(in srgb, var(--mat-sys-on-tertiary-container) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent),
    selected-state-layer-color: var(--mat-sys-tertiary),
    selected-state-label-text-color: var(--mat-sys-on-tertiary),
  ));
}`,
  panneauSureleve: `<mat-form-field>
  <mat-label>Heure</mat-label>
  <input matInput [matTimepicker]="picker" />
  <mat-timepicker-toggle matIconSuffix [for]="picker" />
  <mat-timepicker #picker panelClass="perso-heure-sureleve" />
</mat-form-field>

@use '@angular/material' as mat;

/* Le panneau est rendu dans une surcouche : règle globale (::ng-deep dans un composant) */
.perso-heure-sureleve {
  @include mat.timepicker-overrides((
    container-background-color: var(--mat-sys-surface-container-highest),
    container-elevation-shadow: var(--mat-sys-level5),
  ));
  @include mat.option-overrides((
    label-text-size: var(--mat-sys-title-large-size),
    label-text-line-height: var(--mat-sys-title-large-line-height),
  ));
}`,
};

/** Snippet d'une famille personnalisée, dérivé de son nom (la liste des familles est détectée, pas écrite à la main). */
function customSnippet(id: string): string {
  return `<mat-form-field>
  <mat-label>Heure</mat-label>
  <input matInput [matTimepicker]="picker" [value]="heureChoisie" />
  <mat-timepicker-toggle matIconSuffix [for]="picker" />
  <mat-timepicker #picker panelClass="perso-heure-${id}" />
</mat-form-field>

heureChoisie = new Date(2026, 9, 15, 9, 30);

@use '@angular/material' as mat;

/* Le panneau est rendu dans une surcouche : règle globale (::ng-deep dans un composant) */
.perso-heure-${id} {
  @include mat.timepicker-overrides((
    container-background-color: var(--app-color-${id}-container),
  ));
  @include mat.option-overrides((
    label-text-color: var(--app-color-on-${id}-container),
    hover-state-layer-color: color-mix(in srgb, var(--app-color-on-${id}-container) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent),
    focus-state-layer-color: color-mix(in srgb, var(--app-color-on-${id}-container) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent),
    selected-state-layer-color: var(--app-color-${id}),
    selected-state-label-text-color: var(--app-color-on-${id}),
  ));
}`;
}

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

    <app-specimen-section
      title="Personnalisation (jetons)"
      description="Les mixins mat.timepicker-overrides et mat.option-overrides reçoivent les jetons système --mat-sys-* ; les noms de jetons sont validés à la compilation. Le panneau étant rendu dans une surcouche, sa classe passe par panelClass."
    >
      <app-specimen label="Panneau tertiaire, angles arrondis" api="mat.timepicker-overrides : container-background-color" [snippet]="snippets.panneauTertiaire">
        <mat-form-field>
          <mat-label>Heure</mat-label>
          <input matInput [matTimepicker]="tertiaire" [value]="heureChoisie" />
          <mat-timepicker-toggle matIconSuffix [for]="tertiaire" />
          <mat-timepicker #tertiaire panelClass="perso-heure-tertiaire" />
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Panneau surélevé, texte agrandi" api="mat.timepicker-overrides : container-elevation-shadow" [snippet]="snippets.panneauSureleve">
        <mat-form-field>
          <mat-label>Heure</mat-label>
          <input matInput [matTimepicker]="sureleve" />
          <mat-timepicker-toggle matIconSuffix [for]="sureleve" />
          <mat-timepicker #sureleve panelClass="perso-heure-sureleve" />
        </mat-form-field>
      </app-specimen>
    </app-specimen-section>

    @if (families().length > 0) {
      <app-specimen-section
        title="Couleurs personnalisées"
        description="Familles de couleur propres au design system (--app-color-*), détectées dans le CSS chargé : même principe que les rôles M3, appliqué avec les jetons du design system (conteneur, texte et option sélectionnée de la même famille ensemble). Le panneau étant rendu dans une surcouche, la famille est posée sur celle-ci avant l’ouverture."
      >
        @for (family of families(); track family.id) {
          <app-specimen [label]="family.label" [api]="family.api" [snippet]="family.snippet" [custom]="true">
            <mat-form-field (focusin)="overlayFamily.apply(family.id)" (click)="overlayFamily.apply(family.id)">
              <mat-label>Heure {{ family.label }}</mat-label>
              <input matInput [matTimepicker]="heureFamille" [value]="heureChoisie" />
              <mat-timepicker-toggle matIconSuffix [for]="heureFamille" />
              <mat-timepicker #heureFamille panelClass="perso-heure-famille" />
            </mat-form-field>
          </app-specimen>
        }
      </app-specimen-section>
    }
  `,
  styles: `
    @use '@angular/material' as mat;
    @use 'roles';

    /* Le panneau est rendu dans une surcouche, hors de l’encapsulation du composant : d’où ::ng-deep. */
    ::ng-deep .perso-heure-tertiaire {
      @include mat.timepicker-overrides(
        (
          container-background-color: var(--mat-sys-tertiary-container),
          container-shape: var(--mat-sys-corner-large),
          container-elevation-shadow: var(--mat-sys-level3),
        )
      );
      @include mat.option-overrides(
        (
          label-text-color: var(--mat-sys-on-tertiary-container),
          hover-state-layer-color: color-mix(in srgb, var(--mat-sys-on-tertiary-container) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent),
          focus-state-layer-color: color-mix(in srgb, var(--mat-sys-on-tertiary-container) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent),
          selected-state-layer-color: var(--mat-sys-tertiary),
          selected-state-label-text-color: var(--mat-sys-on-tertiary),
        )
      );
    }

    ::ng-deep .perso-heure-famille {
      @include roles.timepicker(custom);
    }

    ::ng-deep .perso-heure-sureleve {
      @include mat.timepicker-overrides(
        (
          container-background-color: var(--mat-sys-surface-container-highest),
          container-elevation-shadow: var(--mat-sys-level5),
        )
      );
      @include mat.option-overrides(
        (
          label-text-size: var(--mat-sys-title-large-size),
          label-text-line-height: var(--mat-sys-title-large-line-height),
        )
      );
    }
  `,
})
export class SelecteurHeurePage {
  protected readonly snippets = SNIPPETS;
  protected readonly heureChoisie = new Date(2026, 9, 15, 9, 30);
  protected readonly overlayFamily = inject(OverlayFamily);

  private readonly detected = injectColorFamilies();

  /** Une famille par jeu `--app-color-*` complet (vide avec un thème Angular Material). */
  protected readonly families = computed(() =>
    this.detected().map(({ id, label }) => ({
      id,
      label,
      api: `mat.timepicker-overrides : --app-color-${id}-container`,
      snippet: customSnippet(id),
    })),
  );
}
