import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  effect,
  inject,
  output,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ImportedThemes } from '../../core/theme/imported-themes';
import { ThemeService } from '../../core/theme/theme.service';
import { DEFAULT_THEME_ID, parseImportedThemeId, themeInfo } from '../../core/theme/themes';

/** Liste des thèmes importés : consultation et suppression (confirmation en ligne, sans boîte de dialogue). */
@Component({
  selector: 'app-imported-themes-list',
  imports: [MatButton, MatIcon],
  template: `
    <section aria-labelledby="liste-titre">
      <h2 id="liste-titre">Thèmes importés ({{ lignes().length }})</h2>
      <p class="annonce" role="status" aria-live="polite">{{ annonce() }}</p>

      @if (lignes().length === 0) {
        <p class="vide">Aucun thème importé. Importez un zip de tokens ci-dessus.</p>
      } @else {
        <ul class="liste">
          @for (ligne of lignes(); track ligne.id) {
            <li class="theme">
              @if (confirmation() === ligne.id) {
                <div
                  class="confirmation"
                  role="group"
                  [attr.aria-labelledby]="'confirmation-' + ligne.id"
                >
                  <p [id]="'confirmation-' + ligne.id">Supprimer « {{ ligne.name }} » ?</p>
                  <div class="actions">
                    <button matButton="filled" type="button" (click)="supprimer(ligne.id)">
                      Supprimer
                    </button>
                    <button
                      #annuler
                      matButton="outlined"
                      type="button"
                      (click)="annulerSuppression(ligne.id)"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              } @else {
                <div class="corps">
                  <h3 #titre [id]="'theme-' + ligne.id" tabindex="-1">{{ ligne.name }}</h3>
                  <p class="meta">Importé le {{ ligne.date }} · {{ ligne.sourceName }}</p>
                  <ul class="familles" [attr.aria-label]="'Familles de ' + ligne.name">
                    @for (famille of ligne.familles; track famille.id) {
                      <li>
                        <span
                          class="pastille"
                          aria-hidden="true"
                          [style.background-color]="famille.apercu"
                        ></span>
                        {{ famille.libelle }}
                        @if (famille.active) {
                          <strong class="actif">(thème actif)</strong>
                        }
                      </li>
                    }
                  </ul>
                  @if (ligne.warnings.length > 0) {
                    <details>
                      <summary>
                        {{ ligne.warnings.length }}
                        {{ ligne.warnings.length > 1 ? 'avertissements' : 'avertissement' }}
                      </summary>
                      <ul>
                        @for (warning of ligne.warnings; track $index) {
                          <li>{{ warning }}</li>
                        }
                      </ul>
                    </details>
                  }
                </div>
                <button
                  matButton="outlined"
                  type="button"
                  [id]="'supprimer-' + ligne.id"
                  [attr.aria-label]="'Supprimer le thème ' + ligne.name"
                  (click)="confirmation.set(ligne.id)"
                >
                  <mat-icon>delete</mat-icon>
                  Supprimer
                </button>
              }
            </li>
          }
        </ul>
      }
    </section>
  `,
  styles: `
    h2 {
      margin: 32px 0 8px;
      font: var(--mat-sys-title-large);
    }

    .annonce:empty {
      margin: 0;
    }

    .annonce,
    .vide {
      margin: 8px 0;
      color: var(--mat-sys-on-surface-variant);
    }

    .liste,
    .familles {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .liste {
      display: grid;
      gap: 12px;
    }

    .theme {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      padding: 16px;
      border: 1px solid var(--mat-sys-outline-variant);
      border-radius: var(--mat-sys-corner-medium);
      background: var(--mat-sys-surface-container-low);
    }

    .corps {
      flex: 1 1 280px;
      min-width: 0;
    }

    h3 {
      margin: 0;
      font: var(--mat-sys-title-medium);
      overflow-wrap: anywhere;
    }

    .meta {
      margin: 4px 0 8px;
      color: var(--mat-sys-on-surface-variant);
      overflow-wrap: anywhere;
    }

    .familles {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 16px;
    }

    .pastille {
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-inline-end: 4px;
      border: 1px solid var(--mat-sys-outline);
      border-radius: 50%;
      vertical-align: middle;
    }

    .actif {
      font: var(--mat-sys-label-large);
    }

    details {
      margin-block-start: 8px;
    }

    summary {
      cursor: pointer;
    }

    details ul {
      margin: 8px 0 0;
      overflow-wrap: anywhere;
    }

    .confirmation {
      display: flex;
      flex: 1 1 100%;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    .confirmation p {
      margin: 0;
      overflow-wrap: anywhere;
    }

    .actions {
      display: flex;
      gap: 8px;
    }
  `,
})
export class ImportedThemesList {
  private readonly service = inject(ThemeService);
  private readonly imported = inject(ImportedThemes);
  private readonly injector = inject(Injector);
  private readonly document = inject(DOCUMENT);

  private readonly titres = viewChildren<ElementRef<HTMLElement>>('titre');
  private readonly annuler = viewChild('annuler', { read: ElementRef });

  /** La dernière suppression a vidé la liste : l'appelant décide où va le focus. */
  readonly videe = output<void>();

  /** Identifiant de l'import dont la suppression attend une confirmation. */
  protected readonly confirmation = signal<string | null>(null);
  protected readonly annonce = signal('');

  protected readonly lignes = computed(() => {
    const actif = this.service.theme();
    return this.imported.themes().map((theme) => ({
      id: theme.id,
      name: theme.name,
      sourceName: theme.sourceName,
      date: this.formaterDate(theme.createdAt),
      warnings: theme.warnings,
      familles: theme.families.map((famille) => ({
        ...famille,
        active: actif === `${theme.id}-${famille.id}`,
      })),
    }));
  });

  constructor() {
    // La confirmation en ligne donne le focus à l'action sûre, « Annuler ».
    effect(() => this.annuler()?.nativeElement.focus());
  }

  /** Donne le focus au titre d'un thème (après son import) une fois la liste rendue. */
  focusTheme(importId: string): void {
    afterNextRender(
      () =>
        this.titres()
          .find((titre) => titre.nativeElement.id === `theme-${importId}`)
          ?.nativeElement.focus(),
      {
        injector: this.injector,
      },
    );
  }

  protected annulerSuppression(importId: string): void {
    this.confirmation.set(null);
    this.focusSupprimer(importId);
  }

  protected supprimer(importId: string): void {
    const lignes = this.lignes();
    const index = lignes.findIndex((ligne) => ligne.id === importId);
    const ligne = lignes[index];
    const etaitActif = parseImportedThemeId(this.service.theme())?.importId === importId;

    this.service.removeImportedTheme(importId);
    this.confirmation.set(null);
    this.annonce.set(
      `Thème « ${ligne.name} » supprimé.${etaitActif ? ` Retour au thème ${themeInfo(DEFAULT_THEME_ID)?.label}.` : ''}`,
    );

    // Le focus va sur « Supprimer » de la ligne qui prend la place de celle supprimée.
    afterNextRender(
      () => {
        const restantes = this.lignes();
        if (restantes.length === 0) this.videe.emit();
        else this.focusSupprimer(restantes[Math.min(index, restantes.length - 1)].id);
      },
      { injector: this.injector },
    );
  }

  private focusSupprimer(importId: string): void {
    afterNextRender(() => this.document.getElementById(`supprimer-${importId}`)?.focus(), {
      injector: this.injector,
    });
  }

  private formaterDate(iso: string): string {
    const date = new Date(iso);
    return Number.isNaN(date.getTime()) ? 'date inconnue' : date.toLocaleDateString('fr-FR');
  }
}
