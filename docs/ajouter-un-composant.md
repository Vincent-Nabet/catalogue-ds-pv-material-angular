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
- **Rôles de couleur** (secondaire, tertiaire, erreur…) : utiliser le partial `src/styles/_roles.scss` (un mixin par composant : `checkbox`, `radio`, `slide-toggle`, `slider`, `chips`, `card`, `form-field`, `stepper`, `badge`, `toolbar`, `progress-bar`, `tabs`, `ripple`, `divider`, `button-toggle`, `button`), au lieu de réécrire un `@mixin role` dans la page. `angular.json` déclare `stylePreprocessorOptions.includePaths: ["src/styles"]`, donc un `styles:` inline fait simplement `@use 'roles';` puis `@include roles.checkbox(secondary);` sur la classe de la page (`.secondaire`, `.tertiaire`, `.erreur` restent dans la page : pas de classe globale, elles toucheraient tous les composants). Un composant sans mixin dans `_roles.scss` : l'y ajouter (même signature que les voisins : `$role`, ou les couleurs passées en paramètres si la page fait déjà ainsi), sans paramètre inutilisé.
- Les **snippets restent autonomes** : le SCSS affiché dans `SNIPPETS` contient les jetons complets (`mat.checkbox-overrides(…)`) et jamais `@use 'roles'`, qui renverrait à un fichier du projet inutilisable une fois le code copié. Le SCSS affiché et le SCSS réel de la page divergent donc légèrement, volontairement.
- Garder le SCSS compact (budget `anyComponentStyle` 5 kB / 8 kB) : mixins et sélecteurs groupés. Pour des rôles de couleur nombreux (page Bouton), définir des variables intermédiaires (`--r-f`, `--r-c`…) par rôle (`roles.button($role)`), lues une seule fois sur le groupe de classes de rôle (`roles.button-tokens`), plutôt que répéter les jetons pour chaque variante.

## 5 bis. Section « Couleurs personnalisées » (familles du design system)

Chaque page qui montre des rôles de couleur M3 (secondaire, tertiaire, erreur) montre aussi les **familles `--app-color-*` du design system**, générées à partir des familles détectées dans le CSS chargé (aucune liste dans le code). Modèle : `case-a-cocher.page.ts` (cas simple), `bouton.page.ts` (le plus complet), `menu.page.ts` (overlay).

1. **Classe** : `private readonly detected = injectColorFamilies();` puis `families = computed(() => this.detected().map(({ id, label }) => ({ id, label, api: '<mixin> : <premier jeton>', snippet: customSnippet(id) })))`. `injectColorFamilies()` renvoie `[]` avec un thème Angular Material : la section est alors masquée par `@if (families().length > 0)`.
2. **Snippet** : fonction `customSnippet(id)` écrite à la main (template + SCSS avec les vrais `mat.xxx-overrides(…)` et `var(--app-color-${id})`, `var(--app-color-on-${id})`, `…-${id}-container`, `…-on-${id}-container`). Jamais de `--r-*` dans le snippet : ce sont des variables internes de la page.
3. **Template** : une `app-specimen-section` « Couleurs personnalisées », un `app-specimen` par famille avec `[custom]="true"` (pastille « Jeton personnalisé »), et le composant dans `<span [appColorFamily]="family.id">` (directive `ColorFamilyScope`, `display: contents`, pose `--r-f` rôle, `--r-sf` son `on-`, `--r-c` conteneur, `--r-sc` son `on-`). Libellés et `aria-label` uniques par famille.
4. **Styles** : `.perso { @include roles.xxx(custom); }` pour les mixins par rôle de `_roles.scss` (ils acceptent `custom` en plus de `secondary`…), ou `var(--r-f)`, `var(--r-sf)`, `var(--r-c)`, `var(--r-sc)` passés directement aux mixins par valeurs (`badge`, `toolbar`, `progress-bar`, `tabs`, `ripple`, `divider`, `button-toggle`).
5. **Panneaux ouverts** (menu, snackbar, sélecteurs de date et d'heure) : le panneau n'est pas toujours sous la page. Menu et snackbar sont rendus dans le conteneur de la surcouche CDK : injecter `OverlayFamily` et appeler `apply(family.id)` avant l'ouverture (`(click)` du bouton, ou avant `snackBar.open`). Les sélecteurs de date et d'heure ouvrent leur panneau **dans le champ** (élément `popover` enfant du `mat-form-field`) ou dans la surcouche selon le cas : envelopper les champs dans `[appColorFamily]` **et** appeler `apply` sur la sortie `(opened)` du sélecteur. Ne pas se fier à `(click)`/`(focusin)` sur le champ : `mat-datepicker-toggle` arrête la propagation du clic et Safari ne focalise pas un bouton à la souris. La règle du panneau reste globale (`::ng-deep .perso-xxx { … }`).
6. **Couleurs** : toujours le fond **et** son texte de la même famille (rôle / `on-`, `-container` / `on-…-container`). Un rôle utilisé seul comme texte sur la surface de la page (bouton texte ou contour, étiquette de champ, onglet actif) hérite du contraste du design system : voir [decisions-et-limites.md](decisions-et-limites.md#couleurs-personnalisées-sur-les-pages-de-composants).

## 6. Ajouter une paire ou un rôle de couleur (pages Fondations)

Les pages Couleurs et Matrice de contraste lisent une source unique : `src/app/core/tokens/color-roles.ts`.

- **Une paire** = une ligne dans `COLOR_PAIRS` : `text('on-surface', 'secondary-container', 'Ligne sélectionnée du tableau')` (texte, seuil 4,5), ou `pair('outline', 'surface', 'interface', …)` (seuil 3) / `'decoratif'` (ratio affiché, sans seuil). Les rôles sont des suffixes (`on-primary`) ; la paire se range dans le groupe de son rôle de premier plan et apparaît partout (page Couleurs, matrice, résumés). Les paires « usages observés dans les composants » se complètent à la main quand l'[inspecteur de contraste](inspecteur-contraste.md) révèle une paire non couverte. Pas de `shadow` ni de `scrim` (transparents, donc sans ratio).
- **Un rôle** = un suffixe dans un groupe de `COLOR_ROLES` (origine `md3` : lu en `--mat-sys-<suffixe>` sur le thème courant et en `--md-sys-color-<suffixe>` dans la matrice ; origine `design-system` : `--app-color-<suffixe>`, le préfixe étant `DS_PREFIX`). `color-roles.spec.ts` vérifie l'unicité et que chaque paire n'utilise que des rôles connus.
- **Détection automatique** : un nouveau rôle `--app-color-*` du design system (nouveau zip de thèmes) apparaît sans toucher au code, dans « Autres rôles » de la page Couleurs, avec la pastille « Jeton personnalisé » et sa valeur ; de même un `--app-shape-corner-*` ou un `--app-spacing-*` (Formes et espacements) et tout autre `--app-typescale-*` (« Autres jetons de typographie »). Une ligne dans `color-roles.ts` reste nécessaire pour son **libellé**, son **rang** (groupe, ordre) et ses **paires de contraste** : un rôle détecté n'a jamais de paire, on ne peut pas deviner son fond. Voir [decisions-et-limites.md](decisions-et-limites.md#détection-dynamique-des-jetons).
- Tout exemple qui utilise une variable `--app-*` (hors MD3) porte `<app-token-badge />` (`<app-token-badge [custom]="false" />` pour un jeton MD3 voisin) : le designer doit voir qu'il a créé un jeton qui génère une variable personnalisée. Ajouter aussi la phrase d'explication dans la `description` de la section.
- Les snippets de ces pages sont **dérivés des données** (exception à la règle des snippets écrits à la main : il n'y a pas de composant Material à recopier, seulement l'usage des variables).

## 7. Ajouter un thème, un mode ou une densité

Voir [themes-et-styles.md](themes-et-styles.md) : le thème se déclare à la fois dans `src/styles.scss` (map `$themes`) et dans `src/app/core/theme/themes.ts` (liste `THEMES` avec libellé et couleur d'aperçu, type `ThemeId`).

## 8. Vérification d'une nouvelle page

Voir [qualite-et-accessibilite.md](qualite-et-accessibilite.md) : build, lint, tests, contrôle visuel dans au moins deux thèmes en clair et en sombre, passe axe-core.
