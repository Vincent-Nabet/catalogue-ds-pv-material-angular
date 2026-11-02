import { Component, computed } from '@angular/core';
import { injectColorFamilies } from '../../../core/tokens/color-families';
import { ColorFamilyScope } from '../../../shared/color-family-scope/color-family-scope';
import { MatButton, MatFabButton, MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

const SNIPPETS = {
  texte: `<button matButton="text">Texte</button>`,
  rempli: `<button matButton="filled">Rempli</button>`,
  tonal: `<button matButton="tonal">Tonal</button>`,
  releve: `<button matButton="elevated">Relevé</button>`,
  contour: `<button matButton="outlined">Contour</button>`,
  desactive: `<button matButton="filled" disabled>Désactivé</button>`,
  avecIcone: `<button matButton="filled">
  <mat-icon>add</mat-icon>
  Avec icône
</button>`,
  icone: `<button matIconButton aria-label="Favori">
  <mat-icon>favorite</mat-icon>
</button>`,
  iconeDesactive: `<button matIconButton aria-label="Favori" disabled>
  <mat-icon>favorite</mat-icon>
</button>`,
  fab: `<button matFab aria-label="Modifier">
  <mat-icon>edit</mat-icon>
</button>`,
  miniFab: `<button matMiniFab aria-label="Modifier">
  <mat-icon>edit</mat-icon>
</button>`,
  fabEtendu: `<button matFab extended>
  <mat-icon>edit</mat-icon>
  Modifier
</button>`,
  petit: `<button matButton="filled" class="petit">Petit</button>

/* Angular Material n'a pas d'API de taille : on surcharge les jetons du bouton */
@use '@angular/material' as mat;

.petit {
  @include mat.button-overrides((
    filled-container-height: 32px,
    filled-horizontal-padding: 12px,
    filled-label-text-size: var(--mat-sys-label-medium-size),
  ));
}`,
  standard: `<button matButton="filled">Standard</button>`,
  grand: `<button matButton="filled" class="grand">Grand</button>

@use '@angular/material' as mat;

.grand {
  @include mat.button-overrides((
    filled-container-height: 56px,
    filled-horizontal-padding: 32px,
    filled-label-text-size: var(--mat-sys-title-medium-size),
  ));
}`,
  tresGrand: `<button matButton="filled" class="tres-grand">Très grand</button>

@use '@angular/material' as mat;

.tres-grand {
  @include mat.button-overrides((
    filled-container-height: 72px,
    filled-horizontal-padding: 40px,
    filled-label-text-size: var(--mat-sys-title-large-size),
  ));
}`,
  iconePetit: `<button matIconButton class="icone-petit" aria-label="Favori"><mat-icon>favorite</mat-icon></button>

@use '@angular/material' as mat;

.icone-petit {
  @include mat.icon-button-overrides((
    state-layer-size: 32px,
    icon-size: 18px,
  ));
}
.icone-petit .mat-icon {
  width: 18px;
  height: 18px;
  font-size: 18px;
}`,
  iconeGrand: `<button matIconButton class="icone-grand" aria-label="Favori"><mat-icon>favorite</mat-icon></button>

@use '@angular/material' as mat;

.icone-grand {
  @include mat.icon-button-overrides((
    state-layer-size: 56px,
    icon-size: 32px,
  ));
}
.icone-grand .mat-icon {
  width: 32px;
  height: 32px;
  font-size: 32px;
}`,
  angulaire: `<button matButton="filled" class="angulaire">Angulaire</button>

@use '@angular/material' as mat;

.angulaire {
  @include mat.button-overrides((
    filled-container-shape: var(--mat-sys-corner-none),
  ));
}`,
  arrondi: `<button matButton="filled" class="arrondi">Arrondi</button>

@use '@angular/material' as mat;

.arrondi {
  @include mat.button-overrides((
    filled-container-shape: var(--mat-sys-corner-small),
  ));
}`,
  couleurPrimaire: `<button matButton="filled">Rempli</button>

/* Couleur primaire : défaut du thème, aucune surcharge */`,
  couleurSecondaire: `<button matButton="filled" class="secondaire">Rempli</button>

@use '@angular/material' as mat;

.secondaire {
  @include mat.button-overrides((
    filled-container-color: var(--mat-sys-secondary),
    filled-label-text-color: var(--mat-sys-on-secondary),
    filled-state-layer-color: var(--mat-sys-on-secondary),

    tonal-container-color: var(--mat-sys-secondary-container),
    tonal-label-text-color: var(--mat-sys-on-secondary-container),
    tonal-state-layer-color: var(--mat-sys-on-secondary-container),

    outlined-label-text-color: var(--mat-sys-secondary),
    outlined-outline-color: var(--mat-sys-secondary),
    outlined-state-layer-color: var(--mat-sys-secondary),

    text-label-text-color: var(--mat-sys-secondary),
    text-state-layer-color: var(--mat-sys-secondary),

    protected-label-text-color: var(--mat-sys-secondary),
    protected-state-layer-color: var(--mat-sys-secondary),
  ));
}`,
  couleurTertiaire: `<button matButton="filled" class="tertiaire">Rempli</button>

@use '@angular/material' as mat;

.tertiaire {
  @include mat.button-overrides((
    filled-container-color: var(--mat-sys-tertiary),
    filled-label-text-color: var(--mat-sys-on-tertiary),
    filled-state-layer-color: var(--mat-sys-on-tertiary),

    tonal-container-color: var(--mat-sys-tertiary-container),
    tonal-label-text-color: var(--mat-sys-on-tertiary-container),
    tonal-state-layer-color: var(--mat-sys-on-tertiary-container),

    outlined-label-text-color: var(--mat-sys-tertiary),
    outlined-outline-color: var(--mat-sys-tertiary),
    outlined-state-layer-color: var(--mat-sys-tertiary),

    text-label-text-color: var(--mat-sys-tertiary),
    text-state-layer-color: var(--mat-sys-tertiary),

    protected-label-text-color: var(--mat-sys-tertiary),
    protected-state-layer-color: var(--mat-sys-tertiary),
  ));
}`,
  couleurErreur: `<button matButton="filled" class="erreur">Rempli</button>

@use '@angular/material' as mat;

.erreur {
  @include mat.button-overrides((
    filled-container-color: var(--mat-sys-error),
    filled-label-text-color: var(--mat-sys-on-error),
    filled-state-layer-color: var(--mat-sys-on-error),

    tonal-container-color: var(--mat-sys-error-container),
    tonal-label-text-color: var(--mat-sys-on-error-container),
    tonal-state-layer-color: var(--mat-sys-on-error-container),

    outlined-label-text-color: var(--mat-sys-error),
    outlined-outline-color: var(--mat-sys-error),
    outlined-state-layer-color: var(--mat-sys-error),

    text-label-text-color: var(--mat-sys-error),
    text-state-layer-color: var(--mat-sys-error),

    protected-label-text-color: var(--mat-sys-error),
    protected-state-layer-color: var(--mat-sys-error),
  ));
}`,
  couleurIcone: `<button matIconButton aria-label="Favori"><mat-icon>favorite</mat-icon></button>
<button matIconButton class="secondaire" aria-label="Favori"><mat-icon>favorite</mat-icon></button>
<button matIconButton class="tertiaire" aria-label="Favori"><mat-icon>favorite</mat-icon></button>
<button matIconButton class="erreur" aria-label="Favori"><mat-icon>favorite</mat-icon></button>

@use '@angular/material' as mat;

.secondaire {
  @include mat.icon-button-overrides((
    icon-color: var(--mat-sys-secondary),
    state-layer-color: var(--mat-sys-secondary),
  ));
}

.tertiaire {
  @include mat.icon-button-overrides((
    icon-color: var(--mat-sys-tertiary),
    state-layer-color: var(--mat-sys-tertiary),
  ));
}

.erreur {
  @include mat.icon-button-overrides((
    icon-color: var(--mat-sys-error),
    state-layer-color: var(--mat-sys-error),
  ));
}`,
  couleurFab: `<button matFab aria-label="Modifier"><mat-icon>edit</mat-icon></button>
<button matFab class="secondaire" aria-label="Modifier"><mat-icon>edit</mat-icon></button>
<button matFab class="tertiaire" aria-label="Modifier"><mat-icon>edit</mat-icon></button>
<button matFab class="erreur" aria-label="Modifier"><mat-icon>edit</mat-icon></button>

@use '@angular/material' as mat;

/* Mêmes classes et jetons pour matMiniFab et matFab extended */
.secondaire {
  @include mat.fab-overrides((
    container-color: var(--mat-sys-secondary-container),
    foreground-color: var(--mat-sys-on-secondary-container),
    state-layer-color: var(--mat-sys-on-secondary-container),
    small-container-color: var(--mat-sys-secondary-container),
    small-foreground-color: var(--mat-sys-on-secondary-container),
    small-state-layer-color: var(--mat-sys-on-secondary-container),
  ));
}

.tertiaire {
  @include mat.fab-overrides((
    container-color: var(--mat-sys-tertiary-container),
    foreground-color: var(--mat-sys-on-tertiary-container),
    state-layer-color: var(--mat-sys-on-tertiary-container),
    small-container-color: var(--mat-sys-tertiary-container),
    small-foreground-color: var(--mat-sys-on-tertiary-container),
    small-state-layer-color: var(--mat-sys-on-tertiary-container),
  ));
}

.erreur {
  @include mat.fab-overrides((
    container-color: var(--mat-sys-error-container),
    foreground-color: var(--mat-sys-on-error-container),
    state-layer-color: var(--mat-sys-on-error-container),
    small-container-color: var(--mat-sys-error-container),
    small-foreground-color: var(--mat-sys-on-error-container),
    small-state-layer-color: var(--mat-sys-on-error-container),
  ));
}`,
  pilule: `<button matButton="filled">Pilule (défaut)</button>`,
  chargement: `<button matButton="filled" [showProgress]="true" aria-label="Enregistrement en cours">
  <mat-progress-spinner progressIndicator mode="indeterminate" diameter="18" aria-hidden="true" [attr.tabindex]="null" />
  Enregistrer
</button>`,
  inactifFocalisable: `<button matButton="filled" disabledInteractive>Désactivé, focalisable</button>`,
  lien: `<a matButton="outlined" href="https://angular.dev" target="_blank" rel="noopener">Lien externe</a>`,
  iconeFin: `<button matButton="filled">
  Suivant
  <mat-icon iconPositionEnd>arrow_forward</mat-icon>
</button>`,
};

/** Snippet d'une famille personnalisée, dérivé de son nom (la liste des familles est détectée, pas écrite à la main). */
function customSnippet(id: string): string {
  const role = `--app-color-${id}`;
  return `<button matButton="filled" class="${id}">Rempli</button>

@use '@angular/material' as mat;

.${id} {
  @include mat.button-overrides((
    filled-container-color: var(${role}),
    filled-label-text-color: var(--app-color-on-${id}),
    filled-state-layer-color: var(--app-color-on-${id}),

    tonal-container-color: var(${role}-container),
    tonal-label-text-color: var(--app-color-on-${id}-container),
    tonal-state-layer-color: var(--app-color-on-${id}-container),

    outlined-label-text-color: var(${role}),
    outlined-outline-color: var(${role}),
    outlined-state-layer-color: var(${role}),

    text-label-text-color: var(${role}),
    text-state-layer-color: var(${role}),

    protected-label-text-color: var(${role}),
    protected-state-layer-color: var(${role}),
  ));
}

/* Boutons icône et FAB : mêmes jetons que pour secondary (voir « Couleurs »), avec ces variables */`;
}

@Component({
  selector: 'app-bouton-page',
  imports: [MatButton, MatIconButton, MatFabButton, MatMiniFabButton, MatIcon, Specimen, SpecimenSection, MatProgressSpinner, ColorFamilyScope],
  template: `
    <h1>Bouton</h1>

    <app-specimen-section title="Boutons" description="Cinq styles, en état normal, désactivé et avec icône.">
      <app-specimen label="Texte" api='matButton="text"' [snippet]="snippets.texte">
        <button matButton="text">Texte</button>
      </app-specimen>
      <app-specimen label="Rempli" api='matButton="filled"' [snippet]="snippets.rempli">
        <button matButton="filled">Rempli</button>
      </app-specimen>
      <app-specimen label="Tonal" api='matButton="tonal"' [snippet]="snippets.tonal">
        <button matButton="tonal">Tonal</button>
      </app-specimen>
      <app-specimen label="Relevé" api='matButton="elevated"' [snippet]="snippets.releve">
        <button matButton="elevated">Relevé</button>
      </app-specimen>
      <app-specimen label="Contour" api='matButton="outlined"' [snippet]="snippets.contour">
        <button matButton="outlined">Contour</button>
      </app-specimen>
      <app-specimen label="Désactivé" api="disabled" [snippet]="snippets.desactive">
        <button matButton="text" disabled>Texte</button>
        <button matButton="filled" disabled>Rempli</button>
        <button matButton="tonal" disabled>Tonal</button>
        <button matButton="elevated" disabled>Relevé</button>
        <button matButton="outlined" disabled>Contour</button>
      </app-specimen>
      <app-specimen label="Avec icône" api="mat-icon" [snippet]="snippets.avecIcone">
        <button matButton="text"><mat-icon>add</mat-icon>Texte</button>
        <button matButton="filled"><mat-icon>add</mat-icon>Rempli</button>
        <button matButton="tonal"><mat-icon>add</mat-icon>Tonal</button>
        <button matButton="elevated"><mat-icon>add</mat-icon>Relevé</button>
        <button matButton="outlined"><mat-icon>add</mat-icon>Contour</button>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Boutons icône">
      <app-specimen label="Icône" api="matIconButton" [snippet]="snippets.icone">
        <button matIconButton aria-label="Favori"><mat-icon>favorite</mat-icon></button>
      </app-specimen>
      <app-specimen label="Désactivé" api="matIconButton disabled" [snippet]="snippets.iconeDesactive">
        <button matIconButton aria-label="Favori" disabled><mat-icon>favorite</mat-icon></button>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Boutons d’action flottants (FAB)">
      <app-specimen label="FAB" api="matFab" [snippet]="snippets.fab">
        <button matFab aria-label="Modifier"><mat-icon>edit</mat-icon></button>
      </app-specimen>
      <app-specimen label="Mini FAB" api="matMiniFab" [snippet]="snippets.miniFab">
        <button matMiniFab aria-label="Modifier"><mat-icon>edit</mat-icon></button>
      </app-specimen>
      <app-specimen label="FAB étendu" api="matFab extended" [snippet]="snippets.fabEtendu">
        <button matFab extended><mat-icon>edit</mat-icon>Modifier</button>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section
      title="Tailles"
      description="Angular Material n’expose pas d’API de taille : ces variantes passent par les mixins mat.button-overrides et mat.icon-button-overrides (hauteur, marges, texte). Le texte reprend l’échelle typographique --mat-sys-*-size ; hauteurs et marges n’ont pas de jeton système. La densité du thème agit aussi sur la hauteur."
    >
      <app-specimen label="Petit" api="container-height: 32px" [snippet]="snippets.petit">
        <button matButton="text" class="petit">Texte</button>
        <button matButton="filled" class="petit">Rempli</button>
        <button matButton="tonal" class="petit">Tonal</button>
        <button matButton="outlined" class="petit">Contour</button>
      </app-specimen>
      <app-specimen label="Standard" api="40 px (défaut)" [snippet]="snippets.standard">
        <button matButton="text">Texte</button>
        <button matButton="filled">Rempli</button>
        <button matButton="tonal">Tonal</button>
        <button matButton="outlined">Contour</button>
      </app-specimen>
      <app-specimen label="Grand" api="container-height: 56px" [snippet]="snippets.grand">
        <button matButton="text" class="grand">Texte</button>
        <button matButton="filled" class="grand">Rempli</button>
        <button matButton="tonal" class="grand">Tonal</button>
        <button matButton="outlined" class="grand">Contour</button>
      </app-specimen>
      <app-specimen label="Très grand" api="container-height: 72px" [snippet]="snippets.tresGrand">
        <button matButton="filled" class="tres-grand">Rempli</button>
        <button matButton="outlined" class="tres-grand">Contour</button>
      </app-specimen>
      <app-specimen label="Bouton icône petit" api="state-layer-size: 32px" [snippet]="snippets.iconePetit">
        <button matIconButton class="icone-petit" aria-label="Favori"><mat-icon>favorite</mat-icon></button>
      </app-specimen>
      <app-specimen label="Bouton icône grand" api="state-layer-size: 56px" [snippet]="snippets.iconeGrand">
        <button matIconButton class="icone-grand" aria-label="Favori"><mat-icon>favorite</mat-icon></button>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section
      title="Couleurs"
      description="L’entrée color est réservée aux thèmes M2 et reste sans effet ici. Les rôles de couleur M3 s’obtiennent avec les mixins Sass mat.button-overrides, mat.icon-button-overrides et mat.fab-overrides, en leur passant les jetons système --mat-sys-* (fond et texte ensemble, pour garder le contraste)."
    >
      <app-specimen label="Primaire (défaut)" api="--mat-sys-primary" [snippet]="snippets.couleurPrimaire">
        <button matButton="text">Texte</button>
        <button matButton="filled">Rempli</button>
        <button matButton="tonal">Tonal</button>
        <button matButton="elevated">Relevé</button>
        <button matButton="outlined">Contour</button>
      </app-specimen>
      <app-specimen label="Secondaire" api="--mat-sys-secondary" [snippet]="snippets.couleurSecondaire">
        <button matButton="text" class="secondaire">Texte</button>
        <button matButton="filled" class="secondaire">Rempli</button>
        <button matButton="tonal" class="secondaire">Tonal</button>
        <button matButton="elevated" class="secondaire">Relevé</button>
        <button matButton="outlined" class="secondaire">Contour</button>
      </app-specimen>
      <app-specimen label="Tertiaire" api="--mat-sys-tertiary" [snippet]="snippets.couleurTertiaire">
        <button matButton="text" class="tertiaire">Texte</button>
        <button matButton="filled" class="tertiaire">Rempli</button>
        <button matButton="tonal" class="tertiaire">Tonal</button>
        <button matButton="elevated" class="tertiaire">Relevé</button>
        <button matButton="outlined" class="tertiaire">Contour</button>
      </app-specimen>
      <app-specimen label="Erreur" api="--mat-sys-error" [snippet]="snippets.couleurErreur">
        <button matButton="text" class="erreur">Texte</button>
        <button matButton="filled" class="erreur">Rempli</button>
        <button matButton="tonal" class="erreur">Tonal</button>
        <button matButton="elevated" class="erreur">Relevé</button>
        <button matButton="outlined" class="erreur">Contour</button>
      </app-specimen>
      <app-specimen label="Boutons icône" api="icon-button-overrides : icon-color" [snippet]="snippets.couleurIcone">
        <button matIconButton aria-label="Favori primaire"><mat-icon>favorite</mat-icon></button>
        <button matIconButton class="secondaire" aria-label="Favori secondaire"><mat-icon>favorite</mat-icon></button>
        <button matIconButton class="tertiaire" aria-label="Favori tertiaire"><mat-icon>favorite</mat-icon></button>
        <button matIconButton class="erreur" aria-label="Favori erreur"><mat-icon>favorite</mat-icon></button>
      </app-specimen>
      <app-specimen label="FAB" api="fab-overrides : container-color" [snippet]="snippets.couleurFab">
        <button matFab aria-label="Modifier primaire"><mat-icon>edit</mat-icon></button>
        <button matFab class="secondaire" aria-label="Modifier secondaire"><mat-icon>edit</mat-icon></button>
        <button matFab class="tertiaire" aria-label="Modifier tertiaire"><mat-icon>edit</mat-icon></button>
        <button matFab class="erreur" aria-label="Modifier erreur"><mat-icon>edit</mat-icon></button>
        <button matMiniFab class="secondaire" aria-label="Modifier secondaire"><mat-icon>edit</mat-icon></button>
        <button matMiniFab class="tertiaire" aria-label="Modifier tertiaire"><mat-icon>edit</mat-icon></button>
        <button matMiniFab class="erreur" aria-label="Modifier erreur"><mat-icon>edit</mat-icon></button>
        <button matFab extended class="erreur"><mat-icon>edit</mat-icon>Modifier</button>
      </app-specimen>
    </app-specimen-section>

    @if (families().length > 0) {
      <app-specimen-section
        title="Couleurs personnalisées"
        description="Familles de couleur propres au design system (--app-color-*), détectées dans le CSS chargé : même principe que les rôles M3, appliqué avec les jetons du design system (fond et texte ensemble)."
      >
        @for (family of families(); track family.id) {
          <app-specimen [label]="family.label" [api]="family.api" [snippet]="family.snippet" [custom]="true">
            <span [appColorFamily]="family.id">
              <button matButton="text" class="perso">Texte</button>
              <button matButton="filled" class="perso">Rempli</button>
              <button matButton="tonal" class="perso">Tonal</button>
              <button matButton="elevated" class="perso">Relevé</button>
              <button matButton="outlined" class="perso">Contour</button>
              <button matIconButton class="perso" [attr.aria-label]="'Favori ' + family.label"><mat-icon>favorite</mat-icon></button>
              <button matFab class="perso" [attr.aria-label]="'Modifier ' + family.label"><mat-icon>edit</mat-icon></button>
              <button matMiniFab class="perso" [attr.aria-label]="'Modifier ' + family.label"><mat-icon>edit</mat-icon></button>
              <button matFab extended class="perso"><mat-icon>edit</mat-icon>Modifier</button>
            </span>
          </app-specimen>
        }
      </app-specimen-section>
    }

    <app-specimen-section title="Formes" description="Rayon des angles : le mixin mat.button-overrides reçoit un jeton de l’échelle de formes --mat-sys-corner-* (container-shape).">
      <app-specimen label="Pilule (défaut)" api="corner-full" [snippet]="snippets.pilule">
        <button matButton="filled">Rempli</button>
        <button matButton="outlined">Contour</button>
      </app-specimen>
      <app-specimen label="Arrondi" api="--mat-sys-corner-small" [snippet]="snippets.arrondi">
        <button matButton="filled" class="arrondi">Rempli</button>
        <button matButton="outlined" class="arrondi">Contour</button>
      </app-specimen>
      <app-specimen label="Angulaire" api="--mat-sys-corner-none" [snippet]="snippets.angulaire">
        <button matButton="filled" class="angulaire">Rempli</button>
        <button matButton="outlined" class="angulaire">Contour</button>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Contenus et états">
      <app-specimen label="Icône à droite" api="iconPositionEnd" [snippet]="snippets.iconeFin">
        <button matButton="filled">Suivant<mat-icon iconPositionEnd>arrow_forward</mat-icon></button>
        <button matButton="outlined">Suivant<mat-icon iconPositionEnd>arrow_forward</mat-icon></button>
      </app-specimen>
      <app-specimen label="Chargement" api="showProgress + progressIndicator" [snippet]="snippets.chargement">
        <button matButton="filled" [showProgress]="true" aria-label="Enregistrement en cours">
          <mat-progress-spinner progressIndicator mode="indeterminate" diameter="18" aria-hidden="true" [attr.tabindex]="null" />
          Enregistrer
        </button>
        <button matButton="outlined" [showProgress]="true" aria-label="Enregistrement en cours">
          <mat-progress-spinner progressIndicator mode="indeterminate" diameter="18" aria-hidden="true" [attr.tabindex]="null" />
          Enregistrer
        </button>
      </app-specimen>
      <app-specimen label="Désactivé mais focalisable" api="disabledInteractive" [snippet]="snippets.inactifFocalisable">
        <button matButton="filled" [disabledInteractive]="true" disabled>Désactivé</button>
      </app-specimen>
      <app-specimen label="Lien" api="a matButton" [snippet]="snippets.lien">
        <a matButton="outlined" href="https://angular.dev" target="_blank" rel="noopener">Lien externe</a>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    @use '@angular/material' as mat;
    @use 'roles';

    @mixin taille($hauteur, $marge, $texte) {
      @include mat.button-overrides(
        (
          filled-container-height: $hauteur,
          filled-horizontal-padding: $marge,
          filled-label-text-size: $texte,
          tonal-container-height: $hauteur,
          tonal-horizontal-padding: $marge,
          tonal-label-text-size: $texte,
          outlined-container-height: $hauteur,
          outlined-horizontal-padding: $marge,
          outlined-label-text-size: $texte,
          text-container-height: $hauteur,
          text-horizontal-padding: $marge,
          text-label-text-size: $texte,
          protected-container-height: $hauteur,
          protected-horizontal-padding: $marge,
          protected-label-text-size: $texte,
        )
      );
    }

    @mixin forme($rayon) {
      @include mat.button-overrides(
        (
          filled-container-shape: $rayon,
          tonal-container-shape: $rayon,
          outlined-container-shape: $rayon,
          text-container-shape: $rayon,
          protected-container-shape: $rayon,
        )
      );
    }

    .petit {
      @include taille(32px, 12px, var(--mat-sys-label-medium-size));
    }

    .grand {
      @include taille(56px, 32px, var(--mat-sys-title-medium-size));
    }

    .tres-grand {
      @include taille(72px, 40px, var(--mat-sys-title-large-size));
    }

    .arrondi {
      @include forme(var(--mat-sys-corner-small));
    }

    .angulaire {
      @include forme(var(--mat-sys-corner-none));
    }

    .secondaire,
    .tertiaire,
    .erreur,
    .perso {
      @include roles.button-tokens;
    }

    .secondaire {
      @include roles.button(secondary);
    }

    .tertiaire {
      @include roles.button(tertiary);
    }

    .erreur {
      @include roles.button(error);
    }

    @mixin taille-icone($zone, $icone) {
      @include mat.icon-button-overrides(
        (
          state-layer-size: $zone,
          icon-size: $icone,
        )
      );

      .mat-icon {
        width: $icone;
        height: $icone;
        font-size: $icone;
      }
    }

    .icone-petit {
      @include taille-icone(32px, 18px);
    }

    .icone-grand {
      @include taille-icone(56px, 32px);
    }
  `,
})
export class BoutonPage {
  protected readonly snippets = SNIPPETS;

  private readonly detected = injectColorFamilies();

  /** Une famille par jeu `--app-color-*` complet (vide avec un thème Angular Material). */
  protected readonly families = computed(() =>
    this.detected().map(({ id, label }) => ({ id, label, api: `--app-color-${id}`, snippet: customSnippet(id) })),
  );
}
