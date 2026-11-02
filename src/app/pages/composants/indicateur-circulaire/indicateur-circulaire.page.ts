import { Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

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

@Component({
  selector: 'app-indicateur-circulaire-page',
  imports: [MatProgressSpinner, Specimen, SpecimenSection],
  template: `
    <h1>Indicateur circulaire</h1>

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
  `,
})
export class IndicateurCirculairePage {
  protected readonly snippets = SNIPPETS;
}
