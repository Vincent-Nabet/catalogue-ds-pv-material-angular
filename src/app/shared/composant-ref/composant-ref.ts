import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { COMPONENT_REFS } from '../../core/catalog/component-refs';

/**
 * Sous le <h1> d'une page de composant : nom original (Angular Material) et balise ou propriété HTML.
 * L'identifiant du composant est lu dans l'URL (`/composants/<id>`) : aucune entrée à renseigner.
 */
@Component({
  selector: 'app-composant-ref',
  template: `
    @if (ref) {
      <span class="vo">{{ ref.vo }}</span>
      <code>{{ ref.api }}</code>
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: 4px 12px;
      margin: 0 0 24px;
      color: var(--mat-sys-on-surface-variant);
      font: var(--mat-sys-title-medium);
    }

    code {
      font-size: var(--mat-sys-label-large-size);
      overflow-wrap: anywhere;
    }
  `,
})
export class ComposantRef {
  protected readonly ref = COMPONENT_REFS[inject(ActivatedRoute).snapshot.url.at(-1)?.path ?? ''];
}
