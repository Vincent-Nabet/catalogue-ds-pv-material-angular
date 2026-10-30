# Décisions, particularités et limites

## Décisions de conception

| Sujet | Décision | Pourquoi |
|---|---|---|
| Source des pages | Registre unique (`catalog.registry.ts`) | Ajouter un composant = 1 entrée + 1 page ; routes, navigation et accueil dérivés |
| Snippets | Écrits à la main, dans une constante par page | Pas de génération automatique ni de coloration syntaxique (aucune dépendance ajoutée) |
| Snippet discret | Petit bouton `</>` sur le specimen, dialog avec « Copier » | Le visuel prime ; le code reste accessible sans encombrer |
| Thème | Palettes Material prédéfinies uniquement, classes sur `<html>` | Pas de thème Isagri ni de niveaux de contraste (hors périmètre) ; `light-dark()` évite de dupliquer clair/sombre |
| Mode par défaut | Clair (et classe `scheme-light` en dur dans `index.html`) | Demande explicite ; évite le flash selon le thème du système |
| Libellés Material | `*Intl` français fournis au niveau des pages | Interface 100 % française sans alourdir le bundle initial |
| Bouton du sélecteur | Bouton tonal « Thème : X » avec pastille | Un bouton icône seul passait inaperçu |
| Formulaires de démonstration | `FormControl` réactif pour les états d'erreur | Simples specimens, pas de vrais formulaires (les Signal Forms ne s'imposaient pas) |
| Popups | Bouton déclencheur uniquement | Aperçu statique non fiable (focus trap, overlays) |
| Largeur des colonnes | `minWidth` par section, 300 px par défaut | Les composants larges (carte, tableau, onglets…) débordaient à 220 px |
| Arbres | Dépliés au chargement (`afterNextRender` + `expandAll()`) | Sinon les variantes ne se distinguent pas |

## Budget initial

L'avertissement a été relevé successivement (500 → 600 → 650 → 700 → 850 kB) au fil de l'ajout de pages. Cause mesurée : le shell importe des modules Material entiers (`list.mjs` ≈ 132 kB, `button.mjs` ≈ 67 kB, `forms`, overlay CDK) qui ne se découpent pas à la classe près, et que le bundler place dans le chunk initial. Déplacer le date adapter vers les pages n'économisait que ≈ 17 kB : abandonné pour garder `app.config.ts` fidèle au plan. Erreur à 1 MB inchangée. Une piste si le poids devient gênant : remplacer `mat-nav-list` du shell par une navigation maison (≈ −130 kB), au prix d'un rendu moins fidèle.

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
- Pas de scripts de vérification (axe, captures) conservés dans le dépôt : la méthode est décrite, à rejouer à la demande.
- Seuls les tests du shell, du registre, du service de thème et du specimen existent.

## Hors périmètre

- `tokens/` et `TOKENS-MD3.md`, `TOKENS-NON-APPLICABLES-MD3.md` : correspondances entre un design system externe (tokens DTCG) et les variables Material Design 3. Document pour le design, **non utilisé par l'application**.
- Thème Isagri, niveaux de contraste du thème, internationalisation autre que le français.

## Fichiers d'outillage à ne pas toucher dans ce chantier

`.mcp.json`, `.mcp.json.tmp` (serveurs MCP : angular-cli, webstorm), `.claude/`, `.agents/` (skills), `skills-lock.json`.
