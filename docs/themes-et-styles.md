# Thèmes et styles

## Principe

Tout le thème est porté par des **classes sur `<html>`**, posées par `ThemeService`, et par le mixin Sass `mat.theme()` d'Angular Material, qui émet des variables CSS `--mat-sys-*`. Comme `mat.theme()` utilise `light-dark()`, **un seul bloc de couleur par thème** suffit pour le clair et le sombre : le mode ne fait que changer `color-scheme`.

Le catalogue propose 6 palettes Material prédéfinies et 4 thèmes du design system (`tokens/`), ces derniers générés à part : voir la section suivante. S'y ajoutent les **thèmes importés** par l'utilisateur (zip de tokens, dans le navigateur) : voir plus bas.

### Thèmes du design system : générés et branchés

`npm run themes` produit dans `src/styles/themes-app/` des variables CSS MD3 + custom et un mixin Angular Material (`_themes-app.scss`) à partir des tokens. Le CSS est chargé par `angular.json`, le mixin est inclus par `styles.scss` pour les classes `theme-app`, `theme-app-contraste-moyen`, `theme-app-contraste-eleve` et `theme-app-monochrome` (entrées « Design system… » du sélecteur). Détails, options et intégration : [generation-themes.md](generation-themes.md).

### Thèmes importés dans le navigateur

Un thème importé (page « Thèmes importés », voir [fonctionnel.md](fonctionnel.md#thèmes-importés)) passe par le **même pont Material** que les thèmes du design system, sans Sass dans le navigateur :

- classes sur `<html>` : `theme-imp-<id>-<famille>` (id technique `imp-` + 6 caractères ; famille = suffixe de classe, `standard` pour la famille sans suffixe) pour les variables, et **`theme-importe`**, marqueur du pont Material ;
- `styles.scss` : `html.theme-importe` rejoint la liste de sélecteurs qui inclut `themes-app.theme()` (un seul bloc pour `theme-importe` et toutes les classes `theme-app*`). Le mixin n'émet que des `--mat-sys-*: var(--md-sys-*)` (valeurs figées, indépendantes des tokens) : il fonctionne tel quel pour n'importe quel jeu de tokens ;
- un élément **`<style id="catalogue-theme-importe">`** dans `<head>`, créé ou mis à jour par `ThemeService`, contient le CSS **du seul thème actif** (toutes ses familles) ; il est retiré quand on revient à un autre thème ;
- **spécificité** : les variables `--md-sys-*` et `--app-*` sont posées sous `html.theme-imp-<id>-<famille>` (0,1,1), pas sous `.theme-imp-…` seul : le `:root` du CSS statique (0,1,0) ne peut pas l'emporter par l'ordre des feuilles. Le CSS importé ne contient **aucun `:root`** (un seul `:root` laissé changerait les formes et la typographie de tous les thèmes tant que le `<style>` est présent) ;
- le clair/sombre vient de `color-scheme` (classes `scheme-*`) et `light-dark()` : rien de spécifique à l'import.

Vérifié dans Chrome : pour les 4 familles × clair/sombre, les 405 variables personnalisées (`--md-*`, `--mat-*`, `--app-*`) et leurs couleurs résolues sont identiques entre le thème intégré et le même zip importé (0 différence).

## `src/styles.scss`

```scss
@use 'sass:list';
@use '@angular/material' as mat;

$themes: (
  "azur":   (mat.$azure-palette,  mat.$blue-palette),
  "violet": (mat.$violet-palette, mat.$magenta-palette),
  "rose":   (mat.$rose-palette,   mat.$red-palette),
  "vert":   (mat.$green-palette,  mat.$spring-green-palette),
  "orange": (mat.$orange-palette, mat.$yellow-palette),
  "cyan":   (mat.$cyan-palette,   mat.$chartreuse-palette),
);   // (primaire, tertiaire) ; les clés sont entre guillemets (sinon « violet » est lu comme une couleur Sass)

html { @include mat.theme((color: (primary: azure, tertiary: blue), typography: Poppins, density: 0)); }
html.theme-<id>   { @include mat.theme((color: (primary: …, tertiary: …))); }   // boucle @each
html.density-<n>  { @include mat.theme((density: -n)); }                          // n de 0 à 4
html.scheme-light  { color-scheme: light; }
html.scheme-dark   { color-scheme: dark; }
html.scheme-system { color-scheme: light dark; }
```

Le `body` utilise `--mat-sys-surface`, `--mat-sys-on-surface` et `--mat-sys-body-medium`. Les `<h1>` de page (`main h1`) utilisent `--mat-sys-headline-medium`. Deux classes utilitaires servent aux pages Fondations : `.page-intro` (introduction sous le `<h1>`) et `.specimen-contenu` (contenu d'un specimen ancré en haut), voir [architecture.md](architecture.md). Une animation `apparition-page` (fondu + léger glissement, 220 ms, désactivée avec `prefers-reduced-motion`) s'applique à tout composant routé : `main > router-outlet + *`.

## Partial `src/styles/_roles.scss`

Mixins Sass « rôle de couleur appliqué à un composant Material » (`roles.checkbox(secondary)`, `roles.button(error)`…), partagés par les pages de composants. Ce n'est pas une feuille globale : rien n'est émis tant qu'une page ne l'inclut pas. Il est résolu par `stylePreprocessorOptions.includePaths: ["src/styles"]` (`angular.json`), donc `@use 'roles';` suffit dans un `styles:` inline. Les classes `.secondaire`, `.tertiaire`, `.erreur` restent propres à chaque page. Les mixins par rôle acceptent aussi `custom` (variables `--r-f`, `--r-sf`, `--r-c`, `--r-sc` posées par `ColorFamilyScope`) pour les familles `--app-color-*` du design system. Voir [ajouter-un-composant.md](ajouter-un-composant.md) §5.

## Combinaisons

| Axe | Valeurs | Classe sur `<html>` |
|---|---|---|
| Thème | azur, violet, rose, vert, orange, cyan ; thèmes du design system (`app`, `app-contraste-moyen`…) | `theme-<id>` |
| Thème importé | un par famille de chaque import | `theme-imp-<id>-<famille>` + `theme-importe` |
| Mode | light, dark, system | `scheme-<mode>` |
| Densité | 0 à −4 (4 px par cran) | `density-<n>` (n = valeur absolue) |

La densité agit sur la hauteur des composants (champs, boutons, listes…). Elle n'affecte pas les composants de contexte « tâche » (datepicker, menus).

## Ajouter un thème

1. `styles.scss` : ajouter une entrée dans `$themes` (clé entre guillemets).
2. `core/theme/themes.ts` : étendre le type `ThemeId` et ajouter `{ id, group, label, shortLabel, color }` à `THEMES` (`group` = sous-menu du sélecteur, voir `THEME_GROUPS`) (la couleur sert de pastille d'aperçu, valeur approchée du primaire).
3. Le service, le sélecteur et l'accueil s'adaptent seuls (compteur « N thèmes » dérivé de `THEMES.length`).

## Typographie

- **Poppins** (graisses 300, 400, 500, 600) chargée par `<link>` Google Fonts dans `index.html`, et passée à `mat.theme()` (`typography: Poppins`).
- Les styles du shell et des pages utilisent les variables de la typographie Material (`--mat-sys-title-large`, `--mat-sys-label-large`, `--mat-sys-body-medium`…), jamais de tailles en dur.
- Le code des snippets utilise la police monospace du navigateur.
- Hors ligne, le navigateur retombe sur sa police par défaut.

## Icônes

- **Material Symbols Outlined**, chargée par `<link>` Google Fonts.
- `<mat-icon>` pointe dessus grâce à `MatIconRegistry.setDefaultFontSetClass('material-symbols-outlined')` (voir `app.config.ts`). Les noms d'icônes sont des ligatures (`smart_button`, `progress_activity`…) : hors ligne, le nom s'affiche en texte.
- Les axes de la police se règlent avec `font-variation-settings` (`'FILL' 1`, `'wght' 700`, `'opsz' 48`).
- Les icônes de `mat-icon` sont décoratives par défaut (`aria-hidden="true"`). Pour une icône porteuse de sens : `aria-hidden="false"` + `aria-label`.

## Variables CSS utiles

| Besoin | Variable |
|---|---|
| Fond de page / texte | `--mat-sys-surface` / `--mat-sys-on-surface` |
| Texte secondaire | `--mat-sys-on-surface-variant` |
| Cadre d'un specimen | `--mat-sys-surface-container-low`, bordure `--mat-sys-outline-variant`, rayon `--mat-sys-corner-medium` |
| Couleurs d'accent | `--mat-sys-primary`, `--mat-sys-on-primary`, `--mat-sys-primary-container`, `--mat-sys-tertiary-container`, `--mat-sys-secondary-container` |
| Erreur | `--mat-sys-error` |
| Élévation | `--mat-sys-level1` … `--mat-sys-level5` |
| Formes | `--mat-sys-corner-small` / `medium` / `large` / `extra-large` / `full` |

## Jetons de composants surchargés

| Où | Jetons |
|---|---|
| Barre d'outils du shell | `mat.toolbar-overrides` (`container-background-color`, `container-text-color`), `mat.icon-button-overrides` (`icon-color`, `state-layer-color`) |
| Sidenav du shell | `mat.sidenav-overrides` (`container-background-color`) |
| Page Bouton (tailles) | `mat.button-overrides` (`{filled,tonal,outlined,text,protected}-{container-height,horizontal-padding,label-text-size}`), `mat.icon-button-overrides` (`state-layer-size`, `icon-size`) |
| Page Icône (couleurs) | `mat.icon-overrides` (`color`) |

Les surcharges de composants passent par les **mixins Sass `mat.<composant>-overrides`** (noms de jetons validés à la compilation), jamais par des variables `--mat-<composant>-*` écrites à la main. Les valeurs sont des jetons système (`--mat-sys-*`) dès qu'il en existe un ; voir [ajouter-un-composant.md](ajouter-un-composant.md) §5.

Toutes les variables `--mat-sys-*` sont surchargeables (en CSS ou avec `mat.theme-overrides`).

### Ce qui n'a pas de jeton système

`mat.theme()` n'émet ni jeton d'espacement, de hauteur ou de taille d'icône, ni jetons de mouvement (`--mat-sys-motion-*`). Restent donc en dur, faute d'équivalent : espacements et marges du catalogue, hauteurs/marges des boutons de la page Bouton, tailles des icônes, `letter-spacing`, `line-height` et `opacity` du shell, durées de transition de l'accueil, aperçu des pastilles de thème (`themes.ts`, couleurs affichées avant d'appliquer le thème).

## Styles du shell

- **Barre d'outils** : fond primaire, texte `on-primary`, logo dans une tuile `color-mix(on-primary 18 %)`, ombre `level2`. Le focus du lien de marque est un contour `on-primary`.
- **Sidenav** : fond `surface-container-low`, largeur 288 px, angles droits arrondis (`corner-large`), catégories en `label-large` majuscules, couleur primaire, avec icône 20 px.
- **Contenu** : `main` centré, `max-width: 1440px`, marges 32 px (16 px sous 600 px).
- **Accueil** : bandeau dégradé `primary-container` → `tertiary-container`, grande icône décorative, pastilles de compteurs, cartes avec tuile `secondary-container`, bordure primaire et ombre au survol.
