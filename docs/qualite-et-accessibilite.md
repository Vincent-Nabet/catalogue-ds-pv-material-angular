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

## Tests (151, Vitest)

| Fichier | Vérifie |
|---|---|
| `app/app.spec.ts` | création de l'application ; le `<header>` contient « Catalogue Material » |
| `core/catalog/catalog.registry.spec.ts` | une route par entrée, `id` uniques, catégories connues, chaque entrée dans un groupe |
| `core/theme/theme.service.spec.ts` | classes par défaut sur `<html>` (`theme-app-contraste-moyen`, `scheme-light`, `density-0`), changement de classes, persistance et restauration, valeurs invalides ignorées |
| `shared/specimen/specimen.spec.ts` | bouton snippet présent seulement avec un snippet, ouverture du dialog |
| `shared/specimen-section/specimen-section.spec.ts` | description affichée, aucun paragraphe sans description, message standard avec `designSystemOnly` |
| `core/a11y/contrast-items.spec.ts` | conversion des résultats axe (statuts, tri, éléments ignorés), formatage et libellés de l'inspecteur de contraste |
| `core/a11y/contrast-inspector.spec.ts` | service de l'inspecteur : activation, appel d'axe sur `main`, disponibilité limitée aux pages de composants, relance au changement de thème, fermeture pendant l'analyse, erreur |
| `core/tokens/contrast.spec.ts` | noir/blanc = 21, olive `#86A315` sur `#FAFAF5` ≈ 2,76, analyse de `rgb()` / `rgba()`, alpha < 1 sans ratio, troncature (4,4999 → « 4,49 : 1 »), seuil à la frontière |
| `core/tokens/color-roles.spec.ts` | ids de paires uniques, rôles connus, un seul groupe par rôle, 49 rôles MD3 + 15 du design system, pas de `shadow` / `scrim` en paire, seuil selon le type |
| `core/tokens/contrast-matrix.spec.ts` | statuts (ok, échec, sans seuil, absent), régression (élevé < moyen, même mode seulement, tolérance 0,01), Monochrome jamais en régression, résumé par mode |
| `core/tokens/discover-tokens.spec.ts` | détection des variables (règle simple, `@media` / `@layer` / `@supports`, `@import`, feuille inaccessible ignorée, union des classes `theme-*`, préfixe, noms hors préfixe), classement des noms, différences d'ensembles dans l'ordre d'apparition |
| `shared/missing-tokens/missing-tokens.spec.ts` | rien d'affiché sans jeton manquant, liste des jetons manquants |
| `color-roles.spec.ts` (ajouts) | `colorVar` d'un rôle hors liste avec origine explicite, variables attendues du design system, rôles détectés (rôles déjà listés et jetons hors couleur ignorés) |
| `catalog.registry.spec.ts` (ajouts) | `fondations` en première catégorie avec 3 pages, `COMPONENT_ENTRIES` = 35 |
| `core/theme/imported-themes.spec.ts` (26) | stockage des thèmes importés : ajout puis relecture après rechargement, clés (CSS à part, index sans CSS), plusieurs thèmes, suppression, plafond de 20, doublon de nom non vérifié par le service, 20 avertissements au plus, `QuotaExceededError` simulée (aucune clé ne reste, y compris quand seul l'index échoue), stockage indisponible, lecture tolérante (JSON corrompu, version inconnue, métadonnée mal formée, identifiant ou couleur d'aperçu invalides, entrée sans clé CSS), `infos` (libellés, groupe, une entrée par famille, nom en texte brut) ; `parseImportedThemeId` (valides dont famille à tirets, invalides) |
| `core/theme/theme.service.imported.spec.ts` (13) | thème importé actif (classes, `<style>` et son CSS), retour à un autre thème, passage d'un import à un autre, persistance, identifiant inconnu au chargement → défaut, `removeImportedTheme` (thème actif, autre thème, thème non importé), `themeCourant` pour les trois sources, `injectIsDesignSystem` |
| `layout/theme-picker/theme-picker.spec.ts` (4) | section « Thèmes importés » : entrée désactivée et lien de gestion quand la liste est vide, import à une famille (élément direct), import à plusieurs familles (sous-menu), nom affiché en texte brut |
| `pages/themes-importes/imported-themes-list.spec.ts` (11) | liste, état vide, famille active signalée par du texte, avertissements, nom en texte brut, confirmation en ligne (focus sur « Annuler »), annulation, suppression et focus de la ligne suivante, liste vidée, annonce du retour au thème par défaut |
| `pages/themes-importes/import-form.spec.ts` (17) | générateur remplacé par un double (`THEME_GENERATOR`) : champ fichier, rapport, nom prérempli, échec du générateur, zip de plus de 5 Mo, validation du nom (requis, espaces seuls, 40 caractères, unicité sans casse), import (enregistrement, famille par défaut appliquée, formulaire vidé, enchaînement de deux imports), messages d'échec de `add` (quota, stockage, limite) ; l'analyse réelle d'un zip est couverte par `node --test` et par la vérification dans Chrome (jsdom n'est pas le bon outil) |

### Tests du script de génération des thèmes (`node:test`)

`node --test scripts/themes/*.test.mjs` (hors `ng test`, aucun navigateur ; 116 tests dont 64 pour l'import dans le navigateur : `lire-source-memoire`, `portee`, `valider-css`, `variables-requises`, `navigateur`) : lecture dossier/zip et résolution des alias (cycle, alias absent), classement de tous les tokens (0 inconnu), valeurs des 8 modes retrouvées dans les CSS générés (ex. primary clair `#86A315`), CSS valide (`sass.compileString`), compilation Sass d'une feuille témoin (aucune `--mat-sys-*` ne garde une valeur de la palette de repli hors les 7 variables documentées), sorties identiques depuis `tokens/` et depuis un zip, génération idempotente, CLI. Ils lisent `tokens/` en lecture seule. Voir [generation-themes.md](generation-themes.md). Les fichiers `.mjs` ne sont **pas couverts par ESLint** (`eslint.config.js` ne cible que `**/*.ts` et `**/*.html`) : les relire à la main (imports inutilisés, variables mortes).

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

## Page « Thèmes importés » : contrôle hors `npm run a11y`

`npm run a11y` ne parcourt que les routes du registre : la page `/themes-importes` et le menu du sélecteur ouvert se contrôlent à part, avec un script Puppeteer jetable (non versionné) qui injecte `axe-core` (mêmes balises que `scripts/a11y.mjs`). Cibler (consigne du projet : pas d'axe sur toutes les pages ni tous les thèmes) : la page vide, avec des imports, avec le rapport et le champ nom, avec une erreur de nom, pendant la confirmation de suppression, et le menu racine, avec « Thèmes importés » ouvert, avec les familles ouvertes ; en clair et en sombre, dans un thème Angular Material et dans un thème importé. Référence : 34 analyses, 0 violation de la page ; restent hors périmètre, identiques sans thème importé, les sous-titres de catégorie du menu latéral en Design system clair (voir [decisions-et-limites.md](decisions-et-limites.md)) et la règle `region` du conteneur d'overlay Material quand un menu est ouvert. Navigation 100 % clavier vérifiée (menu, familles, lien, import, suppression, focus conforme).

## Inspecteur de contraste (complément)

L'inspecteur du catalogue ([inspecteur-contraste.md](inspecteur-contraste.md)) utilise le même moteur qu'`npm run a11y` (règle `color-contrast` d'axe-core) mais dans le navigateur de l'utilisateur : il montre le rapport de chaque texte, page par page, thème par thème. `npm run a11y` reste la référence pour la validation globale (toutes les règles, toutes les pages). L'inspecteur est désactivé au chargement : il n'influence pas les audits.

## Scripts de vérification

Deux scripts Node (`scripts/`), qui s'appuient sur `puppeteer-core` (Chrome déjà installé) et `axe-core`, tous deux en dépendances de développement. Ils démarrent eux-mêmes `ng serve` (port 4300) s'il ne tourne pas, puis l'arrêtent. Si un serveur répond déjà sur ce port, il est réutilisé.

### `npm run a11y` : accessibilité et erreurs console

Ouvre chaque page (accueil + 3 pages Fondations + 35 composants) avec un thème et un mode imposés, exécute axe-core (`wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `best-practice`) et relève les messages console de niveau erreur ou avertissement. Affiche `ok` / `ÉCHEC` par page, un résumé, et **retourne le code 1** s'il reste une violation ou une erreur console.

```bash
npm run a11y -- --console                                 # erreurs console seulement, sans axe : contrôle courant, rapide
npm run a11y                                              # azur, clair + sombre, toutes les pages, avec axe (long)
npm run a11y -- --themes=azur,violet --schemes=dark       # thèmes et modes précis
npm run a11y -- --themes=tous                             # les 10 thèmes
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
| `--console` | erreurs console seulement, sans axe-core (a11y) : le contrôle courant | désactivé |

Variables d'environnement : `BASE_URL` (utiliser un serveur déjà lancé, ex. `http://localhost:4200`), `PORT` (port du serveur démarré par les scripts), `CHROME_PATH` (Chrome ou Chromium si non détecté automatiquement).

Les identifiants de pages et de thèmes sont lus dans `catalog.registry.ts` et `themes.ts` : un nouveau composant ou thème est pris en compte sans modifier les scripts.

### Contrôle manuel complémentaire

Les scripts ne remplacent pas un coup d'œil : parcourir au moins Bouton, Champ de saisie et Tableau dans deux thèmes, en clair et en sombre (`npm run captures`). Vérifier à la main : ouverture d'un snippet, « Copier » (snackbar « Code copié »), Échap, changement de thème / mode / densité puis rechargement (persistance), focus sur `<main>` après navigation, tiroir sur mobile.

Résultat de référence : 39 routes sans erreur console ; axe (azur) : 0 violation partout sauf l'exception ci-dessus. Pages Fondations avec les thèmes du design system : voir « Violations axe admises sur la page Couleurs » dans [decisions-et-limites.md](decisions-et-limites.md).

`npm run a11y` n'évalue que la zone visible du viewport (1280 × 900) : le contenu défile dans `mat-sidenav-content`, ce qui est plus bas n'est pas mesuré. Pour une page haute (Couleurs, Matrice), agrandir le viewport avant d'exécuter axe, comme `npm run captures`.

## Budgets

Voir [architecture.md](architecture.md#build-et-budgets-angularjson). Ne relever un budget qu'avec une justification mesurée (analyse des entrées du bundle principal via `ng build --stats-json`, fichier `dist/poc-ds-isagri/browser-stats.json`).

## Commits

- Branche de travail : `feat/catalogue-material` (non poussée ; `master` ne contient que le commit initial).
- Messages en **Conventional Commits, en français** (`feat(theme): …`, `fix(a11y): …`), avec le trailer `Co-Authored-By` demandé par Claude Code.
- Génération des thèmes : branche `feat/generation-themes`, mêmes conventions.
- Un commit par étape logique ; ne jamais inclure `.mcp.json`, `.mcp.json.tmp`, `tokens/`, `tokens_bak/`, `TOKENS-*.md`, `plan.md`, `.claude/`, `.agents/`, `skills-lock.json` dans un commit de ce chantier.
