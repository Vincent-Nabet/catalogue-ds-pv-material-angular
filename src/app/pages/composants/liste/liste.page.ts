import { Component, computed } from '@angular/core';
import { injectColorFamilies } from '../../../core/tokens/color-families';
import { ColorFamilyScope } from '../../../shared/color-family-scope/color-family-scope';
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
import { ComposantRef } from '../../../shared/composant-ref/composant-ref';

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
  couleurs: `<mat-list class="liste-tertiaire">
  <mat-list-item>
    <mat-icon matListItemIcon>folder</mat-icon>
    <span matListItemTitle>Photos</span>
  </mat-list-item>
  <mat-list-item>
    <mat-icon matListItemIcon>description</mat-icon>
    <span matListItemTitle>Documents</span>
  </mat-list-item>
</mat-list>

@use '@angular/material' as mat;

.liste-tertiaire {
  @include mat.list-overrides((
    list-item-container-color: var(--mat-sys-tertiary-container),
    list-item-label-text-color: var(--mat-sys-on-tertiary-container),
    list-item-hover-label-text-color: var(--mat-sys-on-tertiary-container),
    list-item-focus-label-text-color: var(--mat-sys-on-tertiary-container),
    list-item-leading-icon-color: var(--mat-sys-on-tertiary-container),
    list-item-hover-leading-icon-color: var(--mat-sys-on-tertiary-container),
  ));
}`,
  indicateur: `<mat-nav-list class="liste-indicateur" aria-label="Navigation à indicateur personnalisé">
  <a mat-list-item [activated]="true">Accueil</a>
  <a mat-list-item>Documents</a>
  <a mat-list-item>Paramètres</a>
</mat-nav-list>

@use '@angular/material' as mat;

.liste-indicateur {
  @include mat.list-overrides((
    active-indicator-color: var(--mat-sys-tertiary-container),
    active-indicator-shape: var(--mat-sys-corner-small),
  ));
}`,
  compacte: `<mat-list class="liste-compacte">
  <mat-list-item>
    <mat-icon matListItemIcon>folder</mat-icon>
    <span matListItemTitle>Photos</span>
  </mat-list-item>
  <mat-list-item>
    <mat-icon matListItemIcon>description</mat-icon>
    <span matListItemTitle>Documents</span>
  </mat-list-item>
  <mat-list-item>
    <mat-icon matListItemIcon>music_note</mat-icon>
    <span matListItemTitle>Musique</span>
  </mat-list-item>
</mat-list>

@use '@angular/material' as mat;

.liste-compacte {
  @include mat.list-overrides((
    list-item-one-line-container-height: 40px,
    list-item-leading-icon-size: 20px,
    list-item-label-text-size: var(--mat-sys-body-medium-size),
  ));
}`,
  typographie: `<mat-list class="liste-typo">
  <mat-list-item>
    <span matListItemTitle>Photos</span>
    <span matListItemLine>Mis à jour hier</span>
  </mat-list-item>
  <mat-list-item>
    <span matListItemTitle>Documents</span>
    <span matListItemLine>Mis à jour aujourd’hui</span>
  </mat-list-item>
</mat-list>

@use '@angular/material' as mat;

.liste-typo {
  @include mat.list-overrides((
    list-item-label-text-weight: var(--mat-sys-title-medium-weight),
    list-item-supporting-text-size: var(--mat-sys-body-small-size),
    list-item-supporting-text-color: var(--mat-sys-primary),
  ));
}`,
};

/** Snippet d'une famille personnalisée, dérivé de son nom (la liste des familles est détectée, pas écrite à la main). */
function customSnippet(id: string): string {
  return `<mat-list class="${id}">
  <mat-list-item>
    <mat-icon matListItemIcon>folder</mat-icon>
    <span matListItemTitle>Photos</span>
  </mat-list-item>
  <mat-list-item>
    <mat-icon matListItemIcon>description</mat-icon>
    <span matListItemTitle>Documents</span>
  </mat-list-item>
</mat-list>

<mat-nav-list class="${id}" aria-label="Navigation ${id}">
  <a mat-list-item [activated]="true">Accueil</a>
  <a mat-list-item>Documents</a>
</mat-nav-list>

@use '@angular/material' as mat;

.${id} {
  @include mat.list-overrides((
    list-item-container-color: var(--app-color-${id}-container),
    list-item-label-text-color: var(--app-color-on-${id}-container),
    list-item-hover-label-text-color: var(--app-color-on-${id}-container),
    list-item-focus-label-text-color: var(--app-color-on-${id}-container),
    list-item-leading-icon-color: var(--app-color-on-${id}-container),
    list-item-hover-leading-icon-color: var(--app-color-on-${id}-container),
    /* Indicateur actif : texte sur-conteneur à 16 % sur le conteneur, pour garder le texte lisible */
    active-indicator-color: color-mix(in srgb, var(--app-color-on-${id}-container) 16%, var(--app-color-${id}-container)),
    active-indicator-shape: var(--mat-sys-corner-small),
  ));
}`;
}

@Component({
  selector: 'app-liste-page',
  imports: [
    ComposantRef,
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
    ColorFamilyScope,
  ],
  template: `
    <h1>Liste</h1>
    <app-composant-ref />

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

    <app-specimen-section
      minWidth="360px"
      title="Personnalisation (jetons)"
      description="Couleurs, indicateur actif, hauteur des lignes et typographie se règlent avec le mixin Sass mat.list-overrides ; les noms de jetons sont validés à la compilation."
    >
      <app-specimen label="Couleurs de rôle (tertiaire)" api="mat.list-overrides : list-item-container-color" [snippet]="snippets.couleurs">
        <mat-list class="liste-tertiaire">
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
      <app-specimen label="Indicateur actif personnalisé" api="mat.list-overrides : active-indicator-shape" [snippet]="snippets.indicateur">
        <mat-nav-list class="liste-indicateur" aria-label="Navigation à indicateur personnalisé">
          <a mat-list-item [activated]="true">Accueil</a>
          <a mat-list-item>Documents</a>
          <a mat-list-item>Paramètres</a>
        </mat-nav-list>
      </app-specimen>
      <app-specimen label="Liste compacte" api="mat.list-overrides : list-item-one-line-container-height" [snippet]="snippets.compacte">
        <mat-list class="liste-compacte">
          <mat-list-item>
            <mat-icon matListItemIcon>folder</mat-icon>
            <span matListItemTitle>Photos</span>
          </mat-list-item>
          <mat-list-item>
            <mat-icon matListItemIcon>description</mat-icon>
            <span matListItemTitle>Documents</span>
          </mat-list-item>
          <mat-list-item>
            <mat-icon matListItemIcon>music_note</mat-icon>
            <span matListItemTitle>Musique</span>
          </mat-list-item>
        </mat-list>
      </app-specimen>
      <app-specimen label="Typographie" api="mat.list-overrides : list-item-label-text-weight" [snippet]="snippets.typographie">
        <mat-list class="liste-typo">
          <mat-list-item>
            <span matListItemTitle>Photos</span>
            <span matListItemLine>Mis à jour hier</span>
          </mat-list-item>
          <mat-list-item>
            <span matListItemTitle>Documents</span>
            <span matListItemLine>Mis à jour aujourd’hui</span>
          </mat-list-item>
        </mat-list>
      </app-specimen>
    </app-specimen-section>

    @if (families().length > 0) {
      <app-specimen-section
        minWidth="360px"
        title="Couleurs personnalisées"
        description="Familles de couleur propres au design system (--app-color-*), détectées dans le CSS chargé : même principe que les rôles M3, appliqué avec les jetons du design system (fond et texte du conteneur ensemble ; l’indicateur actif de la liste de navigation en est un dérivé)."
      >
        @for (family of families(); track family.id) {
          <app-specimen [label]="family.label" [api]="family.api" [snippet]="family.snippet" [custom]="true">
            <span [appColorFamily]="family.id">
              <mat-list class="perso">
                <mat-list-item>
                  <mat-icon matListItemIcon>folder</mat-icon>
                  <span matListItemTitle>Photos {{ family.label }}</span>
                </mat-list-item>
                <mat-list-item>
                  <mat-icon matListItemIcon>description</mat-icon>
                  <span matListItemTitle>Documents {{ family.label }}</span>
                </mat-list-item>
              </mat-list>
              <mat-nav-list class="perso" [attr.aria-label]="'Navigation ' + family.label">
                <a mat-list-item [activated]="true">Accueil</a>
                <a mat-list-item>Documents</a>
                <a mat-list-item>Paramètres</a>
              </mat-nav-list>
            </span>
          </app-specimen>
        }
      </app-specimen-section>
    }
  `,
  styles: `
    @use '@angular/material' as mat;

    mat-list,
    mat-action-list,
    mat-selection-list {
      width: 100%;
    }

    .liste-tertiaire {
      @include mat.list-overrides(
        (
          list-item-container-color: var(--mat-sys-tertiary-container),
          list-item-label-text-color: var(--mat-sys-on-tertiary-container),
          list-item-hover-label-text-color: var(--mat-sys-on-tertiary-container),
          list-item-focus-label-text-color: var(--mat-sys-on-tertiary-container),
          list-item-leading-icon-color: var(--mat-sys-on-tertiary-container),
          list-item-hover-leading-icon-color: var(--mat-sys-on-tertiary-container),
        )
      );
    }

    .liste-indicateur {
      width: 100%;

      @include mat.list-overrides(
        (
          active-indicator-color: var(--mat-sys-tertiary-container),
          active-indicator-shape: var(--mat-sys-corner-small),
        )
      );
    }

    .perso {
      width: 100%;

      @include mat.list-overrides(
        (
          list-item-container-color: var(--r-c),
          list-item-label-text-color: var(--r-sc),
          list-item-hover-label-text-color: var(--r-sc),
          list-item-focus-label-text-color: var(--r-sc),
          list-item-leading-icon-color: var(--r-sc),
          list-item-hover-leading-icon-color: var(--r-sc),
          active-indicator-color: color-mix(in srgb, var(--r-sc) 16%, var(--r-c)),
          active-indicator-shape: var(--mat-sys-corner-small),
        )
      );
    }

    .liste-compacte {
      @include mat.list-overrides(
        (
          list-item-one-line-container-height: 40px,
          list-item-leading-icon-size: 20px,
          list-item-label-text-size: var(--mat-sys-body-medium-size),
        )
      );
    }

    .liste-typo {
      @include mat.list-overrides(
        (
          list-item-label-text-weight: var(--mat-sys-title-medium-weight),
          list-item-supporting-text-size: var(--mat-sys-body-small-size),
          list-item-supporting-text-color: var(--mat-sys-primary),
        )
      );
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

  private readonly detected = injectColorFamilies();

  /** Une famille par jeu `--app-color-*` complet (vide avec un thème Angular Material). */
  protected readonly families = computed(() =>
    this.detected().map(({ id, label }) => ({
      id,
      label,
      api: 'mat.list-overrides : list-item-container-color',
      snippet: customSnippet(id),
    })),
  );
}
