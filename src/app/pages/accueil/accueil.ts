import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatListItemIcon, MatListItemTitle, MatNavList } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { CATALOG_GROUPS, COMPONENT_ENTRIES } from '../../core/catalog/catalog.registry';
import { THEMES } from '../../core/theme/themes';

@Component({
  selector: 'app-accueil',
  imports: [MatCard, MatIcon, MatListItem, MatListItemIcon, MatListItemTitle, MatNavList, RouterLink],
  template: `
    <section class="hero">
      <mat-icon class="deco">widgets</mat-icon>
      <h1>Catalogue des composants Angular Material</h1>
      <p>
        Toutes les variantes, tailles et états de chaque composant, avec un thème modifiable en direct et le code à copier.
      </p>
      <ul class="chiffres">
        <li><strong>{{ total }}</strong> composants</li>
        <li><strong>{{ categories }}</strong> catégories</li>
        <li><strong>{{ themes }}</strong> thèmes</li>
      </ul>
    </section>

    <div class="grille">
      @for (group of groups; track group.id) {
        <mat-card appearance="outlined" class="categorie">
          <header class="entete">
            <span class="tuile"><mat-icon>{{ group.icon }}</mat-icon></span>
            <div>
              <h2>{{ group.label }}</h2>
              <p>{{ group.entries.length }} {{ group.id === 'fondations' ? 'pages' : 'composants' }}</p>
            </div>
          </header>
          <mat-nav-list [attr.aria-label]="group.label">
            @for (entry of group.entries; track entry.id) {
              <a mat-list-item [routerLink]="['/composants', entry.id]">
                <mat-icon matListItemIcon>{{ entry.icon }}</mat-icon>
                <span matListItemTitle>{{ entry.label }}</span>
              </a>
            }
          </mat-nav-list>
        </mat-card>
      }
    </div>
  `,
  styles: `
    .hero {
      position: relative;
      overflow: hidden;
      margin-block-end: 32px;
      padding: 40px;
      border-radius: var(--mat-sys-corner-extra-large);
      background: linear-gradient(135deg, var(--mat-sys-primary-container), var(--mat-sys-tertiary-container));
      color: var(--mat-sys-on-primary-container);
    }

    .hero h1 {
      max-width: 30ch;
      margin: 0 0 12px;
      font: var(--mat-sys-display-small);
    }

    .hero p {
      max-width: 60ch;
      margin: 0 0 24px;
      font: var(--mat-sys-body-large);
    }

    .deco {
      position: absolute;
      inset-block-start: -24px;
      inset-inline-end: -24px;
      width: 220px;
      height: 220px;
      font-size: 220px;
      opacity: 0.14;
    }

    .chiffres {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .chiffres li {
      padding: 8px 16px;
      border-radius: var(--mat-sys-corner-full);
      background: color-mix(in srgb, var(--mat-sys-surface) 55%, transparent);
      font: var(--mat-sys-label-large);
    }

    .chiffres strong {
      font: var(--mat-sys-title-medium);
    }

    .grille {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    }

    .categorie {
      padding-block-end: 8px;
      transition: border-color 150ms ease, box-shadow 150ms ease;
    }

    .categorie:hover,
    .categorie:focus-within {
      border-color: var(--mat-sys-primary);
      box-shadow: var(--mat-sys-level2);
    }

    .entete {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 16px 8px;
    }

    .entete h2 {
      margin: 0;
      font: var(--mat-sys-title-medium);
    }

    .entete p {
      margin: 0;
      color: var(--mat-sys-on-surface-variant);
      font: var(--mat-sys-body-small);
    }

    .tuile {
      display: grid;
      flex: none;
      place-items: center;
      width: 48px;
      height: 48px;
      border-radius: var(--mat-sys-corner-medium);
      background: var(--mat-sys-secondary-container);
      color: var(--mat-sys-on-secondary-container);
    }

    @media (max-width: 599.98px) {
      .hero {
        padding: 24px;
      }
    }
  `,
})
export class Accueil {
  protected readonly groups = CATALOG_GROUPS;
  protected readonly total = COMPONENT_ENTRIES.length;
  protected readonly categories = CATALOG_GROUPS.length;
  protected readonly themes = THEMES.length;
}
