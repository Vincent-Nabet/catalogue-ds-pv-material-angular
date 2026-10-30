import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatBadge } from '@angular/material/badge';
import { MatIcon } from '@angular/material/icon';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  tailles: `<mat-icon matBadge="4" matBadgeSize="small" aria-hidden="false" aria-label="4 notifications">mail</mat-icon>
<mat-icon matBadge="4" matBadgeSize="medium" aria-hidden="false" aria-label="4 notifications">mail</mat-icon>
<mat-icon matBadge="4" matBadgeSize="large" aria-hidden="false" aria-label="4 notifications">mail</mat-icon>`,
  point: `<mat-icon matBadge matBadgeSize="small" aria-hidden="false" aria-label="Nouveau">notifications</mat-icon>`,
  positions: `<mat-icon matBadge="1" matBadgePosition="above after">mail</mat-icon>
<mat-icon matBadge="1" matBadgePosition="above before">mail</mat-icon>
<mat-icon matBadge="1" matBadgePosition="below after">mail</mat-icon>
<mat-icon matBadge="1" matBadgePosition="below before">mail</mat-icon>`,
  bouton: `<button matButton="tonal" matBadge="8" matBadgeOverlap="false">Messages</button>`,
  masque: `<mat-icon matBadge="3" matBadgeHidden="true">mail</mat-icon>`,
  desactive: `<mat-icon matBadge="3" matBadgeDisabled>mail</mat-icon>`,
  description: `<mat-icon matBadge="3" matBadgeDescription="3 messages non lus" aria-hidden="false" aria-label="Messages">mail</mat-icon>`,
  texte: `<mat-icon matBadge="99+" matBadgeSize="large" aria-hidden="false" aria-label="Notifications">notifications</mat-icon>`,
};

@Component({
  selector: 'app-badge-page',
  imports: [MatBadge, MatButton, MatIcon, Specimen, SpecimenSection],
  template: `
    <h1>Badge</h1>

    <app-specimen-section title="Tailles et formes">
      <app-specimen label="Tailles" api="matBadgeSize" [snippet]="snippets.tailles">
        <mat-icon matBadge="4" matBadgeSize="small" aria-hidden="false" aria-label="4 notifications">mail</mat-icon>
        <mat-icon matBadge="4" matBadgeSize="medium" aria-hidden="false" aria-label="4 notifications">mail</mat-icon>
        <mat-icon matBadge="4" matBadgeSize="large" aria-hidden="false" aria-label="4 notifications">mail</mat-icon>
      </app-specimen>
      <app-specimen label="Pastille sans contenu" api="matBadge" [snippet]="snippets.point">
        <mat-icon matBadge matBadgeSize="small" aria-hidden="false" aria-label="Nouveau">notifications</mat-icon>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Placement">
      <app-specimen label="Positions" api="matBadgePosition" [snippet]="snippets.positions">
        <mat-icon matBadge="1" matBadgePosition="above after" aria-hidden="false" aria-label="Au-dessus, après">mail</mat-icon>
        <mat-icon matBadge="1" matBadgePosition="above before" aria-hidden="false" aria-label="Au-dessus, avant">mail</mat-icon>
        <mat-icon matBadge="1" matBadgePosition="below after" aria-hidden="false" aria-label="En dessous, après">mail</mat-icon>
        <mat-icon matBadge="1" matBadgePosition="below before" aria-hidden="false" aria-label="En dessous, avant">mail</mat-icon>
      </app-specimen>
      <app-specimen label="Sur un bouton" api="matBadgeOverlap" [snippet]="snippets.bouton">
        <button matButton="tonal" matBadge="8" matBadgeOverlap="false">Messages</button>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="États">
      <app-specimen label="Masqué" api="matBadgeHidden" [snippet]="snippets.masque">
        <mat-icon matBadge="3" matBadgeHidden="true">mail</mat-icon>
      </app-specimen>
      <app-specimen label="Désactivé" api="matBadgeDisabled" [snippet]="snippets.desactive">
        <mat-icon matBadge="3" matBadgeDisabled="true" aria-hidden="false" aria-label="3 messages">mail</mat-icon>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Contenu et accessibilité">
      <app-specimen label="Description accessible" api="matBadgeDescription" [snippet]="snippets.description">
        <mat-icon matBadge="3" matBadgeDescription="3 messages non lus" aria-hidden="false" aria-label="Messages">mail</mat-icon>
      </app-specimen>
      <app-specimen label="Texte long" api='matBadge="99+"' [snippet]="snippets.texte">
        <mat-icon matBadge="99+" matBadgeSize="large" aria-hidden="false" aria-label="Notifications">notifications</mat-icon>
      </app-specimen>
    </app-specimen-section>
  `,
})
export class BadgePage {
  protected readonly snippets = SNIPPETS;
}
