# Ajouter un composant ou une variante

## 1. Ajouter une page de composant

1. Créer `src/app/pages/composants/<id>/<id>.page.ts` (l'`<id>` est en kebab-case, en français, sans accent : `liste-deroulante`).
2. Ajouter une entrée à `CATALOG` dans `src/app/core/catalog/catalog.registry.ts` :

```ts
{
  id: 'mon-composant',
  label: 'Mon composant',                 // libellé français, affiché partout
  category: 'formulaires',                // une des 7 catégories (`fondations` : pages Fondations)
  icon: 'edit_note',                      // ligature Material Symbols
  loadComponent: () =>
    import('../../pages/composants/mon-composant/mon-composant.page').then((m) => m.MonComposantPage),
},
```

3. Vérifier : `ng build`, `ng lint`, `ng test --watch=false`. Le test du registre vérifie que chaque entrée a une route, que les `id` sont uniques et que les catégories existent.

La route, l'entrée de navigation, la carte d'accueil et le titre d'onglet sont dérivés du registre : rien d'autre à modifier.

## 2. Gabarit de page

```ts
import { Component } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  decochee: `<mat-checkbox>Décochée</mat-checkbox>`,
  cochee: `<mat-checkbox checked>Cochée</mat-checkbox>`,
};

@Component({
  selector: 'app-case-a-cocher-page',
  imports: [MatCheckbox, Specimen, SpecimenSection],
  template: `
    <h1>Case à cocher</h1>

    <app-specimen-section title="États">
      <app-specimen label="Décochée" api="mat-checkbox" [snippet]="snippets.decochee">
        <mat-checkbox>Décochée</mat-checkbox>
      </app-specimen>
      <app-specimen label="Cochée" api="checked" [snippet]="snippets.cochee">
        <mat-checkbox checked>Cochée</mat-checkbox>
      </app-specimen>
    </app-specimen-section>
  `,
})
export class CaseACocherPage {
  protected readonly snippets = SNIPPETS;
}
```

Règles de la maison :

- Template **inline** (pages légères), pas de `standalone: true`, pas d'`OnPush` explicite.
- Les snippets sont **écrits à la main** dans une constante `SNIPPETS` en tête de fichier (aucune génération automatique). Le snippet doit correspondre à ce qui est rendu.
- `<h1>` = nom du composant ; sections en `<h2>` via `app-specimen-section`.
- `label` du specimen en français, `api` = l'attribut, l'input ou le jeton réellement utilisé.
- Un specimen par variante ; regrouper les états voisins dans un même specimen (ex. tous les boutons désactivés).
- Importer uniquement les directives/composants utilisés (pas de module global, pas de `CommonModule`).

## 3. Largeur des colonnes

Les composants larges débordent des colonnes par défaut (300 px). Régler la section :

```html
<app-specimen-section minWidth="420px" title="…">
```

Valeurs en usage : 300 (défaut), 320–360 (champs, cartes, tableaux, listes, grille, arbre), 400–420 (menu latéral, panneau extensible, étapes), 440 (pagination).

## 4. Pièges de template et de code

- **Booléens** : toujours `[disabledInteractive]="true"`, `[matRippleCentered]="true"`, `[inline]="true"`… Un attribut chaîne (`matRippleCentered`) est rejeté à la compilation pour les inputs non transformés en booléen.
- **Arobase** dans un template : écrire `&#64;` (ex. `nom&#64;domaine.fr`), `@` ouvre un bloc de contrôle.
- **Accolades** `{` `}` littérales dans un template : à éviter (écrire le code d'exemple dans la constante `SNIPPETS`, pas dans le template).
- **Snippets** : en chaîne à backticks ; pour inclure un backtick ou `${`, l'échapper (`\``).
- **Références de template** sur un composant Material (`#bouton` sur un `matButton`) donnent l'instance du composant, pas l'élément DOM : entourer d'un `<span #ref>` quand une API attend un `HTMLElement` (ex. `matRippleTrigger`).
- **`hasBackdrop`** se règle sur `mat-sidenav-container`, pas sur `mat-sidenav`.
- **Drawers ouverts statiquement** (`over`/`push`) créent un piège de focus et une violation axe (`aria-hidden-focus`) : les laisser fermés avec un bouton qui appelle `toggle()`.
- **Spinner dans un bouton** : utiliser `showProgress` + `<mat-progress-spinner progressIndicator aria-hidden="true" [attr.tabindex]="null">` et un `aria-label` sur le bouton (sinon violations `button-name` et `nested-interactive`).
- **Composants interactifs sans libellé** : ajouter `aria-label` (boutons icône, curseurs, interrupteurs sans texte, chips amovibles…).
- **`mat-nav-list`** : un `aria-label` unique si plusieurs listes de navigation sont sur la même page (règle axe `landmark-unique`).
- **Champ de saisie de chips** : placer `<input [matChipInputFor]>` **après** `mat-chip-grid`, pas à l'intérieur (règle axe `aria-required-children`).
- **Contrastes** : utiliser les variables `--mat-sys-*` (jamais de couleurs en dur) ; pour redéfinir un style interne de Material, augmenter la spécificité (ex. `mat-grid-tile .mat-grid-tile-header`).
- **Dates** : créer les `Date` dans la classe, pas dans le template.
- **Popups avec contenu** (dialog, bottom-sheet, snackbar personnalisé) : déclarer un petit composant dans le même fichier de page, avant `SNIPPETS`.
- **Libellés Material en anglais** : si le composant a une classe `*Intl`, fournir la version française au niveau de la page (voir `core/i18n/intl-fr.ts`).

## 5. Surcharger un composant : mixins `mat.<composant>-overrides`

Angular Material 22 n'a pas d'API de taille, de forme ni de couleur de rôle. Pour les montrer, **ne pas écrire de variables `--mat-<composant>-*` à la main** : utiliser le mixin Sass `mat.<composant>-overrides` sur une classe de la page (`@use '@angular/material' as mat;`). Les noms de jetons s'écrivent **sans** le préfixe du composant (`--mat-button-filled-container-shape` → `mat.button-overrides((filled-container-shape: …))`) et sont validés à la compilation : un nom inconnu fait échouer Sass en listant les jetons valides, ce qui sert aussi à les découvrir (`@include mat.badge-overrides((nope: 1px))`). La page « Styling » de chaque composant sur material.angular.dev décrit les mêmes jetons.

```scss
@use '@angular/material' as mat;

.petit {
  @include mat.button-overrides((
    filled-container-height: 32px,
    filled-horizontal-padding: 12px,
    filled-label-text-size: var(--mat-sys-label-medium-size),
  ));
}
```

Règles :

- **Valeur en dur seulement s'il n'existe pas de jeton système.** Couleurs : `var(--mat-sys-*)` par paires fond/texte (`primary`/`on-primary`…). Formes : `var(--mat-sys-corner-*)` (`none`, `extra-small`, `small`, `medium`, `large`, `extra-large`, `full`). Texte : `var(--mat-sys-<rôle>-size)` (`label-medium` 12 px, `label-large` 14 px, `title-medium` 16 px, `title-large` 22 px…). Ombres : `var(--mat-sys-level1)` à `level5`. Opacités d'état : `var(--mat-sys-hover-state-layer-opacity)`, `focus-…`, `pressed-…`. Hauteurs, largeurs, marges, tailles d'icône, épaisseurs et durées n'ont pas de jeton système (les `--mat-sys-motion-*` ne sont pas émis par `mat.theme()`) : px acceptés.
- Les jetons se posent sur l'élément qui porte la classe et **s'héritent** : un conteneur peut les poser pour tous ses composants (ex. `mat.icon-overrides((color: …))` sur un `div`).
- **Contenus en overlay** (panneaux de menu/select/autocomplete, dialog, bottom-sheet, snackbar, infobulle, calendrier) : ils sont hors du composant, donc hors de l'encapsulation. Donner une classe via `panelClass` (ou `class`, `tooltipClass`) et écrire la règle en global dans `styles` : `::ng-deep .perso-xxx { @include mat.menu-overrides((...)); }`.
- Bouton icône : surcharger aussi la taille du `.mat-icon` interne (le jeton `icon-size` ne redimensionne pas `mat-icon`, qui n'a d'ailleurs aucun jeton de taille : `font-size`, `width`, `height`).
- Dans la page, indiquer en description de section que la variante vient des mixins et non d'une API native ; le snippet contient le template **et** le SCSS.
- Garder le SCSS compact (budget `anyComponentStyle` 5 kB / 8 kB) : mixins locaux et sélecteurs groupés. Utile pour des rôles de couleur : définir des variables intermédiaires (`--r-f`, `--r-c`…) par rôle puis passer `var(--r-f)` aux mixins, plutôt que répéter `var(--mat-sys-*)` pour chaque variante.

## 6. Ajouter une paire ou un rôle de couleur (pages Fondations)

Les pages Couleurs et Matrice de contraste lisent une source unique : `src/app/core/tokens/color-roles.ts`.

- **Une paire** = une ligne dans `COLOR_PAIRS` : `text('on-surface', 'secondary-container', 'Ligne sélectionnée du tableau')` (texte, seuil 4,5), ou `pair('outline', 'surface', 'interface', …)` (seuil 3) / `'decoratif'` (ratio affiché, sans seuil). Les rôles sont des suffixes (`on-primary`) ; la paire se range dans le groupe de son rôle de premier plan et apparaît partout (page Couleurs, matrice, résumés). Les paires « usages observés dans les composants » se complètent à la main quand l'[inspecteur de contraste](inspecteur-contraste.md) révèle une paire non couverte. Pas de `shadow` ni de `scrim` (transparents, donc sans ratio).
- **Un rôle** = un suffixe dans un groupe de `COLOR_ROLES` (origine `md3` : lu en `--mat-sys-<suffixe>` sur le thème courant et en `--md-sys-color-<suffixe>` dans la matrice ; origine `design-system` : `--app-color-<suffixe>`, le préfixe étant `DS_PREFIX`). `color-roles.spec.ts` vérifie l'unicité et que chaque paire n'utilise que des rôles connus.
- Tout exemple qui utilise une variable `--app-*` (hors MD3) porte `<app-token-badge />` (`<app-token-badge [custom]="false" />` pour un jeton MD3 voisin) : le designer doit voir qu'il a créé un jeton qui génère une variable personnalisée. Ajouter aussi la phrase d'explication dans la `description` de la section.
- Les snippets de ces pages sont **dérivés des données** (exception à la règle des snippets écrits à la main : il n'y a pas de composant Material à recopier, seulement l'usage des variables).

## 7. Ajouter un thème, un mode ou une densité

Voir [themes-et-styles.md](themes-et-styles.md) : le thème se déclare à la fois dans `src/styles.scss` (map `$themes`) et dans `src/app/core/theme/themes.ts` (liste `THEMES` avec libellé et couleur d'aperçu, type `ThemeId`).

## 8. Vérification d'une nouvelle page

Voir [qualite-et-accessibilite.md](qualite-et-accessibilite.md) : build, lint, tests, contrôle visuel dans au moins deux thèmes en clair et en sombre, passe axe-core.
