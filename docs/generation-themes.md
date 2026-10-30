# Génération des thèmes depuis les tokens

Un script Node lit les tokens DTCG du design system (`tokens/` ou un `.zip` de même arborescence) et génère :

1. **Étape 1 : variables CSS** MD3 (`--md-sys-*`, `--md-ref-*`) et custom (`--<nom>-*`), dans des fichiers `.css` autonomes, utilisables hors Angular.
2. **Étape 2 : thème Angular Material** : un mixin Sass qui branche les `--mat-sys-*` sur ces variables.

> **État** : les fichiers sont générés et versionnés dans `src/styles/themes-app/`, et **branchés au catalogue** (voir « Intégration au catalogue » plus bas).

Analyses de référence (lecture seule, non modifiées) : `TOKENS-MD3.md` (correspondance token par token) et `TOKENS-NON-APPLICABLES-MD3.md`. Les tokens eux-mêmes (`tokens/`) ne sont jamais modifiés par le script.

## Commande

```bash
npm run themes                                          # tokens/ → src/styles/themes-app/
npm run themes -- --source design.zip --nom pv          # zip → src/styles/themes-pv/
npm run themes -- --palettes --palette-repli azure
node --test scripts/themes/                             # tests du script
```

| Option | Défaut | Rôle |
|---|---|---|
| `--source <dossier\|zip>` | `tokens` | Doit contenir `primitives.tokens.json` et `semantics/*.tokens.json`. Dans un zip : à la racine ou dans **un seul** sous-dossier. Extraction en mémoire (`fflate`). |
| `--nom <nom>` | `app` | Fixe le préfixe des variables custom, le dossier, les classes de thème et le mixin (voir ci-dessous). Validé : `^[a-z][a-z0-9]*$`, hors `md` et `mat` (préfixes déjà pris par Material). |
| `--sortie <dossier>` | `src/styles/themes-<nom>` | Dossier **régénéré** : le script ne supprime que les fichiers qu'il a lui-même produits (repérés par leur en-tête) ; il refuse un dossier non vide qui n'en contient aucun. |
| `--palette-repli <nom>` | `chartreuse` | Palette Material prédéfinie passée à `mat.theme()` (validée contre les palettes installées). |
| `--palettes` | désactivé | Expose aussi les primitives `Shade-NNN` en `--<nom>-ref-<palette>-<NNN>` (dans `md3/ref.css`). |

Le paramètre `--nom` (ex. `pv`) donne : `--pv-color-success`, `src/styles/themes-pv/`, classes `theme-pv`, `theme-pv-contraste-moyen`…, mixin `themes-pv.theme()` (fichier `_themes-pv.scss`).

Code de sortie 0 avec un rapport (comptes, avertissements) ; 1 avec un message `Erreur : …` (source invalide, alias absent ou en cycle, nom invalide, tokens non couleur différents selon le mode…).

## Fichiers produits

```
src/styles/themes-app/
  index.css          point d'entrée : @import des fichiers CSS ci-dessous
  md3/ref.css        --md-ref-typeface-* (+ palettes avec --palettes)
  md3/sys.css        formes, typographie, opacités d'état (identiques dans les 8 modes)
  md3/couleurs.css   --md-sys-color-* : 4 blocs, un par famille de contraste
  app.css            --app-* : formes et graisses hors MD3, espacements, couleurs custom (par famille)
  _themes-app.scss   mixin Angular Material
```

Chaque fichier commence par un en-tête « Fichier généré par `npm run themes` — ne pas modifier » (source, date). **Ne pas éditer ces fichiers à la main** : relancer le script. La sortie est déterministe ; un fichier dont le contenu ne change pas n'est pas réécrit (la date de l'en-tête reste donc celle du dernier vrai changement ; les fins de ligne CRLF d'un checkout Windows ne comptent pas).

## Clair/sombre et contraste

Les 8 fichiers `semantics/` forment 4 paires clair/sombre. Chaque couleur est écrite `light-dark(<clair>, <sombre>)` (une valeur simple quand les deux modes sont identiques) :

```css
:root, .theme-app            { --md-sys-color-primary: light-dark(#86A315, #BCD078); … }  /* light / dark */
.theme-app-contraste-moyen   { … }  /* light-medium-contrast / dark-medium-contrast */
.theme-app-contraste-eleve   { … }  /* light-high-contrast  / dark-high-contrast  */
.theme-app-monochrome        { … }  /* monochrome-lt        / monochrome-dt       */
```

- Clair/sombre = `color-scheme` (comme `mat.theme()` et comme les classes `scheme-*` du catalogue). **Les fichiers générés ne posent pas `color-scheme`** : c'est à l'hôte de le faire (sans rien, le rendu est clair). Avec `color-scheme: light dark`, le mode « système » fonctionne sans JavaScript.
- Le contraste = une classe `theme-*` sur `<html>`, même convention que le sélecteur actuel. La famille standard s'applique aussi par défaut sur `:root`.
- Les tokens non couleur (typographie, formes, espacements) sont **identiques dans les 8 modes** : le script le vérifie et échoue en listant les écarts sinon.

## Correspondance (résumé)

Règle générale : `TOKENS-MD3.md` (kebab-case) + exceptions explicites dans `scripts/themes/correspondance.mjs`.

| Tokens | Variable |
|---|---|
| `Colors.Schemes.<rôle MD3>` (49) | `--md-sys-color-<rôle>` |
| `Typescale.Static.<style>.{Font,Weight,Size,Tracking,Line Height}` | `--md-sys-typescale-<style>-{font,weight,size,tracking,line-height}` |
| `Weight-emphasized` de Label Large / Medium | `--md-sys-typescale-<style>-weight-prominent` |
| autres `Weight-emphasized` (13) | `--<nom>-typescale-emphasized-<style>-weight` |
| `Radius.{None…Full}` | `--md-sys-shape-corner-*` |
| `Radius.{Large-increased, Extra-large-increased, Extra-extra-large}` | `--<nom>-shape-corner-*` |
| `Font theme.Static.Font.* / Weight.*` | `--md-ref-typeface-{brand,plain}` / `--md-ref-typeface-weight-*` |
| `Spacing.*` | `--<nom>-spacing-*` |
| `Success / Info / Warning` (+ `On`, `Container`, `On … Container`) | `--<nom>-color-success`, `--<nom>-color-on-success-container`… |
| `Colors.Schemes.Neutral.0 / 900` | `--<nom>-color-neutral-0 / -900` |
| `Colors.Add-ons.Section background` | `--<nom>-color-section-background` |
| `Colors.State Layers.*` (147) | ignorés : alias de couleur sans opacité |
| `Number`, `Number 2`, `Font theme.Tracking.*`, `Colors.<palette>.Shade-*` | ignorés (les palettes avec `--palettes`) |

- **Opacités d'état** : absentes des tokens, posées avec les valeurs MD3 (`--md-sys-state-{hover 0.08, focus 0.10, pressed 0.10, dragged 0.16}-state-layer-opacity`), constantes dans `correspondance.mjs`.
- **Valeurs** écrites telles quelles (px conservés, pas de conversion en rem). Seul nettoyage : le bruit flottant des dimensions (`0.15000000596046448px` → `0.15px`, 4 décimales).
- **Tout token non reconnu** est signalé (`Avertissement : token non reconnu, non écrit : …`) et compté dans le rapport, jamais ignoré en silence.

## Thème Angular Material (`_themes-<nom>.scss`)

```scss
@use './styles/themes-app/themes-app';   // chemin selon l'emplacement de la feuille appelante
html { @include themes-app.theme(); }    // $densite : 0 (défaut) à -5
```

avec `index.css` chargé dans la page. Le mixin appelle `mat.theme(<config>, <surcharges>)` : la palette de repli et la typographie sont la configuration, et la table de **158 surcharges** `--mat-sys-*` pointe vers `var(--md-sys-*)` (couleurs, typographie y compris les variables composites `--mat-sys-body-large`, coins `corner-*-top/-start/-end`, opacités d'état). Changer de classe de contraste ou de `color-scheme` suffit, sans code Material par mode.

- **Palette de repli** : `mat.theme()` exige une palette. Presque toutes ses valeurs sont remplacées ; elle ne sert plus qu'aux **7 variables sans équivalent dans les tokens** : `neutral-variant20` (voile du `mat-sidenav`) et `level0` à `level5` (élévations). `chartreuse` est la plus proche de l'olive `#86A315` ; le choix a peu d'impact visuel.
- **`neutral10` ← `Neutral.900`** (`#1A1A1A`, identique dans les 8 modes) : ne colore que le texte des options du `<select>` natif dans `mat-form-field`.
- La table des surcharges est construite à partir des `--mat-sys-*` que la version installée de Material émet (compilation d'un thème témoin) ; le script recompile ensuite le mixin et **vérifie que chaque surcharge est la valeur finale**. Une variable Material sans source (nouvelle version de Material) est listée dans le rapport.

## Intégration au catalogue

- `angular.json` : `src/styles/themes-app/index.css` ajouté à `styles` (variables `--md-sys-*`, `--app-*`).
- `src/styles.scss` : `@use './styles/themes-app/themes-app'` et un bloc `html.theme-app, html.theme-app-contraste-moyen, html.theme-app-contraste-eleve, html.theme-app-monochrome { @include themes-app.theme(); }` (un seul bloc : le mixin ne référence que des variables, qui changent déjà selon la classe).
- `core/theme/themes.ts` : 4 entrées `app*` dans `ThemeId` et `THEMES` ; `ThemeService` pose `theme-<id>` sans autre changement, le sélecteur et le compteur de l'accueil suivent.
- Si `--nom` change, adapter ces trois endroits.
- Coût : +34 kB au bundle initial (budget d'avertissement relevé à 880 kB).
- Contrôle des contrastes obtenus : l'[inspecteur de contraste](inspecteur-contraste.md) du catalogue les affiche écran par écran.

## Utilisation hors Angular

```html
<link rel="stylesheet" href="themes-app/index.css">
<html class="theme-app-contraste-moyen" style="color-scheme: dark">
```

Toutes les variables `--md-sys-*`, `--md-ref-*` et `--app-*` sont alors disponibles ; il n'y a ni dépendance ni JavaScript.

## Décisions de mise en œuvre

- `mat.theme()` reçoit les surcharges en **second argument** plutôt que `mat.theme-overrides()` : ce dernier ignore les clés hors des variables système (dont `neutral10`), le second argument les honore et évite un second bloc de déclarations.
- `sass` est une devDependency explicite (le script et ses tests l'importent) ; `fflate` lit les zips.
- Découpage du plan complété par `ecrire-fichiers.mjs` (en-tête, écriture idempotente, suppression limitée aux fichiers générés).
- Les 8 modes sont requis ; un mode supplémentaire dans la source est ignoré avec un avertissement.
- En-tête : nom du dossier ou du zip source (pas de chemin machine) ; le rapport affiche en revanche le chemin complet.
- Les tests (`node:test`) lisent `tokens/` et construisent leurs zips en mémoire ; ils ne font pas partie de `ng test`.

## Fichiers du script

```
scripts/themes/
  generer-themes.mjs     CLI : options, enchaînement, rapport
  lire-source.mjs        dossier ou .zip → { primitives, semantiques }
  resoudre-tokens.mjs    aplatissement DTCG, résolution récursive des alias (cycle / absent = erreur)
  correspondance.mjs     chemin de token → variable CSS (ou ignoré / inconnu) ; opacités d'état
  ecrire-variables.mjs   étape 1 : fichiers CSS
  ecrire-material.mjs    étape 2 : fichier SCSS + contrôle par compilation Sass
  ecrire-fichiers.mjs    en-tête, écriture idempotente, suppression des fichiers périmés
  *.test.mjs             tests node:test
```
