import { Component, computed } from '@angular/core';
import { injectColorFamilies } from '../../../core/tokens/color-families';
import { ColorFamilyScope } from '../../../shared/color-family-scope/color-family-scope';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';
import { ComposantRef } from '../../../shared/composant-ref/composant-ref';

const SNIPPETS = {
  determine: `<mat-progress-spinner mode="determinate" value="65" aria-label="Chargement" />`,
  indetermine: `<mat-progress-spinner mode="indeterminate" aria-label="Chargement" />`,
  diametre: `<mat-progress-spinner mode="indeterminate" diameter="24" aria-label="Chargement" />
<mat-progress-spinner mode="indeterminate" diameter="48" aria-label="Chargement" />
<mat-progress-spinner mode="indeterminate" diameter="96" aria-label="Chargement" />`,
  epaisseur: `<mat-progress-spinner mode="determinate" value="65" strokeWidth="2" aria-label="Chargement" />
<mat-progress-spinner mode="determinate" value="65" strokeWidth="10" aria-label="Chargement" />`,
  couleurs: `<mat-progress-spinner mode="determinate" value="65" class="secondaire" aria-label="Chargement" />
<mat-progress-spinner mode="determinate" value="65" class="tertiaire" aria-label="Chargement" />
<mat-progress-spinner mode="determinate" value="65" class="erreur" aria-label="Chargement" />

@use '@angular/material' as mat;

.secondaire {
  @include mat.progress-spinner-overrides((
    active-indicator-color: var(--mat-sys-secondary),
  ));
}

.tertiaire {
  @include mat.progress-spinner-overrides((
    active-indicator-color: var(--mat-sys-tertiary),
  ));
}

.erreur {
  @include mat.progress-spinner-overrides((
    active-indicator-color: var(--mat-sys-error),
  ));
}`,
};

/** Snippet d'une famille personnalisée, dérivé de son nom (la liste des familles est détectée, pas écrite à la main). */
function customSnippet(id: string): string {
  return `<mat-progress-spinner mode="determinate" value="65" class="${id}" aria-label="Chargement" />
<mat-progress-spinner mode="indeterminate" diameter="32" class="${id}" aria-label="Chargement en cours" />

@use '@angular/material' as mat;

.${id} {
  @include mat.progress-spinner-overrides((
    active-indicator-color: var(--app-color-${id}),
  ));
}`;
}

@Component({
  selector: 'app-indicateur-circulaire-page',
  imports: [ComposantRef, MatProgressSpinner, Specimen, SpecimenSection, ColorFamilyScope],
  template: `
    <h1>Indicateur circulaire</h1>
    <app-composant-ref />

    <app-specimen-section title="Modes">
      <app-specimen label="Déterminé" api='mode="determinate"' [snippet]="snippets.determine">
        <mat-progress-spinner mode="determinate" value="65" aria-label="Chargement" />
      </app-specimen>
      <app-specimen label="Indéterminé" api='mode="indeterminate"' [snippet]="snippets.indetermine">
        <mat-progress-spinner mode="indeterminate" aria-label="Chargement" />
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Dimensions">
      <app-specimen label="Diamètres" api="diameter" [snippet]="snippets.diametre">
        <mat-progress-spinner mode="indeterminate" diameter="24" aria-label="Chargement" />
        <mat-progress-spinner mode="indeterminate" diameter="48" aria-label="Chargement" />
        <mat-progress-spinner mode="indeterminate" diameter="96" aria-label="Chargement" />
      </app-specimen>
      <app-specimen label="Épaisseurs" api="strokeWidth" [snippet]="snippets.epaisseur">
        <mat-progress-spinner mode="determinate" value="65" strokeWidth="2" aria-label="Chargement" />
        <mat-progress-spinner mode="determinate" value="65" strokeWidth="10" aria-label="Chargement" />
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section
      title="Personnalisation (jetons)"
      description="Le mixin Sass mat.progress-spinner-overrides colore l’indicateur avec les rôles --mat-sys-* ; les noms de jetons sont validés à la compilation. Diamètre et épaisseur se règlent déjà par les entrées diameter et strokeWidth."
    >
      <app-specimen label="Rôles de couleur" api="mat.progress-spinner-overrides : active-indicator-color" [snippet]="snippets.couleurs">
        <mat-progress-spinner mode="determinate" value="65" class="secondaire" aria-label="Chargement" />
        <mat-progress-spinner mode="determinate" value="65" class="tertiaire" aria-label="Chargement" />
        <mat-progress-spinner mode="determinate" value="65" class="erreur" aria-label="Chargement" />
      </app-specimen>
    </app-specimen-section>

    @if (families().length > 0) {
      <app-specimen-section
        title="Couleurs personnalisées"
        description="Familles de couleur propres au design system (--app-color-*), détectées dans le CSS chargé : même principe que les rôles M3, appliqué avec les jetons du design system (couleur de l’indicateur actif)."
      >
        @for (family of families(); track family.id) {
          <app-specimen [label]="family.label" [api]="family.api" [snippet]="family.snippet" [custom]="true">
            <span [appColorFamily]="family.id">
              <mat-progress-spinner mode="determinate" value="65" class="perso" [attr.aria-label]="'Chargement ' + family.label" />
              <mat-progress-spinner mode="indeterminate" diameter="32" class="perso" [attr.aria-label]="'Chargement en cours ' + family.label" />
            </span>
          </app-specimen>
        }
      </app-specimen-section>
    }
  `,
  styles: `
    @use '@angular/material' as mat;

    .secondaire {
      @include mat.progress-spinner-overrides(
        (
          active-indicator-color: var(--mat-sys-secondary),
        )
      );
    }

    .tertiaire {
      @include mat.progress-spinner-overrides(
        (
          active-indicator-color: var(--mat-sys-tertiary),
        )
      );
    }

    .erreur {
      @include mat.progress-spinner-overrides(
        (
          active-indicator-color: var(--mat-sys-error),
        )
      );
    }

    .perso {
      @include mat.progress-spinner-overrides(
        (
          active-indicator-color: var(--r-f),
        )
      );
    }
  `,
})
export class IndicateurCirculairePage {
  protected readonly snippets = SNIPPETS;

  private readonly detected = injectColorFamilies();

  /** Une famille par jeu `--app-color-*` complet (vide avec un thème Angular Material). */
  protected readonly families = computed(() =>
    this.detected().map(({ id, label }) => ({
      id,
      label,
      api: 'mat.progress-spinner-overrides : active-indicator-color',
      snippet: customSnippet(id),
    })),
  );
}
