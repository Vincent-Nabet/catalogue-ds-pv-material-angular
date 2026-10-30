import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  defaut: `<mat-icon>home</mat-icon>`,
  tailles: `<mat-icon style="font-size: 18px; width: 18px; height: 18px">star</mat-icon>
<mat-icon>star</mat-icon>
<mat-icon style="font-size: 36px; width: 36px; height: 36px">star</mat-icon>
<mat-icon style="font-size: 48px; width: 48px; height: 48px">star</mat-icon>`,
  couleurs: `<mat-icon style="color: var(--mat-sys-primary)">favorite</mat-icon>
<mat-icon style="color: var(--mat-sys-tertiary)">favorite</mat-icon>
<mat-icon style="color: var(--mat-sys-error)">favorite</mat-icon>`,
  remplie: `<mat-icon style="font-variation-settings: 'FILL' 1">favorite</mat-icon>`,
  decorative: `<mat-icon aria-hidden="true">settings</mat-icon>`,
  semantique: `<mat-icon aria-hidden="false" aria-label="Paramètres">settings</mat-icon>`,
  inline: `<p>Texte avec une icône <mat-icon [inline]="true">info</mat-icon> alignée sur la ligne.</p>`,
  graisse: `<mat-icon style="font-variation-settings: 'wght' 100">settings</mat-icon>
<mat-icon style="font-variation-settings: 'wght' 400">settings</mat-icon>
<mat-icon style="font-variation-settings: 'wght' 700">settings</mat-icon>`,
  taillesOptiques: `<mat-icon style="font-variation-settings: 'opsz' 20">settings</mat-icon>
<mat-icon style="font-variation-settings: 'opsz' 48">settings</mat-icon>`,
};

@Component({
  selector: 'app-icone-page',
  imports: [MatIcon, Specimen, SpecimenSection],
  template: `
    <h1>Icône</h1>

    <app-specimen-section title="Icônes" description="Police Material Symbols (contour) déclarée comme jeu d’icônes par défaut.">
      <app-specimen label="Par défaut" api="mat-icon" [snippet]="snippets.defaut">
        <mat-icon>home</mat-icon>
      </app-specimen>
      <app-specimen label="Tailles" api="font-size" [snippet]="snippets.tailles">
        <mat-icon class="t18">star</mat-icon>
        <mat-icon>star</mat-icon>
        <mat-icon class="t36">star</mat-icon>
        <mat-icon class="t48">star</mat-icon>
      </app-specimen>
      <app-specimen label="Couleurs" api="color" [snippet]="snippets.couleurs">
        <mat-icon class="primaire">favorite</mat-icon>
        <mat-icon class="tertiaire">favorite</mat-icon>
        <mat-icon class="erreur">favorite</mat-icon>
      </app-specimen>
      <app-specimen label="Remplie" api="FILL 1" [snippet]="snippets.remplie">
        <mat-icon class="remplie">favorite</mat-icon>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Accessibilité">
      <app-specimen label="Décorative" api='aria-hidden="true"' [snippet]="snippets.decorative">
        <mat-icon aria-hidden="true">settings</mat-icon>
      </app-specimen>
      <app-specimen label="Porteuse de sens" api="aria-label" [snippet]="snippets.semantique">
        <mat-icon aria-hidden="false" aria-label="Paramètres">settings</mat-icon>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Axes de la police Material Symbols">
      <app-specimen label="Dans le texte" api="inline" [snippet]="snippets.inline">
        <p class="texte">Texte avec une icône <mat-icon [inline]="true">info</mat-icon> alignée sur la ligne.</p>
      </app-specimen>
      <app-specimen label="Graisse" api="wght 100 / 400 / 700" [snippet]="snippets.graisse">
        <mat-icon class="g100">settings</mat-icon>
        <mat-icon class="g400">settings</mat-icon>
        <mat-icon class="g700">settings</mat-icon>
      </app-specimen>
      <app-specimen label="Taille optique" api="opsz 20 / 48" [snippet]="snippets.taillesOptiques">
        <mat-icon class="opsz20">settings</mat-icon>
        <mat-icon class="opsz48">settings</mat-icon>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    .t18 {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .t36 {
      font-size: 36px;
      width: 36px;
      height: 36px;
    }

    .t48 {
      font-size: 48px;
      width: 48px;
      height: 48px;
    }

    .primaire {
      color: var(--mat-sys-primary);
    }

    .tertiaire {
      color: var(--mat-sys-tertiary);
    }

    .erreur {
      color: var(--mat-sys-error);
    }

    .remplie {
      font-variation-settings: 'FILL' 1;
    }
    .texte {
      margin: 0;
    }

    .g100 {
      font-variation-settings: 'wght' 100;
    }

    .g400 {
      font-variation-settings: 'wght' 400;
    }

    .g700 {
      font-variation-settings: 'wght' 700;
    }

    .opsz20 {
      font-variation-settings: 'opsz' 20;
    }

    .opsz48 {
      font-variation-settings: 'opsz' 48;
    }
  `,
})
export class IconePage {
  protected readonly snippets = SNIPPETS;
}
