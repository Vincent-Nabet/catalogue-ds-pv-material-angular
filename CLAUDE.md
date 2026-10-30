You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## Projet : Catalogue Material

Catalogue visuel des composants **Angular Material 22** (designers, intégrateurs). Angular 22.2, Material/CDK 22.2.5, zoneless, SCSS, Vitest. **Interface uniquement en français.** Documentation détaillée dans `docs/` (index : `docs/README.md`) : lire le fichier utile avant de fouiller le code.

| Pour… | Lire |
|---|---|
| comprendre le produit, la liste des pages et variantes | `docs/fonctionnel.md` |
| structure, registre, routage, shell, services, budgets | `docs/architecture.md` |
| ajouter une page ou une variante (gabarit, pièges) | `docs/ajouter-un-composant.md` |
| thèmes, densité, polices, icônes, jetons CSS | `docs/themes-et-styles.md` |
| lint, tests, axe, méthode de vérification, commits | `docs/qualite-et-accessibilite.md` |
| générer/régénérer les thèmes du design system depuis `tokens/` | `docs/generation-themes.md` |
| voir le rapport de contraste de chaque texte (bouton ◐ de la barre d'outils) | `docs/inspecteur-contraste.md` |
| comprendre un choix ou un comportement inattendu | `docs/decisions-et-limites.md` |

### Essentiel

- **35 pages** (6 catégories) générées depuis un registre unique : `src/app/core/catalog/catalog.registry.ts`. Ajouter un composant = 1 entrée de registre + 1 fichier `src/app/pages/composants/<id>/<id>.page.ts` (lazy, template inline, snippets écrits à la main dans `const SNIPPETS`).
- Une page = `<h1>` + `app-specimen-section` (`title`, `description`, `minWidth`) contenant des `app-specimen` (`label` FR, `api`, `snippet`). Le bouton `</>` ouvre `SnippetDialog` (copie + snackbar).
- Thème : `ThemeService` (`@Service`, signaux `theme` / `scheme` / `density`, `localStorage` clé `catalogue-material-theme`) pose des classes `theme-*`, `scheme-*`, `density-*` sur `<html>` ; couleurs dans `src/styles.scss` (palettes Material prédéfinies, `mat.theme()` + `light-dark()`). Défaut : azur, **clair**, densité 0.
- Shell : `layout/shell` (toolbar primaire + sidenav `side`/`over` selon `(max-width: 959.98px)`), focus donné à `<main>` après chaque navigation ; `layout/theme-picker`.
- Police **Poppins**, icônes **Material Symbols Outlined** (défini comme jeu par défaut de `mat-icon` dans `app.config.ts`), toutes deux via Google Fonts.
- Libellés Material en français : `core/i18n/intl-fr.ts`, fournis **au niveau des pages** (pagination, sélecteur de date, étapes).

### Pièges fréquents

- Angular Material 22 n'a **pas d'API de taille** pour les boutons (sizes/formes = surcharge de jetons `--mat-button-*`) ; `color` est **M2 uniquement** (sans effet) : ne pas l'utiliser.
- Booléens en binding (`[disabledInteractive]="true"`), `&#64;` pour une arobase dans un template, `hasBackdrop` sur `mat-sidenav-container`, drawers `over`/`push` laissés fermés (piège de focus).
- Couleurs uniquement via `--mat-sys-*` ; typographie via `--mat-sys-*` (pas de tailles/couleurs en dur).
- Bundle initial ≈ 867 kB (avertissement à 880 kB, erreur à 1 MB ; axe-core de l'inspecteur de contraste est un chunk différé, hors bundle initial) : le shell charge des modules Material entiers ; ne relever un budget qu'avec mesure et justification.
- Thèmes du design system : générés par `npm run themes` dans `src/styles/themes-<nom>/` (défaut `themes-app`) : **ne pas éditer ces fichiers à la main**, relancer le script ; branchés au catalogue (4 entrées `app*` dans `themes.ts`, `angular.json`, `styles.scss`) ; tests : `node --test scripts/themes/`.
- Hors périmètre : `tokens/` et `TOKENS-*.md` (design system distinct, **ne pas modifier**) ; ne pas committer `.mcp.json`, `.mcp.json.tmp`, `.claude/`, `.agents/`, `skills-lock.json` dans ce chantier.

### Vérifier un changement

`ng build`, `ng lint`, `ng test --watch=false` au vert ; `npm run a11y` (axe-core + erreurs console sur toutes les pages, clair et sombre ; seule exception tolérée : bouton de période du calendrier natif de `selecteur-date`) ; `npm run captures` pour le contrôle visuel dans ≥ 2 thèmes, clair et sombre (options : `docs/qualite-et-accessibilite.md`). Commits : Conventional Commits en français, branche `feat/catalogue-material`.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Do NOT set `changeDetection: ChangeDetectionStrategy.OnPush` explicitly. `OnPush` is the default in Angular v22+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

## Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `model()` for two-way bound properties with `[(prop)]` syntax instead of pairing `input()` with `output()`
- Use `computed()` for derived state
- Use `linkedSignal()` for state derived from multiple reactive sources that must stay synchronized
- Prefer inline templates for small components
- Prefer Signal Forms (`@angular/forms/signals`) for new forms. They are stable in Angular v22+ and provide signal-based state, type-safe field access, and schema-based validation
- When not using Signal Forms, prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- Do NOT import `CommonModule`, import only the directives and pipes the template uses, such as `AsyncPipe` or `DatePipe`
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Prefer the `@Service` decorator over `@Injectable({providedIn: 'root'})` for new singleton services (Angular v22+)
- Use the `inject()` function instead of constructor injection
