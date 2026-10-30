# Thèmes et styles

## Principe

Tout le thème est porté par des **classes sur `<html>`**, posées par `ThemeService`, et par le mixin Sass `mat.theme()` d'Angular Material, qui émet des variables CSS `--mat-sys-*`. Comme `mat.theme()` utilise `light-dark()`, **un seul bloc de couleur par thème** suffit pour le clair et le sombre : le mode ne fait que changer `color-scheme`.

Le catalogue propose 6 palettes Material prédéfinies et 4 thèmes du design system (`tokens/`), ces derniers générés à part : voir la section suivante.

### Thèmes du design system : générés et branchés

`npm run themes` produit dans `src/styles/themes-app/` des variables CSS MD3 + custom et un mixin Angular Material (`_themes-app.scss`) à partir des tokens. Le CSS est chargé par `angular.json`, le mixin est inclus par `styles.scss` pour les classes `theme-app`, `theme-app-contraste-moyen`, `theme-app-contraste-eleve` et `theme-app-monochrome` (entrées « Design system… » du sélecteur). Détails, options et intégration : [generation-themes.md](generation-themes.md).

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

Le `body` utilise `--mat-sys-surface`, `--mat-sys-on-surface` et `--mat-sys-body-medium`. Les `<h1>` de page (`main h1`) utilisent `--mat-sys-headline-medium`. Une animation `apparition-page` (fondu + léger glissement, 220 ms, désactivée avec `prefers-reduced-motion`) s'applique à tout composant routé : `main > router-outlet + *`.

## Combinaisons

| Axe | Valeurs | Classe sur `<html>` |
|---|---|---|
| Thème | azur, violet, rose, vert, orange, cyan | `theme-<id>` |
| Mode | light, dark, system | `scheme-<mode>` |
| Densité | 0 à −4 (4 px par cran) | `density-<n>` (n = valeur absolue) |

La densité agit sur la hauteur des composants (champs, boutons, listes…). Elle n'affecte pas les composants de contexte « tâche » (datepicker, menus).

## Ajouter un thème

1. `styles.scss` : ajouter une entrée dans `$themes` (clé entre guillemets).
2. `core/theme/themes.ts` : étendre le type `ThemeId` et ajouter `{ id, label, color }` à `THEMES` (la couleur sert de pastille d'aperçu, valeur approchée du primaire).
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
| Barre d'outils du shell | `--mat-toolbar-container-background-color`, `--mat-toolbar-container-text-color`, `--mat-icon-button-icon-color`, `--mat-icon-button-state-layer-color` |
| Sidenav du shell | `--mat-sidenav-container-background-color` |
| Page Bouton (tailles) | `--mat-button-{filled,tonal,outlined,text,protected}-{container-height,horizontal-padding,label-text-size,container-shape}`, `--mat-icon-button-state-layer-size`, `--mat-icon-button-icon-size` |

Toutes les variables `--mat-sys-*` sont surchargeables (en CSS ou avec `mat.theme-overrides`).

## Styles du shell

- **Barre d'outils** : fond primaire, texte `on-primary`, logo dans une tuile `color-mix(on-primary 18 %)`, ombre `level2`. Le focus du lien de marque est un contour `on-primary`.
- **Sidenav** : fond `surface-container-low`, largeur 288 px, angles droits arrondis (`corner-large`), catégories en `label-large` majuscules, couleur primaire, avec icône 20 px.
- **Contenu** : `main` centré, `max-width: 1440px`, marges 32 px (16 px sous 600 px).
- **Accueil** : bandeau dégradé `primary-container` → `tertiary-container`, grande icône décorative, pastilles de compteurs, cartes avec tuile `secondary-container`, bordure primaire et ombre au survol.
