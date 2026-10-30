import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  MatTab,
  MatTabGroup,
  MatTabLabel,
  MatTabLink,
  MatTabNav,
  MatTabNavPanel,
} from '@angular/material/tabs';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  simple: `<mat-tab-group>
  <mat-tab label="Général">Contenu général</mat-tab>
  <mat-tab label="Détails">Contenu des détails</mat-tab>
  <mat-tab label="Historique">Contenu de l’historique</mat-tab>
</mat-tab-group>`,
  icones: `<mat-tab-group>
  <mat-tab>
    <ng-template mat-tab-label>
      <mat-icon>home</mat-icon>
      Accueil
    </ng-template>
    Contenu de l’accueil
  </mat-tab>
  <mat-tab>
    <ng-template mat-tab-label>
      <mat-icon>settings</mat-icon>
      Réglages
    </ng-template>
    Contenu des réglages
  </mat-tab>
</mat-tab-group>`,
  desactive: `<mat-tab-group>
  <mat-tab label="Actif">Contenu</mat-tab>
  <mat-tab label="Désactivé" disabled>Contenu</mat-tab>
</mat-tab-group>`,
  etire: `<mat-tab-group mat-stretch-tabs="true">
  <mat-tab label="Général">Contenu général</mat-tab>
  <mat-tab label="Détails">Contenu des détails</mat-tab>
</mat-tab-group>`,
  navigation: `<nav mat-tab-nav-bar [tabPanel]="panneau">
  <a mat-tab-link href="#" active>Général</a>
  <a mat-tab-link href="#">Détails</a>
</nav>
<mat-tab-nav-panel #panneau>Contenu de l’onglet actif</mat-tab-nav-panel>`,
};

@Component({
  selector: 'app-onglets-page',
  imports: [
    MatIcon,
    MatTab,
    MatTabGroup,
    MatTabLabel,
    MatTabLink,
    MatTabNav,
    MatTabNavPanel,
    Specimen,
    SpecimenSection,
  ],
  template: `
    <h1>Onglets</h1>

    <app-specimen-section minWidth="340px" title="Groupes d’onglets">
      <app-specimen label="Simple" api="mat-tab-group" [snippet]="snippets.simple">
        <mat-tab-group class="onglets">
          <mat-tab label="Général"><p>Contenu général</p></mat-tab>
          <mat-tab label="Détails"><p>Contenu des détails</p></mat-tab>
          <mat-tab label="Historique"><p>Contenu de l’historique</p></mat-tab>
        </mat-tab-group>
      </app-specimen>
      <app-specimen label="Avec icônes" api="mat-tab-label" [snippet]="snippets.icones">
        <mat-tab-group class="onglets">
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon>home</mat-icon>
              Accueil
            </ng-template>
            <p>Contenu de l’accueil</p>
          </mat-tab>
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon>settings</mat-icon>
              Réglages
            </ng-template>
            <p>Contenu des réglages</p>
          </mat-tab>
        </mat-tab-group>
      </app-specimen>
      <app-specimen label="Onglets étirés" api='mat-stretch-tabs="true"' [snippet]="snippets.etire">
        <mat-tab-group class="onglets" mat-stretch-tabs="true">
          <mat-tab label="Général"><p>Contenu général</p></mat-tab>
          <mat-tab label="Détails"><p>Contenu des détails</p></mat-tab>
        </mat-tab-group>
      </app-specimen>
      <app-specimen label="Onglet désactivé" api="disabled" [snippet]="snippets.desactive">
        <mat-tab-group class="onglets">
          <mat-tab label="Actif"><p>Contenu</p></mat-tab>
          <mat-tab label="Désactivé" disabled><p>Contenu</p></mat-tab>
        </mat-tab-group>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section minWidth="340px" title="Barre de navigation">
      <app-specimen label="Liens" api="mat-tab-nav-bar" [snippet]="snippets.navigation">
        <div class="onglets">
          <nav mat-tab-nav-bar [tabPanel]="panneau" aria-label="Sections">
            <a mat-tab-link active>Général</a>
            <a mat-tab-link>Détails</a>
          </nav>
          <mat-tab-nav-panel #panneau><p>Contenu de l’onglet actif</p></mat-tab-nav-panel>
        </div>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    .onglets {
      width: 100%;
    }
  `,
})
export class OngletsPage {
  protected readonly snippets = SNIPPETS;
}
