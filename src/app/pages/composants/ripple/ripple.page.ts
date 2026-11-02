import { Component } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';
import { MatButton } from '@angular/material/button';

const SNIPPETS = {
  defaut: `<div matRipple class="zone">Cliquer ici</div>`,
  centre: `<div matRipple [matRippleCentered]="true" class="zone">Cliquer ici</div>`,
  nonBorne: `<div matRipple [matRippleUnbounded]="true" class="zone">Cliquer ici</div>`,
  couleur: `<div matRipple matRippleColor="color-mix(in srgb, var(--mat-sys-error) 25%, transparent)" class="zone">Cliquer ici</div>`,
  desactive: `<div matRipple [matRippleDisabled]="true" class="zone">Cliquer ici</div>`,
  rayon: `<div matRipple [matRippleRadius]="40" class="zone">Cliquer ici</div>`,
  animation: `<div matRipple [matRippleAnimation]="{ enterDuration: 1200, exitDuration: 600 }" class="zone">Cliquer ici</div>`,
  declencheur: `<span #declencheur><button matButton="outlined">Déclencheur</button></span>
<div matRipple [matRippleTrigger]="declencheur" class="zone">Zone animée par le bouton</div>`,
  couleurs: `<div matRipple class="zone vague-secondaire">Cliquer ici</div>
<div matRipple class="zone vague-tertiaire">Cliquer ici</div>
<div matRipple class="zone vague-erreur">Cliquer ici</div>

@use '@angular/material' as mat;

@mixin vague($couleur) {
  @include mat.ripple-overrides((
    color: color-mix(in srgb, $couleur 25%, transparent),
  ));
}

.vague-secondaire {
  @include vague(var(--mat-sys-secondary));
}

.vague-tertiaire {
  @include vague(var(--mat-sys-tertiary));
}

.vague-erreur {
  @include vague(var(--mat-sys-error));
}`,
};

@Component({
  selector: 'app-ripple-page',
  imports: [MatRipple, Specimen, SpecimenSection, MatButton],
  template: `
    <h1>Ripple</h1>

    <app-specimen-section title="Effet d’ondulation" description="Cliquer dans les zones pour déclencher l’effet.">
      <app-specimen label="Par défaut" api="matRipple" [snippet]="snippets.defaut">
        <div matRipple class="zone" tabindex="0" role="button">Cliquer ici</div>
      </app-specimen>
      <app-specimen label="Centré" api="matRippleCentered" [snippet]="snippets.centre">
        <div matRipple [matRippleCentered]="true" class="zone" tabindex="0" role="button">Cliquer ici</div>
      </app-specimen>
      <app-specimen label="Non borné" api="matRippleUnbounded" [snippet]="snippets.nonBorne">
        <div matRipple [matRippleUnbounded]="true" class="zone" tabindex="0" role="button">Cliquer ici</div>
      </app-specimen>
      <app-specimen label="Couleur" api="matRippleColor" [snippet]="snippets.couleur">
        <div matRipple matRippleColor="color-mix(in srgb, var(--mat-sys-error) 25%, transparent)" class="zone" tabindex="0" role="button">Cliquer ici</div>
      </app-specimen>
      <app-specimen label="Désactivé" api="matRippleDisabled" [snippet]="snippets.desactive">
        <div matRipple [matRippleDisabled]="true" class="zone" tabindex="0" role="button" aria-disabled="true">Cliquer ici</div>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Réglages avancés">
      <app-specimen label="Rayon fixe" api="matRippleRadius" [snippet]="snippets.rayon">
        <div matRipple [matRippleRadius]="40" class="zone" tabindex="0" role="button">Cliquer ici</div>
      </app-specimen>
      <app-specimen label="Animation lente" api="matRippleAnimation" [snippet]="snippets.animation">
        <div
          matRipple
          [matRippleAnimation]="{ enterDuration: 1200, exitDuration: 600 }"
          class="zone"
          tabindex="0"
          role="button"
        >
          Cliquer ici
        </div>
      </app-specimen>
      <app-specimen label="Déclencheur externe" api="matRippleTrigger" [snippet]="snippets.declencheur">
        <span #declencheur><button matButton="outlined">Déclencheur</button></span>
        <div matRipple [matRippleTrigger]="declencheur" class="zone">Zone animée par le bouton</div>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section
      title="Personnalisation (jetons)"
      description="Le mixin Sass mat.ripple-overrides règle la couleur de l’ondulation pour toute la zone et ses descendants, sans passer par l’entrée matRippleColor ; le nom du jeton est validé à la compilation."
    >
      <app-specimen label="Rôles de couleur" api="mat.ripple-overrides : color" [snippet]="snippets.couleurs">
        <div matRipple class="zone vague-secondaire" tabindex="0" role="button">Cliquer ici</div>
        <div matRipple class="zone vague-tertiaire" tabindex="0" role="button">Cliquer ici</div>
        <div matRipple class="zone vague-erreur" tabindex="0" role="button">Cliquer ici</div>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    @use 'roles';

    .vague-secondaire {
      @include roles.ripple(var(--mat-sys-secondary));
    }

    .vague-tertiaire {
      @include roles.ripple(var(--mat-sys-tertiary));
    }

    .vague-erreur {
      @include roles.ripple(var(--mat-sys-error));
    }

    .zone {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 160px;
      height: 80px;
      border: 1px dashed var(--mat-sys-outline);
      border-radius: var(--mat-sys-corner-small);
      cursor: pointer;
    }
  `,
})
export class RipplePage {
  protected readonly snippets = SNIPPETS;
}
