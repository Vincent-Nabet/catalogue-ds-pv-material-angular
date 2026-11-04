import { Component, computed } from '@angular/core';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatIcon } from '@angular/material/icon';
import { injectColorFamilies } from '../../../core/tokens/color-families';
import { ColorFamilyScope } from '../../../shared/color-family-scope/color-family-scope';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';
import { ComposantRef } from '../../../shared/composant-ref/composant-ref';

const SNIPPETS = {
  simple: `<mat-button-toggle-group aria-label="Alignement" value="gauche">
  <mat-button-toggle value="gauche">Gauche</mat-button-toggle>
  <mat-button-toggle value="centre">Centre</mat-button-toggle>
  <mat-button-toggle value="droite">Droite</mat-button-toggle>
</mat-button-toggle-group>`,
  multiple: `<mat-button-toggle-group aria-label="Style du texte" multiple>
  <mat-button-toggle value="gras">Gras</mat-button-toggle>
  <mat-button-toggle value="italique">Italique</mat-button-toggle>
  <mat-button-toggle value="souligne">Souligné</mat-button-toggle>
</mat-button-toggle-group>`,
  icones: `<mat-button-toggle-group aria-label="Affichage" value="liste">
  <mat-button-toggle value="liste" aria-label="Liste"><mat-icon>view_list</mat-icon></mat-button-toggle>
  <mat-button-toggle value="grille" aria-label="Grille"><mat-icon>grid_view</mat-icon></mat-button-toggle>
</mat-button-toggle-group>`,
  sansCoche: `<mat-button-toggle-group aria-label="Taille" value="m" hideSingleSelectionIndicator>
  <mat-button-toggle value="s">S</mat-button-toggle>
  <mat-button-toggle value="m">M</mat-button-toggle>
  <mat-button-toggle value="l">L</mat-button-toggle>
</mat-button-toggle-group>`,
  vertical: `<mat-button-toggle-group aria-label="Priorité" value="normale" vertical>
  <mat-button-toggle value="basse">Basse</mat-button-toggle>
  <mat-button-toggle value="normale">Normale</mat-button-toggle>
  <mat-button-toggle value="haute">Haute</mat-button-toggle>
</mat-button-toggle-group>`,
  desactive: `<mat-button-toggle-group aria-label="Groupe désactivé" value="a" disabled>
  <mat-button-toggle value="a">A</mat-button-toggle>
  <mat-button-toggle value="b">B</mat-button-toggle>
</mat-button-toggle-group>`,
  standard: `<mat-button-toggle-group aria-label="Alignement" value="gauche" appearance="standard">
  <mat-button-toggle value="gauche">Gauche</mat-button-toggle>
  <mat-button-toggle value="droite">Droite</mat-button-toggle>
</mat-button-toggle-group>`,
  legacy: `<mat-button-toggle-group aria-label="Alignement" value="gauche" appearance="legacy">
  <mat-button-toggle value="gauche">Gauche</mat-button-toggle>
  <mat-button-toggle value="droite">Droite</mat-button-toggle>
</mat-button-toggle-group>`,
  sansCocheMultiple: `<mat-button-toggle-group aria-label="Style" multiple hideMultipleSelectionIndicator>
  <mat-button-toggle value="gras" checked>Gras</mat-button-toggle>
  <mat-button-toggle value="italique">Italique</mat-button-toggle>
</mat-button-toggle-group>`,
  inactifFocalisable: `<mat-button-toggle-group aria-label="Groupe" value="a" disabledInteractive disabled>
  <mat-button-toggle value="a">A</mat-button-toggle>
  <mat-button-toggle value="b">B</mat-button-toggle>
</mat-button-toggle-group>`,
  formes: `<mat-button-toggle-group aria-label="Alignement" value="gauche" class="angles-arrondis">
  <mat-button-toggle value="gauche">Gauche</mat-button-toggle>
  <mat-button-toggle value="droite">Droite</mat-button-toggle>
</mat-button-toggle-group>
<mat-button-toggle-group aria-label="Alignement" value="gauche" class="angles-droits">
  <mat-button-toggle value="gauche">Gauche</mat-button-toggle>
  <mat-button-toggle value="droite">Droite</mat-button-toggle>
</mat-button-toggle-group>

@use '@angular/material' as mat;

.angles-arrondis {
  @include mat.button-toggle-overrides((
    shape: var(--mat-sys-corner-small),
  ));
}

.angles-droits {
  @include mat.button-toggle-overrides((
    shape: var(--mat-sys-corner-none),
  ));
}`,
  selection: `<mat-button-toggle-group aria-label="Alignement" value="gauche" class="selection-primaire">…</mat-button-toggle-group>
<mat-button-toggle-group aria-label="Alignement" value="gauche" class="selection-tertiaire">…</mat-button-toggle-group>
<mat-button-toggle-group aria-label="Alignement" value="gauche" class="selection-erreur">…</mat-button-toggle-group>

@use '@angular/material' as mat;

@mixin selection($fond, $texte) {
  @include mat.button-toggle-overrides((
    selected-state-background-color: $fond,
    selected-state-text-color: $texte,
  ));
}

.selection-primaire {
  @include selection(var(--mat-sys-primary), var(--mat-sys-on-primary));
}

.selection-tertiaire {
  @include selection(var(--mat-sys-tertiary-container), var(--mat-sys-on-tertiary-container));
}

.selection-erreur {
  @include selection(var(--mat-sys-error-container), var(--mat-sys-on-error-container));
}`,
  grand: `<mat-button-toggle-group aria-label="Alignement" value="gauche" class="grand">
  <mat-button-toggle value="gauche">Gauche</mat-button-toggle>
  <mat-button-toggle value="droite">Droite</mat-button-toggle>
</mat-button-toggle-group>

@use '@angular/material' as mat;

.grand {
  @include mat.button-toggle-overrides((
    height: 56px,
    label-text-size: var(--mat-sys-title-medium-size),
  ));
}`,
};

/** Snippet d'une famille personnalisée, dérivé de son nom (la liste des familles est détectée, pas écrite à la main). */
function customSnippet(id: string): string {
  return `<mat-button-toggle-group aria-label="Alignement" value="gauche" class="${id}">
  <mat-button-toggle value="gauche">Gauche</mat-button-toggle>
  <mat-button-toggle value="droite">Droite</mat-button-toggle>
</mat-button-toggle-group>

@use '@angular/material' as mat;

.${id} {
  @include mat.button-toggle-overrides((
    selected-state-background-color: var(--app-color-${id}-container),
    selected-state-text-color: var(--app-color-on-${id}-container),
  ));
}`;
}

@Component({
  selector: 'app-bouton-bascule-page',
  imports: [ComposantRef, MatButtonToggleGroup, MatButtonToggle, MatIcon, Specimen, SpecimenSection, ColorFamilyScope],
  template: `
    <h1>Bouton bascule</h1>
    <app-composant-ref />

    <app-specimen-section minWidth="300px" title="Sélection">
      <app-specimen label="Choix unique" api="mat-button-toggle-group" [snippet]="snippets.simple">
        <mat-button-toggle-group aria-label="Alignement" value="gauche">
          <mat-button-toggle value="gauche">Gauche</mat-button-toggle>
          <mat-button-toggle value="centre">Centre</mat-button-toggle>
          <mat-button-toggle value="droite">Droite</mat-button-toggle>
        </mat-button-toggle-group>
      </app-specimen>
      <app-specimen label="Choix multiple" api="multiple" [snippet]="snippets.multiple">
        <mat-button-toggle-group aria-label="Style du texte" multiple>
          <mat-button-toggle value="gras" checked>Gras</mat-button-toggle>
          <mat-button-toggle value="italique">Italique</mat-button-toggle>
          <mat-button-toggle value="souligne" checked>Souligné</mat-button-toggle>
        </mat-button-toggle-group>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section minWidth="300px" title="Présentation">
      <app-specimen label="Avec icônes" api="mat-icon" [snippet]="snippets.icones">
        <mat-button-toggle-group aria-label="Affichage" value="liste">
          <mat-button-toggle value="liste" aria-label="Liste"><mat-icon>view_list</mat-icon></mat-button-toggle>
          <mat-button-toggle value="grille" aria-label="Grille"><mat-icon>grid_view</mat-icon></mat-button-toggle>
        </mat-button-toggle-group>
      </app-specimen>
      <app-specimen label="Sans coche" api="hideSingleSelectionIndicator" [snippet]="snippets.sansCoche">
        <mat-button-toggle-group aria-label="Taille" value="m" hideSingleSelectionIndicator>
          <mat-button-toggle value="s">S</mat-button-toggle>
          <mat-button-toggle value="m">M</mat-button-toggle>
          <mat-button-toggle value="l">L</mat-button-toggle>
        </mat-button-toggle-group>
      </app-specimen>
      <app-specimen label="Vertical" api="vertical" [snippet]="snippets.vertical">
        <mat-button-toggle-group aria-label="Priorité" value="normale" vertical>
          <mat-button-toggle value="basse">Basse</mat-button-toggle>
          <mat-button-toggle value="normale">Normale</mat-button-toggle>
          <mat-button-toggle value="haute">Haute</mat-button-toggle>
        </mat-button-toggle-group>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section minWidth="300px" title="États">
      <app-specimen label="Désactivé" api="disabled" [snippet]="snippets.desactive">
        <mat-button-toggle-group aria-label="Groupe désactivé" value="a" disabled>
          <mat-button-toggle value="a">A</mat-button-toggle>
          <mat-button-toggle value="b">B</mat-button-toggle>
        </mat-button-toggle-group>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section minWidth="300px" title="Apparences et options">
      <app-specimen label="Apparence standard" api='appearance="standard"' [snippet]="snippets.standard">
        <mat-button-toggle-group aria-label="Alignement standard" value="gauche" appearance="standard">
          <mat-button-toggle value="gauche">Gauche</mat-button-toggle>
          <mat-button-toggle value="droite">Droite</mat-button-toggle>
        </mat-button-toggle-group>
      </app-specimen>
      <app-specimen label="Apparence héritée" api='appearance="legacy"' [snippet]="snippets.legacy">
        <mat-button-toggle-group aria-label="Alignement hérité" value="gauche" appearance="legacy">
          <mat-button-toggle value="gauche">Gauche</mat-button-toggle>
          <mat-button-toggle value="droite">Droite</mat-button-toggle>
        </mat-button-toggle-group>
      </app-specimen>
      <app-specimen label="Multiple sans coche" api="hideMultipleSelectionIndicator" [snippet]="snippets.sansCocheMultiple">
        <mat-button-toggle-group aria-label="Style du texte" multiple hideMultipleSelectionIndicator>
          <mat-button-toggle value="gras" checked>Gras</mat-button-toggle>
          <mat-button-toggle value="italique">Italique</mat-button-toggle>
        </mat-button-toggle-group>
      </app-specimen>
      <app-specimen label="Désactivé mais focalisable" api="disabledInteractive" [snippet]="snippets.inactifFocalisable">
        <mat-button-toggle-group aria-label="Groupe désactivé focalisable" value="a" [disabledInteractive]="true" disabled>
          <mat-button-toggle value="a">A</mat-button-toggle>
          <mat-button-toggle value="b">B</mat-button-toggle>
        </mat-button-toggle-group>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section
      minWidth="300px"
      title="Personnalisation (jetons)"
      description="Le mixin Sass mat.button-toggle-overrides modifie forme, couleurs et taille ; les noms de jetons sont validés à la compilation. Les couleurs viennent des jetons système --mat-sys-*, fond et texte ensemble pour garder le contraste."
    >
      <app-specimen label="Forme" api="mat.button-toggle-overrides : shape" [snippet]="snippets.formes">
        <mat-button-toggle-group aria-label="Alignement, angles arrondis" value="gauche" class="angles-arrondis">
          <mat-button-toggle value="gauche">Gauche</mat-button-toggle>
          <mat-button-toggle value="droite">Droite</mat-button-toggle>
        </mat-button-toggle-group>
        <mat-button-toggle-group aria-label="Alignement, angles droits" value="gauche" class="angles-droits">
          <mat-button-toggle value="gauche">Gauche</mat-button-toggle>
          <mat-button-toggle value="droite">Droite</mat-button-toggle>
        </mat-button-toggle-group>
      </app-specimen>
      <app-specimen
        label="Couleur de la sélection"
        api="mat.button-toggle-overrides : selected-state-background-color"
        [snippet]="snippets.selection"
      >
        <mat-button-toggle-group aria-label="Alignement, sélection primaire" value="gauche" class="selection-primaire">
          <mat-button-toggle value="gauche">Gauche</mat-button-toggle>
          <mat-button-toggle value="droite">Droite</mat-button-toggle>
        </mat-button-toggle-group>
        <mat-button-toggle-group aria-label="Alignement, sélection tertiaire" value="gauche" class="selection-tertiaire">
          <mat-button-toggle value="gauche">Gauche</mat-button-toggle>
          <mat-button-toggle value="droite">Droite</mat-button-toggle>
        </mat-button-toggle-group>
        <mat-button-toggle-group aria-label="Alignement, sélection erreur" value="gauche" class="selection-erreur">
          <mat-button-toggle value="gauche">Gauche</mat-button-toggle>
          <mat-button-toggle value="droite">Droite</mat-button-toggle>
        </mat-button-toggle-group>
      </app-specimen>
      <app-specimen label="Grande taille" api="mat.button-toggle-overrides : height" [snippet]="snippets.grand">
        <mat-button-toggle-group aria-label="Alignement, grande taille" value="gauche" class="grand">
          <mat-button-toggle value="gauche">Gauche</mat-button-toggle>
          <mat-button-toggle value="droite">Droite</mat-button-toggle>
        </mat-button-toggle-group>
      </app-specimen>
    </app-specimen-section>

    @if (families().length > 0) {
      <app-specimen-section
        minWidth="300px"
        title="Couleurs personnalisées"
        description="Familles de couleur propres au design system (--app-color-*), détectées dans le CSS chargé : même principe que les rôles M3, appliqué avec les jetons du design system (fond et texte de la sélection ensemble)."
      >
        @for (family of families(); track family.id) {
          <app-specimen [label]="family.label" [api]="family.api" [snippet]="family.snippet" [custom]="true">
            <span [appColorFamily]="family.id">
              <mat-button-toggle-group [attr.aria-label]="'Alignement, sélection ' + family.label" value="gauche" class="perso">
                <mat-button-toggle value="gauche">Gauche</mat-button-toggle>
                <mat-button-toggle value="droite">Droite</mat-button-toggle>
              </mat-button-toggle-group>
            </span>
          </app-specimen>
        }
      </app-specimen-section>
    }
  `,
  styles: `
    @use '@angular/material' as mat;
    @use 'roles';

    .angles-arrondis {
      @include mat.button-toggle-overrides(
        (
          shape: var(--mat-sys-corner-small),
        )
      );
    }

    .angles-droits {
      @include mat.button-toggle-overrides(
        (
          shape: var(--mat-sys-corner-none),
        )
      );
    }

    .selection-primaire {
      @include roles.button-toggle(var(--mat-sys-primary), var(--mat-sys-on-primary));
    }

    .selection-tertiaire {
      @include roles.button-toggle(var(--mat-sys-tertiary-container), var(--mat-sys-on-tertiary-container));
    }

    .selection-erreur {
      @include roles.button-toggle(var(--mat-sys-error-container), var(--mat-sys-on-error-container));
    }

    .perso {
      @include roles.button-toggle(var(--r-c), var(--r-sc));
    }

    .grand {
      @include mat.button-toggle-overrides(
        (
          height: 56px,
          label-text-size: var(--mat-sys-title-medium-size),
        )
      );
    }
  `,
})
export class BoutonBasculePage {
  protected readonly snippets = SNIPPETS;

  private readonly detected = injectColorFamilies();

  /** Une famille par jeu `--app-color-*` complet (vide avec un thème Angular Material). */
  protected readonly families = computed(() =>
    this.detected().map(({ id, label }) => ({ id, label, api: 'mat.button-toggle-overrides : selected-state-background-color', snippet: customSnippet(id) })),
  );
}
