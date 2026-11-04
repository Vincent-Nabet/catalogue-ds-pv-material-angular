import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';
import { ComposantRef } from '../../../shared/composant-ref/composant-ref';

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
  over: `<mat-sidenav-container style="height: 200px" [hasBackdrop]="false">
  <mat-sidenav #menu mode="over">Menu</mat-sidenav>
  <mat-sidenav-content>
    <button matButton (click)="menu.toggle()">Basculer le menu</button>
    Le menu recouvre le contenu
  </mat-sidenav-content>
</mat-sidenav-container>`,
  push: `<mat-sidenav-container style="height: 200px" [hasBackdrop]="false">
  <mat-sidenav #menu mode="push">Menu</mat-sidenav>
  <mat-sidenav-content>
    <button matButton (click)="menu.toggle()">Basculer le menu</button>
    Le menu pousse le contenu
  </mat-sidenav-content>
</mat-sidenav-container>`,
  fond: `<mat-sidenav-container style="height: 200px">
  <mat-sidenav #menu mode="over">Menu</mat-sidenav>
  <mat-sidenav-content>
    <button matButton (click)="menu.toggle()">Basculer le menu</button>
    Contenu assombri par le fond
  </mat-sidenav-content>
</mat-sidenav-container>`,
  couleurs: `<mat-sidenav-container class="menu-teinte" style="height: 200px">
  <mat-sidenav mode="side" opened>Menu</mat-sidenav>
  <mat-sidenav-content>Contenu principal</mat-sidenav-content>
</mat-sidenav-container>

@use '@angular/material' as mat;

.menu-teinte {
  @include mat.sidenav-overrides((
    container-background-color: var(--mat-sys-secondary-container),
    container-text-color: var(--mat-sys-on-secondary-container),
  ));
}`,
  separateur: `<mat-sidenav-container class="menu-separe" style="height: 200px">
  <mat-sidenav mode="side" opened>Menu</mat-sidenav>
  <mat-sidenav-content>Contenu principal</mat-sidenav-content>
</mat-sidenav-container>

@use '@angular/material' as mat;

.menu-separe {
  @include mat.sidenav-overrides((
    container-divider-color: var(--mat-sys-outline-variant),
    container-shape: var(--mat-sys-corner-none),
  ));
}`,
  ombre: `<mat-sidenav-container class="menu-releve" style="height: 200px">
  <mat-sidenav #menu mode="over">Menu</mat-sidenav>
  <mat-sidenav-content>
    <button matButton (click)="menu.toggle()">Basculer le menu</button>
    Ombre portée et fond teinté
  </mat-sidenav-content>
</mat-sidenav-container>

@use '@angular/material' as mat;

.menu-releve {
  @include mat.sidenav-overrides((
    container-elevation-shadow: var(--mat-sys-level3),
    scrim-color: color-mix(in srgb, var(--mat-sys-primary) 32%, transparent),
  ));
}`,
};

@Component({
  selector: 'app-menu-lateral-page',
  imports: [ComposantRef, MatButton, MatSidenavContainer, MatSidenav, MatSidenavContent, Specimen, SpecimenSection],
  template: `
    <h1>Menu latéral</h1>
    <app-composant-ref />

    <app-specimen-section minWidth="400px"
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

    <app-specimen-section minWidth="400px" title="Modes" description="Les modes « over » et « push » s’utilisent surtout sur petit écran : utiliser le bouton pour ouvrir le menu.">
      <app-specimen label="Recouvrant" api='mode="over"' [snippet]="snippets.over">
        <mat-sidenav-container class="conteneur" [hasBackdrop]="false">
          <mat-sidenav #recouvrant mode="over">Menu</mat-sidenav>
          <mat-sidenav-content class="contenu">
            <button matButton="outlined" (click)="recouvrant.toggle()">Basculer le menu</button>
            <p>Le menu recouvre le contenu</p>
          </mat-sidenav-content>
        </mat-sidenav-container>
      </app-specimen>
      <app-specimen label="Poussant" api='mode="push"' [snippet]="snippets.push">
        <mat-sidenav-container class="conteneur" [hasBackdrop]="false">
          <mat-sidenav #poussant mode="push">Menu</mat-sidenav>
          <mat-sidenav-content class="contenu">
            <button matButton="outlined" (click)="poussant.toggle()">Basculer le menu</button>
            <p>Le menu pousse le contenu</p>
          </mat-sidenav-content>
        </mat-sidenav-container>
      </app-specimen>
      <app-specimen label="Avec fond assombri" api="hasBackdrop" [snippet]="snippets.fond">
        <mat-sidenav-container class="conteneur">
          <mat-sidenav #avecFond mode="over">Menu</mat-sidenav>
          <mat-sidenav-content class="contenu">
            <button matButton="outlined" (click)="avecFond.toggle()">Basculer le menu</button>
            <p>Contenu assombri par le fond</p>
          </mat-sidenav-content>
        </mat-sidenav-container>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section
      minWidth="400px"
      title="Personnalisation (jetons)"
      description="Le mixin Sass mat.sidenav-overrides règle couleurs, séparateur, forme, ombre et fond du menu ; les noms de jetons sont validés à la compilation. Les couleurs viennent des jetons système --mat-sys-*, fond et texte ensemble pour garder le contraste."
    >
      <app-specimen label="Menu teinté" api="mat.sidenav-overrides : container-background-color" [snippet]="snippets.couleurs">
        <mat-sidenav-container class="conteneur menu-teinte">
          <mat-sidenav mode="side" opened>Menu</mat-sidenav>
          <mat-sidenav-content class="contenu">Contenu principal</mat-sidenav-content>
        </mat-sidenav-container>
      </app-specimen>
      <app-specimen label="Séparateur et angles droits" api="mat.sidenav-overrides : container-divider-color" [snippet]="snippets.separateur">
        <mat-sidenav-container class="conteneur menu-separe">
          <mat-sidenav mode="side" opened>Menu</mat-sidenav>
          <mat-sidenav-content class="contenu">Contenu principal</mat-sidenav-content>
        </mat-sidenav-container>
      </app-specimen>
      <app-specimen label="Ombre et fond teinté" api="mat.sidenav-overrides : container-elevation-shadow, scrim-color" [snippet]="snippets.ombre">
        <mat-sidenav-container class="conteneur menu-releve">
          <mat-sidenav #releve mode="over">Menu</mat-sidenav>
          <mat-sidenav-content class="contenu">
            <button matButton="outlined" (click)="releve.toggle()">Basculer le menu</button>
            <p>Ombre portée et fond teinté</p>
          </mat-sidenav-content>
        </mat-sidenav-container>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    @use '@angular/material' as mat;

    .conteneur {
      width: 100%;
      height: 200px;

      @include mat.sidenav-overrides(
        (
          container-width: 100px,
        )
      );
    }

    .menu-teinte {
      @include mat.sidenav-overrides(
        (
          container-background-color: var(--mat-sys-secondary-container),
          container-text-color: var(--mat-sys-on-secondary-container),
        )
      );
    }

    .menu-separe {
      @include mat.sidenav-overrides(
        (
          container-divider-color: var(--mat-sys-outline-variant),
          container-shape: var(--mat-sys-corner-none),
        )
      );
    }

    .menu-releve {
      @include mat.sidenav-overrides(
        (
          container-elevation-shadow: var(--mat-sys-level3),
          scrim-color: color-mix(in srgb, var(--mat-sys-primary) 32%, transparent),
        )
      );
    }

    mat-sidenav {
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
