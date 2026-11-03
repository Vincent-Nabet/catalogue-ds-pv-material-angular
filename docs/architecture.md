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
      theme/themes.ts               types et listes (thèmes, modes, densités), `themeInfo(id)` (recherche d'un thème), `parseImportedThemeId()`
      theme/imported-themes.ts      @Service : thèmes importés depuis un zip (métadonnées + CSS dans localStorage)
      theme/theme.service.ts        @Service : état du thème + persistance
      i18n/intl-fr.ts               libellés français (paginator, datepicker, stepper)
      a11y/contrast-items.ts        résultats axe → éléments d'inspection (fonctions pures)
      a11y/contrast-inspector.ts    @Service : état de l'inspecteur de contraste + exécution d'axe (chargé à la demande)
      tokens/                       pages Fondations et pages de composants (chargés en différé, jamais dans le bundle initial) :
                                    contrast.ts (WCAG 2.x, fonctions pures), color-roles.ts (rôles et paires, source unique),
                                    read-css.ts (lecture des valeurs dans le DOM), contrast-matrix.ts (matrice, régressions),
                                    theme-key.ts (relecture au changement de thème ou de mode),
                                    discover-tokens.ts (détection des variables --app-* du CSS chargé, fonctions pures),
                                    token-catalog.ts (@Service : noms détectés, relus à chaque changement de thème),
                                    color-families.ts (injectColorFamilies() : familles --app-color-* complètes, vides hors thème
                                    Design system ; familyVariables(id) : variables --r-*), utilisé aussi par les pages de composants (lazy)
    layout/
      shell/                 barre d'outils + sidenav + <router-outlet>
      theme-picker/          bouton + menu thème (dont la section « Thèmes importés ») / mode / densité
      contrast-inspector/    bouton « Contraste », panneau collant et calque de badges (inspecteur de contraste)
    shared/
      specimen/              cadre d'une variante + bouton snippet
      specimen-section/      titre + grille de specimens
      token-badge/           pastille « Jeton personnalisé » (variable `--app-*`) ou « Jeton MD3 », pour les pages Fondations
      missing-tokens/        note « Jetons attendus mais absents du CSS chargé » (pages Fondations, mode design system)
      snippet-dialog/        dialog « Code — … » avec bouton Copier
      color-family-scope/    directive ColorFamilyScope (pose --r-* d'une famille sur ses descendants, display: contents)
                             et @Service OverlayFamily (même chose sur le conteneur de la surcouche CDK)
    pages/
      accueil/accueil.ts
      themes-importes/               page /themes-importes (hors registre) : import d'un zip de tokens, liste et suppression
      fondations/<id>/<id>.page.ts   3 pages Fondations (couleurs, typographie, formes-espacements) + matrice-contraste, non branchée au registre
      composants/<id>/<id>.page.ts   une page par composant (35)
  styles/_roles.scss         mixins « rôle de couleur » par composant (voir docs/themes-et-styles.md), résolu via `includePaths`
  styles/themes-<nom>/       GÉNÉRÉ par `npm run themes` (défaut : themes-app), ne pas éditer à la main :
                             index.css, md3/*.css, <nom>.css, _themes-<nom>.scss  ; chargé par `angular.json` (CSS) et `styles.scss` (mixin)
scripts/
  a11y.mjs, captures.mjs, lib.mjs   vérification du site (axe-core, captures)
  themes/                    génération des thèmes depuis les tokens (voir docs/generation-themes.md) ; navigateur.mjs
                             (+ .d.mts) est aussi importé par la page « Thèmes importés » (import() dynamique)
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
  category: CatalogCategory;  // 'fondations' | 'boutons-indicateurs' | 'formulaires' | 'navigation'
                              // | 'mise-en-page' | 'popups-modales' | 'donnees'
  icon: string;               // nom de ligature Material Symbols
  loadComponent: () => Promise<Type<unknown>>;   // import() dynamique de la page
}
```

Exports : `CATALOG_CATEGORIES` (ordre et libellés des catégories, `fondations` en tête), `CATALOG` (les 38 entrées, les 3 pages Fondations en premier), `COMPONENT_ENTRIES` (les 35 pages de composants, sans Fondations : compteur « composants » de l'accueil), `CATALOG_GROUPS` (catégories non vides avec leurs entrées, utilisé par la navigation et l'accueil).

Les pages Fondations ont leur fichier dans `pages/fondations/` mais gardent l'URL `/composants/<id>` : routes, navigation, inspecteur de contraste et scripts (qui lisent le registre par expression régulière : garder le format `{ id: '…', label: '…', category: …`) suivent sans modification.

**Ajouter un composant = 1 entrée dans `CATALOG` + 1 page.** L'ordre des entrées dans le tableau est l'ordre d'affichage dans une catégorie.

## Routage (`app.routes.ts`)

- `''` (exact) → `Accueil`, titre « Accueil — Catalogue Material ».
- Une route par entrée : `composants/<id>`, `loadComponent` de l'entrée, titre `« <label> — Catalogue Material »`.
- `themes-importes` → `ThemesImportes` (lazy, **hors registre**), titre « Thèmes importés — Catalogue Material ».
- `'**'` → redirection vers `''`.
- Tout est en lazy loading. Aucune garde, aucun résolveur.

## Shell (`layout/shell`)

- `<header><mat-toolbar>` : bouton menu (mobile seulement), marque (logo + titre + sous-titre, lien vers `/`), `app-theme-picker`.
- `mat-sidenav-container` : `mat-sidenav` en `side` ouvert sur ordinateur, `over` fermé sur mobile. Seuil : `BreakpointObserver` sur `(max-width: 959.98px)`, converti en signal (`toSignal`).
- Navigation : `<nav aria-label="Composants">` contenant un `mat-nav-list`. Pour chaque catégorie, un sous-titre (`mat-subheader`) avec icône, puis les liens. Lien actif : `routerLinkActive` + `ariaCurrentWhenActive="page"` + `[activated]`. Sur mobile, un clic ferme le tiroir.
- `<main #main tabindex="-1">` contient le `<router-outlet>`. **Après chaque navigation (hors première), le focus est donné à `<main>`** (effet sur un signal alimenté par `NavigationEnd` avec `skip(1)`).
- Styles : barre d'outils colorée en primaire (`mat.toolbar-overrides`), sidenav teintée (`surface-container-low`), `main` centré (max 1440 px).

## ThemeService (`core/theme/theme.service.ts`)

`@Service()` (équivalent d'un singleton racine, Angular 22).

- Signaux publics et modifiables : `theme` (`ThemeId`), `scheme` (`'light' | 'dark' | 'system'`), `density` (`0..4`).
- Lecture initiale depuis `localStorage` (clé `catalogue-material-theme`, JSON, valeurs validées, `try/catch`), valeurs par défaut : `app-contraste-moyen`, `light`, `0`.
- Un `effect()` retire puis repose les classes `theme-<id>`, `scheme-<mode>`, `density-<n>` sur `<html>` et sauvegarde ; pour un thème importé, il pose aussi `theme-importe` et injecte son CSS (voir « Thèmes importés » plus bas).
- Les couleurs viennent entièrement du SCSS (voir [themes-et-styles.md](themes-et-styles.md)) : le service ne manipule que des classes.
- `index.html` pose `class="scheme-light"` en dur pour éviter un flash selon le thème du système avant l'initialisation.

## Thèmes importés (`core/theme/imported-themes.ts`, `pages/themes-importes/`)

Fonction : importer un zip de tokens dans le navigateur et l'utiliser comme thème (parcours : [fonctionnel.md](fonctionnel.md#thèmes-importés)).

```
 Page /themes-importes (chunk différé du routeur)
    │  au choix du 1er fichier : import() dynamique → fflate + générateur (chunk à part)
    ▼
 scripts/themes/navigateur.mjs   genererThemeImporte(octets, { base, nomSource }) → { css, familles, rapport }
    ▼
 ImportedThemes (@Service, localStorage)  ──►  ThemeService : classes sur <html> + <style> du thème actif
                                                      ▲
                          ThemePicker : section « Thèmes importés » + lien vers la page
```

- **`ImportedThemes`** (bundle initial, volontairement minimal : ni génération ni `fflate`) : `themes` (signal en lecture seule), `infos` (un `ThemeInfo` par thème **et** par famille, groupe `imported`, identifiant `<id de l'import>-<famille>`), `info()`, `has()`, `css(importId)` (lu une fois par session), `add(meta, css)`, `remove(importId)`, `MAX_IMPORTED_THEMES = 20`. `add` retourne `{ ok: true }` ou `{ ok: false, reason: 'limite' | 'quota' | 'stockage' }` ; le message français est fourni par l'appelant (le formulaire).
- **Identité** : identifiant technique généré `imp-` + 6 caractères `a-z0-9` (`crypto.getRandomValues`, hors collision). Le **nom saisi n'est qu'un libellé** : jamais une classe, une clé ni du CSS, affiché par interpolation Angular (échappée). `parseImportedThemeId(id)` (dans `themes.ts`) décompose `imp-<6>-<famille>` en `{ importId, family }`.
- **Stockage** (`localStorage`, lecture synchrone : le CSS du thème actif doit être posé avant le premier rendu) :

  | Clé | Contenu |
  |---|---|
  | `catalogue-material-themes-importes` | `{ "version": 1, "themes": ImportedThemeMeta[] }` : métadonnées seulement (nom, date, nom du zip, familles avec couleur d'aperçu, ≤ 20 avertissements) |
  | `catalogue-material-theme-importe-css:<id>` | le CSS généré du thème (toutes ses familles) ; lu seulement quand le thème devient actif |
  | `catalogue-material-theme` | inchangée ; `theme` peut valoir un identifiant importé |

  `add` est **atomique** (CSS d'abord, puis index ; si l'index échoue, la clé CSS est retirée ; `QuotaExceededError` → `quota`) ; `remove` écrit l'index d'abord. La lecture est tolérante (JSON invalide, version inconnue, métadonnée mal formée → liste vide ; entrée sans clé CSS écartée) et ne lève jamais.
- **`ThemeService`** : injecte `ImportedThemes` **avant** `read()` (un identifiant importé stocké est valide s'il est dans `THEMES` ou si `imported.has(id)`) ; `themeCourant` (computed : `ThemeInfo` du thème actif, quelle que soit sa source) ; l'`effect` retire aussi `theme-importe` et les classes `theme-imp-*`, puis, pour un thème importé, ajoute `theme-importe` et crée ou met à jour `<style id="catalogue-theme-importe">` (CSS du **seul** thème actif, retiré au retour à un autre thème) ; `removeImportedTheme(importId)` repasse d'abord à `DEFAULT_THEME_ID` si le thème actif en est un, puis supprime (la bascule est ici et non dans `ImportedThemes`, pour éviter une dépendance circulaire).
- **Page `/themes-importes`** (lazy, **hors registre** : route dans `app.routes.ts`, pas d'entrée de menu ; le bouton « Contraste » y est absent comme sur l'accueil) : `themes-importes.ts` (titre et introduction, relie les deux sections), `import-form.ts` (`ImportForm` : zone de glisser-déposer (libellé du champ fichier natif, masqué visuellement), analyse, rapport, nom en **Signal Form**, enregistrement ; le jeton `THEME_GENERATOR` charge le générateur par `import()` et sert aussi de point de substitution en test), `imported-themes-list.ts` (`ImportedThemesList` : liste, confirmation en ligne, suppression). Le sélecteur n'importe statiquement ni `@angular/forms`, ni `fflate`, ni le générateur.
- **`injectIsDesignSystem()`** (`core/tokens/theme-key.ts`) est vrai aussi pour un thème importé (les jetons `--app-*` y existent) : les pages Fondations montrent alors leurs sections réservées au design system.
- **Lecture de `scripts/themes/` depuis `src/`** : `import('../../../../scripts/themes/navigateur.mjs')` fonctionne dans `ng build` et `ng test` sans `allowJs`, grâce au fichier de types `navigateur.d.mts` voisin (écrit à la main). Le générateur et `fflate` forment un chunk différé distinct, ni dans le bundle initial ni dans le chunk de la page.

## Composants partagés (`shared/`)

### `Specimen` (`app-specimen`)
Inputs : `label` (requis), `api` (texte affiché en `<code>`), `snippet` (code, active le bouton `</>`). Contenu projeté dans une zone `surface-container-low`. Ouvre `SnippetDialog` via `MatDialog` (largeur 640 px, `maxWidth: 95vw`). Le bouton a `aria-label="Voir le code : <label>"`.

### `SpecimenSection` (`app-specimen-section`)
Inputs : `title` (requis), `description`, `minWidth` (défaut `300px`, exposé en `--specimen-min`), `designSystemOnly` (booléen : remplace la description par le message standard `DESIGN_SYSTEM_ONLY_MESSAGE`, « Jetons propres au design system : choisir un thème Design system pour les voir. », utilisé par les pages Fondations quand un thème Angular Material est actif). Grille `repeat(auto-fill, minmax(min(100%, var(--specimen-min)), 1fr))`. Le titre est un `<h2>`.

### `SnippetDialog`
Données : `{ label, code }`. Affiche `<pre tabindex="0"><code>` (défilable, focusable pour l'accessibilité), bouton « Copier » (CDK `Clipboard` + `MatSnackBar`), bouton « Fermer ». Pas de coloration syntaxique (pas de dépendance ajoutée).

### Classes globales des pages Fondations (`src/styles.scss`)

- `.page-intro` : paragraphe d'introduction sous le `<h1>` (largeur max 80 ch, couleur `on-surface-variant`).
- `.specimen-contenu` : contenu d'un `app-specimen` ancré en haut de la zone d'exemple (grille, marge de 28 px sous le bouton `</>`, `gap` 12 px, pleine largeur). Une page qui a besoin d'un réglage de plus l'ajoute dans son propre `styles` (ex. `justify-items: start` dans Formes et espacements, via une classe locale posée à côté).

## Libellés français (`core/i18n/intl-fr.ts`)

`PaginatorIntlFr`, `DatepickerIntlFr`, `StepperIntlFr` (sous-classes `@Injectable()` des `*Intl` de Material). Ils sont fournis **au niveau des pages concernées** (`providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntlFr }]`), pas globalement : cela évite d'alourdir le bundle initial. Pages : `pagination`, `selecteur-date`, `etapes`. Le sélecteur d'heure n'a pas de classe `Intl`.

## Configuration globale (`app.config.ts`)

- `provideBrowserGlobalErrorListeners()`, `provideRouter(routes)`.
- `registerLocaleData(localeFr)` + `LOCALE_ID = 'fr'`.
- `provideNativeDateAdapter()` + `MAT_DATE_LOCALE = 'fr-FR'` (datepicker et timepicker).
- `provideAppInitializer` : `MatIconRegistry.setDefaultFontSetClass('material-symbols-outlined')` pour que `<mat-icon>` utilise Material Symbols au lieu de l'ancienne police Material Icons.

## Pages Fondations : lecture des valeurs (`core/tokens/`)

Les quatre pages montrent des valeurs de jetons **lues dans le CSS réellement chargé**, sans fichier de données généré (le script `npm run themes` n'est pas concerné).

- **Couleur** : `readColor(sonde, '--mat-sys-…')` pose `color: var(--x, transparent)` sur un élément masqué, lit `getComputedStyle().color` et analyse le `rgb()` obtenu. Passer par une vraie propriété est nécessaire : `getPropertyValue('--x')` renverrait le texte `light-dark(…)`. Le repli `transparent` signale une variable absente (sans lui, la sonde hériterait la couleur du parent). `light-dark()` est résolu selon le `color-scheme` de la sonde.
- **Autres valeurs** (typographie, rayons, espacements, opacités) : `readValue(élément, propriété)` sur l'élément d'échantillon.
- **Relecture** : `afterRenderEffect` (phase `read`) qui lit `injectThemeKey()` (thème, mode et, en mode système, préférence du système via `matchMedia`). `ThemeService` pose les classes de `<html>` dans un effet racine : un `effect` ordinaire lirait l'ancien thème.
- **Détection des jetons** : les noms des jetons restent des listes écrites à la main (libellés, ordre, paires), complétées par ce que le CSS déclare. `declaredProperties` (`discover-tokens.ts`) parcourt `document.styleSheets` (règles de groupe, imbriquées, `@import` ; feuille inaccessible ignorée) et renvoie l'union des variables `--app-*` de tous les blocs, donc de tous les thèmes. `TokenCatalog` (`@Service`) l'expose en signal `names`, relu dans un `afterRenderEffect` cadencé par `injectThemeKey()` ; `null` tant qu'aucune variable n'est trouvée (un résultat vide n'est pas mémorisé). Les pages y ajoutent les jetons absents de leurs listes (`detectedRoles`, `detectedIds`) et passent à `app-missing-tokens` ceux des listes qui manquent (`missing`). Détail et limites : [decisions-et-limites.md](decisions-et-limites.md#détection-dynamique-des-jetons).
- **Matrice** (page débranchée du registre, code conservé) : indépendante du thème courant. Huit sondes masquées portent la classe `theme-<famille>` et `style="color-scheme: light|dark"` ; elles redéfinissent `--md-sys-color-*` et `--app-color-*` (déclarés sur ces classes), lus **une seule fois** après le premier rendu. Les `--mat-sys-*` ne sont pas lus dans les sondes : ils sont résolus sur `<html>`.
- **Contraste** : formule WCAG 2.x ; le rapport est **tronqué** (et non arrondi) à deux décimales à l'affichage, comme axe-core ; la conformité compare la valeur brute au seuil.
- jsdom ne connaît pas `light-dark()` : seuls les calculs purs et les données sont testés unitairement ; la lecture se vérifie dans Chrome.

## Build et budgets (`angular.json`)

| Budget | Avertissement | Erreur |
|---|---|---|
| Bundle initial | **880 kB** | 1 MB |
| Style d'un composant | **5 kB** | 8 kB |

Le bundle initial pèse environ 879 kB (878,83 kB, ≈ 170 kB transférés ; 871,95 kB avant les thèmes importés, 869,84 kB avant les pages Fondations) : **marge d'environ 1 kB** sous l'avertissement. `axe-core` (≈ 675 kB) est un chunk différé, chargé à la première activation de l'inspecteur de contraste : il n'est pas dans le bundle initial (module CommonJS, déclaré dans `allowedCommonJsDependencies`). Il est dominé par le shell : les modules Material (`list`, `button`, `sidenav`, `menu`, `forms`, overlay CDK) sont chargés d'emblée et ne se découpent pas à la classe près. L'avertissement a été relevé en plusieurs étapes avec justification (voir [decisions-et-limites.md](decisions-et-limites.md)). L'avertissement de style de composant est passé de 4 à 5 kB pour la page Bouton (4,22 kB mesurés) : ses rôles de couleur (secondaire, tertiaire, erreur) surchargent une quinzaine de jetons chacun pour boutons, boutons icône et FAB (via `mat.button-overrides`, `mat.icon-button-overrides`, `mat.fab-overrides`, avec des variables intermédiaires `--r-*` pour ne pas répéter les valeurs). Les pages sont toutes en lazy loading ; garder les styles de page légers.
