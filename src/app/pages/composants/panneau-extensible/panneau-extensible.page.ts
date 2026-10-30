import { Component } from '@angular/core';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelDescription, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelActionRow, MatExpansionPanelContent } from '@angular/material/expansion';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';
import { MatButton } from '@angular/material/button';

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
  avant: `<mat-expansion-panel togglePosition="before">
  <mat-expansion-panel-header>
    <mat-panel-title>Indicateur avant le titre</mat-panel-title>
  </mat-expansion-panel-header>
  <p>Contenu du panneau.</p>
</mat-expansion-panel>`,
  plat: `<mat-accordion displayMode="flat">
  <mat-expansion-panel>
    <mat-expansion-panel-header><mat-panel-title>Premier</mat-panel-title></mat-expansion-panel-header>
    <p>Contenu.</p>
  </mat-expansion-panel>
  <mat-expansion-panel>
    <mat-expansion-panel-header><mat-panel-title>Second</mat-panel-title></mat-expansion-panel-header>
    <p>Contenu.</p>
  </mat-expansion-panel>
</mat-accordion>`,
  actions: `<mat-expansion-panel expanded>
  <mat-expansion-panel-header>
    <mat-panel-title>Avec actions</mat-panel-title>
  </mat-expansion-panel-header>
  <p>Contenu du panneau.</p>
  <mat-action-row>
    <button matButton>Annuler</button>
    <button matButton="filled">Valider</button>
  </mat-action-row>
</mat-expansion-panel>`,
  hauteurs: `<mat-expansion-panel>
  <mat-expansion-panel-header collapsedHeight="64px" expandedHeight="80px">
    <mat-panel-title>En-tête plus haut</mat-panel-title>
  </mat-expansion-panel-header>
  <p>Contenu du panneau.</p>
</mat-expansion-panel>`,
  differe: `<mat-expansion-panel>
  <mat-expansion-panel-header>
    <mat-panel-title>Contenu différé</mat-panel-title>
  </mat-expansion-panel-header>
  <ng-template matExpansionPanelContent>
    <p>Rendu à la première ouverture.</p>
  </ng-template>
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
    MatButton,
    MatExpansionPanelActionRow,
    MatExpansionPanelContent,
  ],
  template: `
    <h1>Panneau extensible</h1>

    <app-specimen-section minWidth="420px" title="Panneaux">
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

    <app-specimen-section minWidth="420px" title="Accordéons">
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

    <app-specimen-section minWidth="420px" title="Autres variantes">
      <app-specimen label="Indicateur avant le titre" api='togglePosition="before"' [snippet]="snippets.avant">
        <mat-expansion-panel togglePosition="before">
          <mat-expansion-panel-header>
            <mat-panel-title>Indicateur avant le titre</mat-panel-title>
          </mat-expansion-panel-header>
          <p>Contenu du panneau.</p>
        </mat-expansion-panel>
      </app-specimen>
      <app-specimen label="Accordéon plat" api='displayMode="flat"' [snippet]="snippets.plat">
        <mat-accordion displayMode="flat">
          <mat-expansion-panel>
            <mat-expansion-panel-header><mat-panel-title>Premier</mat-panel-title></mat-expansion-panel-header>
            <p>Contenu.</p>
          </mat-expansion-panel>
          <mat-expansion-panel>
            <mat-expansion-panel-header><mat-panel-title>Second</mat-panel-title></mat-expansion-panel-header>
            <p>Contenu.</p>
          </mat-expansion-panel>
        </mat-accordion>
      </app-specimen>
      <app-specimen label="Barre d’actions" api="mat-action-row" [snippet]="snippets.actions">
        <mat-expansion-panel expanded>
          <mat-expansion-panel-header>
            <mat-panel-title>Avec actions</mat-panel-title>
          </mat-expansion-panel-header>
          <p>Contenu du panneau.</p>
          <mat-action-row>
            <button matButton>Annuler</button>
            <button matButton="filled">Valider</button>
          </mat-action-row>
        </mat-expansion-panel>
      </app-specimen>
      <app-specimen label="Hauteurs d’en-tête" api="collapsedHeight / expandedHeight" [snippet]="snippets.hauteurs">
        <mat-expansion-panel>
          <mat-expansion-panel-header collapsedHeight="64px" expandedHeight="80px">
            <mat-panel-title>En-tête plus haut</mat-panel-title>
          </mat-expansion-panel-header>
          <p>Contenu du panneau.</p>
        </mat-expansion-panel>
      </app-specimen>
      <app-specimen label="Contenu différé" api="matExpansionPanelContent" [snippet]="snippets.differe">
        <mat-expansion-panel>
          <mat-expansion-panel-header>
            <mat-panel-title>Contenu différé</mat-panel-title>
          </mat-expansion-panel-header>
          <ng-template matExpansionPanelContent>
            <p>Rendu à la première ouverture.</p>
          </ng-template>
        </mat-expansion-panel>
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
