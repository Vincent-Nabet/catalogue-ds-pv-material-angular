import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  simple: `<mat-toolbar>Titre de la page</mat-toolbar>`,
  actions: `<mat-toolbar>
  <button matIconButton aria-label="Menu"><mat-icon>menu</mat-icon></button>
  <span>Titre de la page</span>
  <span class="espace"></span>
  <button matIconButton aria-label="Rechercher"><mat-icon>search</mat-icon></button>
  <button matIconButton aria-label="Favori"><mat-icon>favorite</mat-icon></button>
</mat-toolbar>`,
  lignes: `<mat-toolbar>
  <mat-toolbar-row>Première ligne</mat-toolbar-row>
  <mat-toolbar-row>Seconde ligne</mat-toolbar-row>
</mat-toolbar>`,
  couleurs: `<mat-toolbar class="primaire">Primaire</mat-toolbar>
<mat-toolbar class="secondaire">Secondaire</mat-toolbar>
<mat-toolbar class="tertiaire">Tertiaire</mat-toolbar>

@use '@angular/material' as mat;

@mixin role($fond, $texte) {
  @include mat.toolbar-overrides((
    container-background-color: $fond,
    container-text-color: $texte,
  ));
}

.primaire {
  @include role(var(--mat-sys-primary), var(--mat-sys-on-primary));
}

.secondaire {
  @include role(var(--mat-sys-secondary-container), var(--mat-sys-on-secondary-container));
}

.tertiaire {
  @include role(var(--mat-sys-tertiary-container), var(--mat-sys-on-tertiary-container));
}`,
  haute: `<mat-toolbar class="haute">Titre de la page</mat-toolbar>

@use '@angular/material' as mat;

.haute {
  @include mat.toolbar-overrides((
    standard-height: 80px,
    mobile-height: 80px,
    title-text-size: var(--mat-sys-headline-small-size),
    title-text-line-height: var(--mat-sys-headline-small-line-height),
  ));
}`,
  relevee: `<mat-toolbar class="relevee">Titre de la page</mat-toolbar>

@use '@angular/material' as mat;

.relevee {
  @include mat.toolbar-overrides((
    container-background-color: var(--mat-sys-surface-container),
  ));
  box-shadow: var(--mat-sys-level2);
}`,
};

@Component({
  selector: 'app-barre-outils-page',
  imports: [MatToolbar, MatToolbarRow, MatIconButton, MatIcon, Specimen, SpecimenSection],
  template: `
    <h1>Barre d’outils</h1>

    <app-specimen-section minWidth="320px" title="Variantes">
      <app-specimen label="Simple" api="mat-toolbar" [snippet]="snippets.simple">
        <mat-toolbar>Titre de la page</mat-toolbar>
      </app-specimen>
      <app-specimen label="Avec actions" api="matIconButton" [snippet]="snippets.actions">
        <mat-toolbar>
          <button matIconButton aria-label="Menu"><mat-icon>menu</mat-icon></button>
          <span>Titre de la page</span>
          <span class="espace"></span>
          <button matIconButton aria-label="Rechercher"><mat-icon>search</mat-icon></button>
          <button matIconButton aria-label="Favori"><mat-icon>favorite</mat-icon></button>
        </mat-toolbar>
      </app-specimen>
      <app-specimen label="Plusieurs lignes" api="mat-toolbar-row" [snippet]="snippets.lignes">
        <mat-toolbar>
          <mat-toolbar-row>Première ligne</mat-toolbar-row>
          <mat-toolbar-row>Seconde ligne</mat-toolbar-row>
        </mat-toolbar>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section
      minWidth="320px"
      title="Personnalisation (jetons)"
      description="L’entrée color de mat-toolbar est réservée aux thèmes M2 et reste sans effet ici : le mixin Sass mat.toolbar-overrides la remplace (couleurs, hauteur, titre). Les noms de jetons sont validés à la compilation ; les couleurs viennent des jetons système --mat-sys-*, fond et texte ensemble."
    >
      <app-specimen label="Rôles de couleur" api="mat.toolbar-overrides : container-background-color" [snippet]="snippets.couleurs">
        <mat-toolbar class="primaire">Primaire</mat-toolbar>
        <mat-toolbar class="secondaire">Secondaire</mat-toolbar>
        <mat-toolbar class="tertiaire">Tertiaire</mat-toolbar>
      </app-specimen>
      <app-specimen label="Haute, titre plus grand" api="mat.toolbar-overrides : standard-height, title-text-size" [snippet]="snippets.haute">
        <mat-toolbar class="haute">Titre de la page</mat-toolbar>
      </app-specimen>
      <app-specimen label="Surface relevée" api="mat.toolbar-overrides : container-background-color" [snippet]="snippets.relevee">
        <mat-toolbar class="relevee">Titre de la page</mat-toolbar>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    @use '@angular/material' as mat;
    @use 'roles';

    mat-toolbar {
      width: 100%;
    }

    .primaire {
      @include roles.toolbar(var(--mat-sys-primary), var(--mat-sys-on-primary));
    }

    .secondaire {
      @include roles.toolbar(var(--mat-sys-secondary-container), var(--mat-sys-on-secondary-container));
    }

    .tertiaire {
      @include roles.toolbar(var(--mat-sys-tertiary-container), var(--mat-sys-on-tertiary-container));
    }

    .haute {
      @include mat.toolbar-overrides(
        (
          standard-height: 80px,
          mobile-height: 80px,
          title-text-size: var(--mat-sys-headline-small-size),
          title-text-line-height: var(--mat-sys-headline-small-line-height),
        )
      );
    }

    .relevee {
      @include mat.toolbar-overrides(
        (
          container-background-color: var(--mat-sys-surface-container),
        )
      );
      box-shadow: var(--mat-sys-level2);
    }

    .espace {
      flex: 1;
    }
  `,
})
export class BarreOutilsPage {
  protected readonly snippets = SNIPPETS;
}
