# Architecture

## Pile technique

| Élément | Version / choix |
|---|---|
| Angular | 22.2 (standalone par défaut, **zoneless**, `OnPush` implicite) |
| Angular Material + CDK | 22.2.5, thème M3 via `mat.theme()` |
| Styles | SCSS (`inlineStyleLanguage: scss`) |
| Tests | Vitest (`@angular/build:unit-test`), jsdom |
| Lint | angular-eslint 22.6, typescript-eslint, préfixe `app` (éléments en kebab-case, directives en camelCase) |
| Formatage | Prettier : `printWidth: 100`, guillemets simples, parseur `angular` pour le HTML |
| Build | `@angular/build:application`, configuration `production` par défaut |
| Gestionnaire | npm 11 |

Pas de SSR, pas de service worker, pas de backend : application purement statique.

## Arborescence

```
src/
  index.html                 lang="fr", classe scheme-light, polices Google Fonts
  main.ts                    bootstrapApplication(App, appConfig)
  styles.scss                thèmes, modes, densité, animation de page, style des <h1>
  app/
    app.ts                   racine : <app-shell />
    app.config.ts            providers (routeur, locale fr, date adapter, icônes)
    app.routes.ts            routes générées depuis le registre
    core/
      catalog/catalog.registry.ts   SOURCE UNIQUE des composants + catégories
      theme/themes.ts               types et listes (thèmes, modes, densités)
      theme/theme.service.ts        @Service : état du thème + persistance
      i18n/intl-fr.ts               libellés français (paginator, datepicker, stepper)
    layout/
      shell/                 barre d'outils + sidenav + <router-outlet>
      theme-picker/          bouton + menu thème / mode / densité
    shared/
      specimen/              cadre d'une variante + bouton snippet
      specimen-section/      titre + grille de specimens
      snippet-dialog/        dialog « Code — … » avec bouton Copier
    pages/
      accueil/accueil.ts
      composants/<id>/<id>.page.ts   une page par composant (35)
  styles/themes-<nom>/       GÉNÉRÉ par `npm run themes` (défaut : themes-app), ne pas éditer à la main :
                             index.css, md3/*.css, <nom>.css, _themes-<nom>.scss  ; chargé par `angular.json` (CSS) et `styles.scss` (mixin)
scripts/
  a11y.mjs, captures.mjs, lib.mjs   vérification du site (axe-core, captures)
  themes/                    génération des thèmes depuis les tokens (voir docs/generation-themes.md)
docs/                        cette documentation
tokens/, TOKENS-*.md         design system distinct : lus (lecture seule) par scripts/themes, jamais modifiés
```

Conventions de nommage : fichiers sans suffixe `.component` (`shell.ts`, `specimen.ts`), classes sans suffixe sauf les pages (`BoutonPage`), sélecteurs `app-…`. Les pages de composants utilisent `app-<id>-page`.

## Registre (`catalog.registry.ts`)

Une seule source alimente le routage, la navigation et l'accueil.

```ts
interface CatalogEntry {
  id: string;                 // 'bouton' → /composants/bouton
  label: string;              // 'Bouton' (français)
  category: CatalogCategory;  // 'boutons-indicateurs' | 'formulaires' | 'navigation'
                              // | 'mise-en-page' | 'popups-modales' | 'donnees'
  icon: string;               // nom de ligature Material Symbols
  loadComponent: () => Promise<Type<unknown>>;   // import() dynamique de la page
}
```

Exports : `CATALOG_CATEGORIES` (ordre et libellés des catégories), `CATALOG` (les 35 entrées), `CATALOG_GROUPS` (catégories non vides avec leurs entrées, utilisé par la navigation et l'accueil).

**Ajouter un composant = 1 entrée dans `CATALOG` + 1 page.** L'ordre des entrées dans le tableau est l'ordre d'affichage dans une catégorie.

## Routage (`app.routes.ts`)

- `''` (exact) → `Accueil`, titre « Accueil — Catalogue Material ».
- Une route par entrée : `composants/<id>`, `loadComponent` de l'entrée, titre `« <label> — Catalogue Material »`.
- `'**'` → redirection vers `''`.
- Tout est en lazy loading. Aucune garde, aucun résolveur.

## Shell (`layout/shell`)

- `<header><mat-toolbar>` : bouton menu (mobile seulement), marque (logo + titre + sous-titre, lien vers `/`), `app-theme-picker`.
- `mat-sidenav-container` : `mat-sidenav` en `side` ouvert sur ordinateur, `over` fermé sur mobile. Seuil : `BreakpointObserver` sur `(max-width: 959.98px)`, converti en signal (`toSignal`).
- Navigation : `<nav aria-label="Composants">` contenant un `mat-nav-list`. Pour chaque catégorie, un sous-titre (`mat-subheader`) avec icône, puis les liens. Lien actif : `routerLinkActive` + `ariaCurrentWhenActive="page"` + `[activated]`. Sur mobile, un clic ferme le tiroir.
- `<main #main tabindex="-1">` contient le `<router-outlet>`. **Après chaque navigation (hors première), le focus est donné à `<main>`** (effet sur un signal alimenté par `NavigationEnd` avec `skip(1)`).
- Styles : barre d'outils colorée en primaire (`--mat-toolbar-container-*`), sidenav teintée (`surface-container-low`), `main` centré (max 1440 px).

## ThemeService (`core/theme/theme.service.ts`)

`@Service()` (équivalent d'un singleton racine, Angular 22).

- Signaux publics et modifiables : `theme` (`ThemeId`), `scheme` (`'light' | 'dark' | 'system'`), `density` (`0..4`).
- Lecture initiale depuis `localStorage` (clé `catalogue-material-theme`, JSON, valeurs validées, `try/catch`), valeurs par défaut : `azur`, `light`, `0`.
- Un `effect()` retire puis repose les classes `theme-<id>`, `scheme-<mode>`, `density-<n>` sur `<html>` et sauvegarde.
- Les couleurs viennent entièrement du SCSS (voir [themes-et-styles.md](themes-et-styles.md)) : le service ne manipule que des classes.
- `index.html` pose `class="scheme-light"` en dur pour éviter un flash selon le thème du système avant l'initialisation.

## Composants partagés (`shared/`)

### `Specimen` (`app-specimen`)
Inputs : `label` (requis), `api` (texte affiché en `<code>`), `snippet` (code, active le bouton `</>`). Contenu projeté dans une zone `surface-container-low`. Ouvre `SnippetDialog` via `MatDialog` (largeur 640 px, `maxWidth: 95vw`). Le bouton a `aria-label="Voir le code : <label>"`.

### `SpecimenSection` (`app-specimen-section`)
Inputs : `title` (requis), `description`, `minWidth` (défaut `300px`, exposé en `--specimen-min`). Grille `repeat(auto-fill, minmax(min(100%, var(--specimen-min)), 1fr))`. Le titre est un `<h2>`.

### `SnippetDialog`
Données : `{ label, code }`. Affiche `<pre tabindex="0"><code>` (défilable, focusable pour l'accessibilité), bouton « Copier » (CDK `Clipboard` + `MatSnackBar`), bouton « Fermer ». Pas de coloration syntaxique (pas de dépendance ajoutée).

## Libellés français (`core/i18n/intl-fr.ts`)

`PaginatorIntlFr`, `DatepickerIntlFr`, `StepperIntlFr` (sous-classes `@Injectable()` des `*Intl` de Material). Ils sont fournis **au niveau des pages concernées** (`providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntlFr }]`), pas globalement : cela évite d'alourdir le bundle initial. Pages : `pagination`, `selecteur-date`, `etapes`. Le sélecteur d'heure n'a pas de classe `Intl`.

## Configuration globale (`app.config.ts`)

- `provideBrowserGlobalErrorListeners()`, `provideRouter(routes)`.
- `registerLocaleData(localeFr)` + `LOCALE_ID = 'fr'`.
- `provideNativeDateAdapter()` + `MAT_DATE_LOCALE = 'fr-FR'` (datepicker et timepicker).
- `provideAppInitializer` : `MatIconRegistry.setDefaultFontSetClass('material-symbols-outlined')` pour que `<mat-icon>` utilise Material Symbols au lieu de l'ancienne police Material Icons.

## Build et budgets (`angular.json`)

| Budget | Avertissement | Erreur |
|---|---|---|
| Bundle initial | **880 kB** | 1 MB |
| Style d'un composant | 4 kB | 8 kB |

Le bundle initial pèse environ 858 kB (≈ 164 kB transférés). Il est dominé par le shell : les modules Material (`list`, `button`, `sidenav`, `menu`, `forms`, overlay CDK) sont chargés d'emblée et ne se découpent pas à la classe près. L'avertissement a été relevé en plusieurs étapes avec justification (voir [decisions-et-limites.md](decisions-et-limites.md)). Les pages sont toutes en lazy loading ; garder les styles de page légers.
