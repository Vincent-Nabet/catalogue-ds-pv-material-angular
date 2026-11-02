import { Component, computed } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { injectColorFamilies } from '../../../core/tokens/color-families';
import { ColorFamilyScope } from '../../../shared/color-family-scope/color-family-scope';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  determine: `<mat-progress-bar mode="determinate" value="60" aria-label="Chargement" />`,
  indetermine: `<mat-progress-bar mode="indeterminate" aria-label="Chargement" />`,
  tampon: `<mat-progress-bar mode="buffer" value="40" bufferValue="70" aria-label="Chargement" />`,
  requete: `<mat-progress-bar mode="query" aria-label="Chargement" />`,
  zero: `<mat-progress-bar mode="determinate" value="0" aria-label="Chargement" />`,
  complet: `<mat-progress-bar mode="determinate" value="100" aria-label="Chargement" />`,
  couleurs: `<mat-progress-bar mode="determinate" value="60" class="secondaire" aria-label="Chargement" />
<mat-progress-bar mode="determinate" value="60" class="tertiaire" aria-label="Chargement" />
<mat-progress-bar mode="determinate" value="60" class="erreur" aria-label="Chargement" />

@use '@angular/material' as mat;

@mixin role($indicateur, $piste) {
  @include mat.progress-bar-overrides((
    active-indicator-color: $indicateur,
    track-color: $piste,
  ));
}

.secondaire {
  @include role(var(--mat-sys-secondary), var(--mat-sys-secondary-container));
}

.tertiaire {
  @include role(var(--mat-sys-tertiary), var(--mat-sys-tertiary-container));
}

.erreur {
  @include role(var(--mat-sys-error), var(--mat-sys-error-container));
}`,
  epaisse: `<mat-progress-bar mode="determinate" value="60" class="epaisse" aria-label="Chargement" />

@use '@angular/material' as mat;

.epaisse {
  @include mat.progress-bar-overrides((
    active-indicator-height: 12px,
    track-height: 12px,
    track-shape: var(--mat-sys-corner-full),
  ));
}`,
};

/** Snippet d'une famille personnalisée, dérivé de son nom (la liste des familles est détectée, pas écrite à la main). */
function customSnippet(id: string): string {
  return `<mat-progress-bar mode="determinate" value="60" class="${id}" aria-label="Chargement" />

@use '@angular/material' as mat;

.${id} {
  @include mat.progress-bar-overrides((
    active-indicator-color: var(--app-color-${id}),
    track-color: var(--app-color-${id}-container),
  ));
}`;
}

@Component({
  selector: 'app-barre-progression-page',
  imports: [MatProgressBar, Specimen, SpecimenSection, ColorFamilyScope],
  template: `
    <h1>Barre de progression</h1>

    <app-specimen-section title="Modes">
      <app-specimen label="Déterminé" api='mode="determinate"' [snippet]="snippets.determine">
        <mat-progress-bar mode="determinate" value="60" aria-label="Chargement" />
      </app-specimen>
      <app-specimen label="Indéterminé" api='mode="indeterminate"' [snippet]="snippets.indetermine">
        <mat-progress-bar mode="indeterminate" aria-label="Chargement" />
      </app-specimen>
      <app-specimen label="Tampon" api='mode="buffer"' [snippet]="snippets.tampon">
        <mat-progress-bar mode="buffer" value="40" bufferValue="70" aria-label="Chargement" />
      </app-specimen>
      <app-specimen label="Requête" api='mode="query"' [snippet]="snippets.requete">
        <mat-progress-bar mode="query" aria-label="Chargement" />
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Valeurs limites">
      <app-specimen label="0 %" api='value="0"' [snippet]="snippets.zero">
        <mat-progress-bar mode="determinate" value="0" aria-label="Chargement" />
      </app-specimen>
      <app-specimen label="100 %" api='value="100"' [snippet]="snippets.complet">
        <mat-progress-bar mode="determinate" value="100" aria-label="Chargement" />
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section
      title="Personnalisation (jetons)"
      description="Le mixin Sass mat.progress-bar-overrides modifie couleurs, épaisseur et forme ; les noms de jetons sont validés à la compilation. Indicateur et piste prennent la paire de jetons système --mat-sys-* d’un même rôle."
    >
      <app-specimen label="Rôles de couleur" api="mat.progress-bar-overrides : active-indicator-color" [snippet]="snippets.couleurs">
        <mat-progress-bar mode="determinate" value="60" class="secondaire" aria-label="Chargement" />
        <mat-progress-bar mode="determinate" value="60" class="tertiaire" aria-label="Chargement" />
        <mat-progress-bar mode="determinate" value="60" class="erreur" aria-label="Chargement" />
      </app-specimen>
      <app-specimen label="Épaisse et arrondie" api="mat.progress-bar-overrides : track-height, track-shape" [snippet]="snippets.epaisse">
        <mat-progress-bar mode="determinate" value="60" class="epaisse" aria-label="Chargement" />
      </app-specimen>
    </app-specimen-section>

    @if (families().length > 0) {
      <app-specimen-section
        title="Couleurs personnalisées"
        description="Familles de couleur propres au design system (--app-color-*), détectées dans le CSS chargé : même principe que les rôles M3, appliqué avec les jetons du design system (indicateur et piste d’une même famille)."
      >
        @for (family of families(); track family.id) {
          <app-specimen [label]="family.label" [api]="family.api" [snippet]="family.snippet" [custom]="true">
            <span [appColorFamily]="family.id">
              <mat-progress-bar mode="determinate" value="60" class="perso" [attr.aria-label]="'Chargement ' + family.label" />
            </span>
          </app-specimen>
        }
      </app-specimen-section>
    }
  `,
  styles: `
    @use '@angular/material' as mat;
    @use 'roles';

    mat-progress-bar {
      min-width: 160px;
    }

    .secondaire {
      @include roles.progress-bar(var(--mat-sys-secondary), var(--mat-sys-secondary-container));
    }

    .tertiaire {
      @include roles.progress-bar(var(--mat-sys-tertiary), var(--mat-sys-tertiary-container));
    }

    .erreur {
      @include roles.progress-bar(var(--mat-sys-error), var(--mat-sys-error-container));
    }

    .perso {
      @include roles.progress-bar(var(--r-f), var(--r-c));
    }

    .epaisse {
      @include mat.progress-bar-overrides(
        (
          active-indicator-height: 12px,
          track-height: 12px,
          track-shape: var(--mat-sys-corner-full),
        )
      );
    }
  `,
})
export class BarreProgressionPage {
  protected readonly snippets = SNIPPETS;

  private readonly detected = injectColorFamilies();

  /** Une famille par jeu `--app-color-*` complet (vide avec un thème Angular Material). */
  protected readonly families = computed(() =>
    this.detected().map(({ id, label }) => ({ id, label, api: 'mat.progress-bar-overrides : active-indicator-color', snippet: customSnippet(id) })),
  );
}
