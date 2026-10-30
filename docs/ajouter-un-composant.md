# Ajouter un composant ou une variante

## 1. Ajouter une page de composant

1. Créer `src/app/pages/composants/<id>/<id>.page.ts` (l'`<id>` est en kebab-case, en français, sans accent : `liste-deroulante`).
2. Ajouter une entrée à `CATALOG` dans `src/app/core/catalog/catalog.registry.ts` :

```ts
{
  id: 'mon-composant',
  label: 'Mon composant',                 // libellé français, affiché partout
  category: 'formulaires',                // une des 6 catégories
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

## 5. Surcharger la taille ou la forme (jetons CSS)

Angular Material 22 n'a pas d'API de taille. Pour montrer une taille ou une forme, surcharger les jetons sur une classe de la page (exemple de la page Bouton, en SCSS avec mixin) :

```scss
@mixin taille($hauteur, $marge, $texte) {
  @each $variante in (filled, tonal, outlined, text, protected) {
    --mat-button-#{$variante}-container-height: #{$hauteur};
    --mat-button-#{$variante}-horizontal-padding: #{$marge};
    --mat-button-#{$variante}-label-text-size: #{$texte};
  }
}
.petit { @include taille(32px, 12px, 12px); }
```

Pour un bouton icône, surcharger aussi la taille du `.mat-icon` interne (le jeton `--mat-icon-button-icon-size` ne redimensionne pas `mat-icon`). Indiquer dans la description de section que la variante est obtenue par jetons et non par une API native, et mettre le CSS dans le snippet.

## 6. Ajouter un thème, un mode ou une densité

Voir [themes-et-styles.md](themes-et-styles.md) : le thème se déclare à la fois dans `src/styles.scss` (map `$themes`) et dans `src/app/core/theme/themes.ts` (liste `THEMES` avec libellé et couleur d'aperçu, type `ThemeId`).

## 7. Vérification d'une nouvelle page

Voir [qualite-et-accessibilite.md](qualite-et-accessibilite.md) : build, lint, tests, contrôle visuel dans au moins deux thèmes en clair et en sombre, passe axe-core.
