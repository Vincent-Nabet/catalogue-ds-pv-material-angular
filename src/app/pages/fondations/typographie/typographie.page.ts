import { Component, ElementRef, afterRenderEffect, computed, signal, viewChildren } from '@angular/core';
import { formatCssValue, readValue } from '../../../core/tokens/read-css';
import { injectIsDesignSystem, injectThemeKey } from '../../../core/tokens/theme-key';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';
import { TokenBadge } from '../../../shared/token-badge/token-badge';

const SIZES = [
  ['large', 'Large'],
  ['medium', 'Moyen'],
  ['small', 'Petit'],
] as const;

const FAMILIES = [
  { id: 'display', label: 'Display', minWidth: '560px' },
  { id: 'headline', label: 'Headline', minWidth: '420px' },
  { id: 'title', label: 'Title', minWidth: '380px' },
  { id: 'body', label: 'Body', minWidth: '340px' },
  { id: 'label', label: 'Label', minWidth: '300px' },
].map((family) => ({
  ...family,
  styles: SIZES.map(([size, sizeLabel]) => {
    const id = `${family.id}-${size}`;
    // Label Large et Medium ont leur graisse renforcée dans les variables Material ; les 13 autres dans celles du design system.
    const weightVar =
      family.id === 'label' && size !== 'small'
        ? `--mat-sys-${id}-weight-prominent`
        : `--app-typescale-emphasized-${id}-weight`;
    return { id, label: `${family.label} ${sizeLabel}`, weightVar };
  }),
}));

interface TypeValues {
  font: string;
  size: string;
  lineHeight: string;
  weight: string;
  tracking: string;
}

function describe(values: TypeValues | undefined): string {
  if (!values) {
    return '';
  }
  return `${values.font} · ${formatCssValue(values.size)} / ${formatCssValue(values.lineHeight)} · graisse ${values.weight} · interlettrage ${formatCssValue(values.tracking)}`;
}

@Component({
  selector: 'app-typographie-page',
  imports: [Specimen, SpecimenSection, TokenBadge],
  template: `
    <h1>Typographie</h1>
    <p class="page-intro">
      Les 15 styles de texte Material Design 3 du thème courant, avec les valeurs lues dans le CSS
      chargé : police, taille, interligne, graisse et interlettrage.
    </p>

    @for (family of sections(); track family.id) {
      <app-specimen-section [title]="family.label" [minWidth]="family.minWidth">
        @for (style of family.styles; track style.id) {
          <app-specimen
            [label]="style.label"
            [api]="'--mat-sys-' + style.id"
            [snippet]="style.snippet"
          >
            <div class="specimen-contenu">
              <div
                #echantillon
                class="echantillon"
                [attr.data-style]="style.id"
                [style.font]="'var(--mat-sys-' + style.id + ')'"
                [style.letter-spacing]="'var(--mat-sys-' + style.id + '-tracking)'"
              >
                Texte d'exemple
              </div>
              <p class="valeurs">{{ style.values }}</p>
            </div>
          </app-specimen>
        }
      </app-specimen-section>
    }

    @if (designSystem()) {
      <app-specimen-section
        title="Graisses renforcées (design system)"
        description="Pour chaque style, le texte normal puis le texte avec la graisse renforcée. Jeton personnalisé : absent de Material Design 3, le design system le génère en variable --app-typescale-emphasized-*. Seuls Label Large et Label Moyen ont un jeton MD3 natif (…-weight-prominent)."
        minWidth="420px"
      >
        @for (style of emphasized(); track style.id) {
          <app-specimen [label]="style.label" [api]="style.weightVar" [snippet]="style.snippet">
            <div class="specimen-contenu">
              <app-token-badge [custom]="style.custom" />
              <div class="comparaison" [style.font]="'var(--mat-sys-' + style.id + ')'">
                <span>Normal</span>
                <span
                  #renforce
                  [attr.data-style]="style.id"
                  [style.font-weight]="'var(' + style.weightVar + ')'"
                >
                  Renforcé
                </span>
              </div>
              <p class="valeurs">{{ style.values }}</p>
            </div>
          </app-specimen>
        }
      </app-specimen-section>
    } @else {
      <app-specimen-section title="Graisses renforcées (design system)" designSystemOnly />
    }
  `,
  styles: `
    .echantillon,
    .comparaison {
      overflow-wrap: anywhere;
    }

    .comparaison {
      display: flex;
      flex-wrap: wrap;
      gap: 8px 24px;
    }

    .valeurs {
      margin: 0;
      color: var(--mat-sys-on-surface-variant);
      font: var(--mat-sys-body-small);
    }
  `,
})
export class TypographiePage {
  private readonly themeKey = injectThemeKey();
  protected readonly designSystem = injectIsDesignSystem();

  private readonly samples = viewChildren<ElementRef<HTMLElement>>('echantillon');
  private readonly emphasizedSamples = viewChildren<ElementRef<HTMLElement>>('renforce');
  private readonly values = signal<Record<string, TypeValues>>({});
  private readonly emphasizedWeights = signal<Record<string, string>>({});

  protected readonly sections = computed(() => {
    const values = this.values();
    return FAMILIES.map((family) => ({
      ...family,
      styles: family.styles.map((style) => ({
        ...style,
        values: describe(values[style.id]),
        snippet: `font: var(--mat-sys-${style.id});`,
      })),
    }));
  });

  protected readonly emphasized = computed(() => {
    const normal = this.values();
    const emphasized = this.emphasizedWeights();
    return FAMILIES.flatMap((family) => family.styles).map((style) => ({
      ...style,
      custom: style.weightVar.startsWith('--app-'),
      values: normal[style.id]
        ? `normal : ${normal[style.id].weight} · renforcé : ${emphasized[style.id] ?? '—'}`
        : '',
      snippet: `font: var(--mat-sys-${style.id});\nfont-weight: var(${style.weightVar});`,
    }));
  });

  constructor() {
    afterRenderEffect({
      read: () => {
        this.themeKey();
        const values: Record<string, TypeValues> = {};
        for (const { nativeElement: el } of this.samples()) {
          values[el.dataset['style'] ?? ''] = {
            font: readValue(el, 'fontFamily').split(',')[0].replaceAll('"', '').trim(),
            size: readValue(el, 'fontSize'),
            lineHeight: readValue(el, 'lineHeight'),
            weight: readValue(el, 'fontWeight'),
            tracking: readValue(el, 'letterSpacing'),
          };
        }
        this.values.set(values);
        this.emphasizedWeights.set(
          Object.fromEntries(
            this.emphasizedSamples().map(({ nativeElement: el }) => [
              el.dataset['style'] ?? '',
              readValue(el, 'fontWeight'),
            ]),
          ),
        );
      },
    });
  }
}
