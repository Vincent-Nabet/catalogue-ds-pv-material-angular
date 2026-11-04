import { Component, computed } from '@angular/core';
import { injectColorFamilies } from '../../../core/tokens/color-families';
import { ColorFamilyScope } from '../../../shared/color-family-scope/color-family-scope';
import { MatDivider } from '@angular/material/divider';
import { MatListItem, MatListSubheaderCssMatStyler, MatList } from '@angular/material/list';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';
import { ComposantRef } from '../../../shared/composant-ref/composant-ref';

const SNIPPETS = {
  horizontal: `<p>Au-dessus</p>
<mat-divider />
<p>En dessous</p>`,
  vertical: `<div style="display: flex; align-items: center; gap: 16px; height: 40px">
  <span>Gauche</span>
  <mat-divider vertical style="height: 100%" />
  <span>Droite</span>
</div>`,
  inset: `<mat-list>
  <mat-list-item>Premier</mat-list-item>
  <mat-divider inset />
  <mat-list-item>Second</mat-list-item>
</mat-list>`,
  liste: `<mat-list>
  <div mat-subheader>Dossiers</div>
  <mat-list-item>Photos</mat-list-item>
  <mat-divider />
  <mat-list-item>Documents</mat-list-item>
</mat-list>`,
  epais: `<p>Au-dessus</p>
<mat-divider class="trait-epais" />
<p>En dessous</p>

<div style="display: flex; align-items: center; gap: 16px; height: 40px">
  <span>Gauche</span>
  <mat-divider vertical class="trait-epais" style="height: 100%" />
  <span>Droite</span>
</div>

@use '@angular/material' as mat;

.trait-epais {
  @include mat.divider-overrides((
    width: 4px,
  ));
}`,
  couleurs: `<mat-divider class="trait-primaire" />
<p>Primaire</p>
<mat-divider class="trait-tertiaire" />
<p>Tertiaire</p>
<mat-divider class="trait-erreur" />

@use '@angular/material' as mat;

.trait-primaire {
  @include mat.divider-overrides((
    width: 2px,
    color: var(--mat-sys-primary),
  ));
}

.trait-tertiaire {
  @include mat.divider-overrides((
    width: 2px,
    color: var(--mat-sys-tertiary),
  ));
}

.trait-erreur {
  @include mat.divider-overrides((
    width: 2px,
    color: var(--mat-sys-error),
  ));
}`,
};

/** Snippet d'une famille personnalisée, dérivé de son nom (la liste des familles est détectée, pas écrite à la main). */
function customSnippet(id: string): string {
  return `<mat-divider class="trait-${id}" />
<p>${id}</p>

@use '@angular/material' as mat;

.trait-${id} {
  @include mat.divider-overrides((
    width: 2px,
    color: var(--app-color-${id}),
  ));
}`;
}

@Component({
  selector: 'app-separateur-page',
  imports: [ComposantRef, MatDivider, MatList, MatListItem, MatListSubheaderCssMatStyler, Specimen, SpecimenSection, ColorFamilyScope],
  template: `
    <h1>Séparateur</h1>
    <app-composant-ref />

    <app-specimen-section minWidth="340px" title="Orientations">
      <app-specimen label="Horizontal" api="mat-divider" [snippet]="snippets.horizontal">
        <div class="bloc">
          <p>Au-dessus</p>
          <mat-divider />
          <p>En dessous</p>
        </div>
      </app-specimen>
      <app-specimen label="Vertical" api="vertical" [snippet]="snippets.vertical">
        <div class="ligne">
          <span>Gauche</span>
          <mat-divider vertical class="vertical" />
          <span>Droite</span>
        </div>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section minWidth="340px" title="Dans une liste">
      <app-specimen label="Décalé" api="inset" [snippet]="snippets.inset">
        <mat-list class="bloc">
          <mat-list-item>Premier</mat-list-item>
          <mat-divider inset />
          <mat-list-item>Second</mat-list-item>
        </mat-list>
      </app-specimen>
      <app-specimen label="Avec sous-titre" api="mat-subheader" [snippet]="snippets.liste">
        <mat-list class="bloc">
          <div mat-subheader>Dossiers</div>
          <mat-list-item>Photos</mat-list-item>
          <mat-divider />
          <mat-list-item>Documents</mat-list-item>
        </mat-list>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section
      minWidth="340px"
      title="Personnalisation (jetons)"
      description="Épaisseur et couleur du trait se règlent avec le mixin Sass mat.divider-overrides ; les noms de jetons sont validés à la compilation."
    >
      <app-specimen label="Trait épais" api="mat.divider-overrides : width" [snippet]="snippets.epais">
        <div class="bloc">
          <p>Au-dessus</p>
          <mat-divider class="trait-epais" />
          <p>En dessous</p>
        </div>
        <div class="ligne">
          <span>Gauche</span>
          <mat-divider vertical class="vertical trait-epais" />
          <span>Droite</span>
        </div>
      </app-specimen>
      <app-specimen label="Couleurs de rôle" api="mat.divider-overrides : color" [snippet]="snippets.couleurs">
        <div class="bloc">
          <mat-divider class="trait-primaire" />
          <p>Primaire</p>
          <mat-divider class="trait-tertiaire" />
          <p>Tertiaire</p>
          <mat-divider class="trait-erreur" />
        </div>
      </app-specimen>
    </app-specimen-section>

    @if (families().length > 0) {
      <app-specimen-section
        minWidth="340px"
        title="Couleurs personnalisées"
        description="Familles de couleur propres au design system (--app-color-*), détectées dans le CSS chargé : même principe que les rôles M3, appliqué avec les jetons du design system (couleur du trait, sur la surface de la page)."
      >
        @for (family of families(); track family.id) {
          <app-specimen [label]="family.label" [api]="family.api" [snippet]="family.snippet" [custom]="true">
            <span [appColorFamily]="family.id">
              <div class="bloc">
                <p>Au-dessus, {{ family.label }}</p>
                <mat-divider class="trait-perso" />
                <p>En dessous</p>
              </div>
            </span>
          </app-specimen>
        }
      </app-specimen-section>
    }
  `,
  styles: `
    @use '@angular/material' as mat;
    @use 'roles';

    .trait-epais {
      @include mat.divider-overrides(
        (
          width: 4px,
        )
      );
    }

    .trait-primaire {
      @include roles.divider(var(--mat-sys-primary));
    }

    .trait-tertiaire {
      @include roles.divider(var(--mat-sys-tertiary));
    }

    .trait-erreur {
      @include roles.divider(var(--mat-sys-error));
    }

    .trait-perso {
      @include roles.divider(var(--r-f));
    }

    .bloc {
      width: 100%;
    }

    .ligne {
      display: flex;
      align-items: center;
      gap: 16px;
      height: 40px;
    }

    .vertical {
      height: 100%;
    }
  `,
})
export class SeparateurPage {
  protected readonly snippets = SNIPPETS;

  private readonly detected = injectColorFamilies();

  /** Une famille par jeu `--app-color-*` complet (vide avec un thème Angular Material). */
  protected readonly families = computed(() =>
    this.detected().map(({ id, label }) => ({ id, label, api: 'mat.divider-overrides : color', snippet: customSnippet(id) })),
  );
}
