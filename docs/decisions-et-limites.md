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
| Rôle | Mesure et affiche, ne corrige rien | Un contraste insuffisant venant des tokens du design system doit rester visible pour être remonté aux designers |

## Budget initial

L'avertissement a été relevé successivement (500 → 600 → 650 → 700 → 850 → 880 kB) au fil de l'ajout de pages. Le dernier cran (850 → 880 kB) vient du branchement des thèmes du design system : le CSS passe de ≈ 44 à ≈ 79 kB (variables `--md-sys-*` des 4 familles de contraste + bloc de surcharges `--mat-sys-*`), le total initial de 823,55 à 857,68 kB. L'inspecteur de contraste ajoute ≈ 9 kB (→ 867 kB) sans relever le budget : axe-core est chargé à la demande. Cause mesurée : le shell importe des modules Material entiers (`list.mjs` ≈ 132 kB, `button.mjs` ≈ 67 kB, `forms`, overlay CDK) qui ne se découpent pas à la classe près, et que le bundler place dans le chunk initial. Déplacer le date adapter vers les pages n'économisait que ≈ 17 kB : abandonné pour garder `app.config.ts` fidèle au plan. Erreur à 1 MB inchangée. Une piste si le poids devient gênant : remplacer `mat-nav-list` du shell par une navigation maison (≈ −130 kB), au prix d'un rendu moins fidèle.

## Particularités d'Angular Material 22 (vérifiées dans les sources installées)

- **Pas d'API de taille pour les boutons** (`matButton`, `matIconButton`, FAB). Seules existent la densité (−4 px par cran) et la surcharge de jetons CSS. Le catalogue montre donc des tailles et formes obtenues par jetons, et le dit.
- **`color` est M2 uniquement** : sans effet avec `mat.theme()` (M3). Aucun specimen ne l'utilise.
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
- Inspecteur de contraste : texte seulement (pas les éléments d'interface à 3 : 1), pas les états survol/focus, résultats « à vérifier » (`?`) pour les fonds en dégradé, en image ou recouverts (dont les entrées du menu latéral).
- Les scripts `a11y` et `captures` nécessitent Chrome ou Chromium installé (`CHROME_PATH` sinon) ; ils ne tournent pas en CI par défaut.
- Seuls les tests du shell, du registre, du service de thème et du specimen existent (plus ceux du script de génération, via `node --test scripts/themes/`).
- **Thèmes du design system : violations axe `color-contrast` dues aux tokens**, volontairement **non corrigées** (le thème est reproduit tel que défini, à remonter aux designers). Audit `npm run a11y -- --themes=app,app-contraste-moyen,app-contraste-eleve,app-monochrome` : `app` et `app-contraste-moyen` en clair (primaire olive utilisé en texte pour les catégories du menu latéral, sous-titre de la barre à 85 % d'opacité) ; `app-contraste-eleve` en clair et en sombre (ligne sélectionnée du tableau : `on-surface` sur `secondary-container`) ; aucune en sombre pour `app` / `app-contraste-moyen`, aucune pour `app-monochrome`.

## Hors périmètre

- `tokens/` et `TOKENS-MD3.md`, `TOKENS-NON-APPLICABLES-MD3.md` : design system externe (tokens DTCG) et analyses de correspondance avec les variables Material Design 3. Lus par `npm run themes` en lecture seule, **jamais modifiés** ni committés ; **non utilisés directement par l'application**.
- Internationalisation autre que le français.

## Fichiers d'outillage à ne pas toucher dans ce chantier

`.mcp.json`, `.mcp.json.tmp` (serveurs MCP : angular-cli, webstorm), `.claude/`, `.agents/` (skills), `skills-lock.json`.
