# Plan : génération d'un thème Angular Material depuis les tokens du design system

## 0. Conduite de l'exécution

- **Exécution autonome jusqu'au bout** : toutes les étapes du § 7 s'enchaînent sans demander de validation. On ne s'arrête que si un point d'attention exige une décision qui n'est pas tranchée dans ce plan, par exemple :
  - une hypothèse du plan s'avère fausse et change le résultat visible (ex. `mat.theme-overrides` refuse une clé et le contournement change la sortie) ;
  - il faudrait modifier un fichier hors périmètre ;
  - une vérification reste rouge sans correction évidente.
  Les choix mineurs d'implémentation sont faits sans demander et consignés dans `docs/generation-themes.md`.
- **Branche dédiée** : `feat/generation-themes`, créée depuis `main` avant le premier commit. Pas de push ni de PR sans demande.
- **Commits réguliers et logiques** : un commit par étape cohérente et vérifiée (tests de l'étape au vert), jamais de commit fourre-tout en fin de chantier. Conventional Commits en français. Découpage indicatif :
  1. `chore(themes): dépendance fflate et script npm themes`
  2. `feat(themes): lecture des tokens (dossier ou zip) et résolution des alias`
  3. `feat(themes): correspondance tokens vers variables MD3 et custom`
  4. `feat(themes): génération des variables CSS MD3 et custom`
  5. `feat(themes): génération du thème Angular Material`
  6. `feat(themes): CLI et rapport de génération`
  7. `feat(themes): fichiers générés depuis les tokens actuels`
  8. `docs: séparation site / construction des thèmes, génération des thèmes`
- Fichiers jamais committés : `tokens/`, `tokens_bak/`, `TOKENS-*.md`, `plan.md`, `.mcp.json*`, `.claude/`, `.agents/`, `skills-lock.json` (indexation fichier par fichier, pas de `git add -A`).
- **Fin d'exécution** : bilan court (commits créés, résultats des vérifications, rapport de génération, décisions prises en cours de route, points restants).

## 1. Objectif et périmètre

Créer un script Node qui lit les tokens DTCG (`tokens/` ou un `.zip` de même arborescence) et produit, dans un répertoire dédié :

1. **Étape 1 — variables CSS MD3 + custom** : fichiers `.css` autonomes (`--md-sys-*`, `--md-ref-*`, `--<nom>-*`), réutilisables hors Angular.
2. **Étape 2 — thème Angular Material** : un fichier `.scss` qui branche les `--mat-sys-*` sur les variables de l'étape 1, avec une palette Material prédéfinie en repli pour ce que les tokens ne fournissent pas.

**Hors périmètre** :
- aucune intégration dans le catalogue : pas de modification de `src/styles.scss`, `ThemeService`, `themes.ts`, du sélecteur de thème ni de `angular.json`. Les fichiers générés sont **prêts à importer** ; leur branchement au sélecteur de thèmes est une étape ultérieure, que les choix ci-dessous (classes `theme-*`, `color-scheme`) préparent ;
- `tokens/`, `TOKENS-MD3.md`, `TOKENS-NON-APPLICABLES-MD3.md` : lecture seule.

## 2. Constats tirés des tokens et des analyses

- `primitives.tokens.json` : `Font theme`, `Radius`, `Spacing`, `Colors.<palette>.Shade-NNN`, `Number`, `Number 2`.
- 8 fichiers `semantics/*.tokens.json`, **301 tokens chacun, même structure et même ordre** (vérifié) : `Colors.Schemes`, `Colors.State Layers`, `Colors.Add-ons`, `Typescale.Static`. Seules les couleurs varient d'un mode à l'autre.
- Les 8 modes forment 4 paires clair/sombre : `light`/`dark`, `light-medium-contrast`/`dark-medium-contrast`, `light-high-contrast`/`dark-high-contrast`, `monochrome-lt`/`monochrome-dt`.
- Valeurs = littéraux ou alias `{Chemin.Du.Token}` (sémantique → primitive, ou sémantique → sémantique : `On Primary` → `Neutral.900` → `Neutral.Shade-005`). Pas de `$extensions` ni `$description`.
- `mat.theme()` (Material 22.2.5) émet 165 `--mat-sys-*` (vérifié en compilant un thème) : 49 couleurs, `neutral10`, `neutral-variant20`, `level0..5`, 15 styles typo × 6 variables (+ 2 `*-weight-prominent`), 12 `corner-*` (dont `*-top/-start/-end` dérivés), 4 opacités d'état.
- Les variables typo **composites** (`--mat-sys-body-large: 400 1rem / 1.5rem Poppins`) sont des valeurs figées : surcharger `-size`, `-weight`… ne les met pas à jour. Il faut les surcharger aussi.
- `neutral10` ne sert qu'au texte des options du `<select>` natif dans `mat-form-field` ; `neutral-variant20` qu'au voile (scrim) de `mat-sidenav` (vérifié dans les sources Material).
- Pas de palette tonale MD3 (0–100) dérivable des `Shade-NNN` : **surcharge des variables `--mat-sys-*`** + palette Material prédéfinie en repli.

## 3. Paramètre de nommage `--nom`

Un seul paramètre, défaut `app`, validé (`^[a-z][a-z0-9]*$`). Il fixe :

| Élément | Exemple `app` | Exemple `pv` |
|---|---|---|
| Variables custom | `--app-color-success`, `--app-spacing-medium` | `--pv-color-success` |
| Répertoire de sortie | `src/styles/themes-app/` | `src/styles/themes-pv/` |
| Classes de thème | `theme-app`, `theme-app-contraste-moyen`… | `theme-pv`… |
| Mixin Sass | `themes-app.theme()` (nom du fichier `_themes-app.scss`) | `themes-pv.theme()` |

Option `--sortie <dossier>` conservée pour forcer un autre emplacement (défaut : `src/styles/themes-<nom>`).

## 4. Architecture du script

Node ESM (`.mjs`), sans TypeScript ni build, dans le style de `scripts/lib.mjs` (noms et messages en français). Découpage :

```
scripts/themes/
  generer-themes.mjs       # CLI : lit les options, enchaîne les étapes, affiche le rapport
  lire-source.mjs          # dossier ou .zip → { primitives, semantiques: { <mode>: json } }
  resoudre-tokens.mjs      # aplatit le DTCG, résout les alias (récursif, cycles/absents = erreur)
  correspondance.mjs       # chemin de token → { cible: md3 | custom | ignore, nom CSS }
  ecrire-variables.mjs     # étape 1 : fichiers CSS MD3 + custom
  ecrire-material.mjs      # étape 2 : fichier SCSS Angular Material
  *.test.mjs               # tests node:test
```

Les scripts actuels (`a11y.mjs`, `captures.mjs`, `lib.mjs`) restent dans `scripts/` : ils vérifient le site, pas les thèmes.

### Options CLI

| Option | Défaut | Rôle |
|---|---|---|
| `--source <dossier\|zip>` | `tokens` | Entrée. Doit contenir `primitives.tokens.json` et `semantics/*.tokens.json` (à la racine ou dans un unique sous-dossier du zip). |
| `--nom <nom>` | `app` | Cf. § 3. |
| `--sortie <dossier>` | `src/styles/themes-<nom>` | Répertoire dédié, **régénéré** : le script ne supprime que les fichiers qu'il produit (garde-fou si le dossier contient autre chose). |
| `--palette-repli <nom>` | `chartreuse` | Palette Material prédéfinie (`mat.$<nom>-palette`) passée à `mat.theme()`, validée contre la liste des palettes Material. Cf. § 5, étape 2. |
| `--palettes` | désactivé | Expose aussi les primitives `Shade-NNN` en `--<nom>-ref-<palette>-<NNN>` (l'analyse conseille de ne le faire que si un usage le justifie). |

Script npm : `"themes": "node scripts/themes/generer-themes.mjs"`. Exemple : `npm run themes -- --source design.zip --nom pv`.

### Lecture du zip

DevDependency `fflate` (validé) : extraction en mémoire, aucune écriture disque intermédiaire.

### Correspondance (`correspondance.mjs`)

Règle générale = celle de `TOKENS-MD3.md` (kebab-case) + table d'exceptions explicite, tirée des deux analyses :

| Tokens | Cible |
|---|---|
| `Colors.Schemes.<rôle MD3>` (49) | `--md-sys-color-<rôle>` |
| `Typescale.Static.<style>.{Font,Weight,Size,Tracking,Line Height}` | `--md-sys-typescale-<style>-{font,weight,size,tracking,line-height}` |
| `Label Large/Medium.Weight-emphasized` | `--md-sys-typescale-<style>-weight-prominent` |
| autres `Weight-emphasized` (13, Expressive) | `--<nom>-typescale-emphasized-<style>-weight` |
| `Radius.{None…Full}` | `--md-sys-shape-corner-*` |
| `Radius.{Large-increased, Extra-large-increased, Extra-extra-large}` | `--<nom>-shape-corner-*` |
| `Font theme.Static.Font.*` / `Weight.*` | `--md-ref-typeface-{brand,plain}` / `--md-ref-typeface-weight-*` |
| `Spacing.*` | `--<nom>-spacing-*` |
| `Success/Info/Warning` (+ `On`, `Container`, `On … Container`) | `--<nom>-color-success`, `--<nom>-color-on-success-container`… |
| `Colors.Schemes.Neutral.0/900` | `--<nom>-color-neutral-0/900` |
| `Colors.Add-ons.Section background` | `--<nom>-color-section-background` |
| `Colors.State Layers.*` (147) | **ignorés** : alias sans opacité (cf. analyse) ; remplacés par les opacités d'état ci-dessous |
| `Number`, `Number 2`, `Font theme.Tracking.*` | **ignorés** (non référencés) |
| `Colors.<palette>.Shade-*` | ignorés, sauf `--palettes` |

Opacités d'état : absentes des fichiers, déduites des noms → `--md-sys-state-{hover:0.08, focus:0.10, pressed:0.10, dragged:0.16}-state-layer-opacity` (valeurs MD3 actuelles). Constantes documentées dans le code.

**Tout token non reconnu** → avertissement + listé dans le rapport (jamais ignoré silencieusement).

Valeurs écrites telles quelles (px conservés, pas de conversion rem). Seul nettoyage : bruit flottant des trackings (`0.15000000596046448px` → `0.15px`, arrondi 4 décimales).

## 5. Fichiers générés (versionnés dans git)

```
src/styles/themes-app/
  index.css               # étape 1 : point d'entrée (@import des fichiers ci-dessous)
  md3/ref.css             # --md-ref-typeface-* (+ palettes si --palettes)
  md3/sys.css             # typescale, shape, state : identiques dans les 8 modes
  md3/couleurs.css        # --md-sys-color-* par famille de contraste
  app.css                 # toutes les variables --app-* (couleurs par famille + spacing, radius, graisses)
  _themes-app.scss        # étape 2 : mixin Angular Material
```

Chaque fichier : en-tête « Fichier généré par `npm run themes` — ne pas modifier », source et date. Sortie déterministe (ordre stable) pour des diffs git lisibles ; la date n'est écrite que si le contenu change, sinon le fichier n'est pas réécrit.

### Étape 1 : sélection clair/sombre et contraste

Choix retenu : **`light-dark()` + une classe par famille de contraste**.

```css
:root, .theme-app                 { --md-sys-color-primary: light-dark(#86A315, …); … }  /* light / dark */
.theme-app-contraste-moyen        { … }  /* light-medium-contrast / dark-medium-contrast */
.theme-app-contraste-eleve        { … }  /* light-high-contrast  / dark-high-contrast  */
.theme-app-monochrome             { … }  /* monochrome-lt        / monochrome-dt       */
```

Pourquoi :
- clair/sombre passe par `color-scheme`, exactement comme Angular Material (`light-dark()`) et comme le catalogue (`scheme-light/dark/system` posent `color-scheme`) : le mode « système » fonctionne sans JS ;
- la famille de contraste est une classe `theme-*`, même convention que le sélecteur actuel (`theme-azur`…) : l'intégration future se résumera à ajouter ces entrées dans `themes.ts` ;
- 4 blocs au lieu de 8, utilisable hors Angular avec ou sans classe (`:root` = standard).

Le script vérifie que les tokens non couleur sont identiques dans les 8 modes ; sinon erreur explicite.

### Étape 2 : `_themes-app.scss`

Expose un mixin, **inclus nulle part** :

```scss
@use '@angular/material' as mat;

/// Usage : charger index.css, puis html { @include themes-app.theme(); }
@mixin theme($densite: 0) {
  @include mat.theme((
    color: (primary: mat.$chartreuse-palette, theme-type: color-scheme), // repli
    typography: (plain-family: var(--md-ref-typeface-plain), brand-family: var(--md-ref-typeface-brand),
                 bold-weight: var(--md-ref-typeface-weight-bold), …),
    density: $densite,
  ));
  @include mat.theme-overrides((
    primary: var(--md-sys-color-primary),             // × 49 rôles couleur
    neutral10: var(--app-color-neutral-900),
    body-large-size: var(--md-sys-typescale-body-large-size), …,
    body-large: var(--md-sys-typescale-body-large-weight) var(--md-sys-typescale-body-large-size)
                / var(--md-sys-typescale-body-large-line-height) var(--md-sys-typescale-body-large-font),
    corner-large: var(--md-sys-shape-corner-large),
    corner-large-top: var(--md-sys-shape-corner-large) var(--md-sys-shape-corner-large) 0 0, …,
    focus-state-layer-opacity: var(--md-sys-state-focus-state-layer-opacity), …
  ));
}
```

- Indirection par `var(--md-sys-*)` : changer de classe de contraste ou de `color-scheme` suffit, **pas de code Material par mode**.
- **Palette de repli** : `mat.theme()` exige une palette pour générer ses variables ; presque toutes sont ensuite écrasées. Elle ne sert plus réellement qu'à `neutral-variant20` (voile du sidenav, ton sombre à 40 %) et à tout `--mat-sys-*` d'une future version de Material non mappé. `chartreuse` est la plus proche de l'olive `#86A315` ; le choix a peu d'impact visuel.
- **`neutral10` ← `Neutral.900` (`#1A1A1A`)** : retenu. C'est un ton 10 de fait, identique dans les 8 modes (vérifié : alias vers `Neutral.Shade-005` partout), et il ne colore que le texte des options du `<select>` natif. Cela évite qu'une teinte chartreuse s'y glisse.
- `neutral-variant20` : laissé à la palette de repli (aucun token équivalent ; `Scrim` est noir et sert déjà au voile MD3 standard).
- La table `--mat-sys-*` ← source est **contrôlée** par compilation Sass d'un thème témoin au moment de la génération : toute variable Material sans source est listée dans le rapport, ce qui détecte les évolutions de version Material.
- À vérifier en implémentation : que `mat.theme-overrides` accepte les clés composites (`body-large`, `corner-*-top`) et les valeurs `var()` dans `typography` ; sinon émettre ces déclarations directement en CSS dans le mixin.

## 6. Documentation : séparer le site et la construction des thèmes

Aujourd'hui `docs/` ne décrit que le catalogue. Réorganisation :

- `docs/README.md` : index en deux parties, **« Catalogue (site) »** (fichiers actuels) et **« Construction des thèmes »** (nouveau) ; commande `npm run themes` dans « Commandes ».
- **Nouveau `docs/generation-themes.md`** : rôle du script, entrées (dossier/zip), options, fichiers produits, table de correspondance résumée, choix (light-dark + classes, palette de repli, `neutral10`, State Layers ignorés), usage des fichiers générés hors Angular et dans Angular, tests. Renvoie vers `TOKENS-MD3.md` / `TOKENS-NON-APPLICABLES-MD3.md` comme analyses de référence (non modifiées, non déplacées).
- `docs/themes-et-styles.md` : reste centré sur les thèmes du catalogue ; ajout d'un court paragraphe « Thème du design system : généré, pas encore branché » pointant vers `generation-themes.md`.
- `docs/architecture.md` (arborescence) : ajout de `scripts/themes/` et `src/styles/themes-<nom>/`.
- `docs/qualite-et-accessibilite.md` : ajout des tests du script (`node --test scripts/themes/`).
- `docs/decisions-et-limites.md` : décisions de ce chantier (pas de palette tonale dérivable, surcharge `--mat-sys-*`, State Layers sans opacité).
- `CLAUDE.md` : ligne « générer/régénérer les thèmes du design system → `docs/generation-themes.md` » dans la table, et mention du dossier généré à ne pas éditer à la main.

## 7. Étapes de réalisation

1. `lire-source.mjs` + `resoudre-tokens.mjs` (+ devDependency `fflate`) → vérif : tests (alias simples, chaînés, absent, cycle ; dossier et zip donnent le même résultat ; zip avec sous-dossier racine ; arborescence incomplète = erreur claire).
2. `correspondance.mjs` → vérif : test « tous les tokens classés », 0 inconnu sur les tokens actuels ; noms attendus pour un échantillon issu de `TOKENS-MD3.md` ; avec `--nom pv`, aucune occurrence de `app` dans la sortie.
3. `ecrire-variables.mjs` → vérif : test « chaque valeur résolue des 8 modes se retrouve au bon endroit dans `couleurs.css` / `app.css` » (ex. primary light `#86A315`) ; CSS valide (parse via `sass.compileString`).
4. `ecrire-material.mjs` → vérif : compilation Sass d'une feuille témoin (`index.css` + `@include theme()`) dans le dossier temporaire ; aucune `--mat-sys-*` couleur/typo/shape/state ne garde une valeur littérale de la palette de repli, hors `neutral-variant20` et `level*` documentés.
5. `generer-themes.mjs` + script npm + rapport console (comptes : MD3, custom, ignorés, inconnus, variables Material en repli).
6. Exécution réelle sur `tokens/` puis sur un zip de `tokens/` → sorties identiques ; seconde exécution → aucun fichier modifié ; `ng build`, `ng lint`, `ng test --watch=false` inchangés et au vert (rien n'est importé).
7. Documentation (§ 6).
Chaque étape se termine par son commit (cf. § 0), sur la branche `feat/generation-themes`.
