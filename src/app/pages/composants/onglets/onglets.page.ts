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
  centres: `<mat-tab-group mat-align-tabs="center" [mat-stretch-tabs]="false">
  <mat-tab label="Général">…</mat-tab>
  <mat-tab label="Détails">…</mat-tab>
</mat-tab-group>`,
  nonEtires: `<mat-tab-group [mat-stretch-tabs]="false">
  <mat-tab label="Général">…</mat-tab>
  <mat-tab label="Détails">…</mat-tab>
</mat-tab-group>`,
  fin: `<mat-tab-group mat-align-tabs="end" [mat-stretch-tabs]="false">
  <mat-tab label="Général">…</mat-tab>
  <mat-tab label="Détails">…</mat-tab>
</mat-tab-group>`,
  bas: `<mat-tab-group headerPosition="below">
  <mat-tab label="Général">…</mat-tab>
  <mat-tab label="Détails">…</mat-tab>
</mat-tab-group>`,
  barreAjustee: `<mat-tab-group [fitInkBarToContent]="true" [mat-stretch-tabs]="false">
  <mat-tab label="Général">…</mat-tab>
  <mat-tab label="Détails du dossier">…</mat-tab>
</mat-tab-group>`,
  initial: `<mat-tab-group [selectedIndex]="1">
  <mat-tab label="Général">…</mat-tab>
  <mat-tab label="Détails">…</mat-tab>
</mat-tab-group>`,
  hauteur: `<mat-tab-group dynamicHeight>
  <mat-tab label="Court">Peu de contenu</mat-tab>
  <mat-tab label="Long">Beaucoup de contenu…</mat-tab>
</mat-tab-group>`,
  defilement: `<mat-tab-group>
  @for (onglet of onglets; track onglet) {
    <mat-tab [label]="onglet">…</mat-tab>
  }
</mat-tab-group>`,
  sansPagination: `<mat-tab-group [disablePagination]="true">
  @for (onglet of onglets; track onglet) {
    <mat-tab [label]="onglet">…</mat-tab>
  }
</mat-tab-group>`,
  sansAnimation: `<mat-tab-group animationDuration="0ms">
  <mat-tab label="Général">…</mat-tab>
  <mat-tab label="Détails">…</mat-tab>
</mat-tab-group>`,
  navAjustee: `<nav mat-tab-nav-bar [tabPanel]="panneau" [fitInkBarToContent]="true">
  <a mat-tab-link active>Général</a>
  <a mat-tab-link>Détails du dossier</a>
</nav>`,
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
      <app-specimen label="Onglets étirés (défaut)" api='mat-stretch-tabs="true"' [snippet]="snippets.etire">
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

    <app-specimen-section minWidth="340px" title="Alignement et position">
      <app-specimen label="Centrés" api='mat-align-tabs="center"' [snippet]="snippets.centres">
        <mat-tab-group class="onglets" mat-align-tabs="center" [mat-stretch-tabs]="false">
          <mat-tab label="Général"><p>Contenu général</p></mat-tab>
          <mat-tab label="Détails"><p>Contenu des détails</p></mat-tab>
        </mat-tab-group>
      </app-specimen>
      <app-specimen label="Non étirés" api='[mat-stretch-tabs]="false"' [snippet]="snippets.nonEtires">
        <mat-tab-group class="onglets" [mat-stretch-tabs]="false">
          <mat-tab label="Général"><p>Contenu général</p></mat-tab>
          <mat-tab label="Détails"><p>Contenu des détails</p></mat-tab>
        </mat-tab-group>
      </app-specimen>
      <app-specimen label="À la fin" api='mat-align-tabs="end"' [snippet]="snippets.fin">
        <mat-tab-group class="onglets" mat-align-tabs="end" [mat-stretch-tabs]="false">
          <mat-tab label="Général"><p>Contenu général</p></mat-tab>
          <mat-tab label="Détails"><p>Contenu des détails</p></mat-tab>
        </mat-tab-group>
      </app-specimen>
      <app-specimen label="En-tête en bas" api='headerPosition="below"' [snippet]="snippets.bas">
        <mat-tab-group class="onglets" headerPosition="below">
          <mat-tab label="Général"><p>Contenu général</p></mat-tab>
          <mat-tab label="Détails"><p>Contenu des détails</p></mat-tab>
        </mat-tab-group>
      </app-specimen>
      <app-specimen label="Barre ajustée au texte" api="fitInkBarToContent" [snippet]="snippets.barreAjustee">
        <mat-tab-group class="onglets" [fitInkBarToContent]="true" [mat-stretch-tabs]="false">
          <mat-tab label="Général"><p>Contenu général</p></mat-tab>
          <mat-tab label="Détails du dossier"><p>Contenu des détails</p></mat-tab>
        </mat-tab-group>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section minWidth="340px" title="Comportements">
      <app-specimen label="Onglet initial" api="selectedIndex" [snippet]="snippets.initial">
        <mat-tab-group class="onglets" [selectedIndex]="1">
          <mat-tab label="Général"><p>Contenu général</p></mat-tab>
          <mat-tab label="Détails"><p>Onglet sélectionné au chargement</p></mat-tab>
        </mat-tab-group>
      </app-specimen>
      <app-specimen label="Hauteur dynamique" api="dynamicHeight" [snippet]="snippets.hauteur">
        <mat-tab-group class="onglets" dynamicHeight>
          <mat-tab label="Court"><p>Peu de contenu</p></mat-tab>
          <mat-tab label="Long">
            <p>Beaucoup de contenu.</p>
            <p>La hauteur s’adapte à l’onglet actif.</p>
            <p>Troisième ligne.</p>
          </mat-tab>
        </mat-tab-group>
      </app-specimen>
      <app-specimen label="Sans animation" api='animationDuration="0ms"' [snippet]="snippets.sansAnimation">
        <mat-tab-group class="onglets" animationDuration="0ms">
          <mat-tab label="Général"><p>Contenu général</p></mat-tab>
          <mat-tab label="Détails"><p>Contenu des détails</p></mat-tab>
        </mat-tab-group>
      </app-specimen>
      <app-specimen label="Nombreux onglets (défilement)" api="pagination automatique" [snippet]="snippets.defilement">
        <mat-tab-group class="onglets">
          @for (onglet of onglets; track onglet) {
            <mat-tab [label]="onglet"><p>Contenu de {{ onglet }}</p></mat-tab>
          }
        </mat-tab-group>
      </app-specimen>
      <app-specimen label="Sans flèches de défilement" api="disablePagination" [snippet]="snippets.sansPagination">
        <mat-tab-group class="onglets" [disablePagination]="true">
          @for (onglet of onglets; track onglet) {
            <mat-tab [label]="onglet"><p>Contenu de {{ onglet }}</p></mat-tab>
          }
        </mat-tab-group>
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
  protected readonly onglets = Array.from({ length: 12 }, (_, index) => `Onglet ${index + 1}`);
}
