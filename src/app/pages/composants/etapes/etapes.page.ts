import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatStep, MatStepper, MatStepperIntl, MatStepperNext, MatStepperPrevious, MatStepperIcon } from '@angular/material/stepper';
import { StepperIntlFr } from '../../../core/i18n/intl-fr';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';
import { MatIcon } from '@angular/material/icon';

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
};

@Component({
  selector: 'app-etapes-page',
  imports: [MatButton, MatStep, MatStepper, MatStepperNext, MatStepperPrevious, Specimen, SpecimenSection, MatStepperIcon, MatIcon],
  providers: [{ provide: MatStepperIntl, useClass: StepperIntlFr }],
  template: `
    <h1>Étapes</h1>

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
  `,
  styles: `
    mat-stepper {
      width: 100%;
    }
  `,
})
export class EtapesPage {
  protected readonly snippets = SNIPPETS;
}
