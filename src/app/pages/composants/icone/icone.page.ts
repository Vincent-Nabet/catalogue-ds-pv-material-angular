import { Component, computed } from '@angular/core';
import { injectColorFamilies } from '../../../core/tokens/color-families';
import { ColorFamilyScope } from '../../../shared/color-family-scope/color-family-scope';
import { MatIcon } from '@angular/material/icon';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  defaut: `<mat-icon>home</mat-icon>`,
  tailles: `<mat-icon style="font-size: 18px; width: 18px; height: 18px">star</mat-icon>
<mat-icon>star</mat-icon>
<mat-icon style="font-size: 36px; width: 36px; height: 36px">star</mat-icon>
<mat-icon style="font-size: 48px; width: 48px; height: 48px">star</mat-icon>`,
  couleurs: `<mat-icon class="primaire">favorite</mat-icon>
<mat-icon class="tertiaire">favorite</mat-icon>
<mat-icon class="erreur">favorite</mat-icon>

@use '@angular/material' as mat;

.primaire {
  @include mat.icon-overrides((
    color: var(--mat-sys-primary),
  ));
}
.tertiaire {
  @include mat.icon-overrides((
    color: var(--mat-sys-tertiary),
  ));
}
.erreur {
  @include mat.icon-overrides((
    color: var(--mat-sys-error),
  ));
}`,
  couleurHeritee: `<div class="groupe">
  <mat-icon>favorite</mat-icon>
  <mat-icon>star</mat-icon>
  <mat-icon>bolt</mat-icon>
</div>

@use '@angular/material' as mat;

/* Le jeton est posé sur le conteneur : toutes les icônes qu'il contient l'héritent */
.groupe {
  @include mat.icon-overrides((
    color: var(--mat-sys-tertiary),
  ));
}`,
  remplie: `<mat-icon style="font-variation-settings: 'FILL' 1">favorite</mat-icon>`,
  decorative: `<mat-icon aria-hidden="true">settings</mat-icon>`,
  semantique: `<mat-icon aria-hidden="false" aria-label="Paramètres">settings</mat-icon>`,
  inline: `<p>Texte avec une icône <mat-icon [inline]="true">info</mat-icon> alignée sur la ligne.</p>`,
  graisse: `<mat-icon style="font-variation-settings: 'wght' 100">settings</mat-icon>
<mat-icon style="font-variation-settings: 'wght' 400">settings</mat-icon>
<mat-icon style="font-variation-settings: 'wght' 700">settings</mat-icon>`,
  taillesOptiques: `<mat-icon style="font-variation-settings: 'opsz' 20">settings</mat-icon>
<mat-icon style="font-variation-settings: 'opsz' 48">settings</mat-icon>`,
};

/** Snippet d'une famille personnalisée, dérivé de son nom (la liste des familles est détectée, pas écrite à la main). */
function customSnippet(id: string): string {
  return `<mat-icon class="${id}">favorite</mat-icon>

@use '@angular/material' as mat;

.${id} {
  @include mat.icon-overrides((
    color: var(--app-color-${id}),
  ));
}`;
}

@Component({
  selector: 'app-icone-page',
  imports: [MatIcon, Specimen, SpecimenSection, ColorFamilyScope],
  template: `
    <h1>Icône</h1>

    <app-specimen-section
      title="Icônes"
      description="Police Material Symbols (contour) déclarée comme jeu d’icônes par défaut. La couleur se règle avec le mixin Sass mat.icon-overrides (jeton color) ; mat-icon n’a pas de jeton de taille : celle-ci passe par font-size, width et height."
    >
      <app-specimen label="Par défaut" api="mat-icon" [snippet]="snippets.defaut">
        <mat-icon>home</mat-icon>
      </app-specimen>
      <app-specimen label="Tailles" api="font-size" [snippet]="snippets.tailles">
        <mat-icon class="t18">star</mat-icon>
        <mat-icon>star</mat-icon>
        <mat-icon class="t36">star</mat-icon>
        <mat-icon class="t48">star</mat-icon>
      </app-specimen>
      <app-specimen label="Couleurs" api="mat.icon-overrides : color" [snippet]="snippets.couleurs">
        <mat-icon class="primaire">favorite</mat-icon>
        <mat-icon class="tertiaire">favorite</mat-icon>
        <mat-icon class="erreur">favorite</mat-icon>
      </app-specimen>
      <app-specimen label="Couleur héritée d’un conteneur" api="mat.icon-overrides : color" [snippet]="snippets.couleurHeritee">
        <div class="groupe">
          <mat-icon>favorite</mat-icon>
          <mat-icon>star</mat-icon>
          <mat-icon>bolt</mat-icon>
        </div>
      </app-specimen>
      <app-specimen label="Remplie" api="FILL 1" [snippet]="snippets.remplie">
        <mat-icon class="remplie">favorite</mat-icon>
      </app-specimen>
    </app-specimen-section>

    @if (families().length > 0) {
      <app-specimen-section
        title="Couleurs personnalisées"
        description="Familles de couleur propres au design system (--app-color-*), détectées dans le CSS chargé : même principe que les rôles M3, appliqué avec les jetons du design system (couleur de la famille sur la surface de la page, via le jeton color de mat.icon-overrides)."
      >
        @for (family of families(); track family.id) {
          <app-specimen [label]="family.label" [api]="family.api" [snippet]="family.snippet" [custom]="true">
            <span [appColorFamily]="family.id">
              <mat-icon class="perso" aria-hidden="true">favorite</mat-icon>
              <mat-icon class="perso" aria-hidden="true">star</mat-icon>
              <mat-icon class="perso" aria-hidden="true">bolt</mat-icon>
            </span>
          </app-specimen>
        }
      </app-specimen-section>
    }

    <app-specimen-section title="Accessibilité">
      <app-specimen label="Décorative" api='aria-hidden="true"' [snippet]="snippets.decorative">
        <mat-icon aria-hidden="true">settings</mat-icon>
      </app-specimen>
      <app-specimen label="Porteuse de sens" api="aria-label" [snippet]="snippets.semantique">
        <mat-icon aria-hidden="false" aria-label="Paramètres">settings</mat-icon>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Axes de la police Material Symbols">
      <app-specimen label="Dans le texte" api="inline" [snippet]="snippets.inline">
        <p class="texte">Texte avec une icône <mat-icon [inline]="true">info</mat-icon> alignée sur la ligne.</p>
      </app-specimen>
      <app-specimen label="Graisse" api="wght 100 / 400 / 700" [snippet]="snippets.graisse">
        <mat-icon class="g100">settings</mat-icon>
        <mat-icon class="g400">settings</mat-icon>
        <mat-icon class="g700">settings</mat-icon>
      </app-specimen>
      <app-specimen label="Taille optique" api="opsz 20 / 48" [snippet]="snippets.taillesOptiques">
        <mat-icon class="opsz20">settings</mat-icon>
        <mat-icon class="opsz48">settings</mat-icon>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    @use '@angular/material' as mat;

    .t18 {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .t36 {
      font-size: 36px;
      width: 36px;
      height: 36px;
    }

    .t48 {
      font-size: 48px;
      width: 48px;
      height: 48px;
    }

    .primaire {
      @include mat.icon-overrides(
        (
          color: var(--mat-sys-primary),
        )
      );
    }

    .tertiaire,
    .groupe {
      @include mat.icon-overrides(
        (
          color: var(--mat-sys-tertiary),
        )
      );
    }

    .erreur {
      @include mat.icon-overrides(
        (
          color: var(--mat-sys-error),
        )
      );
    }

    .perso {
      @include mat.icon-overrides(
        (
          color: var(--r-f),
        )
      );
    }

    .groupe {
      display: flex;
      gap: 12px;
    }

    .remplie {
      font-variation-settings: 'FILL' 1;
    }
    .texte {
      margin: 0;
    }

    .g100 {
      font-variation-settings: 'wght' 100;
    }

    .g400 {
      font-variation-settings: 'wght' 400;
    }

    .g700 {
      font-variation-settings: 'wght' 700;
    }

    .opsz20 {
      font-variation-settings: 'opsz' 20;
    }

    .opsz48 {
      font-variation-settings: 'opsz' 48;
    }
  `,
})
export class IconePage {
  protected readonly snippets = SNIPPETS;

  private readonly detected = injectColorFamilies();

  /** Une famille par jeu `--app-color-*` complet (vide avec un thème Angular Material). */
  protected readonly families = computed(() =>
    this.detected().map(({ id, label }) => ({ id, label, api: 'mat.icon-overrides : color', snippet: customSnippet(id) })),
  );
}
