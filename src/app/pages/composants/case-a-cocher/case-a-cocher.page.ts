import { Component } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  decochee: `<mat-checkbox>Décochée</mat-checkbox>`,
  cochee: `<mat-checkbox checked>Cochée</mat-checkbox>`,
  indeterminee: `<mat-checkbox [indeterminate]="true">Indéterminée</mat-checkbox>`,
  decocheeDesactivee: `<mat-checkbox disabled>Décochée</mat-checkbox>`,
  cocheeDesactivee: `<mat-checkbox checked disabled>Cochée</mat-checkbox>`,
  apres: `<mat-checkbox labelPosition="before">Libellé avant</mat-checkbox>`,
  requise: `<mat-checkbox required>J’accepte les conditions</mat-checkbox>`,
  inactifFocalisable: `<mat-checkbox [disabledInteractive]="true" disabled>Désactivée, focalisable</mat-checkbox>`,
  sansRipple: `<mat-checkbox [disableRipple]="true">Sans effet d'ondulation</mat-checkbox>`,
  imbriquees: `<mat-checkbox [indeterminate]="true">Tout sélectionner</mat-checkbox>
<ul>
  <li><mat-checkbox checked>Premier</mat-checkbox></li>
  <li><mat-checkbox>Second</mat-checkbox></li>
</ul>`,
  roles: `<mat-checkbox checked>Primaire (défaut)</mat-checkbox>
<mat-checkbox class="secondaire" checked>Secondaire</mat-checkbox>
<mat-checkbox class="tertiaire" checked>Tertiaire</mat-checkbox>
<mat-checkbox class="erreur" checked>Erreur</mat-checkbox>

@use '@angular/material' as mat;

.secondaire {
  @include mat.checkbox-overrides((
    selected-icon-color: var(--mat-sys-secondary),
    selected-hover-icon-color: var(--mat-sys-secondary),
    selected-focus-icon-color: var(--mat-sys-secondary),
    selected-pressed-icon-color: var(--mat-sys-secondary),
    selected-checkmark-color: var(--mat-sys-on-secondary),
    selected-hover-state-layer-color: var(--mat-sys-secondary),
    selected-focus-state-layer-color: var(--mat-sys-secondary),
    selected-pressed-state-layer-color: var(--mat-sys-secondary),
  ));
}

/* Mêmes jetons avec --mat-sys-tertiary (.tertiaire) et --mat-sys-error (.erreur) */`,
  nonCocheeErreur: `<mat-checkbox class="invalide" required>J’accepte les conditions</mat-checkbox>

@use '@angular/material' as mat;

.invalide {
  @include mat.checkbox-overrides((
    unselected-icon-color: var(--mat-sys-error),
    unselected-hover-icon-color: var(--mat-sys-error),
    unselected-focus-icon-color: var(--mat-sys-error),
    unselected-hover-state-layer-color: var(--mat-sys-error),
    unselected-focus-state-layer-color: var(--mat-sys-error),
    unselected-pressed-state-layer-color: var(--mat-sys-error),
    label-text-color: var(--mat-sys-error),
  ));
}`,
};

@Component({
  selector: 'app-case-a-cocher-page',
  imports: [MatCheckbox, Specimen, SpecimenSection],
  template: `
    <h1>Case à cocher</h1>

    <app-specimen-section title="États">
      <app-specimen label="Décochée" api="mat-checkbox" [snippet]="snippets.decochee">
        <mat-checkbox>Décochée</mat-checkbox>
      </app-specimen>
      <app-specimen label="Cochée" api="checked" [snippet]="snippets.cochee">
        <mat-checkbox checked>Cochée</mat-checkbox>
      </app-specimen>
      <app-specimen label="Indéterminée" api="indeterminate" [snippet]="snippets.indeterminee">
        <mat-checkbox [indeterminate]="true">Indéterminée</mat-checkbox>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Désactivées">
      <app-specimen label="Décochée" api="disabled" [snippet]="snippets.decocheeDesactivee">
        <mat-checkbox disabled>Décochée</mat-checkbox>
      </app-specimen>
      <app-specimen label="Cochée" api="checked disabled" [snippet]="snippets.cocheeDesactivee">
        <mat-checkbox checked disabled>Cochée</mat-checkbox>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Variantes">
      <app-specimen label="Libellé avant" api='labelPosition="before"' [snippet]="snippets.apres">
        <mat-checkbox labelPosition="before">Libellé avant</mat-checkbox>
      </app-specimen>
      <app-specimen label="Requise" api="required" [snippet]="snippets.requise">
        <mat-checkbox required>J’accepte les conditions</mat-checkbox>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Options">
      <app-specimen label="Désactivée mais focalisable" api="disabledInteractive" [snippet]="snippets.inactifFocalisable">
        <mat-checkbox [disabledInteractive]="true" disabled>Désactivée, focalisable</mat-checkbox>
      </app-specimen>
      <app-specimen label="Sans ondulation" api="disableRipple" [snippet]="snippets.sansRipple">
        <mat-checkbox [disableRipple]="true">Sans effet d’ondulation</mat-checkbox>
      </app-specimen>
      <app-specimen label="Cases imbriquées" api="indeterminate" [snippet]="snippets.imbriquees">
        <ul class="imbriquees">
          <li>
            <mat-checkbox [indeterminate]="true">Tout sélectionner</mat-checkbox>
            <ul>
              <li><mat-checkbox checked>Premier</mat-checkbox></li>
              <li><mat-checkbox>Second</mat-checkbox></li>
            </ul>
          </li>
        </ul>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section
      title="Personnalisation (jetons)"
      description="Rôles de couleur via le mixin mat.checkbox-overrides, avec les jetons système --mat-sys-* (fond et coche ensemble, pour garder le contraste). Noms de jetons validés à la compilation."
    >
      <app-specimen label="Rôles de couleur" api="checkbox-overrides : selected-icon-color" [snippet]="snippets.roles">
        <mat-checkbox checked>Primaire (défaut)</mat-checkbox>
        <mat-checkbox class="secondaire" checked>Secondaire</mat-checkbox>
        <mat-checkbox class="tertiaire" checked>Tertiaire</mat-checkbox>
        <mat-checkbox class="erreur" checked>Erreur</mat-checkbox>
      </app-specimen>
      <app-specimen label="Case non cochée en erreur" api="checkbox-overrides : unselected-icon-color" [snippet]="snippets.nonCocheeErreur">
        <mat-checkbox class="invalide" required>J’accepte les conditions</mat-checkbox>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    @use '@angular/material' as mat;

    .imbriquees,
    .imbriquees ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .imbriquees ul {
      padding-inline-start: 32px;
    }

    @mixin role($role) {
      @include mat.checkbox-overrides(
        (
          selected-icon-color: var(--mat-sys-#{$role}),
          selected-hover-icon-color: var(--mat-sys-#{$role}),
          selected-focus-icon-color: var(--mat-sys-#{$role}),
          selected-pressed-icon-color: var(--mat-sys-#{$role}),
          selected-checkmark-color: var(--mat-sys-on-#{$role}),
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

    .invalide {
      @include mat.checkbox-overrides(
        (
          unselected-icon-color: var(--mat-sys-error),
          unselected-hover-icon-color: var(--mat-sys-error),
          unselected-focus-icon-color: var(--mat-sys-error),
          unselected-hover-state-layer-color: var(--mat-sys-error),
          unselected-focus-state-layer-color: var(--mat-sys-error),
          unselected-pressed-state-layer-color: var(--mat-sys-error),
          label-text-color: var(--mat-sys-error),
        )
      );
    }
  `,
})
export class CaseACocherPage {
  protected readonly snippets = SNIPPETS;
}
