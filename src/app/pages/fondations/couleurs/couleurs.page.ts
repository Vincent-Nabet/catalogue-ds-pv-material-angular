import { Component, ElementRef, afterRenderEffect, computed, signal, viewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { COLOR_ROLES, ColorPair, colorVar, pairLabel, pairsOfGroup, unpairedRoles } from '../../../core/tokens/color-roles';
import { Rgba, contrastRatio, formatContrast, toHex } from '../../../core/tokens/contrast';
import { CellStatus, STATUS_VIEW, pairStatus } from '../../../core/tokens/contrast-matrix';
import { readColor } from '../../../core/tokens/read-css';
import { injectIsDesignSystem, injectThemeKey } from '../../../core/tokens/theme-key';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const ALL_ROLES = COLOR_ROLES.flatMap((group) => group.roles);

/** Les snippets sont dérivés de la paire (exception à la règle des snippets écrits à la main : il n'y a pas de composant à recopier, seulement l'usage des variables). */
function snippetOf(pair: ColorPair, fgVar: string, bgVar: string): string {
  return pair.kind === 'texte'
    ? `color: var(${fgVar});\nbackground: var(${bgVar});`
    : `border: 2px solid var(${fgVar});\nbackground: var(${bgVar});`;
}

/**
 * Couleur de la pastille de statut (en plus de l'icône et du texte, jamais seule). Le vert est celui
 * du design system, défini sur `:root` quel que soit le thème (famille Standard avec un thème
 * Angular Material) : Material n'a pas de rôle « succès ».
 */
const TONES: Record<CellStatus, string> = {
  ok: 'succes',
  echec: 'erreur',
  'sans-seuil': 'neutre',
  absent: 'neutre',
};

function minimumText(min: number): string {
  return `${String(min).replace('.', ',')} : 1`;
}

@Component({
  selector: 'app-couleurs-page',
  imports: [MatIcon, Specimen, SpecimenSection],
  template: `
    <h1>Couleurs</h1>
    <p class="intro">
      Rôles de couleur du thème courant, par paires texte / fond, avec le rapport de contraste
      WCAG&nbsp;2.x lu dans le CSS chargé. Changer de thème ou de mode relit les valeurs. Le rapport
      est tronqué à deux décimales, comme dans axe-core.
    </p>
    <span #probe hidden aria-hidden="true"></span>

    @for (section of sections(); track section.group.id) {
      <app-specimen-section [title]="section.group.label" minWidth="280px">
        @for (row of section.rows; track row.pair.id) {
          <app-specimen [label]="row.label" [api]="row.api" [snippet]="row.snippet">
            <div class="contenu">
              @if (row.pair.kind === 'texte') {
                <div class="echantillon" [style.color]="row.fgCss" [style.background]="row.bgCss">
                  Aa Texte d'exemple
                </div>
              } @else {
                <div
                  class="echantillon cadre"
                  aria-hidden="true"
                  [style.border-color]="row.fgCss"
                  [style.background]="row.bgCss"
                ></div>
              }
              <div class="mesures">
                <span>
                  <code>{{ row.fgHex }}</code> sur <code>{{ row.bgHex }}</code>
                </span>
                <strong>{{ row.ratio }}</strong>
                <span [class]="'statut ' + row.tone">
                  <mat-icon>{{ row.icon }}</mat-icon>
                  {{ row.statusText }}
                </span>
              </div>
            </div>
          </app-specimen>
        }
      </app-specimen-section>
    }

    @if (!designSystem()) {
      <app-specimen-section
        title="Jetons du design system"
        description="Jetons propres au design system : choisir un thème Design system pour les voir."
      />
    }

    <app-specimen-section
      title="Autres rôles"
      description="Rôles qui n'entrent dans aucune paire de texte : couleurs fixes atténuées, ombre, voile, teinte de surface."
      minWidth="220px"
    >
      @for (item of others(); track item.role) {
        <div class="role">
          <span class="pastille" aria-hidden="true" [style.background]="item.css"></span>
          <span>
            <code>{{ item.role }}</code>
            <br />
            {{ item.hex }}
          </span>
        </div>
      }
    </app-specimen-section>
  `,
  styles: `
    .intro {
      max-width: 80ch;
      margin: 0 0 24px;
      color: var(--mat-sys-on-surface-variant);
    }

    /* Ancré en haut de la zone d'exemple (sinon centrée, donc décalée quand le pied de card fait 2 lignes), sous le bouton </> de la card (en position absolue, 52 px depuis le haut). */
    .contenu {
      display: grid;
      align-self: stretch;
      align-content: start;
      margin-block-start: 28px;
      gap: 12px;
      width: 100%;
    }

    .echantillon {
      padding: 16px;
      border-radius: var(--mat-sys-corner-small);
      font: var(--mat-sys-body-large);
    }

    .cadre {
      box-sizing: border-box;
      height: 56px;
      border: 2px solid;
    }

    .mesures {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 4px 12px;
      font: var(--mat-sys-body-medium);
    }

    .mesures strong {
      font: var(--mat-sys-title-medium);
    }

    .statut {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 12px 2px 8px;
      border-radius: var(--mat-sys-corner-full);
    }

    .statut.succes {
      background: var(--app-color-success-container);
      color: var(--app-color-on-success-container);
    }

    .statut.erreur {
      background: var(--mat-sys-error-container);
      color: var(--mat-sys-on-error-container);
    }

    .statut.neutre {
      background: var(--mat-sys-surface-variant);
      color: var(--mat-sys-on-surface-variant);
    }

    .role {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .pastille {
      flex: none;
      width: 40px;
      height: 40px;
      border: 1px solid var(--mat-sys-outline);
      border-radius: var(--mat-sys-corner-small);
    }
  `,
})
export class CouleursPage {
  private readonly probe = viewChild.required<ElementRef<HTMLElement>>('probe');
  private readonly themeKey = injectThemeKey();

  protected readonly designSystem = injectIsDesignSystem();
  private readonly colors = signal<Record<string, Rgba | null>>({});

  protected readonly sections = computed(() => {
    const colors = this.colors();
    const designSystem = this.designSystem();
    return COLOR_ROLES.filter((group) => designSystem || group.origin === 'md3')
      .map((group) => ({
        group,
        rows: pairsOfGroup(group).map((pair) => this.toRow(pair, colors)),
      }))
      .filter((section) => section.rows.length > 0);
  });

  protected readonly others = computed(() => {
    const colors = this.colors();
    const designSystem = this.designSystem();
    return unpairedRoles()
      .filter(({ group }) => designSystem || group.origin === 'md3')
      .map(({ role }) => ({
        role,
        css: `var(${colorVar(role, '--mat-sys-')})`,
        hex: this.hex(colors[role]),
      }));
  });

  constructor() {
    afterRenderEffect({
      read: () => {
        this.themeKey();
        const probe = this.probe().nativeElement;
        this.colors.set(
          Object.fromEntries(ALL_ROLES.map((role) => [role, readColor(probe, colorVar(role, '--mat-sys-'))])),
        );
      },
    });
  }

  private hex(color: Rgba | null | undefined): string {
    return color ? toHex(color) : '—';
  }

  private toRow(pair: ColorPair, colors: Record<string, Rgba | null>) {
    const fg = colors[pair.fg] ?? null;
    const bg = colors[pair.bg] ?? null;
    const ratio = contrastRatio(fg, bg);
    const status = pairStatus(ratio, pair);
    const fgVar = colorVar(pair.fg, '--mat-sys-');
    const bgVar = colorVar(pair.bg, '--mat-sys-');
    return {
      pair,
      label: pairLabel(pair),
      api: `${fgVar} / ${bgVar}`,
      snippet: snippetOf(pair, fgVar, bgVar),
      fgCss: `var(${fgVar})`,
      bgCss: `var(${bgVar})`,
      fgHex: this.hex(fg),
      bgHex: this.hex(bg),
      ratio: ratio === null ? '—' : formatContrast(ratio),
      tone: TONES[status],
      icon: STATUS_VIEW[status].icon,
      statusText:
        status === 'echec' && pair.min !== null
          ? `${STATUS_VIEW[status].text}, minimum ${minimumText(pair.min)}`
          : STATUS_VIEW[status].text,
    };
  }
}
