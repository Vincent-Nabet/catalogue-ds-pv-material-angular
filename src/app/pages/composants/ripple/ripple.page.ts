import { Component } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  defaut: `<div matRipple class="zone">Cliquer ici</div>`,
  centre: `<div matRipple [matRippleCentered]="true" class="zone">Cliquer ici</div>`,
  nonBorne: `<div matRipple [matRippleUnbounded]="true" class="zone">Cliquer ici</div>`,
  couleur: `<div matRipple matRippleColor="rgba(255, 0, 0, 0.25)" class="zone">Cliquer ici</div>`,
  desactive: `<div matRipple [matRippleDisabled]="true" class="zone">Cliquer ici</div>`,
};

@Component({
  selector: 'app-ripple-page',
  imports: [MatRipple, Specimen, SpecimenSection],
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
        <div matRipple matRippleColor="rgba(255, 0, 0, 0.25)" class="zone" tabindex="0" role="button">Cliquer ici</div>
      </app-specimen>
      <app-specimen label="Désactivé" api="matRippleDisabled" [snippet]="snippets.desactive">
        <div matRipple [matRippleDisabled]="true" class="zone" tabindex="0" role="button" aria-disabled="true">Cliquer ici</div>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
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
