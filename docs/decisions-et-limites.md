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

### Détection dynamique des jetons

Un nouveau jeton `--app-*` du design system apparaît sans modifier le code ; un jeton attendu mais absent est signalé. Les listes écrites à la main (`COLOR_ROLES`, `COLOR_PAIRS`, `CORNERS`…) restent la référence pour les libellés, l'ordre et les paires de contraste : les jetons détectés sont une couche en plus.

| Sujet | Décision | Pourquoi |
|---|---|---|
| Quand | À l'exécution : parcours de `document.styleSheets`, pas de manifeste généré ; `scripts/themes/` inchangé | Couvre aussi un CSS ajouté à la main ; pas d'étape de plus à oublier. Vérifié en `ng serve` et sur le build de production (41 jetons trouvés dans les deux) |
| Jeton attendu mais absent | Note visible discrète « Jetons attendus mais absents du CSS chargé », en mode design system seulement ; ni `console.error` ni alerte | `npm run a11y` échoue sur les erreurs console ; un thème Angular Material n'est pas censé avoir ces jetons |
| Couleurs détectées | Section « Autres rôles » (pastille, hex, « Jeton personnalisé »), sans paire de contraste | Le fond d'un rôle inconnu ne se devine pas : une paire = une ligne dans `color-roles.ts` |
| Jetons MD3 (`--mat-sys-*`) | Non détectés | Jeu stable ; un nom MD3 est ambigu (couleur, typographie, niveau ?) |

**Ce qui est détecté** (préfixe `--app-`, `DS_PREFIX`) : `--app-color-<rôle>` (page Couleurs), `--app-shape-corner-<nom>` (Rayons Expressive), `--app-spacing-<nom>` (Espacements), et tout `--app-typescale-*` absent des 13 graisses renforcées montrées (« Autres jetons de typographie », valeur brute ; y compris une éventuelle `--app-typescale-emphasized-label-large-weight`, les graisses de Label Large et Moyen restant celles de Material).

**Ce qui ne l'est pas** :

- les jetons MD3 ;
- les jetons `--app-*` de forme de nom inconnue (autre que `color-`, `shape-corner-`, `spacing-`, `typescale-`) : aucune section « Autres jetons du design system » n'a été ajoutée (affichage sans mise en forme, à décider avec les designers) ;
- un rôle `--app-color-<nom>` dont le nom existe déjà dans `COLOR_ROLES` (même en MD3, ex. `--app-color-primary`) : ambigu, il est ignoré ;
- une feuille de style cross-origin (Google Fonts) : ignorée, elle ne porte pas de jeton.

**Jeton déclaré par une seule famille de thème** : la détection fait l'union de tous les blocs (`.theme-app`, `.theme-app-contraste-moyen`…), mais un rôle de couleur détecté qui n'a pas de valeur dans le thème courant est **masqué** (pas de ligne « — » parasite) ; il apparaît dans le thème qui le déclare. Les rôles listés à la main, eux, gardent « — ».

**Note « absents »** : comparée à l'union de tous les thèmes (un jeton déclaré dans un seul thème n'est pas « absent »). Elle n'apparaît qu'une fois au moins une variable `--app-*` trouvée : tant que le CSS n'est pas chargé, ou si aucune variable `--app-*` n'existe du tout, rien n'est affiché.

### Couleurs personnalisées sur les pages de composants

- **Familles détectées, pas listées** : une famille est un jeu `--app-color-<id>` complet (rôle, `on-`, `-container`, `on-…-container`), repéré par `detectedColorFamilies()` (`color-roles.ts`) dans le CSS chargé. Une famille incomplète (ex. `--app-color-danger` sans son `on-`) est ignorée. Le libellé vient de `COLOR_ROLES` quand la famille y figure (Succès, Info, Alerte), sinon c'est l'identifiant.
- **Variables intermédiaires `--r-*`** : comme la liste des familles n'est pas connue à la compilation, on ne peut pas écrire une classe Sass par famille. `ColorFamilyScope` pose quatre variables (`--r-f`, `--r-sf`, `--r-c`, `--r-sc`) sur un `span` en `display: contents`, et une seule classe `.perso` par page les lit (même principe que `roles.button`). Les mixins de `_roles.scss` acceptent donc le rôle spécial `custom`.
- **Panneaux ouverts** : certains sont rendus dans le conteneur de la surcouche CDK (menu, snackbar), d'autres **dans le champ** (sélecteurs de date et d'heure : élément `popover` enfant du `mat-form-field`). `OverlayFamily` couvre le premier cas, `ColorFamilyScope` autour du champ le second ; les deux sont posés. L'appel d'`apply` se fait sur `(opened)` : `mat-datepicker-toggle` arrête la propagation du clic, et Safari ne focalise pas un bouton cliqué.
- **Limite du calendrier en champ** : la classe s'applique au calendrier, pas à son conteneur (fond, forme et ombre inchangés) ; en plage, le texte des jours de plage reste en couleur par défaut sur fond conteneur.
- **Contraste** : les exemples en rôle seul sur la surface de la page (bouton texte, contour ou relevé, étiquette d'un champ contour, onglet actif, rail, icône) reprennent les valeurs du design system. En clair avec `app` et `app-contraste-moyen`, elles sont sous 4,5 : 1 (ex. Succès 2,02 : 1 et Alerte 1,96 : 1 sur la surface avec `app`, 4,38 : 1 avec `app-contraste-moyen`). C'est la même cause que les violations déjà admises (voir « Limites connues ») : **non corrigé**, à remonter aux designers. `app-contraste-eleve` et `app-monochrome` n'ajoutent aucune violation. Les exemples fond + texte du même conteneur (carte, barre d'outils, tableau, liste…) passent.
- **Mesure** : `npm run a11y` n'évalue que 1280 × 900 ; ces sections sont en bas de page. Pour les mesurer, agrandir le viewport à la hauteur du contenu avant `axe.run` (comme `npm run captures`).

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

## Thèmes importés dans le navigateur

Détail : [fonctionnel.md](fonctionnel.md#thèmes-importés), [architecture.md](architecture.md) (section « Thèmes importés ») et [generation-themes.md](generation-themes.md#import-dans-le-navigateur).

| Sujet | Décision | Pourquoi |
|---|---|---|
| Écran | Une **page dédiée** `/themes-importes` (lazy, hors registre), atteinte depuis le sélecteur. **Ni `MatDialog` ni `MatSnackBar`** : confirmations et annonces en ligne, dans des régions `aria-live` | Le chunk de la page porte formulaires, Material et, via `import()` au choix du premier fichier, `fflate` et le générateur : rien dans le bundle initial, sans contorsion. Le routeur donne gratuitement le focus sur `<main>`, un titre, une URL, et la place pour un rapport lisible |
| Stockage | **`localStorage`**, pas IndexedDB | Lecture **synchrone** : le CSS du thème actif doit être posé avant le premier rendu (IndexedDB imposerait de retarder le rendu ou d'accepter un flash de thème par défaut). Volume faible (≈ 5 ko par famille, ≈ 400 ko pour 20 thèmes de 4 familles, pour ≈ 5 Mo par origine). Même mécanisme que `catalogue-material-theme`. À revoir si l'on stocke un jour les zips ou plus de ~100 thèmes |
| Ce qu'on stocke | Le **CSS généré** et des métadonnées, **pas le zip** | Le CSS est ce qui sert ; le zip n'a pas d'autre usage (pas de ré-édition dans le site) |
| Préfixe des variables | Toujours `app` | Les pages Fondations et le pont Material (`_themes-app.scss`) lisent `--app-*` et `--md-sys-*` |
| Génération | Les **mêmes modules** que `npm run themes`, partagés par `import()` | Une seule logique de correspondance tokens → variables ; un test compare les sorties avec et sans `portee` |
| Pont vers Material | Le mixin déjà compilé `themes-app.theme()`, déclenché par la classe `theme-importe` | Il ne référence que des `var(--md-sys-*)` : pas de Sass dans le navigateur |
| Identité | Identifiant technique généré (`imp-xxxxxx`) ; **le nom saisi est un libellé** | Pas d'injection par le nom, pas de collision |
| Sécurité du CSS | `validerCss` : contrôle ligne à ligne avant toute injection | Les valeurs viennent de l'utilisateur et ne sont pas échappées par le générateur |
| Choix du fichier | Zone de glisser-déposer **dont le `<label>` est celle du champ `<input type="file">` natif** (masqué visuellement, pas `display: none`) ; un seul fichier déposé à la fois | Zone plus lisible que le bouton natif, sans perdre le clavier ni les lecteurs d'écran (le plan initial écartait le glisser-déposer pour cette raison) ; le dépôt et le choix passent par la même analyse |
| Gestion | Import et suppression seulement (20 thèmes au plus) | Demande exprimée ; renommer, exporter ou mettre à jour sont des ajouts triviaux plus tard |
| Famille appliquée après import | La famille par défaut du zip (la « Standard » s'il y en a une) | Simple et prévisible |
| Identifiant de l'import | Tiré **à la sélection du fichier** (et non au clic sur « Importer ») | Il entre dans les sélecteurs du CSS, produit à l'analyse ; il est vérifié contre la liste à ce moment |
| Boutons de la page | `tonal` pour les actions secondaires (Supprimer, Annuler), cartes sur `surface` | Le texte `primary` d'un bouton `outlined` sur la surface n'atteint que 4,48 : 1 dans le thème Design system « contraste moyen » (cf. « Violations axe admises sur la page Couleurs ») ; la page doit passer axe dans tous les thèmes |

### Limites des thèmes importés

- **Familles** : celles que `detecterFamilles` reconnaît dans les noms de fichiers (mots clair/sombre) ; une famille doit avoir ses deux modes. Un nom inconnu donne une famille « libre » nommée d'après le fichier. Plafonds : 20 thèmes, 5 Mo par zip, 5 Mo par fichier JSON décompressé, 40 fichiers JSON.
- **Polices** : seule Poppins est chargée. La police des tokens n'est pas téléchargée ; elle n'apparaît que si elle est installée sur la machine (le rapport d'import le dit).
- **Jetons `--app-*` absents de l'import** : le CSS statique pose les variables de la famille par défaut du design system sur `:root`, donc une variable `--app-*` que l'import ne définit pas **reste visible avec la valeur du thème intégré** (les variables MD3 indispensables, elles, sont contrôlées : une absence refuse l'import). Le rapport avertit des variables du design system attendues et absentes du zip.
- **Le zip source n'est pas conservé** : pour corriger un thème, réimporter un zip. Si le générateur évolue, les thèmes déjà importés gardent l'ancien CSS ; l'index porte `version: 1` pour permettre une migration future.
- **Un seul navigateur, un seul profil** : pas de partage entre postes ni d'export ; effacer les données du site supprime les thèmes importés.
- **Pas de synchronisation entre onglets** : un thème supprimé dans un onglet reste actif dans un autre jusqu'au rechargement (retour au thème par défaut à ce moment-là).
- Les **variables sans équivalent dans les tokens** (élévations `level0` à `level5`, voile `neutral-variant20`) viennent de la palette de repli, comme pour le thème « Design system » intégré ; les **opacités d'état** sont celles de MD3, comme pour les thèmes générés.
- Les messages techniques du générateur gardent leur détail d'origine entre parenthèses (par exemple `invalid zip data`, ou le message de `JSON.parse`) : ils ne sont pas traduits, comme dans le script.
- L'audit axe de la page et du menu se fait hors `npm run a11y` (qui ne parcourt que les routes du registre) : voir [qualite-et-accessibilite.md](qualite-et-accessibilite.md). Les menus ouverts remontent la règle `region` sur `.cdk-overlay-container` (comportement de tout menu Material, y compris celui de la page Menu du catalogue), non corrigée.
- Les scripts `a11y` et `captures` n'appliquent pas de thème importé (hors périmètre).

## Budget initial

L'avertissement a été relevé successivement (500 → 600 → 650 → 700 → 850 → 880 kB) au fil de l'ajout de pages. Le dernier cran (850 → 880 kB) vient du branchement des thèmes du design system : le CSS passe de ≈ 44 à ≈ 79 kB (variables `--md-sys-*` des 4 familles de contraste + bloc de surcharges `--mat-sys-*`), le total initial de 823,55 à 857,68 kB. L'inspecteur de contraste ajoute ≈ 9 kB (→ 867 kB) sans relever le budget : axe-core est chargé à la demande. Cause mesurée : le shell importe des modules Material entiers (`list.mjs` ≈ 132 kB, `button.mjs` ≈ 67 kB, `forms`, overlay CDK) qui ne se découpent pas à la classe près, et que le bundler place dans le chunk initial. Déplacer le date adapter vers les pages n'économisait que ≈ 17 kB : abandonné pour garder `app.config.ts` fidèle au plan. Les thèmes importés (service de stockage, `ThemeService`, section du sélecteur) portent le total initial de 871,95 à 878,83 kB (+ 6,9 kB, dont ≈ 3,5 pour `ThemeService` et `ImportedThemes` et ≈ 2,8 pour le menu) sans relever le budget : la page, `@angular/forms/signals`, `fflate` et le générateur sont différés ; la marge sous l'avertissement n'est plus que d'environ 1 kB. Erreur à 1 MB inchangée. Une piste si le poids devient gênant : remplacer `mat-nav-list` du shell par une navigation maison (≈ −130 kB), au prix d'un rendu moins fidèle.

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
- Seuls les tests du shell, du registre, du service de thème, des thèmes importés (service, sélecteur, page), du specimen, de l'inspecteur et des calculs de `core/tokens/` existent (plus ceux du script de génération, via `node --test scripts/themes/*.test.mjs`). Les pages Fondations sont vérifiées dans Chrome (jsdom ne connaît pas `light-dark()`).
- **`npm run a11y -- --themes=tous` ne teste aucun thème** : `themesDisponibles()` (`scripts/lib.mjs`) lit le type `ThemeId` avec une expression régulière qui ne reconnaît plus sa forme sur plusieurs lignes, et renvoie une liste vide. Passer les thèmes un par un (`--themes=azur,violet,…`). Non corrigé ici.
- **Sections « Couleurs personnalisées »** : voir [ci-dessus](#couleurs-personnalisées-sur-les-pages-de-composants) (contraste des familles utilisées seules sur la surface, calendrier en champ).
- **Thèmes du design system : violations axe `color-contrast` dues aux tokens**, volontairement **non corrigées** (le thème est reproduit tel que défini, à remonter aux designers). Audit `npm run a11y -- --themes=app,app-contraste-moyen,app-contraste-eleve,app-monochrome` : `app` et `app-contraste-moyen` en clair (primaire olive utilisé en texte pour les catégories du menu latéral, sous-titre de la barre à 85 % d'opacité) ; `app-contraste-eleve` en clair et en sombre (ligne sélectionnée du tableau : `on-surface` sur `secondary-container`) ; aucune en sombre pour `app` / `app-contraste-moyen`, aucune pour `app-monochrome`.

## Hors périmètre

- `tokens/` et `TOKENS-MD3.md`, `TOKENS-NON-APPLICABLES-MD3.md` : design system externe (tokens DTCG) et analyses de correspondance avec les variables Material Design 3. Lus par `npm run themes` en lecture seule, **jamais modifiés** ni committés ; **non utilisés directement par l'application**.
- Internationalisation autre que le français.

## Fichiers d'outillage à ne pas toucher dans ce chantier

`.mcp.json`, `.mcp.json.tmp` (serveurs MCP : angular-cli, webstorm), `.claude/`, `.agents/` (skills), `skills-lock.json`.
