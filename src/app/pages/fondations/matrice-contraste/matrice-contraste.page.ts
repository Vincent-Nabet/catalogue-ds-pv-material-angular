import { Component, afterNextRender, computed, signal, viewChildren, ElementRef } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { COLOR_PAIRS, COLOR_ROLES, ColorPair, PairKind, colorVar, pairGroup, pairLabel } from '../../../core/tokens/color-roles';
import { Rgba, formatContrast, toHex } from '../../../core/tokens/contrast';
import {
  FAMILIES,
  MODES,
  MatrixRow,
  ModeValues,
  STATUS_VIEW,
  buildMatrix,
  familyLabel,
  summary,
} from '../../../core/tokens/contrast-matrix';
import { readColor } from '../../../core/tokens/read-css';

const PAIR_ROLES = [...new Set(COLOR_PAIRS.flatMap((pair) => [pair.fg, pair.bg]))];

const KIND_LABEL: Record<PairKind, string> = {
  texte: 'Texte',
  interface: 'Interface',
  decoratif: 'Décoratif',
};

const SCHEME_LABEL = { light: 'Clair', dark: 'Sombre' };

function minimumText(min: number | null): string {
  return min === null ? 'sans seuil' : `${String(min).replace('.', ',')} : 1`;
}

function plural(count: number, word: string): string {
  return `${count} ${word}${count > 1 ? 's' : ''}`;
}

@Component({
  selector: 'app-matrice-contraste-page',
  imports: [MatCheckbox, MatIcon, MatTooltip],
  template: `
    <h1>Matrice de contraste</h1>
    <p class="intro">
      Chaque paire de rôles, dans les 8 modes du design system (4 familles de contraste, clair et
      sombre), quel que soit le thème choisi. Rapports WCAG&nbsp;2.x lus dans le CSS chargé et
      tronqués à deux décimales, comme dans axe-core. Une régression est une paire dont le contraste
      est plus faible que dans la famille précédente (Standard, Contraste moyen, Contraste élevé).
    </p>

    @if (ready()) {
      <h2>Résumé</h2>
      <ul class="resume">
        @for (item of resume(); track item.id) {
          <li>
            <strong>{{ item.label }}</strong>
            <span>{{ item.fails }}</span>
            <span>{{ item.regressions }}</span>
          </li>
        }
      </ul>

      <h2>Détail</h2>
      <div class="filtres">
        <mat-checkbox [checked]="onlyProblems()" (change)="onlyProblems.set($event.checked)">
          Échecs et régressions seulement
        </mat-checkbox>
        <mat-checkbox [checked]="withDecorative()" (change)="withDecorative.set($event.checked)">
          Inclure les paires décoratives
        </mat-checkbox>
      </div>

      @if (groups().length === 0) {
        <p class="vide">Aucune paire à afficher avec ces filtres.</p>
      } @else {
        <div class="defile" role="region" aria-label="Matrice de contraste" tabindex="0">
          <table>
            <caption>
              Rapport de contraste de chaque paire de rôles, dans les 8 modes du design system
            </caption>
            <thead>
              <tr>
                <th scope="col" rowspan="2">Paire</th>
                @for (family of families; track family.id) {
                  <th scope="colgroup" colspan="2">{{ family.label }}</th>
                }
              </tr>
              <tr>
                @for (mode of modes; track mode.id) {
                  <th scope="col">{{ mode.label }}</th>
                }
              </tr>
            </thead>
            @for (group of groups(); track group.id) {
              <tbody>
                <tr>
                  <th scope="rowgroup" class="groupe" colspan="9">{{ group.label }}</th>
                </tr>
                @for (row of group.rows; track row.id) {
                  <tr>
                    <th scope="row">
                      <code>{{ row.label }}</code>
                      <span class="type">{{ row.type }}</span>
                    </th>
                    @for (cell of row.cells; track cell.mode) {
                      <td [class]="'cellule ' + cell.status">
                        @if (cell.fg && cell.bg) {
                          <span class="mini" aria-hidden="true" [style.background]="cell.bg">
                            <span [style.background]="cell.fg"></span>
                          </span>
                        }
                        <span class="ratio">{{ cell.ratio }}</span>
                        <mat-icon>{{ cell.icon }}</mat-icon>
                        <span [class.vh]="!cell.showStatus">{{ cell.statusText }}</span>
                        @if (cell.regression) {
                          <span class="regression" aria-hidden="true" [matTooltip]="cell.regression">
                            ↓ régression
                          </span>
                          <span class="vh">Régression : {{ cell.regression }}</span>
                        }
                      </td>
                    }
                  </tr>
                }
              </tbody>
            }
          </table>
        </div>
      }
    }

    <div class="sondes" aria-hidden="true">
      @for (mode of modes; track mode.id) {
        <div [class]="'theme-' + mode.family" [style.color-scheme]="mode.scheme">
          <span #sonde></span>
        </div>
      }
    </div>
  `,
  styles: `
    .intro {
      max-width: 80ch;
      margin: 0 0 24px;
      color: var(--mat-sys-on-surface-variant);
    }

    h2 {
      margin: 24px 0 12px;
      font: var(--mat-sys-title-large);
    }

    .resume {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 12px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .resume li {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 12px 16px;
      border: 1px solid var(--mat-sys-outline-variant);
      border-radius: var(--mat-sys-corner-medium);
      background: var(--mat-sys-surface-container-low);
      color: var(--mat-sys-on-surface);
      font: var(--mat-sys-body-medium);
    }

    .resume strong {
      font: var(--mat-sys-title-small);
    }

    .filtres {
      display: flex;
      flex-wrap: wrap;
      gap: 0 24px;
      margin-bottom: 8px;
    }

    .vide {
      padding: 24px 0;
    }

    .defile {
      position: relative;
      max-width: 100%;
      overflow-x: auto;
      border: 1px solid var(--mat-sys-outline-variant);
      border-radius: var(--mat-sys-corner-medium);
    }

    table {
      min-width: 1180px;
      width: 100%;
      border-collapse: collapse;
      color: var(--mat-sys-on-surface);
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
      vertical-align: top;
    }

    thead th {
      background: var(--mat-sys-surface-container-high);
      font: var(--mat-sys-title-small);
    }

    thead tr:first-child th + th {
      text-align: center;
    }

    .groupe {
      background: var(--mat-sys-surface-container-highest);
      font: var(--mat-sys-title-small);
    }

    tbody th[scope='row'] {
      min-width: 220px;
      font: var(--mat-sys-body-medium);
    }

    .type {
      display: block;
      color: var(--mat-sys-on-surface-variant);
      font: var(--mat-sys-body-small);
    }

    .cellule {
      white-space: nowrap;
    }

    .cellule.echec {
      background: var(--mat-sys-error-container);
      color: var(--mat-sys-on-error-container);
    }

    .cellule mat-icon {
      width: 18px;
      height: 18px;
      font-size: 18px;
      vertical-align: middle;
    }

    .ratio {
      margin-inline-end: 4px;
      font: var(--mat-sys-title-small);
    }

    .mini {
      display: inline-grid;
      place-items: center;
      width: 20px;
      height: 20px;
      margin-inline-end: 6px;
      border: 1px solid var(--mat-sys-outline);
      border-radius: var(--mat-sys-corner-extra-small);
      vertical-align: middle;
    }

    .mini span {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .regression {
      display: block;
      font: var(--mat-sys-label-medium);
    }

    .vh {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }

    .sondes {
      position: absolute;
      width: 0;
      height: 0;
      overflow: hidden;
      visibility: hidden;
    }
  `,
})
export class MatriceContrastePage {
  protected readonly modes = MODES.map((mode) => ({
    ...mode,
    label: SCHEME_LABEL[mode.scheme],
  }));
  protected readonly families = FAMILIES.map((id) => ({ id, label: familyLabel(id) }));

  private readonly probes = viewChildren<ElementRef<HTMLElement>>('sonde');
  private readonly values = signal<ModeValues>({});
  protected readonly ready = signal(false);

  protected readonly onlyProblems = signal(false);
  protected readonly withDecorative = signal(false);

  private readonly rows = computed(() => {
    const pairs = this.withDecorative()
      ? COLOR_PAIRS
      : COLOR_PAIRS.filter((pair) => pair.kind !== 'decoratif');
    return buildMatrix(this.values(), pairs);
  });

  protected readonly resume = computed(() => {
    const result = summary(this.rows());
    return MODES.map((mode) => {
      const entry = result[mode.id];
      return {
        id: mode.id,
        label: `${familyLabel(mode.family)}, ${mode.scheme === 'light' ? 'clair' : 'sombre'}`,
        fails: plural(entry.total, 'échec'),
        regressions: plural(entry.regressions, 'régression'),
      };
    });
  });

  protected readonly groups = computed(() => {
    const values = this.values();
    const shown = this.onlyProblems()
      ? this.rows().filter((row) => row.cells.some((c) => c.status === 'echec' || c.regression))
      : this.rows();
    return COLOR_ROLES.map((group) => ({
      id: group.id,
      label: group.label,
      rows: shown.filter((row) => pairGroup(row.pair) === group).map((row) => this.toView(row, values)),
    })).filter((group) => group.rows.length > 0);
  });

  constructor() {
    afterNextRender(() => {
      const values: ModeValues = {};
      this.probes().forEach((probe, index) => {
        values[MODES[index].id] = Object.fromEntries(
          PAIR_ROLES.map((role) => [role, readColor(probe.nativeElement, colorVar(role, '--md-sys-color-'))]),
        );
      });
      this.values.set(values);
      this.ready.set(true);
    });
  }

  private toView(row: MatrixRow, values: ModeValues) {
    const pair: ColorPair = row.pair;
    const css = (color: Rgba | null | undefined) => (color ? toHex(color) : null);
    return {
      id: pair.id,
      label: pairLabel(pair),
      type: `${KIND_LABEL[pair.kind]}, ${minimumText(pair.min)}`,
      cells: row.cells.map((cell) => {
        const view = STATUS_VIEW[cell.status];
        const previous = cell.regression
          ? `inférieur à ${familyLabel(FAMILIES[FAMILIES.indexOf(cell.mode.family) - 1])} (${formatContrast(cell.previousRatio ?? 0)})`
          : null;
        return {
          mode: cell.mode.id,
          status: cell.status,
          fg: css(values[cell.mode.id]?.[pair.fg]),
          bg: css(values[cell.mode.id]?.[pair.bg]),
          ratio: cell.ratio === null ? '—' : formatContrast(cell.ratio),
          icon: view.icon,
          statusText: view.text,
          showStatus: cell.status === 'echec',
          regression: previous,
        };
      }),
    };
  }
}
