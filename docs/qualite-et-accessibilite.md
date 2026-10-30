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

## Scripts de vérification

Deux scripts Node (`scripts/`), qui s'appuient sur `puppeteer-core` (Chrome déjà installé) et `axe-core`, tous deux en dépendances de développement. Ils démarrent eux-mêmes `ng serve` (port 4300) s'il ne tourne pas, puis l'arrêtent. Si un serveur répond déjà sur ce port, il est réutilisé.

### `npm run a11y` : accessibilité et erreurs console

Ouvre chaque page (accueil + 35 composants) avec un thème et un mode imposés, exécute axe-core (`wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `best-practice`) et relève les messages console de niveau erreur ou avertissement. Affiche `ok` / `ÉCHEC` par page, un résumé, et **retourne le code 1** s'il reste une violation ou une erreur console.

```bash
npm run a11y                                              # azur, clair + sombre, toutes les pages
npm run a11y -- --themes=azur,violet --schemes=dark       # thèmes et modes précis
npm run a11y -- --themes=tous                             # les 6 thèmes
npm run a11y -- --routes=accueil,bouton,carte             # quelques pages
npm run a11y -- --strict                                  # sans tolérer l'exception connue
```

L'exception connue (calendrier natif, voir plus haut) est déclarée dans le tableau `EXCEPTIONS` de `scripts/a11y.mjs` et signalée à la fin de l'exécution. Toute nouvelle tolérance doit y être ajoutée avec sa raison.

### `npm run captures` : captures pleine page

Enregistre une image PNG par page, thème et mode dans `captures/` (dossier ignoré par git), nommée `<page>-<thème>-<mode>.png`.

```bash
npm run captures                                                          # toutes les pages, azur clair
npm run captures -- --routes=bouton,champ-saisie,tableau --themes=azur,violet --schemes=light,dark
npm run captures -- --width=480 --density=4 --out=captures/mobile        # mobile, densité maximale
```

### Options communes

| Option | Rôle | Défaut |
|---|---|---|
| `--themes=a,b` | thèmes (`tous` = les 6) | `azur` |
| `--schemes=light,dark` | modes | `light,dark` (a11y), `light` (captures) |
| `--routes=a,b` | pages (`accueil` ou l'id d'un composant) | toutes |
| `--density=0..4` | densité (captures) | `0` |
| `--width=N` | largeur du viewport en px (captures) | `1280` |
| `--out=dossier` | dossier de sortie (captures) | `captures` |
| `--strict` | ne tolère aucune exception connue (a11y) | désactivé |

Variables d'environnement : `BASE_URL` (utiliser un serveur déjà lancé, ex. `http://localhost:4200`), `PORT` (port du serveur démarré par les scripts), `CHROME_PATH` (Chrome ou Chromium si non détecté automatiquement).

Les identifiants de pages et de thèmes sont lus dans `catalog.registry.ts` et `themes.ts` : un nouveau composant ou thème est pris en compte sans modifier les scripts.

### Contrôle manuel complémentaire

Les scripts ne remplacent pas un coup d'œil : parcourir au moins Bouton, Champ de saisie et Tableau dans deux thèmes, en clair et en sombre (`npm run captures`). Vérifier à la main : ouverture d'un snippet, « Copier » (snackbar « Code copié »), Échap, changement de thème / mode / densité puis rechargement (persistance), focus sur `<main>` après navigation, tiroir sur mobile.

Résultat de référence : 36 routes sans erreur console ; axe : 0 violation partout sauf l'exception ci-dessus.

## Budgets

Voir [architecture.md](architecture.md#build-et-budgets-angularjson). Ne relever un budget qu'avec une justification mesurée (analyse des entrées du bundle principal via `ng build --stats-json`, fichier `dist/poc-ds-isagri/browser-stats.json`).

## Commits

- Branche de travail : `feat/catalogue-material` (non poussée ; `master` ne contient que le commit initial).
- Messages en **Conventional Commits, en français** (`feat(theme): …`, `fix(a11y): …`), avec le trailer `Co-Authored-By` demandé par Claude Code.
- Un commit par étape logique ; ne jamais inclure `.mcp.json`, `.mcp.json.tmp`, `tokens/`, `TOKENS-*.md`, `.claude/`, `.agents/`, `skills-lock.json` dans un commit de ce chantier.
