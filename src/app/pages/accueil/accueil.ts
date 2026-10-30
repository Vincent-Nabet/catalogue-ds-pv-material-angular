import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatNavList } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { CATALOG_GROUPS } from '../../core/catalog/catalog.registry';

@Component({
  selector: 'app-accueil',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatIcon,
    MatListItem,
    MatNavList,
    RouterLink,
  ],
  template: `
    <h1>Catalogue des composants Angular Material</h1>
    <p>Chaque page présente les variantes et états d’un composant.</p>
    <div class="grille">
      @for (group of groups; track group.id) {
        <mat-card appearance="outlined">
          <mat-card-header>
            <mat-card-title>
              <h2><mat-icon>{{ group.icon }}</mat-icon> {{ group.label }}</h2>
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-nav-list [attr.aria-label]="group.label">
              @for (entry of group.entries; track entry.id) {
                <a mat-list-item [routerLink]="['/composants', entry.id]">
                  <mat-icon matListItemIcon>{{ entry.icon }}</mat-icon>
                  <span matListItemTitle>{{ entry.label }}</span>
                </a>
              }
            </mat-nav-list>
          </mat-card-content>
        </mat-card>
      }
    </div>
  `,
  styles: `
    .grille {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    }

    h2 {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0;
      font: var(--mat-sys-title-medium);
    }
  `,
})
export class Accueil {
  protected readonly groups = CATALOG_GROUPS;
}
