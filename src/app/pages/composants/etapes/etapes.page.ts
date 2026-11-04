import { Component, computed } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatStep, MatStepper, MatStepperIntl, MatStepperNext, MatStepperPrevious, MatStepperIcon } from '@angular/material/stepper';
import { StepperIntlFr } from '../../../core/i18n/intl-fr';
import { injectColorFamilies } from '../../../core/tokens/color-families';
import { ColorFamilyScope } from '../../../shared/color-family-scope/color-family-scope';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';
import { MatIcon } from '@angular/material/icon';
import { ComposantRef } from '../../../shared/composant-ref/composant-ref';

/** Snippet d'une famille personnalisée, dérivé de son nom (la liste des familles est détectée, pas écrite à la main). */
function customSnippet(id: string): string {
  return `<mat-stepper class="etapes-${id}" [selectedIndex]="1">
  <mat-step label="Identité" [completed]="true">…</mat-step>
  <mat-step label="Adresse">…</mat-step>
  <mat-step label="Validation">…</mat-step>
</mat-stepper>

@use '@angular/material' as mat;

.etapes-${id} {
  @include mat.stepper-overrides((
    header-selected-state-icon-background-color: var(--app-color-${id}),
    header-selected-state-icon-foreground-color: var(--app-color-on-${id}),
    header-done-state-icon-background-color: var(--app-color-${id}),
    header-done-state-icon-foreground-color: var(--app-color-on-${id}),
    header-edit-state-icon-background-color: var(--app-color-${id}),
    header-edit-state-icon-foreground-color: var(--app-color-on-${id}),
    line-color: var(--app-color-${id}),
  ));
}`;
}

const SNIPPETS = {
  horizontal: `<mat-stepper>
  <mat-step label="Identité">
    <p>Saisir l’identité.</p>
    <button matButton matStepperNext>Suivant</button>
  </mat-step>
  <mat-step label="Adresse">
    <p>Saisir l’adresse.</p>
    <button matButton matStepperPrevious>Retour</button>
    <button matButton matStepperNext>Suivant</button>
  </mat-step>
  <mat-step label="Validation">
    <p>Vérifier puis valider.</p>
    <button matButton matStepperPrevious>Retour</button>
  </mat-step>
</mat-stepper>`,
  vertical: `<mat-stepper orientation="vertical">
  <mat-step label="Identité">
    <p>Saisir l’identité.</p>
    <button matButton matStepperNext>Suivant</button>
  </mat-step>
  <mat-step label="Adresse">
    <p>Saisir l’adresse.</p>
    <button matButton matStepperPrevious>Retour</button>
  </mat-step>
</mat-stepper>`,
  optionnelle: `<mat-stepper>
  <mat-step label="Identité">…</mat-step>
  <mat-step label="Société" optional>…</mat-step>
  <mat-step label="Validation">…</mat-step>
</mat-stepper>`,
  lineaire: `<mat-stepper linear>
  <mat-step label="Identité" [completed]="false">
    <p>Étape à compléter avant de continuer.</p>
  </mat-step>
  <mat-step label="Adresse">…</mat-step>
</mat-stepper>`,
  libellesBas: `<mat-stepper labelPosition="bottom">
  <mat-step label="Identité">…</mat-step>
  <mat-step label="Adresse">…</mat-step>
  <mat-step label="Validation">…</mat-step>
</mat-stepper>`,
  enteteBas: `<mat-stepper headerPosition="bottom">
  <mat-step label="Identité">…</mat-step>
  <mat-step label="Adresse">…</mat-step>
</mat-stepper>`,
  terminees: `<mat-stepper [selectedIndex]="2">
  <mat-step label="Identité" [completed]="true">…</mat-step>
  <mat-step label="Adresse" [completed]="true">…</mat-step>
  <mat-step label="Validation">…</mat-step>
</mat-stepper>`,
  nonModifiable: `<mat-stepper [selectedIndex]="1">
  <mat-step label="Identité" [completed]="true" [editable]="false">…</mat-step>
  <mat-step label="Adresse">…</mat-step>
</mat-stepper>`,
  icones: `<mat-stepper [selectedIndex]="2">
  <ng-template matStepperIcon="done"><mat-icon>check_circle</mat-icon></ng-template>
  <ng-template matStepperIcon="edit"><mat-icon>edit_note</mat-icon></ng-template>
  <mat-step label="Identité" [completed]="true">…</mat-step>
  <mat-step label="Adresse" [completed]="true" [editable]="false">…</mat-step>
  <mat-step label="Validation">…</mat-step>
</mat-stepper>`,
  couleurs: `<mat-stepper class="etapes-secondaire" [selectedIndex]="1">
  <mat-step label="Identité" [completed]="true">…</mat-step>
  <mat-step label="Adresse">…</mat-step>
  <mat-step label="Validation">…</mat-step>
</mat-stepper>
<mat-stepper class="etapes-tertiaire" [selectedIndex]="1">…</mat-stepper>

@use '@angular/material' as mat;

.etapes-secondaire {
  @include mat.stepper-overrides((
    header-selected-state-icon-background-color: var(--mat-sys-secondary),
    header-selected-state-icon-foreground-color: var(--mat-sys-on-secondary),
    header-done-state-icon-background-color: var(--mat-sys-secondary),
    header-done-state-icon-foreground-color: var(--mat-sys-on-secondary),
    header-edit-state-icon-background-color: var(--mat-sys-secondary),
    header-edit-state-icon-foreground-color: var(--mat-sys-on-secondary),
    line-color: var(--mat-sys-secondary),
  ));
}

/* Même liste de jetons avec --mat-sys-tertiary et --mat-sys-on-tertiary */
.etapes-tertiaire {
  @include mat.stepper-overrides((
    header-selected-state-icon-background-color: var(--mat-sys-tertiary),
    header-selected-state-icon-foreground-color: var(--mat-sys-on-tertiary),
    header-done-state-icon-background-color: var(--mat-sys-tertiary),
    header-done-state-icon-foreground-color: var(--mat-sys-on-tertiary),
    header-edit-state-icon-background-color: var(--mat-sys-tertiary),
    header-edit-state-icon-foreground-color: var(--mat-sys-on-tertiary),
    line-color: var(--mat-sys-tertiary),
  ));
}`,
  compact: `<mat-stepper class="etapes-compactes">
  <mat-step label="Identité">…</mat-step>
  <mat-step label="Adresse">…</mat-step>
  <mat-step label="Validation">…</mat-step>
</mat-stepper>

@use '@angular/material' as mat;

.etapes-compactes {
  @include mat.stepper-overrides((
    header-height: 56px,
    header-label-text-size: var(--mat-sys-label-medium-size),
    header-selected-state-label-text-size: var(--mat-sys-label-medium-size),
  ));
}`,
};

@Component({
  selector: 'app-etapes-page',
  imports: [
    ComposantRef,
    MatButton,
    MatStep,
    MatStepper,
    MatStepperNext,
    MatStepperPrevious,
    Specimen,
    SpecimenSection,
    MatStepperIcon,
    MatIcon,
    ColorFamilyScope,
  ],
  providers: [{ provide: MatStepperIntl, useClass: StepperIntlFr }],
  template: `
    <h1>Étapes</h1>
    <app-composant-ref />

    <app-specimen-section minWidth="420px" title="Orientations">
      <app-specimen label="Horizontal" api="mat-stepper" [snippet]="snippets.horizontal">
        <mat-stepper>
          <mat-step label="Identité">
            <p>Saisir l’identité.</p>
            <button matButton matStepperNext>Suivant</button>
          </mat-step>
          <mat-step label="Adresse">
            <p>Saisir l’adresse.</p>
            <button matButton matStepperPrevious>Retour</button>
            <button matButton matStepperNext>Suivant</button>
          </mat-step>
          <mat-step label="Validation">
            <p>Vérifier puis valider.</p>
            <button matButton matStepperPrevious>Retour</button>
          </mat-step>
        </mat-stepper>
      </app-specimen>
      <app-specimen label="Vertical" api='orientation="vertical"' [snippet]="snippets.vertical">
        <mat-stepper orientation="vertical">
          <mat-step label="Identité">
            <p>Saisir l’identité.</p>
            <button matButton matStepperNext>Suivant</button>
          </mat-step>
          <mat-step label="Adresse">
            <p>Saisir l’adresse.</p>
            <button matButton matStepperPrevious>Retour</button>
          </mat-step>
        </mat-stepper>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section minWidth="420px" title="Comportements">
      <app-specimen label="Étape optionnelle" api="optional" [snippet]="snippets.optionnelle">
        <mat-stepper>
          <mat-step label="Identité"><p>Première étape.</p></mat-step>
          <mat-step label="Société" optional><p>Étape facultative.</p></mat-step>
          <mat-step label="Validation"><p>Dernière étape.</p></mat-step>
        </mat-stepper>
      </app-specimen>
      <app-specimen label="Mode linéaire" api="linear" [snippet]="snippets.lineaire">
        <mat-stepper linear>
          <mat-step label="Identité" [completed]="false">
            <p>Étape à compléter avant de continuer.</p>
          </mat-step>
          <mat-step label="Adresse"><p>Étape suivante verrouillée.</p></mat-step>
        </mat-stepper>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section minWidth="420px" title="Présentation des étapes">
      <app-specimen label="Libellés sous les pastilles" api='labelPosition="bottom"' [snippet]="snippets.libellesBas">
        <mat-stepper labelPosition="bottom">
          <mat-step label="Identité"><p>Première étape.</p></mat-step>
          <mat-step label="Adresse"><p>Deuxième étape.</p></mat-step>
          <mat-step label="Validation"><p>Dernière étape.</p></mat-step>
        </mat-stepper>
      </app-specimen>
      <app-specimen label="En-tête en bas" api='headerPosition="bottom"' [snippet]="snippets.enteteBas">
        <mat-stepper headerPosition="bottom">
          <mat-step label="Identité"><p>Première étape.</p></mat-step>
          <mat-step label="Adresse"><p>Deuxième étape.</p></mat-step>
        </mat-stepper>
      </app-specimen>
      <app-specimen label="Étapes terminées" api="completed" [snippet]="snippets.terminees">
        <mat-stepper [selectedIndex]="2">
          <mat-step label="Identité" [completed]="true"><p>Terminée.</p></mat-step>
          <mat-step label="Adresse" [completed]="true"><p>Terminée.</p></mat-step>
          <mat-step label="Validation"><p>En cours.</p></mat-step>
        </mat-stepper>
      </app-specimen>
      <app-specimen label="Étape non modifiable" api="editable=false" [snippet]="snippets.nonModifiable">
        <mat-stepper [selectedIndex]="1">
          <mat-step label="Identité" [completed]="true" [editable]="false"><p>Verrouillée.</p></mat-step>
          <mat-step label="Adresse"><p>En cours.</p></mat-step>
        </mat-stepper>
      </app-specimen>
      <app-specimen label="Icônes personnalisées" api="matStepperIcon" [snippet]="snippets.icones">
        <mat-stepper [selectedIndex]="2">
          <ng-template matStepperIcon="done"><mat-icon>check_circle</mat-icon></ng-template>
          <ng-template matStepperIcon="edit"><mat-icon>edit_note</mat-icon></ng-template>
          <mat-step label="Identité" [completed]="true"><p>Terminée, modifiable.</p></mat-step>
          <mat-step label="Adresse" [completed]="true" [editable]="false"><p>Terminée, verrouillée.</p></mat-step>
          <mat-step label="Validation"><p>En cours.</p></mat-step>
        </mat-stepper>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section
      minWidth="420px"
      title="Personnalisation (jetons)"
      description="Couleurs des pastilles, hauteur de l’en-tête et typographie des libellés se règlent avec le mixin Sass mat.stepper-overrides ; les noms de jetons sont validés à la compilation."
    >
      <app-specimen label="Couleurs de rôle (secondaire, tertiaire)" api="mat.stepper-overrides : header-selected-state-icon-background-color" [snippet]="snippets.couleurs">
        <mat-stepper class="etapes-secondaire" [selectedIndex]="1">
          <mat-step label="Identité" [completed]="true"><p>Terminée.</p></mat-step>
          <mat-step label="Adresse"><p>En cours.</p></mat-step>
          <mat-step label="Validation"><p>À venir.</p></mat-step>
        </mat-stepper>
        <mat-stepper class="etapes-tertiaire" [selectedIndex]="1">
          <mat-step label="Identité" [completed]="true"><p>Terminée.</p></mat-step>
          <mat-step label="Adresse"><p>En cours.</p></mat-step>
          <mat-step label="Validation"><p>À venir.</p></mat-step>
        </mat-stepper>
      </app-specimen>
      <app-specimen label="En-tête compact" api="mat.stepper-overrides : header-height" [snippet]="snippets.compact">
        <mat-stepper class="etapes-compactes">
          <mat-step label="Identité"><p>Première étape.</p></mat-step>
          <mat-step label="Adresse"><p>Deuxième étape.</p></mat-step>
          <mat-step label="Validation"><p>Dernière étape.</p></mat-step>
        </mat-stepper>
      </app-specimen>
    </app-specimen-section>

    @if (families().length > 0) {
      <app-specimen-section
        minWidth="420px"
        title="Couleurs personnalisées"
        description="Familles de couleur propres au design system (--app-color-*), détectées dans le CSS chargé : même principe que les rôles M3, appliqué avec les jetons du design system (pastille et icône ensemble, trait de liaison)."
      >
        @for (family of families(); track family.id) {
          <app-specimen [label]="family.label" [api]="family.api" [snippet]="family.snippet" [custom]="true">
            <span [appColorFamily]="family.id">
              <mat-stepper class="perso" [selectedIndex]="1">
                <mat-step label="Identité" [completed]="true"><p>Terminée.</p></mat-step>
                <mat-step label="Adresse"><p>En cours ({{ family.label }}).</p></mat-step>
                <mat-step label="Validation"><p>À venir.</p></mat-step>
              </mat-stepper>
            </span>
          </app-specimen>
        }
      </app-specimen-section>
    }
  `,
  styles: `
    @use '@angular/material' as mat;
    @use 'roles';

    mat-stepper {
      width: 100%;
    }

    .etapes-secondaire {
      @include roles.stepper(secondary);
    }

    .etapes-tertiaire {
      @include roles.stepper(tertiary);
    }

    .perso {
      @include roles.stepper(custom);
    }

    .etapes-compactes {
      @include mat.stepper-overrides(
        (
          header-height: 56px,
          header-label-text-size: var(--mat-sys-label-medium-size),
          header-selected-state-label-text-size: var(--mat-sys-label-medium-size),
        )
      );
    }
  `,
})
export class EtapesPage {
  protected readonly snippets = SNIPPETS;

  private readonly detected = injectColorFamilies();

  /** Une famille par jeu `--app-color-*` complet (vide avec un thème Angular Material). */
  protected readonly families = computed(() =>
    this.detected().map(({ id, label }) => ({
      id,
      label,
      api: 'mat.stepper-overrides : header-selected-state-icon-background-color',
      snippet: customSnippet(id),
    })),
  );
}
