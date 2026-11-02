import { Component, ElementRef, afterRenderEffect, computed, inject, signal, viewChildren } from '@angular/core';
import { DS_PREFIX } from '../../../core/tokens/color-roles';
import { detectedIds } from '../../../core/tokens/discover-tokens';
import { formatCssValue, readValue } from '../../../core/tokens/read-css';
import { TokenCatalog } from '../../../core/tokens/token-catalog';
import { injectIsDesignSystem, injectThemeKey } from '../../../core/tokens/theme-key';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';
import { TokenBadge } from '../../../shared/token-badge/token-badge';

const CORNERS = ['none', 'extra-small', 'small', 'medium', 'large', 'extra-large', 'full'];
const EXPRESSIVE_CORNERS = ['large-increased', 'extra-large-increased', 'extra-extra-large'];
const SPACINGS = [
  'none',
  'extra-small',
  'small',
  'medium',
  'large',
  'large-increased',
  'extra-large',
  'extra-large-increased',
  'extra-extra-large',
  'full',
];
const LEVELS = [0, 1, 2, 3, 4, 5];
const STATES = [
  ['hover', 'Survol'],
  ['focus', 'Focus'],
  ['pressed', 'Appui'],
  ['dragged', 'Glissement'],
] as const;

/** Une valeur à lire : la propriété calculée de l'élément portant `data-key`. */
const KEY = {
  corner: (name: string) => `corner:${name}`,
  expressive: (name: string) => `expressive:${name}`,
  spacing: (name: string) => `spacing:${name}`,
  state: (name: string) => `state:${name}`,
};

@Component({
  selector: 'app-formes-espacements-page',
  imports: [Specimen, SpecimenSection, TokenBadge],
  template: `
    <h1>Formes et espacements</h1>
    <p class="page-intro">
      Rayons, espacements, élévations et opacités d'état du thème courant, avec les valeurs lues
      dans le CSS chargé.
    </p>

    <app-specimen-section title="Rayons" minWidth="180px">
      @for (name of corners; track name) {
        <app-specimen
          [label]="name"
          [api]="'--mat-sys-corner-' + name"
          [snippet]="'border-radius: var(--mat-sys-corner-' + name + ');'"
        >
          <div class="specimen-contenu contenu">
            <div
              #lecture
              class="carre"
              data-prop="borderTopLeftRadius"
              [attr.data-key]="keys.corner(name)"
              [style.border-radius]="'var(--mat-sys-corner-' + name + ')'"
            ></div>
            <p class="valeur">{{ value(keys.corner(name)) }}</p>
          </div>
        </app-specimen>
      }
    </app-specimen-section>

    @if (designSystem()) {
      <app-specimen-section
        title="Rayons Expressive (design system)"
        description="Rayons au-delà de l'échelle MD3. Jeton personnalisé : absent de Material Design 3, le design system le génère en variable --app-shape-corner-*."
        minWidth="180px"
      >
        @for (name of expressiveCorners(); track name) {
          <app-specimen
            [label]="name"
            [api]="prefix + 'shape-corner-' + name"
            [snippet]="'border-radius: var(' + prefix + 'shape-corner-' + name + ');'"
          >
            <div class="specimen-contenu contenu">
              <app-token-badge />
              <div
                #lecture
                class="carre"
                data-prop="borderTopLeftRadius"
                [attr.data-key]="keys.expressive(name)"
                [style.border-radius]="'var(' + prefix + 'shape-corner-' + name + ')'"
              ></div>
              <p class="valeur">{{ value(keys.expressive(name)) }}</p>
            </div>
          </app-specimen>
        }
      </app-specimen-section>

      <app-specimen-section
        title="Espacements (design system)"
        description="Largeur de chaque barre = valeur du jeton. Jeton personnalisé : absent de Material Design 3, le design system le génère en variable --app-spacing-*."
        minWidth="280px"
      >
        @for (name of spacings(); track name) {
          <app-specimen
            [label]="name"
            [api]="prefix + 'spacing-' + name"
            [snippet]="'padding: var(' + prefix + 'spacing-' + name + ');'"
          >
            <div class="specimen-contenu contenu">
              <app-token-badge />
              <div
                #lecture
                class="barre"
                aria-hidden="true"
                data-prop="width"
                [attr.data-key]="keys.spacing(name)"
                [style.width]="'var(' + prefix + 'spacing-' + name + ')'"
              ></div>
              <p class="valeur">{{ value(keys.spacing(name)) }}</p>
            </div>
          </app-specimen>
        }
      </app-specimen-section>
    } @else {
      <app-specimen-section title="Rayons Expressive et espacements (design system)" designSystemOnly />
    }

    <app-specimen-section
      title="Élévations"
      [description]="
        designSystem() ? 'Absentes des tokens : valeurs de la palette de repli de Material.' : ''
      "
      minWidth="180px"
    >
      @for (level of levels; track level) {
        <app-specimen
          [label]="'Niveau ' + level"
          [api]="'--mat-sys-level' + level"
          [snippet]="'box-shadow: var(--mat-sys-level' + level + ');'"
        >
          <div class="carte" [style.box-shadow]="'var(--mat-sys-level' + level + ')'">
            Niveau {{ level }}
          </div>
        </app-specimen>
      }
    </app-specimen-section>

    <h2>Opacités d'état</h2>
    @if (designSystem()) {
      <p class="note">
        Absentes des tokens : le script de génération pose les valeurs MD3, mais la densité du
        catalogue les remplace par celles de Material. Les valeurs ci-dessous sont celles du rendu.
      </p>
    }
    <table>
      <caption>
        Opacité de la couche d'état de chaque interaction
      </caption>
      <thead>
        <tr>
          <th scope="col">État</th>
          <th scope="col">Variable</th>
          <th scope="col">Valeur</th>
        </tr>
      </thead>
      <tbody>
        @for (state of states; track state.id) {
          <tr>
            <th scope="row">{{ state.label }}</th>
            <td>
              <code>--mat-sys-{{ state.id }}-state-layer-opacity</code>
              <span
                #lecture
                hidden
                data-prop="opacity"
                [attr.data-key]="keys.state(state.id)"
                [style.opacity]="'var(--mat-sys-' + state.id + '-state-layer-opacity)'"
              ></span>
            </td>
            <td>{{ value(keys.state(state.id)) }}</td>
          </tr>
        }
      </tbody>
    </table>
  `,
  styles: `
    h2 {
      margin: 0 0 4px;
      font: var(--mat-sys-title-large);
    }

    .note {
      margin: 0 0 12px;
      color: var(--mat-sys-on-surface-variant);
    }

    /* Complète .specimen-contenu (styles.scss) : exemples alignés à gauche. */
    .contenu {
      justify-items: start;
    }

    .carre {
      width: 96px;
      height: 96px;
      border: 2px solid var(--mat-sys-primary);
      background: var(--mat-sys-primary-container);
    }

    .barre {
      max-width: 100%;
      height: 16px;
      background: var(--mat-sys-primary);
    }

    .valeur {
      margin: 0;
      font: var(--mat-sys-body-medium);
    }

    .carte {
      display: grid;
      align-self: flex-start;
      place-items: center;
      width: 100%;
      margin-block-start: 28px; /* sous le bouton </> de la card */
      height: 80px;
      border-radius: var(--mat-sys-corner-medium);
      background: var(--mat-sys-surface);
      color: var(--mat-sys-on-surface);
      font: var(--mat-sys-body-medium);
    }

    table {
      width: 100%;
      max-width: 640px;
      margin-top: 12px;
      border-collapse: collapse;
      font: var(--mat-sys-body-medium);
    }

    caption {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
    }

    th,
    td {
      padding: 8px 12px;
      border: 1px solid var(--mat-sys-outline-variant);
      text-align: start;
    }

    thead th {
      background: var(--mat-sys-surface-container-high);
    }
  `,
})
export class FormesEspacementsPage {
  protected readonly corners = CORNERS;
  private readonly found = inject(TokenCatalog).names;
  /** Listes écrites à la main, suivies des jetons `--app-*` détectés dans le CSS qui n'y figurent pas. */
  protected readonly expressiveCorners = computed(() => [
    ...EXPRESSIVE_CORNERS,
    ...detectedIds(this.found() ?? [], DS_PREFIX, 'corner', EXPRESSIVE_CORNERS),
  ]);
  protected readonly spacings = computed(() => [
    ...SPACINGS,
    ...detectedIds(this.found() ?? [], DS_PREFIX, 'spacing', SPACINGS),
  ]);
  protected readonly levels = LEVELS;
  protected readonly states = STATES.map(([id, label]) => ({ id, label }));
  protected readonly keys = KEY;
  protected readonly prefix = `--${DS_PREFIX}-`;

  private readonly themeKey = injectThemeKey();
  protected readonly designSystem = injectIsDesignSystem();

  private readonly probes = viewChildren<ElementRef<HTMLElement>>('lecture');
  private readonly values = signal<Record<string, string>>({});

  protected value(key: string): string {
    return this.values()[key] ?? '';
  }

  constructor() {
    afterRenderEffect({
      read: () => {
        this.themeKey();
        this.values.set(
          Object.fromEntries(
            this.probes().map(({ nativeElement: el }) => [
              el.dataset['key'] ?? '',
              formatCssValue(readValue(el, (el.dataset['prop'] ?? 'width') as keyof CSSStyleDeclaration & string)),
            ]),
          ),
        );
      },
    });
  }
}
