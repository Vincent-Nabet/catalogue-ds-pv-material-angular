import { Component } from '@angular/core';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  groupe: `<mat-radio-group aria-label="Taille" value="m">
  <mat-radio-button value="s">Petite</mat-radio-button>
  <mat-radio-button value="m">Moyenne</mat-radio-button>
  <mat-radio-button value="l">Grande</mat-radio-button>
</mat-radio-group>`,
  horizontal: `<mat-radio-group aria-label="Réponse" value="oui">
  <mat-radio-button value="oui">Oui</mat-radio-button>
  <mat-radio-button value="non">Non</mat-radio-button>
</mat-radio-group>`,
  avant: `<mat-radio-group aria-label="Taille" value="m" labelPosition="before">
  <mat-radio-button value="s">Petite</mat-radio-button>
  <mat-radio-button value="m">Moyenne</mat-radio-button>
</mat-radio-group>`,
  optionDesactivee: `<mat-radio-group aria-label="Taille" value="s">
  <mat-radio-button value="s">Petite</mat-radio-button>
  <mat-radio-button value="m" disabled>Moyenne (indisponible)</mat-radio-button>
</mat-radio-group>`,
  desactive: `<mat-radio-group aria-label="Taille" value="m" disabled>
  <mat-radio-button value="s">Petite</mat-radio-button>
  <mat-radio-button value="m">Moyenne</mat-radio-button>
</mat-radio-group>`,
  inactifFocalisable: `<mat-radio-group aria-label="Taille" value="s">
  <mat-radio-button value="s">Petite</mat-radio-button>
  <mat-radio-button value="m" [disabledInteractive]="true" disabled>Moyenne (focalisable)</mat-radio-button>
</mat-radio-group>`,
  sansRipple: `<mat-radio-group aria-label="Taille" value="s">
  <mat-radio-button value="s" [disableRipple]="true">Petite</mat-radio-button>
  <mat-radio-button value="m" [disableRipple]="true">Moyenne</mat-radio-button>
</mat-radio-group>`,
  roles: `<mat-radio-button checked>Primaire (défaut)</mat-radio-button>
<mat-radio-button class="secondaire" checked>Secondaire</mat-radio-button>
<mat-radio-button class="tertiaire" checked>Tertiaire</mat-radio-button>
<mat-radio-button class="erreur" checked>Erreur</mat-radio-button>

@use '@angular/material' as mat;

.secondaire {
  @include mat.radio-overrides((
    selected-icon-color: var(--mat-sys-secondary),
    selected-hover-icon-color: var(--mat-sys-secondary),
    selected-focus-icon-color: var(--mat-sys-secondary),
    selected-pressed-icon-color: var(--mat-sys-secondary),
    checked-ripple-color: var(--mat-sys-secondary),
  ));
}

/* Mêmes jetons avec --mat-sys-tertiary (.tertiaire) et --mat-sys-error (.erreur) */`,
  libelle: `<mat-radio-group aria-label="Taille du titre" value="m" class="libelle-titre">
  <mat-radio-button value="s">Petite</mat-radio-button>
  <mat-radio-button value="m">Moyenne</mat-radio-button>
</mat-radio-group>

@use '@angular/material' as mat;

.libelle-titre {
  @include mat.radio-overrides((
    label-text-size: var(--mat-sys-title-medium-size),
    label-text-weight: var(--mat-sys-title-medium-weight),
    label-text-line-height: var(--mat-sys-title-medium-line-height),
  ));
}`,
};

@Component({
  selector: 'app-bouton-radio-page',
  imports: [MatRadioGroup, MatRadioButton, Specimen, SpecimenSection],
  template: `
    <h1>Bouton radio</h1>

    <app-specimen-section title="Groupes">
      <app-specimen label="Vertical" api="mat-radio-group" [snippet]="snippets.groupe">
        <mat-radio-group aria-label="Taille" value="m" class="colonne">
          <mat-radio-button value="s">Petite</mat-radio-button>
          <mat-radio-button value="m">Moyenne</mat-radio-button>
          <mat-radio-button value="l">Grande</mat-radio-button>
        </mat-radio-group>
      </app-specimen>
      <app-specimen label="Horizontal" api="mat-radio-group" [snippet]="snippets.horizontal">
        <mat-radio-group aria-label="Réponse" value="oui">
          <mat-radio-button value="oui">Oui</mat-radio-button>
          <mat-radio-button value="non">Non</mat-radio-button>
        </mat-radio-group>
      </app-specimen>
      <app-specimen label="Libellé avant" api='labelPosition="before"' [snippet]="snippets.avant">
        <mat-radio-group aria-label="Taille" value="m" labelPosition="before" class="colonne">
          <mat-radio-button value="s">Petite</mat-radio-button>
          <mat-radio-button value="m">Moyenne</mat-radio-button>
        </mat-radio-group>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="États">
      <app-specimen label="Option désactivée" api="mat-radio-button disabled" [snippet]="snippets.optionDesactivee">
        <mat-radio-group aria-label="Taille" value="s" class="colonne">
          <mat-radio-button value="s">Petite</mat-radio-button>
          <mat-radio-button value="m" disabled>Moyenne (indisponible)</mat-radio-button>
        </mat-radio-group>
      </app-specimen>
      <app-specimen label="Groupe désactivé" api="disabled" [snippet]="snippets.desactive">
        <mat-radio-group aria-label="Taille" value="m" disabled class="colonne">
          <mat-radio-button value="s">Petite</mat-radio-button>
          <mat-radio-button value="m">Moyenne</mat-radio-button>
        </mat-radio-group>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Options">
      <app-specimen label="Désactivé mais focalisable" api="disabledInteractive" [snippet]="snippets.inactifFocalisable">
        <mat-radio-group aria-label="Taille focalisable" value="s" class="colonne">
          <mat-radio-button value="s">Petite</mat-radio-button>
          <mat-radio-button value="m" [disabledInteractive]="true" disabled>Moyenne (focalisable)</mat-radio-button>
        </mat-radio-group>
      </app-specimen>
      <app-specimen label="Sans ondulation" api="disableRipple" [snippet]="snippets.sansRipple">
        <mat-radio-group aria-label="Taille sans ondulation" value="s" class="colonne">
          <mat-radio-button value="s" [disableRipple]="true">Petite</mat-radio-button>
          <mat-radio-button value="m" [disableRipple]="true">Moyenne</mat-radio-button>
        </mat-radio-group>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section
      title="Personnalisation (jetons)"
      description="Rôles de couleur et typographie via le mixin mat.radio-overrides, avec les jetons système --mat-sys-* (noms de jetons validés à la compilation)."
    >
      <app-specimen label="Rôles de couleur" api="radio-overrides : selected-icon-color" [snippet]="snippets.roles">
        <mat-radio-button checked>Primaire (défaut)</mat-radio-button>
        <mat-radio-button class="secondaire" checked>Secondaire</mat-radio-button>
        <mat-radio-button class="tertiaire" checked>Tertiaire</mat-radio-button>
        <mat-radio-button class="erreur" checked>Erreur</mat-radio-button>
      </app-specimen>
      <app-specimen label="Libellé en titre" api="radio-overrides : label-text-size" [snippet]="snippets.libelle">
        <mat-radio-group aria-label="Taille du titre" value="m" class="libelle-titre colonne">
          <mat-radio-button value="s">Petite</mat-radio-button>
          <mat-radio-button value="m">Moyenne</mat-radio-button>
        </mat-radio-group>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    @use '@angular/material' as mat;

    .colonne {
      display: flex;
      flex-direction: column;
    }

    @mixin role($role) {
      @include mat.radio-overrides(
        (
          selected-icon-color: var(--mat-sys-#{$role}),
          selected-hover-icon-color: var(--mat-sys-#{$role}),
          selected-focus-icon-color: var(--mat-sys-#{$role}),
          selected-pressed-icon-color: var(--mat-sys-#{$role}),
          checked-ripple-color: var(--mat-sys-#{$role}),
        )
      );
    }

    .secondaire {
      @include role(secondary);
    }

    .tertiaire {
      @include role(tertiary);
    }

    .erreur {
      @include role(error);
    }

    .libelle-titre {
      @include mat.radio-overrides(
        (
          label-text-size: var(--mat-sys-title-medium-size),
          label-text-weight: var(--mat-sys-title-medium-weight),
          label-text-line-height: var(--mat-sys-title-medium-line-height),
        )
      );
    }
  `,
})
export class BoutonRadioPage {
  protected readonly snippets = SNIPPETS;
}
