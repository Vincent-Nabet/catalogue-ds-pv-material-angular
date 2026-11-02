# Décisions, particularités et limites

## Décisions de conception

| Sujet | Décision | Pourquoi |
|---|---|---|
| Source des pages | Registre unique (`catalog.registry.ts`) | Ajouter un composant = 1 entrée + 1 page ; routes, navigation et accueil dérivés |
| Snippets | Écrits à la main, dans une constante par page | Pas de génération automatique ni de coloration syntaxique (aucune dépendance ajoutée) |
| Snippet discret | Petit bouton `</>` sur le specimen, dialog avec « Copier » | Le visuel prime ; le code reste accessible sans encombrer |
| Thème | 6 palettes Material prédéfinies + 4 thèmes du design system (générés), classes sur `<html>` | `light-dark()` évite de dupliquer clair/sombre ; les thèmes du design system apportent les niveaux de contraste |
| Mode par défaut | Clair (et classe `scheme-light` en dur dans `index.html`) | Demande explicite ; évite le flash selon le thème du système |
| Libellés Material | `*Intl` français fournis au niveau des pages | Interface 100 % française sans alourdir le bundle initial |
| Bouton du sélecteur | Bouton tonal « Thème : X » avec pastille | Un bouton icône seul passait inaperçu |
| Formulaires de démonstration | `FormControl` réactif pour les états d'erreur | Simples specimens, pas de vrais formulaires (les Signal Forms ne s'imposaient pas) |
| Popups | Bouton déclencheur uniquement | Aperçu statique non fiable (focus trap, overlays) |
| Largeur des colonnes | `minWidth` par section, 300 px par défaut | Les composants larges (carte, tableau, onglets…) débordaient à 220 px |
| Arbres | Dépliés au chargement (`afterNextRender` + `expandAll()`) | Sinon les variantes ne se distinguent pas |

## Thèmes générés depuis les tokens

Détail : [generation-themes.md](generation-themes.md).

| Sujet | Décision | Pourquoi |
|---|---|---|
| Palette tonale MD3 | Non dérivable des `Shade-NNN` : surcharge des variables `--mat-sys-*` + palette Material prédéfinie en repli | Les tokens n'ont pas les tons 0 à 100 que `mat.theme()` attend |
| Surcharges | Second argument de `mat.theme()` (pas `mat.theme-overrides()`) | `theme-overrides` ignore `neutral10` ; la table est vérifiée par compilation Sass |
| Variables typo composites | Surchargées aussi (`--mat-sys-body-large`…) | Valeurs figées : surcharger `-size` ou `-weight` ne les met pas à jour |
| State Layers | Ignorés ; opacités d'état MD3 posées en constantes | Ce sont des alias de couleur sans opacité |
| Clair/sombre et contraste | `light-dark()` + une classe `theme-<nom>[-<contraste>]` par famille | Même mécanisme que Material et que le catalogue ; 4 blocs au lieu de 8 |
| Intégration au catalogue | 4 entrées dans le sélecteur (`app`, `app-contraste-moyen`, `app-contraste-eleve`, `app-monochrome`) | Une classe `theme-*` par famille de contraste ; un seul bloc `mat.theme()` pour les quatre (le mixin ne référence que des variables) |

## Inspecteur de contraste

Détail : [inspecteur-contraste.md](inspecteur-contraste.md).

| Sujet | Décision | Pourquoi |
|---|---|---|
| Mesure | `axe-core` (règle `color-contrast`) exécuté dans le navigateur | Fonds composites et transparence gérés ; mêmes résultats que `npm run a11y` |
| Chargement | `import()` à la première analyse (chunk ≈ 675 kB) | Aucun coût pour le bundle initial, déjà proche de son budget |
| Activation | Désactivé au chargement, non persisté | L'analyse prend 1 à 2 s ; ne doit pas fausser `a11y` / `captures` |
| Périmètre | `<main>` des pages de composants ; shell et accueil exclus, bouton absent ailleurs | Le shell est propre au catalogue (et donnait des résultats indéterminés) ; l'outil sert à juger les composants dans un thème |
| Rôle | Mesure et affiche, ne corrige rien | Un contraste insuffisant venant des tokens du design system doit rester visible pour être remonté aux designers |

## Pages Fondations

Détail : [fonctionnel.md](fonctionnel.md) et [architecture.md](architecture.md).

| Sujet | Décision | Pourquoi |
|---|---|---|
| Lecture des valeurs | Sondes DOM et `getComputedStyle`, dans le navigateur ; pas de fichier de données généré ; `npm run themes` inchangé | Les pages montrent ce qui est réellement rendu (y compris les écrasements de `styles.scss`), sans second jeu de données à tenir synchronisé |
| Matrice | Limitée aux 4 familles × clair / sombre du design system | Les palettes Material prédéfinies ne servent pas à améliorer les tokens |
| Matrice indépendante du thème | Huit sondes portant `theme-<famille>` et un `color-scheme` | Le résultat est le même quel que soit le thème choisi |
| Snippets | Dérivés des données (paires, styles, jetons) | Il n'y a pas de composant Material à recopier, seulement l'usage des variables (exception à la règle des snippets écrits à la main) |
| Ratios | Tronqués à 2 décimales à l'affichage, comparés bruts au seuil | Un échec à 4,4996 ne doit jamais s'afficher « 4,50 : 1 » ; même troncature qu'axe, donc mêmes chiffres que l'inspecteur |
| Statut | Icône et texte, jamais la couleur seule ; pastille verte (succès du design system, dans tous les thèmes : Material n'a pas de rôle succès), rouge (`error-container`) ou neutre | WCAG 1.4.1 ; lisibilité |
| Jetons personnalisés | Pastille « Jeton personnalisé » (paire `inverse-on-surface` / `inverse-surface`) sur chaque exemple en `--app-*`, rappel dans la description de la section | Le designer doit voir qu'un jeton qu'il crée génère une variable hors MD3 |
| Fichiers | `pages/fondations/<id>/`, URL `/composants/<id>` | Routes, menu, accueil, inspecteur et scripts suivent sans modification |

### Page Matrice de contraste : débranchée

La page est conservée (`src/app/pages/fondations/matrice-contraste/matrice-contraste.page.ts`, avec `core/tokens/contrast-matrix.ts` et ses tests) mais son entrée a été retirée de `CATALOG` : plus de route, de lien de menu ni de carte d'accueil, et elle n'entre pas dans le bundle. Le fichier reste compilé et typé (`tsconfig.app.json` inclut `src/**/*.ts`). Pour la rebrancher, ajouter dans `CATALOG`, en deuxième position :

```ts
{
  id: 'matrice-contraste',
  label: 'Matrice de contraste',
  category: 'fondations',
  icon: 'grid_on',
  loadComponent: () =>
    import('../../pages/fondations/matrice-contraste/matrice-contraste.page').then(
      (m) => m.MatriceContrastePage,
    ),
},
```

puis passer le test du registre à 4 pages Fondations et mettre à jour les compteurs de la documentation. Les mentions de la matrice ci-dessous décrivent la page telle qu'elle a été vérifiée avant son retrait.

### Limites des pages Fondations

- **WCAG 2.x seulement** (pas d'APCA) ; texte (4,5), éléments d'interface (3) et décoratif (sans seuil). Pas de contraste des états (survol, focus).
- **Paires « observées dans les composants » à compléter à la main** (2 aujourd'hui : `on-surface` sur `secondary-container`, `primary` sur `surface-container-low`) : voir [ajouter-un-composant.md](ajouter-un-composant.md) §6.
- **Régressions peu sélectives** : la règle « plus de 0,01 sous la famille précédente » signale aussi des écarts anodins (ex. `on-surface` sur `surface-container-low` : 16,00 en Standard, 15,63 en Contraste moyen, tous deux très conformes). En Contraste moyen clair, 15 paires sont ainsi marquées. Le filtre « Échecs et régressions seulement » les inclut ; seuls les **échecs** correspondent à une non-conformité.
- **Opacités d'état** : sous un thème du design system, `--mat-sys-focus-state-layer-opacity` et `--mat-sys-pressed-state-layer-opacity` valent **0,12** alors que le script pose 0,10 (`--md-sys-state-*`). Cause mesurée : les blocs `html.density-N` de `styles.scss` rappellent `mat.theme(density)` après le thème du design system et réémettent les valeurs par défaut de Material. La page affiche la valeur du rendu ; le défaut n'est pas corrigé ici.
- **Espacements** : 10 jetons (`none` à `full`) dans `app.css`.
- **axe ne mesure que la zone visible** : le contenu défile dans `mat-sidenav-content`, donc ce qui est sous la ligne de flottaison n'est pas évalué par `npm run a11y` (viewport 1280 × 900). Pour auditer une page haute en entier, agrandir le viewport comme le fait `npm run captures`.

### Violations axe admises sur la page Couleurs

Thèmes du design system, **échantillons de la page Couleurs** uniquement (la couleur testée est celle du token : c'est le but de la page, rien n'est corrigé). Page entière, zone `main` ; elles reprennent exactement les échecs du résumé de la matrice.

| Thème, mode | Échantillons en `color-contrast` |
|---|---|
| Standard, clair (5) | `primary` / `surface` 2,76 ; `primary` / `surface-container-low` 2,65 ; `tertiary` / `surface` 1,40 ; `success` / `surface` 2,09 ; `warning` / `surface` 2,04 |
| Standard, sombre (1) | `inverse-primary` / `inverse-surface` 2,24 |
| Contraste moyen, clair (2) | `primary` / `surface` 4,48 ; `primary` / `surface-container-low` 4,24 |
| Contraste élevé, clair (1) et sombre (1) | `on-surface` / `secondary-container` 2,40 (clair), 2,31 (sombre) |
| Contraste moyen sombre, Monochrome | aucune |

Matrice, Typographie et Formes et espacements : 0 violation dans la zone `main`, pour les 10 thèmes en clair et en sombre. Thèmes Angular Material : 0 violation sur les quatre pages, y compris la page Couleurs entière. Hors des pages, le menu latéral du shell produit ses propres violations (sous-titres de catégorie en `primary` sur `surface-container-low`) en Standard clair et Contraste moyen clair, sur **toutes** les pages : voir « Limites connues ».

## Budget initial

L'avertissement a été relevé successivement (500 → 600 → 650 → 700 → 850 → 880 kB) au fil de l'ajout de pages. Le dernier cran (850 → 880 kB) vient du branchement des thèmes du design system : le CSS passe de ≈ 44 à ≈ 79 kB (variables `--md-sys-*` des 4 familles de contraste + bloc de surcharges `--mat-sys-*`), le total initial de 823,55 à 857,68 kB. L'inspecteur de contraste ajoute ≈ 9 kB (→ 867 kB) sans relever le budget : axe-core est chargé à la demande. Cause mesurée : le shell importe des modules Material entiers (`list.mjs` ≈ 132 kB, `button.mjs` ≈ 67 kB, `forms`, overlay CDK) qui ne se découpent pas à la classe près, et que le bundler place dans le chunk initial. Déplacer le date adapter vers les pages n'économisait que ≈ 17 kB : abandonné pour garder `app.config.ts` fidèle au plan. Erreur à 1 MB inchangée. Une piste si le poids devient gênant : remplacer `mat-nav-list` du shell par une navigation maison (≈ −130 kB), au prix d'un rendu moins fidèle.

## Particularités d'Angular Material 22 (vérifiées dans les sources installées)

- **Pas d'API de taille pour les boutons** (`matButton`, `matIconButton`, FAB). Seules existent la densité (−4 px par cran) et la surcharge de jetons, que le catalogue fait passer par les mixins Sass `mat.button-overrides` / `mat.icon-button-overrides` (noms validés à la compilation) plutôt que par des variables CSS écrites à la main. Il montre donc des tailles et formes obtenues par jetons, et le dit.
- **`color` est M2 uniquement** : l'entrée existe mais reste sans effet avec `mat.theme()` (M3) ; seul `mat.color-variants-backwards-compatibility($theme)` (déconseillé, non testé avec `mat.theme()`) la réactive (`primary`, `accent`→tertiary, `warn`→error). Aucun specimen ne l'utilise : la page Bouton montre les rôles secondaire, tertiaire et erreur avec les mixins Sass `mat.button-overrides` (valeurs `--mat-sys-*`, noms de jetons validés à la compilation ; fond et texte ensemble ; les `ripple-color` ne sont pas surchargés, pour limiter le poids des styles de la page, voir `docs/architecture.md`) ; les boutons icône et les FAB (FAB, mini FAB, FAB étendu) suivent les mêmes classes avec `mat.icon-button-overrides` et `mat.fab-overrides`. Le SCSS de la page garde des variables intermédiaires `--r-*` (posées par le mixin `role()`) : y mettre directement les `var(--mat-sys-*)` répéterait les valeurs pour chaque rôle et faisait passer les styles de 4,22 à 6,82 kB. Les snippets affichés, eux, écrivent les valeurs en entier (`@use '@angular/material' as mat;`) pour être copiés tels quels. `danger` n'existe pas dans Material.
- **Chargement d'un bouton** : input natif `showProgress` + contenu `[progressIndicator]` ; le libellé est alors masqué (prévoir un `aria-label`).
- **`matButton`** accepte `text | filled | elevated | outlined | tonal`. **`matIconButton`**, **`matFab`** (+ `extended`), **`matMiniFab`** sont séparés.
- **Boutons bascule** : `appearance` vaut `standard` ou `legacy`.
- **Sidenav** : `hasBackdrop` est sur le conteneur ; en mode `over`/`push` ouvert, le focus trap pose des ancres `aria-hidden` focusables (violation axe) : laisser fermé au chargement.
- **Timepicker** : pas de classe `Intl` ; `min`/`max` acceptent une chaîne `HH:mm`.
- **Stepper** : `matStepperIcon` accepte les états `number`, `edit`, `done`, `error` ; l'état d'erreur n'est pas présenté dans le catalogue. Une étape terminée et modifiable affiche l'icône `edit`, une étape terminée et non modifiable l'icône `done`.
- **Arbre** : `childrenAccessor` doit retourner un tableau (pas `undefined`) ; mélange possible de `mat-tree-node` et `mat-nested-tree-node` ; `expandAll()` disponible sur l'instance.
- **Tableau** : `matNoDataRow`, `mat-text-column`, colonnes figées via `[sticky]="true"` sur `matColumnDef` (fournir un fond opaque à la colonne).
- **Onglets** : l'étirement est actif par défaut ; sans `[mat-stretch-tabs]="false"`, `mat-align-tabs` ne se voit pas.
- **Grille** : l'en-tête de tuile a un fond semi-transparent et un texte blanc en dur : redéfinir les couleurs avec une spécificité supérieure.
- **Material Symbols** : `<mat-icon>` suppose la police Material Icons par défaut ; basculer l'ensemble de polices par défaut (voir `app.config.ts`).

## Limites connues

- 1 violation axe sur le calendrier natif (voir [qualite-et-accessibilite.md](qualite-et-accessibilite.md)).
- Polices et icônes chargées depuis Google Fonts (hors ligne : police par défaut et noms d'icônes en texte).
- États de survol et d'appui non forçables, donc non montrés.
- Pas de cartes avec image, pas de formulaires complets, pas de validation asynchrone.
- Inspecteur de contraste : contenu des pages de composants seulement (ni shell, ni accueil, ni menus/dialogues ouverts depuis un specimen), texte seulement (pas les éléments d'interface à 3 : 1), pas les états survol/focus, résultats « à vérifier » (`?`) pour les fonds en dégradé, en image ou recouverts.
- Les scripts `a11y` et `captures` nécessitent Chrome ou Chromium installé (`CHROME_PATH` sinon) ; ils ne tournent pas en CI par défaut.
- Seuls les tests du shell, du registre, du service de thème, du specimen, de l'inspecteur et des calculs de `core/tokens/` existent (plus ceux du script de génération, via `node --test scripts/themes/`). Les pages Fondations sont vérifiées dans Chrome (jsdom ne connaît pas `light-dark()`).
- **`npm run a11y -- --themes=tous` ne teste aucun thème** : `themesDisponibles()` (`scripts/lib.mjs`) lit le type `ThemeId` avec une expression régulière qui ne reconnaît plus sa forme sur plusieurs lignes, et renvoie une liste vide. Passer les thèmes un par un (`--themes=azur,violet,…`). Non corrigé ici.
- **Thèmes du design system : violations axe `color-contrast` dues aux tokens**, volontairement **non corrigées** (le thème est reproduit tel que défini, à remonter aux designers). Audit `npm run a11y -- --themes=app,app-contraste-moyen,app-contraste-eleve,app-monochrome` : `app` et `app-contraste-moyen` en clair (primaire olive utilisé en texte pour les catégories du menu latéral, sous-titre de la barre à 85 % d'opacité) ; `app-contraste-eleve` en clair et en sombre (ligne sélectionnée du tableau : `on-surface` sur `secondary-container`) ; aucune en sombre pour `app` / `app-contraste-moyen`, aucune pour `app-monochrome`.

## Hors périmètre

- `tokens/` et `TOKENS-MD3.md`, `TOKENS-NON-APPLICABLES-MD3.md` : design system externe (tokens DTCG) et analyses de correspondance avec les variables Material Design 3. Lus par `npm run themes` en lecture seule, **jamais modifiés** ni committés ; **non utilisés directement par l'application**.
- Internationalisation autre que le français.

## Fichiers d'outillage à ne pas toucher dans ce chantier

`.mcp.json`, `.mcp.json.tmp` (serveurs MCP : angular-cli, webstorm), `.claude/`, `.agents/` (skills), `skills-lock.json`.
