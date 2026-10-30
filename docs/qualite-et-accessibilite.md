# Qualité et accessibilité

## Exigences

- `ng build` (production, budgets), `ng lint` et `ng test --watch=false` au vert avant chaque commit. Aucun commit rouge.
- Pas de désactivation de règle ESLint, pas de test ignoré, pas de budget relevé sans justification.
- **Accessibilité** : 0 violation axe-core, niveau WCAG AA (contraste, focus, ARIA). Une seule exception connue, voir plus bas.

## Lint

- ESLint plat (`eslint.config.js`) : `@eslint/js`, `typescript-eslint` (recommended + stylistic), `angular-eslint` (`tsRecommended`, `templateRecommended`, `templateAccessibility`).
- Sélecteurs : éléments `app-*` en kebab-case, directives `app*` en camelCase.
- Les templates inline sont linted (`processInlineTemplates`).
- Commande : `ng lint` (fichiers `src/**/*.ts` et `src/**/*.html`).

## Tests (11, Vitest)

| Fichier | Vérifie |
|---|---|
| `app/app.spec.ts` | création de l'application ; le `<header>` contient « Catalogue Material » |
| `core/catalog/catalog.registry.spec.ts` | une route par entrée, `id` uniques, catégories connues, chaque entrée dans un groupe |
| `core/theme/theme.service.spec.ts` | classes par défaut sur `<html>` (`theme-azur`, `scheme-light`, `density-0`), changement de classes, persistance et restauration, valeurs invalides ignorées |
| `shared/specimen/specimen.spec.ts` | bouton snippet présent seulement avec un snippet, ouverture du dialog |

Les pages de composants ne sont pas testées unitairement (démonstration visuelle) : elles sont couvertes par la compilation stricte des templates et par le contrôle navigateur décrit ci-dessous.

## Accessibilité : acquis

- Landmarks : `<header>`, `<nav aria-label="Composants">`, `<main>` (focus programmatique après navigation).
- Lien actif : `aria-current="page"`.
- Menu du thème : `role="menuitemradio"` + `aria-checked`, groupes `role="group"` avec `aria-labelledby`.
- Boutons du snippet : `aria-label="Voir le code : <variante>"`. Bloc de code défilable focusable (`tabindex="0"`).
- Échap ferme dialogs et menus (comportement Material).
- Le libellé « Thème : … » du bouton reste lu sous 600 px (masqué visuellement seulement).

## Accessibilité : exception connue

**Sélecteur de date, calendrier intégré** : le bouton de période du `mat-calendar` natif a un `aria-label` fixe (« Choisir le mois et l'année ») qui ne contient pas le texte visible (« oct. 2026 ») → règle `label-content-name-mismatch`. Défaut du composant Material, non corrigeable proprement. Le champ de date avec popup n'est pas concerné au chargement.

## Méthode de vérification visuelle et axe

Les scripts utilisés pendant le développement n'ont pas été conservés dans le dépôt. La méthode, à reproduire dans un dossier temporaire **hors du dépôt** :

1. Lancer `ng serve --port 4300`.
2. Installer `puppeteer-core` et `axe-core` dans le dossier temporaire ; utiliser Chrome installé (`C:/Program Files/Google/Chrome/Application/chrome.exe`, `headless: true`, `--no-sandbox`).
3. **Forcer thème et mode** avant le chargement : `page.evaluateOnNewDocument(() => localStorage.setItem('catalogue-material-theme', JSON.stringify({ theme: 'violet', scheme: 'dark', density: 0 })))`.
4. **Console** : écouter `console` (error/warning) et `pageerror` sur les 36 routes (accueil + 35 pages).
5. **axe** : injecter `axe.min.js`, `axe.run(document, { runOnly: ['wcag2a','wcag2aa','wcag21a','wcag21aa','best-practice'] })`, en clair et en sombre.
6. **Débordements** : pour chaque `app-specimen`, comparer le rectangle de chaque descendant de `.rendu` à celui du specimen (faux positifs connus : sidenavs fermés, onglets défilants, barres de progression indéterminées).
7. **Captures** : agrandir le viewport à la hauteur de `mat-sidenav-content` pour capturer toute la page ; au minimum Bouton, Champ de saisie, Tableau dans deux thèmes, clair et sombre.
8. **Fonctionnel** : ouvrir un snippet (`button[aria-label="Voir le code : Rempli"]`), cliquer « Copier » (snackbar « Code copié »), Échap, changer thème / mode / densité via le menu, recharger (persistance), vérifier le focus sur `<main>` après navigation.

Résultat de référence : 36 routes sans erreur console ; axe : 0 violation partout sauf l'exception ci-dessus.

## Budgets

Voir [architecture.md](architecture.md#build-et-budgets-angularjson). Ne relever un budget qu'avec une justification mesurée (analyse des entrées du bundle principal via `ng build --stats-json`, fichier `dist/poc-ds-isagri/browser-stats.json`).

## Commits

- Branche de travail : `feat/catalogue-material` (non poussée ; `master` ne contient que le commit initial).
- Messages en **Conventional Commits, en français** (`feat(theme): …`, `fix(a11y): …`), avec le trailer `Co-Authored-By` demandé par Claude Code.
- Un commit par étape logique ; ne jamais inclure `.mcp.json`, `.mcp.json.tmp`, `tokens/`, `TOKENS-*.md`, `.claude/`, `.agents/`, `skills-lock.json` dans un commit de ce chantier.
