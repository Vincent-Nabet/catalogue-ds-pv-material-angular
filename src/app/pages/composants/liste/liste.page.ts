import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  MatActionList,
  MatList,
  MatListItem,
  MatListItemAvatar,
  MatListItemIcon,
  MatListItemLine,
  MatListItemMeta,
  MatListItemTitle,
  MatListOption,
  MatNavList,
  MatSelectionList,
} from '@angular/material/list';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  simple: `<mat-list>
  <mat-list-item>Photos</mat-list-item>
  <mat-list-item>Documents</mat-list-item>
  <mat-list-item>Musique</mat-list-item>
</mat-list>`,
  icones: `<mat-list>
  <mat-list-item>
    <mat-icon matListItemIcon>folder</mat-icon>
    <span matListItemTitle>Photos</span>
  </mat-list-item>
  <mat-list-item>
    <mat-icon matListItemIcon>description</mat-icon>
    <span matListItemTitle>Documents</span>
  </mat-list-item>
</mat-list>`,
  lignes: `<mat-list>
  <mat-list-item>
    <span matListItemTitle>Photos</span>
    <span matListItemLine>Mis à jour hier</span>
    <span matListItemMeta>12 éléments</span>
  </mat-list-item>
</mat-list>`,
  avatar: `<mat-list>
  <mat-list-item>
    <div matListItemAvatar class="avatar">M</div>
    <span matListItemTitle>Marie Dupont</span>
    <span matListItemLine>Cheffe de projet</span>
  </mat-list-item>
</mat-list>`,
  actions: `<mat-action-list>
  <button mat-list-item>Modifier</button>
  <button mat-list-item>Dupliquer</button>
  <button mat-list-item disabled>Supprimer</button>
</mat-action-list>`,
  selection: `<mat-selection-list aria-label="Ingrédients">
  <mat-list-option selected>Farine</mat-list-option>
  <mat-list-option>Sucre</mat-list-option>
  <mat-list-option>Œufs</mat-list-option>
  <mat-list-option disabled>Lait (épuisé)</mat-list-option>
</mat-selection-list>`,
  selectionUnique: `<mat-selection-list aria-label="Taille" [multiple]="false">
  <mat-list-option>Petite</mat-list-option>
  <mat-list-option selected>Moyenne</mat-list-option>
  <mat-list-option>Grande</mat-list-option>
</mat-selection-list>`,
  navigation: `<mat-nav-list aria-label="Exemple de navigation">
  <a mat-list-item [activated]="true">Accueil</a>
  <a mat-list-item>Documents</a>
  <a mat-list-item>Paramètres</a>
</mat-nav-list>`,
  troisLignes: `<mat-list>
  <mat-list-item lines="3">
    <span matListItemTitle>Titre</span>
    <span matListItemLine>Deuxième ligne</span>
    <span matListItemLine>Troisième ligne</span>
  </mat-list-item>
</mat-list>`,
  caseAvant: `<mat-selection-list aria-label="Ingrédients">
  <mat-list-option togglePosition="before">Farine</mat-list-option>
  <mat-list-option togglePosition="before" selected>Sucre</mat-list-option>
</mat-selection-list>`,
  metaIcone: `<mat-list>
  <mat-list-item>
    <span matListItemTitle>Message</span>
    <mat-icon matListItemMeta>chevron_right</mat-icon>
  </mat-list-item>
</mat-list>`,
  sansCoche: `<mat-selection-list aria-label="Taille" [multiple]="false" hideSingleSelectionIndicator>
  <mat-list-option>Petite</mat-list-option>
  <mat-list-option selected>Moyenne</mat-list-option>
</mat-selection-list>`,
};

@Component({
  selector: 'app-liste-page',
  imports: [
    MatActionList,
    MatIcon,
    MatList,
    MatListItem,
    MatListItemAvatar,
    MatListItemIcon,
    MatListItemLine,
    MatListItemMeta,
    MatListItemTitle,
    MatListOption,
    MatNavList,
    MatSelectionList,
    Specimen,
    SpecimenSection,
  ],
  template: `
    <h1>Liste</h1>

    <app-specimen-section minWidth="360px" title="Listes simples">
      <app-specimen label="Simple" api="mat-list" [snippet]="snippets.simple">
        <mat-list>
          <mat-list-item>Photos</mat-list-item>
          <mat-list-item>Documents</mat-list-item>
          <mat-list-item>Musique</mat-list-item>
        </mat-list>
      </app-specimen>
      <app-specimen label="Avec icônes" api="matListItemIcon" [snippet]="snippets.icones">
        <mat-list>
          <mat-list-item>
            <mat-icon matListItemIcon>folder</mat-icon>
            <span matListItemTitle>Photos</span>
          </mat-list-item>
          <mat-list-item>
            <mat-icon matListItemIcon>description</mat-icon>
            <span matListItemTitle>Documents</span>
          </mat-list-item>
        </mat-list>
      </app-specimen>
      <app-specimen label="Deux lignes et méta" api="matListItemLine / matListItemMeta" [snippet]="snippets.lignes">
        <mat-list>
          <mat-list-item>
            <span matListItemTitle>Photos</span>
            <span matListItemLine>Mis à jour hier</span>
            <span matListItemMeta>12 éléments</span>
          </mat-list-item>
        </mat-list>
      </app-specimen>
      <app-specimen label="Avec avatar" api="matListItemAvatar" [snippet]="snippets.avatar">
        <mat-list>
          <mat-list-item>
            <div matListItemAvatar class="avatar">M</div>
            <span matListItemTitle>Marie Dupont</span>
            <span matListItemLine>Cheffe de projet</span>
          </mat-list-item>
        </mat-list>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section minWidth="360px" title="Listes interactives">
      <app-specimen label="Liste d’actions" api="mat-action-list" [snippet]="snippets.actions">
        <mat-action-list>
          <button mat-list-item>Modifier</button>
          <button mat-list-item>Dupliquer</button>
          <button mat-list-item disabled>Supprimer</button>
        </mat-action-list>
      </app-specimen>
      <app-specimen label="Sélection multiple" api="mat-selection-list" [snippet]="snippets.selection">
        <mat-selection-list aria-label="Ingrédients">
          <mat-list-option selected>Farine</mat-list-option>
          <mat-list-option>Sucre</mat-list-option>
          <mat-list-option>Œufs</mat-list-option>
          <mat-list-option disabled>Lait (épuisé)</mat-list-option>
        </mat-selection-list>
      </app-specimen>
      <app-specimen label="Sélection unique" api='[multiple]="false"' [snippet]="snippets.selectionUnique">
        <mat-selection-list aria-label="Taille" [multiple]="false">
          <mat-list-option>Petite</mat-list-option>
          <mat-list-option selected>Moyenne</mat-list-option>
          <mat-list-option>Grande</mat-list-option>
        </mat-selection-list>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section minWidth="360px" title="Autres variantes">
      <app-specimen label="Liste de navigation (élément actif)" api="mat-nav-list / activated" [snippet]="snippets.navigation">
        <mat-nav-list aria-label="Exemple de navigation">
          <a mat-list-item [activated]="true">Accueil</a>
          <a mat-list-item>Documents</a>
          <a mat-list-item>Paramètres</a>
        </mat-nav-list>
      </app-specimen>
      <app-specimen label="Trois lignes" api="matListItemLine ×2" [snippet]="snippets.troisLignes">
        <mat-list>
          <mat-list-item lines="3">
            <span matListItemTitle>Titre</span>
            <span matListItemLine>Deuxième ligne</span>
            <span matListItemLine>Troisième ligne</span>
          </mat-list-item>
        </mat-list>
      </app-specimen>
      <app-specimen label="Méta en icône" api="matListItemMeta" [snippet]="snippets.metaIcone">
        <mat-list>
          <mat-list-item>
            <span matListItemTitle>Message</span>
            <mat-icon matListItemMeta>chevron_right</mat-icon>
          </mat-list-item>
        </mat-list>
      </app-specimen>
      <app-specimen label="Case avant le libellé" api='togglePosition="before"' [snippet]="snippets.caseAvant">
        <mat-selection-list aria-label="Ingrédients, case avant">
          <mat-list-option togglePosition="before">Farine</mat-list-option>
          <mat-list-option togglePosition="before" selected>Sucre</mat-list-option>
        </mat-selection-list>
      </app-specimen>
      <app-specimen label="Choix unique sans coche" api="hideSingleSelectionIndicator" [snippet]="snippets.sansCoche">
        <mat-selection-list aria-label="Taille sans coche" [multiple]="false" hideSingleSelectionIndicator>
          <mat-list-option>Petite</mat-list-option>
          <mat-list-option selected>Moyenne</mat-list-option>
        </mat-selection-list>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    mat-list,
    mat-action-list,
    mat-selection-list {
      width: 100%;
    }

    .avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--mat-sys-primary-container);
      color: var(--mat-sys-on-primary-container);
    }
  `,
})
export class ListePage {
  protected readonly snippets = SNIPPETS;
}
