import { Component } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  debut: `<mat-sidenav-container style="height: 200px">
  <mat-sidenav mode="side" opened>Menu</mat-sidenav>
  <mat-sidenav-content>Contenu principal</mat-sidenav-content>
</mat-sidenav-container>`,
  fin: `<mat-sidenav-container style="height: 200px">
  <mat-sidenav mode="side" position="end" opened>Menu</mat-sidenav>
  <mat-sidenav-content>Contenu principal</mat-sidenav-content>
</mat-sidenav-container>`,
  ferme: `<mat-sidenav-container style="height: 200px">
  <mat-sidenav mode="side">Menu</mat-sidenav>
  <mat-sidenav-content>Menu fermé</mat-sidenav-content>
</mat-sidenav-container>`,
};

@Component({
  selector: 'app-menu-lateral-page',
  imports: [MatSidenavContainer, MatSidenav, MatSidenavContent, Specimen, SpecimenSection],
  template: `
    <h1>Menu latéral</h1>

    <app-specimen-section
      title="Positions"
      description="Aperçus en mode « side » : les modes « over » et « push » recouvrent ou poussent le contenu."
    >
      <app-specimen label="Au début" api='mode="side"' [snippet]="snippets.debut">
        <mat-sidenav-container class="conteneur">
          <mat-sidenav mode="side" opened>Menu</mat-sidenav>
          <mat-sidenav-content class="contenu">Contenu principal</mat-sidenav-content>
        </mat-sidenav-container>
      </app-specimen>
      <app-specimen label="À la fin" api='position="end"' [snippet]="snippets.fin">
        <mat-sidenav-container class="conteneur">
          <mat-sidenav mode="side" position="end" opened>Menu</mat-sidenav>
          <mat-sidenav-content class="contenu">Contenu principal</mat-sidenav-content>
        </mat-sidenav-container>
      </app-specimen>
      <app-specimen label="Fermé" api="opened" [snippet]="snippets.ferme">
        <mat-sidenav-container class="conteneur">
          <mat-sidenav mode="side">Menu</mat-sidenav>
          <mat-sidenav-content class="contenu">Menu fermé</mat-sidenav-content>
        </mat-sidenav-container>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    .conteneur {
      width: 100%;
      height: 200px;
    }

    mat-sidenav {
      width: 100px;
      padding: 16px;
    }

    .contenu {
      padding: 16px;
    }
  `,
})
export class MenuLateralPage {
  protected readonly snippets = SNIPPETS;
}
