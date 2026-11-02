import { Component } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  desactive: `<mat-slide-toggle>Désactivé</mat-slide-toggle>`,
  actif: `<mat-slide-toggle checked>Activé</mat-slide-toggle>`,
  sansIcone: `<mat-slide-toggle checked hideIcon>Sans icône</mat-slide-toggle>`,
  avant: `<mat-slide-toggle labelPosition="before">Libellé avant</mat-slide-toggle>`,
  inactifOff: `<mat-slide-toggle disabled>Désactivé</mat-slide-toggle>`,
  inactifOn: `<mat-slide-toggle checked disabled>Activé</mat-slide-toggle>`,
  pleineLargeur: `<mat-slide-toggle [fullWidth]="true">Libellé, interrupteur à l'extrémité</mat-slide-toggle>`,
  sansLibelle: `<mat-slide-toggle aria-label="Mode avion" />`,
  inactifFocalisable: `<mat-slide-toggle [disabledInteractive]="true" disabled>Désactivé, focalisable</mat-slide-toggle>`,
  sansRipple: `<mat-slide-toggle [disableRipple]="true">Sans ondulation</mat-slide-toggle>`,
  roles: `<mat-slide-toggle checked>Primaire (défaut)</mat-slide-toggle>
<mat-slide-toggle class="secondaire" checked>Secondaire</mat-slide-toggle>
<mat-slide-toggle class="tertiaire" checked>Tertiaire</mat-slide-toggle>
<mat-slide-toggle class="erreur" checked>Erreur</mat-slide-toggle>

@use '@angular/material' as mat;

.secondaire {
  @include mat.slide-toggle-overrides((
    selected-track-color: var(--mat-sys-secondary),
    selected-hover-track-color: var(--mat-sys-secondary),
    selected-focus-track-color: var(--mat-sys-secondary),
    selected-pressed-track-color: var(--mat-sys-secondary),
    selected-handle-color: var(--mat-sys-on-secondary),
    selected-hover-handle-color: var(--mat-sys-secondary-container),
    selected-focus-handle-color: var(--mat-sys-secondary-container),
    selected-pressed-handle-color: var(--mat-sys-secondary-container),
    selected-icon-color: var(--mat-sys-on-secondary-container),
    selected-hover-state-layer-color: var(--mat-sys-secondary),
    selected-focus-state-layer-color: var(--mat-sys-secondary),
    selected-pressed-state-layer-color: var(--mat-sys-secondary),
  ));
}

/* Mêmes jetons avec secondary → tertiary (.tertiaire) et error (.erreur) */`,
  carre: `<mat-slide-toggle class="carre">Éteint</mat-slide-toggle>
<mat-slide-toggle class="carre" checked>Allumé</mat-slide-toggle>

@use '@angular/material' as mat;

.carre {
  @include mat.slide-toggle-overrides((
    track-shape: var(--mat-sys-corner-small),
    handle-shape: var(--mat-sys-corner-extra-small),
  ));
}`,
};

@Component({
  selector: 'app-interrupteur-page',
  imports: [MatSlideToggle, Specimen, SpecimenSection],
  template: `
    <h1>Interrupteur</h1>

    <app-specimen-section title="États">
      <app-specimen label="Éteint" api="mat-slide-toggle" [snippet]="snippets.desactive">
        <mat-slide-toggle>Désactivé</mat-slide-toggle>
      </app-specimen>
      <app-specimen label="Allumé" api="checked" [snippet]="snippets.actif">
        <mat-slide-toggle checked>Activé</mat-slide-toggle>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Variantes">
      <app-specimen label="Sans icône" api="hideIcon" [snippet]="snippets.sansIcone">
        <mat-slide-toggle checked hideIcon>Sans icône</mat-slide-toggle>
      </app-specimen>
      <app-specimen label="Libellé avant" api='labelPosition="before"' [snippet]="snippets.avant">
        <mat-slide-toggle labelPosition="before">Libellé avant</mat-slide-toggle>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Inactifs">
      <app-specimen label="Éteint" api="disabled" [snippet]="snippets.inactifOff">
        <mat-slide-toggle disabled>Désactivé</mat-slide-toggle>
      </app-specimen>
      <app-specimen label="Allumé" api="checked disabled" [snippet]="snippets.inactifOn">
        <mat-slide-toggle checked disabled>Activé</mat-slide-toggle>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section minWidth="320px" title="Options">
      <app-specimen label="Pleine largeur" api="fullWidth" [snippet]="snippets.pleineLargeur">
        <mat-slide-toggle [fullWidth]="true">Libellé, interrupteur à l’extrémité</mat-slide-toggle>
      </app-specimen>
      <app-specimen label="Sans libellé visible" api="aria-label" [snippet]="snippets.sansLibelle">
        <mat-slide-toggle aria-label="Mode avion" />
      </app-specimen>
      <app-specimen label="Désactivé mais focalisable" api="disabledInteractive" [snippet]="snippets.inactifFocalisable">
        <mat-slide-toggle [disabledInteractive]="true" disabled>Désactivé, focalisable</mat-slide-toggle>
      </app-specimen>
      <app-specimen label="Sans ondulation" api="disableRipple" [snippet]="snippets.sansRipple">
        <mat-slide-toggle [disableRipple]="true">Sans ondulation</mat-slide-toggle>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section
      minWidth="320px"
      title="Personnalisation (jetons)"
      description="Rôles de couleur et formes via le mixin mat.slide-toggle-overrides, avec les jetons système --mat-sys-* (noms de jetons validés à la compilation)."
    >
      <app-specimen label="Rôles de couleur" api="slide-toggle-overrides : selected-track-color" [snippet]="snippets.roles">
        <mat-slide-toggle checked>Primaire (défaut)</mat-slide-toggle>
        <mat-slide-toggle class="secondaire" checked>Secondaire</mat-slide-toggle>
        <mat-slide-toggle class="tertiaire" checked>Tertiaire</mat-slide-toggle>
        <mat-slide-toggle class="erreur" checked>Erreur</mat-slide-toggle>
      </app-specimen>
      <app-specimen label="Forme carrée" api="slide-toggle-overrides : track-shape" [snippet]="snippets.carre">
        <mat-slide-toggle class="carre">Éteint</mat-slide-toggle>
        <mat-slide-toggle class="carre" checked>Allumé</mat-slide-toggle>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    @use '@angular/material' as mat;

    @mixin role($role) {
      @include mat.slide-toggle-overrides(
        (
          selected-track-color: var(--mat-sys-#{$role}),
          selected-hover-track-color: var(--mat-sys-#{$role}),
          selected-focus-track-color: var(--mat-sys-#{$role}),
          selected-pressed-track-color: var(--mat-sys-#{$role}),
          selected-handle-color: var(--mat-sys-on-#{$role}),
          selected-hover-handle-color: var(--mat-sys-#{$role}-container),
          selected-focus-handle-color: var(--mat-sys-#{$role}-container),
          selected-pressed-handle-color: var(--mat-sys-#{$role}-container),
          selected-icon-color: var(--mat-sys-on-#{$role}-container),
          selected-hover-state-layer-color: var(--mat-sys-#{$role}),
          selected-focus-state-layer-color: var(--mat-sys-#{$role}),
          selected-pressed-state-layer-color: var(--mat-sys-#{$role}),
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

    .carre {
      @include mat.slide-toggle-overrides(
        (
          track-shape: var(--mat-sys-corner-small),
          handle-shape: var(--mat-sys-corner-extra-small),
        )
      );
    }
  `,
})
export class InterrupteurPage {
  protected readonly snippets = SNIPPETS;
}
