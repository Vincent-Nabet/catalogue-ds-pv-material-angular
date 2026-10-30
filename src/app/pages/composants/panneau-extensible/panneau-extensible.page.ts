import { Component } from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  simple: `<mat-expansion-panel>
  <mat-expansion-panel-header>
    <mat-panel-title>Informations</mat-panel-title>
    <mat-panel-description>Détails du compte</mat-panel-description>
  </mat-expansion-panel-header>
  <p>Contenu du panneau.</p>
</mat-expansion-panel>`,
  ouvert: `<mat-expansion-panel expanded>
  <mat-expansion-panel-header>
    <mat-panel-title>Informations</mat-panel-title>
  </mat-expansion-panel-header>
  <p>Contenu du panneau.</p>
</mat-expansion-panel>`,
  accordeon: `<mat-accordion>
  <mat-expansion-panel>
    <mat-expansion-panel-header>
      <mat-panel-title>Premier</mat-panel-title>
    </mat-expansion-panel-header>
    <p>Contenu du premier panneau.</p>
  </mat-expansion-panel>
  <mat-expansion-panel>
    <mat-expansion-panel-header>
      <mat-panel-title>Second</mat-panel-title>
    </mat-expansion-panel-header>
    <p>Contenu du second panneau.</p>
  </mat-expansion-panel>
</mat-accordion>`,
  multiple: `<mat-accordion multi>
  <mat-expansion-panel expanded>…</mat-expansion-panel>
  <mat-expansion-panel expanded>…</mat-expansion-panel>
</mat-accordion>`,
  sansIndicateur: `<mat-expansion-panel hideToggle>
  <mat-expansion-panel-header>
    <mat-panel-title>Sans indicateur</mat-panel-title>
  </mat-expansion-panel-header>
  <p>Contenu du panneau.</p>
</mat-expansion-panel>`,
  desactive: `<mat-expansion-panel disabled>
  <mat-expansion-panel-header>
    <mat-panel-title>Désactivé</mat-panel-title>
  </mat-expansion-panel-header>
</mat-expansion-panel>`,
};

@Component({
  selector: 'app-panneau-extensible-page',
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    Specimen,
    SpecimenSection,
  ],
  template: `
    <h1>Panneau extensible</h1>

    <app-specimen-section title="Panneaux">
      <app-specimen label="Simple" api="mat-expansion-panel" [snippet]="snippets.simple">
        <mat-expansion-panel>
          <mat-expansion-panel-header>
            <mat-panel-title>Informations</mat-panel-title>
            <mat-panel-description>Détails du compte</mat-panel-description>
          </mat-expansion-panel-header>
          <p>Contenu du panneau.</p>
        </mat-expansion-panel>
      </app-specimen>
      <app-specimen label="Ouvert" api="expanded" [snippet]="snippets.ouvert">
        <mat-expansion-panel expanded>
          <mat-expansion-panel-header>
            <mat-panel-title>Informations</mat-panel-title>
          </mat-expansion-panel-header>
          <p>Contenu du panneau.</p>
        </mat-expansion-panel>
      </app-specimen>
      <app-specimen label="Sans indicateur" api="hideToggle" [snippet]="snippets.sansIndicateur">
        <mat-expansion-panel hideToggle>
          <mat-expansion-panel-header>
            <mat-panel-title>Sans indicateur</mat-panel-title>
          </mat-expansion-panel-header>
          <p>Contenu du panneau.</p>
        </mat-expansion-panel>
      </app-specimen>
      <app-specimen label="Désactivé" api="disabled" [snippet]="snippets.desactive">
        <mat-expansion-panel disabled>
          <mat-expansion-panel-header>
            <mat-panel-title>Désactivé</mat-panel-title>
          </mat-expansion-panel-header>
        </mat-expansion-panel>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Accordéons">
      <app-specimen label="Un panneau à la fois" api="mat-accordion" [snippet]="snippets.accordeon">
        <mat-accordion>
          <mat-expansion-panel>
            <mat-expansion-panel-header>
              <mat-panel-title>Premier</mat-panel-title>
            </mat-expansion-panel-header>
            <p>Contenu du premier panneau.</p>
          </mat-expansion-panel>
          <mat-expansion-panel>
            <mat-expansion-panel-header>
              <mat-panel-title>Second</mat-panel-title>
            </mat-expansion-panel-header>
            <p>Contenu du second panneau.</p>
          </mat-expansion-panel>
        </mat-accordion>
      </app-specimen>
      <app-specimen label="Plusieurs panneaux ouverts" api="multi" [snippet]="snippets.multiple">
        <mat-accordion multi>
          <mat-expansion-panel expanded>
            <mat-expansion-panel-header>
              <mat-panel-title>Premier</mat-panel-title>
            </mat-expansion-panel-header>
            <p>Contenu du premier panneau.</p>
          </mat-expansion-panel>
          <mat-expansion-panel expanded>
            <mat-expansion-panel-header>
              <mat-panel-title>Second</mat-panel-title>
            </mat-expansion-panel-header>
            <p>Contenu du second panneau.</p>
          </mat-expansion-panel>
        </mat-accordion>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    mat-expansion-panel,
    mat-accordion {
      width: 100%;
    }
  `,
})
export class PanneauExtensiblePage {
  protected readonly snippets = SNIPPETS;
}
