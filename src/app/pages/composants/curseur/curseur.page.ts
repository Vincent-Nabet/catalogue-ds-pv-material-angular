import { Component, computed } from '@angular/core';
import { MatSlider, MatSliderRangeThumb, MatSliderThumb } from '@angular/material/slider';
import { injectColorFamilies } from '../../../core/tokens/color-families';
import { ColorFamilyScope } from '../../../shared/color-family-scope/color-family-scope';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

/** Snippet d'une famille personnalisée, dérivé de son nom (la liste des familles est détectée, pas écrite à la main). */
function customSnippet(id: string): string {
  const couleur = `var(--app-color-${id})`;
  return `<mat-slider discrete showTickMarks min="0" max="100" step="10" class="${id}">
  <input matSliderThumb value="40" aria-label="Volume ${id}" />
</mat-slider>

@use '@angular/material' as mat;

.${id} {
  $couleur: ${couleur};

  @include mat.slider-overrides((
    active-track-color: $couleur,
    handle-color: $couleur,
    hover-handle-color: $couleur,
    focus-handle-color: $couleur,
    ripple-color: $couleur,
    hover-state-layer-color: color-mix(in srgb, $couleur calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent),
    focus-state-layer-color: color-mix(in srgb, $couleur calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent),
    label-container-color: $couleur,
    label-label-text-color: var(--app-color-on-${id}),
    with-overlap-handle-outline-color: var(--app-color-on-${id}),
    with-tick-marks-active-container-color: var(--app-color-on-${id}),
  ));
}`;
}

const SNIPPETS = {
  simple: `<mat-slider>
  <input matSliderThumb value="40" aria-label="Volume" />
</mat-slider>`,
  etiquette: `<mat-slider discrete min="0" max="100" step="10">
  <input matSliderThumb value="40" aria-label="Volume" />
</mat-slider>`,
  graduations: `<mat-slider discrete showTickMarks min="0" max="100" step="10">
  <input matSliderThumb value="50" aria-label="Volume" />
</mat-slider>`,
  plage: `<mat-slider min="0" max="100">
  <input matSliderStartThumb value="20" aria-label="Minimum" />
  <input matSliderEndThumb value="70" aria-label="Maximum" />
</mat-slider>`,
  desactive: `<mat-slider disabled>
  <input matSliderThumb value="40" aria-label="Volume" />
</mat-slider>`,
  formate: `<mat-slider discrete min="0" max="100" step="5" [displayWith]="pourcentage">
  <input matSliderThumb value="35" aria-label="Opacité" />
</mat-slider>

pourcentage = (valeur: number) => valeur + ' %';`,
  plageEtiquettes: `<mat-slider discrete showTickMarks min="0" max="100" step="10">
  <input matSliderStartThumb value="20" aria-label="Minimum" />
  <input matSliderEndThumb value="70" aria-label="Maximum" />
</mat-slider>`,
  pasFin: `<mat-slider discrete min="0" max="5" step="0.5">
  <input matSliderThumb value="2.5" aria-label="Note" />
</mat-slider>`,
  roles: `<mat-slider discrete showTickMarks min="0" max="100" step="10" class="secondaire">
  <input matSliderThumb value="40" aria-label="Volume secondaire" />
</mat-slider>
<mat-slider discrete showTickMarks min="0" max="100" step="10" class="tertiaire">
  <input matSliderThumb value="60" aria-label="Volume tertiaire" />
</mat-slider>
<mat-slider discrete showTickMarks min="0" max="100" step="10" class="erreur">
  <input matSliderThumb value="80" aria-label="Volume erreur" />
</mat-slider>

@use '@angular/material' as mat;

.secondaire {
  $couleur: var(--mat-sys-secondary);

  @include mat.slider-overrides((
    active-track-color: $couleur,
    handle-color: $couleur,
    hover-handle-color: $couleur,
    focus-handle-color: $couleur,
    ripple-color: $couleur,
    hover-state-layer-color: color-mix(in srgb, $couleur calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent),
    focus-state-layer-color: color-mix(in srgb, $couleur calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent),
    label-container-color: $couleur,
    label-label-text-color: var(--mat-sys-on-secondary),
    with-overlap-handle-outline-color: var(--mat-sys-on-secondary),
    with-tick-marks-active-container-color: var(--mat-sys-on-secondary),
  ));
}

/* Mêmes jetons avec secondary → tertiary (.tertiaire) et error (.erreur) */`,
  rail: `<mat-slider class="rail-epais">
  <input matSliderThumb value="60" aria-label="Volume" />
</mat-slider>

@use '@angular/material' as mat;

.rail-epais {
  @include mat.slider-overrides((
    active-track-height: 16px,
    inactive-track-height: 16px,
    handle-width: 4px,
    handle-height: 44px,
  ));
}`,
  angulaire: `<mat-slider discrete showTickMarks min="0" max="100" step="10" class="angulaire">
  <input matSliderThumb value="50" aria-label="Volume" />
</mat-slider>

@use '@angular/material' as mat;

.angulaire {
  @include mat.slider-overrides((
    active-track-height: 8px,
    inactive-track-height: 8px,
    active-track-shape: var(--mat-sys-corner-none),
    inactive-track-shape: var(--mat-sys-corner-none),
    handle-shape: var(--mat-sys-corner-extra-small),
    with-tick-marks-container-shape: var(--mat-sys-corner-none),
  ));
}`,
};

@Component({
  selector: 'app-curseur-page',
  imports: [MatSlider, MatSliderThumb, MatSliderRangeThumb, Specimen, SpecimenSection, ColorFamilyScope],
  template: `
    <h1>Curseur</h1>

    <app-specimen-section title="Valeur unique">
      <app-specimen label="Continu" api="mat-slider" [snippet]="snippets.simple">
        <mat-slider>
          <input matSliderThumb value="40" aria-label="Volume" />
        </mat-slider>
      </app-specimen>
      <app-specimen label="Avec étiquette" api="discrete" [snippet]="snippets.etiquette">
        <mat-slider discrete min="0" max="100" step="10">
          <input matSliderThumb value="40" aria-label="Volume" />
        </mat-slider>
      </app-specimen>
      <app-specimen label="Avec graduations" api="showTickMarks" [snippet]="snippets.graduations">
        <mat-slider discrete showTickMarks min="0" max="100" step="10">
          <input matSliderThumb value="50" aria-label="Volume" />
        </mat-slider>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Plage et états">
      <app-specimen label="Plage de valeurs" api="matSliderStartThumb / matSliderEndThumb" [snippet]="snippets.plage">
        <mat-slider min="0" max="100">
          <input matSliderStartThumb value="20" aria-label="Minimum" />
          <input matSliderEndThumb value="70" aria-label="Maximum" />
        </mat-slider>
      </app-specimen>
      <app-specimen label="Désactivé" api="disabled" [snippet]="snippets.desactive">
        <mat-slider disabled>
          <input matSliderThumb value="40" aria-label="Volume" />
        </mat-slider>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Étiquettes et pas">
      <app-specimen label="Étiquette formatée" api="displayWith" [snippet]="snippets.formate">
        <mat-slider discrete min="0" max="100" step="5" [displayWith]="pourcentage">
          <input matSliderThumb value="35" aria-label="Opacité" />
        </mat-slider>
      </app-specimen>
      <app-specimen label="Plage avec graduations" api="discrete showTickMarks" [snippet]="snippets.plageEtiquettes">
        <mat-slider discrete showTickMarks min="0" max="100" step="10">
          <input matSliderStartThumb value="20" aria-label="Minimum" />
          <input matSliderEndThumb value="70" aria-label="Maximum" />
        </mat-slider>
      </app-specimen>
      <app-specimen label="Pas décimal" api='step="0.5"' [snippet]="snippets.pasFin">
        <mat-slider discrete min="0" max="5" step="0.5">
          <input matSliderThumb value="2.5" aria-label="Note" />
        </mat-slider>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section
      title="Personnalisation (jetons)"
      description="Couleurs de rôle, épaisseur du rail et formes via le mixin mat.slider-overrides, avec les jetons système --mat-sys-* pour les couleurs et les formes (noms de jetons validés à la compilation). Hauteurs et largeurs n’ont pas de jeton système."
    >
      <app-specimen label="Rôles de couleur" api="slider-overrides : active-track-color" [snippet]="snippets.roles">
        <mat-slider discrete showTickMarks min="0" max="100" step="10" class="secondaire">
          <input matSliderThumb value="40" aria-label="Volume secondaire" />
        </mat-slider>
        <mat-slider discrete showTickMarks min="0" max="100" step="10" class="tertiaire">
          <input matSliderThumb value="60" aria-label="Volume tertiaire" />
        </mat-slider>
        <mat-slider discrete showTickMarks min="0" max="100" step="10" class="erreur">
          <input matSliderThumb value="80" aria-label="Volume erreur" />
        </mat-slider>
      </app-specimen>
      <app-specimen label="Rail épais, poignée en barre" api="slider-overrides : active-track-height" [snippet]="snippets.rail">
        <mat-slider class="rail-epais">
          <input matSliderThumb value="60" aria-label="Volume" />
        </mat-slider>
      </app-specimen>
      <app-specimen label="Formes angulaires" api="slider-overrides : active-track-shape" [snippet]="snippets.angulaire">
        <mat-slider discrete showTickMarks min="0" max="100" step="10" class="angulaire">
          <input matSliderThumb value="50" aria-label="Volume" />
        </mat-slider>
      </app-specimen>
    </app-specimen-section>

    @if (families().length > 0) {
      <app-specimen-section
        title="Couleurs personnalisées"
        description="Familles de couleur propres au design system (--app-color-*), détectées dans le CSS chargé : même principe que les rôles M3, appliqué avec les jetons du design system (rail et poignée, avec le texte de l’étiquette et les graduations en couleur « sur »)."
      >
        @for (family of families(); track family.id) {
          <app-specimen [label]="family.label" [api]="family.api" [snippet]="family.snippet" [custom]="true">
            <span [appColorFamily]="family.id">
              <mat-slider discrete showTickMarks min="0" max="100" step="10" class="perso">
                <input matSliderThumb value="40" [attr.aria-label]="'Volume ' + family.label" />
              </mat-slider>
            </span>
          </app-specimen>
        }
      </app-specimen-section>
    }
  `,
  styles: `
    @use '@angular/material' as mat;
    @use 'roles';

    .secondaire {
      @include roles.slider(secondary);
    }

    .tertiaire {
      @include roles.slider(tertiary);
    }

    .erreur {
      @include roles.slider(error);
    }

    .perso {
      @include roles.slider(custom);
    }

    .rail-epais {
      @include mat.slider-overrides(
        (
          active-track-height: 16px,
          inactive-track-height: 16px,
          handle-width: 4px,
          handle-height: 44px,
        )
      );
    }

    .angulaire {
      @include mat.slider-overrides(
        (
          active-track-height: 8px,
          inactive-track-height: 8px,
          active-track-shape: var(--mat-sys-corner-none),
          inactive-track-shape: var(--mat-sys-corner-none),
          handle-shape: var(--mat-sys-corner-extra-small),
          with-tick-marks-container-shape: var(--mat-sys-corner-none),
        )
      );
    }
  `,
})
export class CurseurPage {
  protected readonly snippets = SNIPPETS;
  protected readonly pourcentage = (valeur: number): string => `${valeur} %`;

  private readonly detected = injectColorFamilies();

  /** Une famille par jeu `--app-color-*` complet (vide avec un thème Angular Material). */
  protected readonly families = computed(() =>
    this.detected().map(({ id, label }) => ({ id, label, api: 'slider-overrides : active-track-color', snippet: customSnippet(id) })),
  );
}
