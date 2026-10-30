import { Component } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  simple: `<button matButton="outlined" matTooltip="Enregistrer le document">Enregistrer</button>`,
  positions: `<button matButton="outlined" matTooltip="Au-dessus" matTooltipPosition="above">Haut</button>
<button matButton="outlined" matTooltip="En dessous" matTooltipPosition="below">Bas</button>
<button matButton="outlined" matTooltip="À gauche" matTooltipPosition="left">Gauche</button>
<button matButton="outlined" matTooltip="À droite" matTooltipPosition="right">Droite</button>`,
  delai: `<button matButton="outlined" matTooltip="Apparaît après 1 s" [matTooltipShowDelay]="1000">Délai</button>`,
  icone: `<button matIconButton matTooltip="Supprimer" aria-label="Supprimer">
  <mat-icon>delete</mat-icon>
</button>`,
  long: `<button matButton="outlined"
  matTooltip="Une infobulle plus longue, qui s’affiche sur plusieurs lignes lorsque le texte dépasse la largeur disponible."
>Texte long</button>`,
  desactive: `<button matButton="outlined" matTooltip="Jamais affichée" [matTooltipDisabled]="true">Désactivée</button>`,
};

@Component({
  selector: 'app-infobulle-page',
  imports: [MatButton, MatIconButton, MatIcon, MatTooltip, Specimen, SpecimenSection],
  template: `
    <h1>Infobulle</h1>

    <app-specimen-section title="Déclenchement" description="Survoler ou donner le focus clavier à l’élément pour afficher l’infobulle.">
      <app-specimen label="Simple" api="matTooltip" [snippet]="snippets.simple">
        <button matButton="outlined" matTooltip="Enregistrer le document">Enregistrer</button>
      </app-specimen>
      <app-specimen label="Sur une icône" api="matTooltip" [snippet]="snippets.icone">
        <button matIconButton matTooltip="Supprimer" aria-label="Supprimer">
          <mat-icon>delete</mat-icon>
        </button>
      </app-specimen>
      <app-specimen label="Avec délai" api="matTooltipShowDelay" [snippet]="snippets.delai">
        <button matButton="outlined" matTooltip="Apparaît après 1 s" [matTooltipShowDelay]="1000">Délai</button>
      </app-specimen>
      <app-specimen label="Désactivée" api="matTooltipDisabled" [snippet]="snippets.desactive">
        <button matButton="outlined" matTooltip="Jamais affichée" [matTooltipDisabled]="true">Désactivée</button>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Présentation">
      <app-specimen label="Positions" api="matTooltipPosition" [snippet]="snippets.positions">
        <button matButton="outlined" matTooltip="Au-dessus" matTooltipPosition="above">Haut</button>
        <button matButton="outlined" matTooltip="En dessous" matTooltipPosition="below">Bas</button>
        <button matButton="outlined" matTooltip="À gauche" matTooltipPosition="left">Gauche</button>
        <button matButton="outlined" matTooltip="À droite" matTooltipPosition="right">Droite</button>
      </app-specimen>
      <app-specimen label="Texte long" api="matTooltip" [snippet]="snippets.long">
        <button
          matButton="outlined"
          matTooltip="Une infobulle plus longue, qui s’affiche sur plusieurs lignes lorsque le texte dépasse la largeur disponible."
        >
          Texte long
        </button>
      </app-specimen>
    </app-specimen-section>
  `,
})
export class InfobullePage {
  protected readonly snippets = SNIPPETS;
}
