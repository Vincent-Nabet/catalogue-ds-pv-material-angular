import { Component } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  desactive: `<mat-slide-toggle>Désactivé</mat-slide-toggle>`,
  actif: `<mat-slide-toggle checked>Activé</mat-slide-toggle>`,
  sansIcone: `<mat-slide-toggle checked hideIcon>Sans icône</mat-slide-toggle>`,
  avant: `<mat-slide-toggle labelPosition="before">Libellé avant</mat-slide-toggle>`,
  inactifOff: `<mat-slide-toggle disabled>Désactivé</mat-slide-toggle>`,
  inactifOn: `<mat-slide-toggle checked disabled>Activé</mat-slide-toggle>`,
};

@Component({
  selector: 'app-interrupteur-page',
  imports: [MatSlideToggle, Specimen, SpecimenSection],
  template: `
    <h1>Interrupteur</h1>

    <app-specimen-section title="États">
      <app-specimen label="Éteint" api="mat-slide-toggle" [snippet]="snippets.desactive">
        <mat-slide-toggle>Désactivé</mat-slide-toggle>
      </app-specimen>
      <app-specimen label="Allumé" api="checked" [snippet]="snippets.actif">
        <mat-slide-toggle checked>Activé</mat-slide-toggle>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Variantes">
      <app-specimen label="Sans icône" api="hideIcon" [snippet]="snippets.sansIcone">
        <mat-slide-toggle checked hideIcon>Sans icône</mat-slide-toggle>
      </app-specimen>
      <app-specimen label="Libellé avant" api='labelPosition="before"' [snippet]="snippets.avant">
        <mat-slide-toggle labelPosition="before">Libellé avant</mat-slide-toggle>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Inactifs">
      <app-specimen label="Éteint" api="disabled" [snippet]="snippets.inactifOff">
        <mat-slide-toggle disabled>Désactivé</mat-slide-toggle>
      </app-specimen>
      <app-specimen label="Allumé" api="checked disabled" [snippet]="snippets.inactifOn">
        <mat-slide-toggle checked disabled>Activé</mat-slide-toggle>
      </app-specimen>
    </app-specimen-section>
  `,
})
export class InterrupteurPage {
  protected readonly snippets = SNIPPETS;
}
