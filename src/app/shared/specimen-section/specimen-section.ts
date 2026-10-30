import { Component, input } from '@angular/core';

@Component({
  selector: 'app-specimen-section',
  template: `
    <section>
      <h2>{{ title() }}</h2>
      @if (description()) {
        <p>{{ description() }}</p>
      }
      <div class="grille">
        <ng-content />
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
      margin-bottom: 32px;
    }

    h2 {
      margin: 0 0 4px;
      font: var(--mat-sys-title-large);
    }

    p {
      margin: 0 0 12px;
      color: var(--mat-sys-on-surface-variant);
    }

    .grille {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 16px;
      margin-top: 12px;
    }
  `,
})
export class SpecimenSection {
  readonly title = input.required<string>();
  readonly description = input<string>();
}
