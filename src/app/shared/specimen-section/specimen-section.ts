import { booleanAttribute, Component, computed, input } from '@angular/core';

/** Description des sections de jetons propres au design system, quand un thème Angular Material est actif. */
export const DESIGN_SYSTEM_ONLY_MESSAGE =
  'Jetons propres au design system : choisir un thème Design system pour les voir.';

@Component({
  selector: 'app-specimen-section',
  host: { '[style.--specimen-min]': 'minWidth()' },
  template: `
    <section>
      <h2>{{ title() }}</h2>
      @if (texte()) {
        <p>{{ texte() }}</p>
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
      grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--specimen-min, 300px)), 1fr));
      gap: 16px;
      margin-top: 12px;
    }
  `,
})
export class SpecimenSection {
  readonly title = input.required<string>();
  readonly description = input<string>();
  /** Largeur minimale d'une colonne de la grille. */
  readonly minWidth = input('300px');
  /** Section de jetons propres au design system, affichée sans thème Design system : remplace la description par le message standard. */
  readonly designSystemOnly = input(false, { transform: booleanAttribute });

  protected readonly texte = computed(() =>
    this.designSystemOnly() ? DESIGN_SYSTEM_ONLY_MESSAGE : this.description(),
  );
}
