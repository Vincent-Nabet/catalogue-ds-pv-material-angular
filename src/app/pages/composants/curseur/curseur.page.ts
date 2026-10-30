import { Component } from '@angular/core';
import { MatSlider, MatSliderRangeThumb, MatSliderThumb } from '@angular/material/slider';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  simple: `<mat-slider>
  <input matSliderThumb value="40" aria-label="Volume" />
</mat-slider>`,
  etiquette: `<mat-slider discrete min="0" max="100" step="10">
  <input matSliderThumb value="40" aria-label="Volume" />
</mat-slider>`,
  graduations: `<mat-slider discrete showTickMarks min="0" max="100" step="10">
  <input matSliderThumb value="50" aria-label="Volume" />
</mat-slider>`,
  plage: `<mat-slider min="0" max="100">
  <input matSliderStartThumb value="20" aria-label="Minimum" />
  <input matSliderEndThumb value="70" aria-label="Maximum" />
</mat-slider>`,
  desactive: `<mat-slider disabled>
  <input matSliderThumb value="40" aria-label="Volume" />
</mat-slider>`,
};

@Component({
  selector: 'app-curseur-page',
  imports: [MatSlider, MatSliderThumb, MatSliderRangeThumb, Specimen, SpecimenSection],
  template: `
    <h1>Curseur</h1>

    <app-specimen-section title="Valeur unique">
      <app-specimen label="Continu" api="mat-slider" [snippet]="snippets.simple">
        <mat-slider>
          <input matSliderThumb value="40" aria-label="Volume" />
        </mat-slider>
      </app-specimen>
      <app-specimen label="Avec étiquette" api="discrete" [snippet]="snippets.etiquette">
        <mat-slider discrete min="0" max="100" step="10">
          <input matSliderThumb value="40" aria-label="Volume" />
        </mat-slider>
      </app-specimen>
      <app-specimen label="Avec graduations" api="showTickMarks" [snippet]="snippets.graduations">
        <mat-slider discrete showTickMarks min="0" max="100" step="10">
          <input matSliderThumb value="50" aria-label="Volume" />
        </mat-slider>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Plage et états">
      <app-specimen label="Plage de valeurs" api="matSliderStartThumb / matSliderEndThumb" [snippet]="snippets.plage">
        <mat-slider min="0" max="100">
          <input matSliderStartThumb value="20" aria-label="Minimum" />
          <input matSliderEndThumb value="70" aria-label="Maximum" />
        </mat-slider>
      </app-specimen>
      <app-specimen label="Désactivé" api="disabled" [snippet]="snippets.desactive">
        <mat-slider disabled>
          <input matSliderThumb value="40" aria-label="Volume" />
        </mat-slider>
      </app-specimen>
    </app-specimen-section>
  `,
})
export class CurseurPage {
  protected readonly snippets = SNIPPETS;
}
