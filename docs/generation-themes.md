# Génération des thèmes depuis les tokens

Un script Node lit les tokens DTCG du design system et génère les thèmes. Deux formats d'entrée, reconnus d'après leur contenu : l'**ancien format** (`tokens/` ou un `.zip` de même arborescence) et l'**export natif de Figma** (`Primitives.zip` + `Semantics.zip`, voir « Formats d'entrée »). Il génère :

1. **Étape 1 : variables CSS** MD3 (`--md-sys-*`, `--md-ref-*`) et custom (`--<nom>-*`), dans des fichiers `.css` autonomes, utilisables hors Angular.
2. **Étape 2 : thème Angular Material** : un mixin Sass qui branche les `--mat-sys-*` sur ces variables.

> **État** : les fichiers sont générés et versionnés dans `src/styles/themes-app/`, et **branchés au catalogue** (voir « Intégration au catalogue » plus bas).

Analyses de référence (lecture seule, non modifiées) : `TOKENS-MD3.md` (correspondance token par token) et `TOKENS-NON-APPLICABLES-MD3.md`. Les tokens eux-mêmes (`tokens/`) ne sont jamais modifiés par le script.

## Commande

```bash
npm run themes                                          # tokens/ → src/styles/themes-app/
npm run themes -- --source design.zip --nom pv          # zip → src/styles/themes-pv/
npm run themes -- --source Primitives.zip --source Semantics.zip --sortie <dossier-tmp>   # export natif de Figma
npm run themes -- --palettes --palette-repli azure
node --test "scripts/themes/*.test.mjs"                  # tests du script (les guillemets laissent Node développer le glob : `node --test scripts/themes/` échoue sous Node 24)
node testing/comparer-formats.mjs                        # banc : ancien format ↔ export natif (temp/Primitives.zip + temp/Semantics.zip)
```

| Option | Défaut | Rôle |
|---|---|---|
| `--source <dossier\|zip>` | `tokens` | **Répétable.** Ancien format : une seule source contenant `primitives.tokens.json` et `semantics/*.tokens.json` (dans un zip : à la racine ou dans **un seul** sous-dossier). Export natif de Figma : une ou plusieurs sources dont l'ensemble contient **un** fichier de primitives et au moins un mode sémantique (deux zips, un zip combiné, un dossier…), dans n'importe quel ordre. Extraction en mémoire (`fflate`). |
| `--nom <nom>` | `app` | Fixe le préfixe des variables custom, le dossier, les classes de thème et le mixin (voir ci-dessous). Validé : `^[a-z][a-z0-9]*$`, hors `md` et `mat` (préfixes déjà pris par Material). |
| `--sortie <dossier>` | `src/styles/themes-<nom>` | Dossier **régénéré** : le script ne supprime que les fichiers qu'il a lui-même produits (repérés par leur en-tête) ; il refuse un dossier non vide qui n'en contient aucun. |
| `--palette-repli <nom>` | `chartreuse` | Palette Material prédéfinie passée à `mat.theme()` (validée contre les palettes installées). |
| `--palettes` | désactivé | Expose aussi les primitives `Shade-NNN` en `--<nom>-ref-<palette>-<NNN>` (dans `md3/ref.css`). |

Le paramètre `--nom` (ex. `pv`) donne : `--pv-color-success`, `src/styles/themes-pv/`, classes `theme-pv`, `theme-pv-medium-contrast`…, mixin `themes-pv.theme()` (fichier `_themes-pv.scss`).

Code de sortie 0 avec un rapport (comptes, avertissements) ; 1 avec un message `Erreur : …` (source invalide, alias absent ou en cycle, nom invalide, tokens non couleur différents selon le mode…).

## Formats d'entrée

Le format est reconnu d'après le **contenu** des fichiers JSON, jamais d'après le nom d'un zip ou d'un fichier (renommables). Un fichier est **natif** si `$extensions["com.figma.modeName"]` est une chaîne à la racine ou si une couleur a pour `$value` un objet `{ colorSpace, components }` ; **ancien** si une couleur littérale est une chaîne `#hex` ; sinon il est neutre (un `.json` illisible aussi : seul le chemin choisi signale son erreur, comme avant pour un `package.json` parasite).

| | Ancien format | Export natif de Figma |
|---|---|---|
| Fichiers | `primitives.tokens.json` + `semantics/<mode>.tokens.json`, un zip ou `tokens/` | `Primitives.zip` (`Baseline.tokens.json`) + `Semantics.zip` (un `<Mode>.tokens.json` par mode : `Light`, `Dark High Contrast`, `Monochrome LT`…) ; le **rôle** d'un fichier (primitives ou sémantique) se déduit de son contenu |
| Couleur | `"#86A315"` | `{ colorSpace: "srgb", components: [r,g,b] (0..1), alpha, hex }` ; alias **déjà résolus** (le lien est dans `$extensions.com.figma.aliasData`) sauf vers `Neutral.{White,Black}` |
| Dimensions, graisses | `"57px"`, `400` | nombres (`57`, `0.10000000149011612`), graisses nommées (`"SemiBold"`) |
| Rôles de couleur | à plat : `Colors.Schemes.Primary` | groupés : `Colors.Schemes.{Standard, Surface, Fixed, States}.Primary` ; `Neutral.{White, Black}` au lieu de `Neutral.{0, 900}` |

L'ancien format est délégué **tel quel** à son code d'origine (mêmes résultat et messages). Pour l'export natif, `scripts/themes/format-figma.mjs` (pur, sans `node:fs`, partagé avec le navigateur) l'adapte vers la **forme interne** `{ primitives, semantiques, origine }` en dialecte de l'ancien format : `correspondance`, `resoudre-tokens`, `ecrire-variables`, `ecrire-material` et `ecrire-manifeste` n'en savent rien. Règles de conversion :

- **Couleur** : `components` fait foi (`#RRGGBB` = arrondi de `c × 255`, majuscules ; `alpha` < 1 → `#RRGGBBAA`) ; `hex` n'est que comparé (écart → avertissement). Espace colorimétrique autre que `srgb`, composante ou opacité hors de [0, 1] → **erreur** nommant le jeton. Sans `components`, un `hex` valide (`#RRGGBB` ou `#RRGGBBAA`) est utilisé ; son alpha est conservé tant que le champ `alpha` est absent.
- **Groupes de rôles** : tout groupe de `Colors.Schemes` est aplati (`Standard.Primary` → `Primary`), sans table figée : un futur regroupement de Figma ne casse rien. Un groupe dont aucun rôle n'est reconnu est signalé (avertissement) ; un rôle défini dans deux groupes est une erreur. `Neutral.White` → `Neutral.0`, `Neutral.Black` → `Neutral.900`.
- **Tri des rôles** : après aplatissement, les rôles sont triés dans l'ordre de `ROLES_MD3` puis `ROLES_CUSTOM` (inconnus ensuite, `Neutral` en dernier), pour une sortie stable quel que soit le regroupement de Figma.
- **Nombres** : dimension en `px`, arrondie à 4 décimales (`0.15000000596046448` → `0.15px`) ; au-delà de 1 000 000 px, ou si le nombre n'est pas fini : **erreur** ; sous `Weight…`, le nombre reste une graisse numérique.
- **Graisses** : par la **valeur**, jamais par le nom du jeton (`Font theme.Static.Weight.Bold` vaut `"SemiBold"`) : `thin` 100, `extralight` 200, `light` 300, `regular` 400, `medium` 500, `semibold` 600, `bold` 700, `extrabold` 800, `black` 900 (et synonymes), ou un nombre. Graisse inconnue → **erreur** (un défaut silencieux fausserait le thème). Les familles de polices sous `Font` deviennent `fontFamily`.
- **Noms de mode** : nom du fichier sans `.tokens.json`, normalisé en minuscules séparées par des tirets (`Dark High Contrast` → `dark-high-contrast`), ce qui rend la détection des familles (commentaires de bloc compris) identique à l'ancien format. Deux fichiers qui se normalisent pareil → erreur « mode défini deux fois ».
- **Alias** : non reconstitués (on garde les valeurs résolues, donc pas de cycle ni de cible absente possibles). `aliasData` sert de **contrôle de cohérence** : pour chaque jeton relié à une primitive, la valeur doit égaler celle de la primitive ; sinon **un** avertissement « les primitives et les sémantiques ne semblent pas issues du même export » (10 exemples au plus). Si l'export n'a plus d'`aliasData`, le contrôle est simplement sauté.
- **Sécurité** : l'adaptateur ne produit que des chaînes fabriquées (hex à partir de nombres vérifiés, `<n>px`, graisses numériques) ou, pour une police, la chaîne source échappée par `formater()`. Un type ou un chemin inconnu est transmis tel quel et signalé comme « token non reconnu ». `validerCss` reste le dernier contrôle dans le navigateur.

**Combinaisons de sources** (`assemblerSources`, `lire-source-memoire.mjs`) : une source de l'ancien format ; ou une ou plusieurs sources natives avec exactement un fichier de primitives et au moins un mode sémantique. Erreurs explicites, en français : export incomplet (primitives ou sémantiques manquantes, avec la commande à ajouter), primitives en double, mode dupliqué, formats mélangés, plusieurs sources de l'ancien format, format non reconnu (plusieurs sources). Une source seule sans signal natif est toujours confiée à l'ancien chemin, qui garde ses messages d'origine (par exemple « primitives.tokens.json » introuvable). Dans le chemin natif, seuls les `*.tokens.json` sont lus ; tout autre `.json` est ignoré **avec avertissement**. Au plus 40 fichiers JSON sur l'ensemble des sources.

### Équivalence avec l'ancien format

Généré depuis l'export natif réel de Figma, le thème est **identique octet pour octet** à celui de `tokens/` pour `index.css`, `md3/ref.css`, `md3/sys.css`, `md3/couleurs.css`, `_themes-app.scss` et `families.ts` (hors la ligne d'en-tête « Source »). `app.css` a les mêmes blocs, sélecteurs, commentaires et déclarations, **dans un autre ordre** pour les 12 rôles `success`, `info`, `warning` (l'ordre arbitraire de l'ancien format est perdu), avec pour **seuls écarts de valeur** `--app-color-success` (`#73C322` → `#477A14`) et `--app-color-warning` (`#FF9900` → `#A85F00`) dans la famille standard claire : ce sont des **évolutions du design system** (les UX designers ont retravaillé ces rôles depuis l'ancien zip), pas un défaut de conversion. Le rapport compte 2 jetons ignorés de moins (355 au lieu de 357 : `Number` et `Number 2` n'existent plus dans l'export natif). `node testing/comparer-formats.mjs` le vérifie sur `temp/Primitives.zip` + `temp/Semantics.zip` et échoue pour tout autre écart ; il contrôle aussi que `tokens/` régénéré est identique à `src/styles/themes-app/`.

Régénérer `src/styles/themes-app/` depuis l'export natif changerait donc `app.css` (ces deux valeurs et l'ordre de 12 lignes) : `tokens/` reste la source par défaut de `npm run themes`, et cette bascule est un chantier à part, avec son propre commit.

## Exporter depuis Figma (format natif)

Procédure à suivre à chaque mise à jour du design system annoncée par les UX designers. Elle se fait dans le client Figma, par le développeur qui maintient le catalogue ; elle dure quelques minutes et ne demande ni plugin, ni IA, ni action du UX. (Les libellés des menus ci-dessous sont ceux donnés par l'équipe ; l'interface de Figma évolue, à confirmer sur votre client.)

1. Ouvrir le fichier Figma du design system dans le client, puis le panneau **Variables** (variables locales du fichier).
2. Collection **Semantics** : clic droit sur son nom → **« Export modes »**. Figma produit `Semantics.zip`, avec un fichier `<Mode>.tokens.json` par mode : `Light`, `Light Medium Contrast`, `Light High Contrast`, `Dark`, `Dark Medium Contrast`, `Dark High Contrast`, `Monochrome LT`, `Monochrome DT` (8 fichiers).
3. Collection **Primitives** : clic droit sur son nom → **« Export mode »** (un seul mode, `Baseline`). Figma produit `Primitives.zip` (un fichier `Baseline.tokens.json`).
4. Contrôler : 8 + 1 fichiers. **Ne pas renommer ni décompresser** les archives : le nom du fichier de chaque mode donne la famille de contraste (`Light` / `Dark` → Standard, `… Medium Contrast` → Contraste moyen, `… High Contrast` → Contraste élevé, `Monochrome LT` / `Monochrome DT` → Monochrome).
5. Générer :

   ```bash
   npm run themes -- --source Primitives.zip --source Semantics.zip                       # options : --nom, --sortie, --palettes
   npm run themes -- --source Primitives.zip --source Semantics.zip --sortie <dossier-tmp>  # pour essayer sans toucher au dépôt
   ```

   Puis relire le rapport (`Format : export natif Figma (2 sources)`, 4 familles, « 158 variables --mat-sys-* branchées », aucun avertissement imprévu) et `git diff src/styles/themes-app/`. **Ou** déposer les deux zips dans la page « Thèmes importés » (aperçu dans tout le catalogue, sans toucher au dépôt). Régénérer `themes-app/` depuis l'export natif change `app.css` : voir « Équivalence avec l'ancien format ».
6. Dépannage : messages du générateur (script et page) et remèdes.

   | Message | Cause | Remède |
   |---|---|---|
   | Export Figma incomplet : aucun fichier de primitives… | seul `Semantics.zip` a été fourni | ajouter `--source Primitives.zip` ; dans la page, sélectionner **les deux** archives ensemble (une nouvelle sélection remplace la précédente) |
   | Export Figma incomplet : aucun mode sémantique… | seul `Primitives.zip` a été fourni | ajouter `Semantics.zip` |
   | Famille incomplète : « … » n'a pas de mode sombre / clair | un mode manque dans l'export, ou un nom de fichier a été modifié | refaire l'export des 8 modes ; ne pas renommer les fichiers (mots reconnus : light / lt, dark / dt) |
   | Jeton « … » : graisse « … » inconnue | un nom de graisse que la table ne connaît pas | utiliser un nom usuel (`Regular`, `Medium`, `SemiBold`, `Bold`…) ou un nombre dans Figma, sinon compléter la table dans `format-figma.mjs` (avec un test) |
   | Jeton « … » : espace colorimétrique « display-p3 » non géré | le fichier Figma exporte en autre chose que sRGB | repasser le profil colorimétrique du fichier en sRGB, puis refaire l'export |
   | Formats mélangés | un zip de l'ancien format et un export natif ont été donnés ensemble | n'en fournir qu'un seul format |
   | Plusieurs fichiers de primitives | deux collections de primitives dans les sources | n'exporter que la collection `Primitives` (un mode, `Baseline`) |
   | Mode « … » défini deux fois | deux fichiers se normalisent pareil (`Light` et `light`), par exemple un export donné deux fois | un seul fichier par mode |
   | Avertissement : les primitives et les sémantiques ne semblent pas issues du même export | des valeurs sémantiques ne correspondent plus à la primitive visée (exports faits à des moments différents) | refaire **les deux** exports le même jour, depuis la même version du fichier |
   | Avertissement : Groupe de rôles inconnu aplati / token non reconnu, non écrit | un nouveau groupe ou rôle dans Figma que le générateur ne connaît pas | si c'est voulu, ajouter le rôle dans `correspondance.mjs` (puis `color-roles.ts` pour la page Couleurs) |
   | Avertissement : « hex » ne correspond pas à « components » | export retouché à la main ; `components` est retenu ; un seul avertissement par fichier (compte et 10 exemples au plus) | ignorer ou refaire l'export |
   | Avertissement : Fichier JSON ignoré (hors « *.tokens.json ») | un autre JSON dans l'archive | sans effet |
   | « primitives.tokens.json » introuvable / Format de tokens non reconnu / Fichier de tokens non reconnu | une seule source sans export de Figma ni ancien format : message de l'ancien format ; plusieurs sources ou fichier natif inconnu : message de reconnaissance | vérifier les fichiers fournis |
7. **Qui exporte et quand** : le développeur qui maintient le catalogue, à chaque mise à jour du design system annoncée par les UX designers. La page « Thèmes importés » reste utile comme **aperçu** (un designer ou un intégrateur qui a reçu les deux zips voit le résultat dans tout le catalogue sans toucher au dépôt) mais devient surtout un **outil de développeur**.

## Fichiers produits

```
src/styles/themes-app/
  index.css          point d'entrée : @import des fichiers CSS ci-dessous
  md3/ref.css        --md-ref-typeface-* (+ palettes avec --palettes)
  md3/sys.css        formes, typographie, opacités d'état (identiques dans tous les modes)
  md3/couleurs.css   --md-sys-color-* : 4 blocs, un par famille de contraste
  app.css            --app-* : formes et graisses hors MD3, espacements, couleurs custom (par famille)
  _themes-app.scss   mixin Angular Material
  index.scss         point d'entrée Sass : `html { @include theme($densite) }` (pour un autre projet, voir ci-dessous)
  families.ts        liste des familles (interface `DesignSystemFamily`, constante `DESIGN_SYSTEM_FAMILIES`), lue par `core/theme/themes.ts`
  README.md          mode d'emploi statique de l'intégration dans un projet Angular
```

`README.md` est une **ressource statique** (`scripts/themes/ressources/README.md`) copiée telle quelle à chaque génération, sous un en-tête en commentaire HTML : elle résume l'intégration dans un projet Angular (`angular.json`, `@use`, classes de famille, `color-scheme`, polices). Pour la modifier, éditer la ressource puis relancer le script.

**Réutiliser le dossier dans un autre projet Angular** : copier le dossier, ajouter `index.css` à la liste `styles` d'`angular.json` (les variables), puis une ligne dans le `styles.scss` du projet : `@use './styles/<dossier>';` (ou `@use './styles/<dossier>' with ($densite: -2);`). Le mixin ne référence que des variables CSS : le bloc `html` unique sert toutes les familles (classe `theme-<nom>[-<famille>]` sur `<html>`) et les deux modes (`color-scheme`, à poser par l'hôte). Le catalogue lui-même n'utilise pas `index.scss` (son `styles.scss` inclut le mixin avec le sélecteur `html.theme-importe`).

Chaque fichier commence par un en-tête « Fichier généré par `npm run themes` — ne pas modifier » (source, date). **Ne pas éditer ces fichiers à la main** : relancer le script. La sortie est déterministe ; un fichier dont le contenu ne change pas n'est pas réécrit (la date de l'en-tête reste donc celle du dernier vrai changement ; les fins de ligne CRLF d'un checkout Windows ne comptent pas).

## Clair/sombre et contraste

Les fichiers `semantics/` forment des paires clair/sombre (« familles ») **détectées d'après leurs noms** (`scripts/themes/familles.mjs`) : 4 paires pour le jeu actuel (8 fichiers), mais une seule suffit et on peut en ajouter. Chaque couleur est écrite `light-dark(<clair>, <sombre>)` (une valeur simple quand les deux modes sont identiques) :

```css
:root, .theme-app            { --md-sys-color-primary: light-dark(#86A315, #BCD078); … }  /* light / dark */
.theme-app-medium-contrast   { … }  /* light-medium-contrast / dark-medium-contrast */
.theme-app-high-contrast   { … }  /* light-high-contrast  / dark-high-contrast  */
.theme-app-monochrome        { … }  /* monochrome-lt        / monochrome-dt       */
```

- Clair/sombre = `color-scheme` (comme `mat.theme()` et comme les classes `scheme-*` du catalogue). **Les fichiers générés ne posent pas `color-scheme`** : c'est à l'hôte de le faire (sans rien, le rendu est clair). Avec `color-scheme: light dark`, le mode « système » fonctionne sans JavaScript.
- Le contraste = une classe `theme-*` sur `<html>`, même convention que le sélecteur actuel. La famille standard s'applique aussi par défaut sur `:root`.
- **Détection des familles** : le nom du fichier est découpé en mots ; le mot `light`/`lt`/`clair` ou `dark`/`dt`/`sombre` donne le schéma, les autres mots la famille (`light-medium-contrast` + `dark-medium-contrast` → famille `medium-contrast`). Les mots communs à toutes les familles (ex. `theme-` en préfixe) sont retirés. La famille sans mot restant est la **standard** (`.theme-<nom>` + `:root`) ; à défaut, la première par ordre alphabétique. `medium-contrast`/`medium`/`mc` (ou `contraste-moyen`) → classe `medium-contrast`, libellé « Contraste moyen » ; `high-contrast`/`high`/`hc` (ou `contraste-eleve`) → classe `high-contrast`, libellé « Contraste élevé » (classes en anglais, libellés en français) ; toute autre clé donne la classe `theme-<nom>-<clé>` et le libellé correspondant (`sepia-light`/`sepia-dark` → `.theme-<nom>-sepia`). Un mode sans mot clair/sombre est ignoré (avertissement) ; une famille avec un seul des deux modes est une erreur explicite.
- Les tokens non couleur (typographie, formes, espacements) sont **identiques dans tous les modes** : le script le vérifie et échoue en listant les écarts sinon.

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

Les thèmes du design system du catalogue sont **dynamiques** : ils suivent les familles réellement générées.

- `families.ts` (généré avec les CSS, code en anglais : interface `DesignSystemFamily`, constante `DESIGN_SYSTEM_FAMILIES`) liste les familles : `id` (`app`, `app-medium-contrast`…), `label` (français), `preview` (couleur d'aperçu, primary clair), `isDefault` (famille par défaut), `progression` (appartenance à la progression du contraste). `core/theme/themes.ts` en tire les entrées du groupe « Design system » (sélecteur, compteur de l'accueil, `ThemeService`, matrice de contraste).
- `_themes-app.scss` exporte `$classes` (les classes `theme-app[-<famille>]`) ; `src/styles.scss` boucle dessus (`@each`) pour inclure le mixin : plus de liste de classes écrite à la main.
- `angular.json` : `src/styles/themes-app/index.css` ajouté à `styles` (variables `--md-sys-*`, `--app-*`).
- Thème par défaut : `app-medium-contrast` s'il existe, sinon la famille par défaut (`DEFAULT_THEME_ID`).
- Le nom reste `app` pour le catalogue (les pages lisent des variables `--app-*`) ; si `--nom` change, adapter `styles.scss`, `angular.json` et l'import de `themes.ts`.
- Coût : +34 kB au bundle initial (budget d'avertissement relevé à 880 kB).
- Contrôle des contrastes obtenus : l'[inspecteur de contraste](inspecteur-contraste.md) du catalogue les affiche écran par écran.
- Vérifier le catalogue avec d'autres jeux de tokens : `node testing/run-variantes.mjs` puis `node testing/run-site.mjs` (génère, compile et contrôle le site pour chaque variante, puis restaure `src/styles/themes-app`).
- Limites : les tests Angular (`ng test`) et la page débranchée *Matrice de contraste* décrivent le jeu actuel (4 familles) ; ils ne sont garantis qu'avec lui.

## Import dans le navigateur

La page « Thèmes importés » du catalogue ([fonctionnel.md](fonctionnel.md#thèmes-importés)) génère un thème depuis un zip (ancien format) ou depuis les deux zips de l'export natif de Figma **dans le navigateur, avec les mêmes modules que le script Node** : une seule logique de correspondance tokens → variables, pas de réécriture. `npm run themes` produit toujours des fichiers identiques à ceux d'avant pour l'ancien format (les tests existants le vérifient, sans modification).

**Point d'entrée** : `scripts/themes/navigateur.mjs` (pur, sans import Node ; types dans `navigateur.d.mts`, écrit à la main, avec les deux surcharges).

```js
// un zip (ancien format, ou export natif complet) :
genererThemeImporte(octets: Uint8Array, { base: 'imp-k3f9a2', nomSource: 'tokens.zip' })
// plusieurs zips (Primitives.zip + Semantics.zip, dans un ordre quelconque) :
genererThemeImporte([{ nom: 'Primitives.zip', octets }, { nom: 'Semantics.zip', octets }], { base: 'imp-k3f9a2' })
  → {
  css,        // tous les fichiers de genererVariables sauf index.css, concaténés
  familles,   // [{ id, libelle, apercu, defaut, progression }] : id = suffixe || 'standard', apercu = hex
  rapport,    // { format: 'ancien' | 'natif', modes, md3, custom, inconnus, ignores, modesIgnores, police, avertissements[] }
}
```

Il enchaîne `lireZipOctets` (par zip) → `assemblerSources` (détection du format, assemblage ; les avertissements de l'adaptateur sont ajoutés à `rapport.avertissements`) → `genererVariables(…, { nom: 'app', portee: { base } })` → contrôle des variables indispensables → `validerCss`. Il ne lève que des `Error` au message français prêt à afficher (une erreur technique, par exemple un `TypeError` sur un token mal formé, est reformulée). Le préfixe est toujours `app` : les pages Fondations et le pont Material (`_themes-app.scss`) lisent `--app-*` et `--md-sys-*`.

| Module | Rôle pour le navigateur |
|---|---|
| `lire-source-memoire.mjs` | `lireZipOctets(octets, origine)` (zip en mémoire, filtre `.json`, saut de `__MACOSX/` et des `._*`), `assembler(fichiers, source)` (ancien format) et `assemblerSources(listes, noms)` (**point d'entrée commun** : détecte le format d'après le contenu, délègue à `assembler` ou à `assemblerFigma`), extraits de `lire-source.mjs` (qui les importe : même comportement et mêmes messages pour le script). **Garde-fous** : un fichier JSON de plus de 5 Mo décompressé (`originalSize`, vérifié avant décompression) ou plus de 40 fichiers JSON par zip, et **40 au total** sur plusieurs sources, sont refusés ; un JSON qui n'est pas un objet aussi. |
| `format-figma.mjs` | adaptateur de l'export natif de Figma vers la forme interne : `detecterFormat`, `classerFichierFigma`, `adapter`, `assemblerFigma` (règles : « Formats d'entrée » plus haut). Pur, sans `node:fs`. |
| `ecrire-variables.mjs` | paramètre `portee = { base }` de `genererVariables` (et de `selecteurFamille`) : chaque famille est écrite sous **`html.theme-<base>-<famille>`** (`standard` pour la famille sans suffixe), **jamais `:root`** ; les blocs communs (formes, typographie, opacités d'état, `--md-ref-*`, jetons `--app-*` hors couleur) prennent la liste des sélecteurs de toutes les familles. Sans `portee`, la sortie est inchangée. Un test vérifie que les déclarations sont identiques avec et sans `portee`. |
| `valider-css.mjs` | **contrôle de sécurité** : le CSS est fabriqué à partir de valeurs fournies par l'utilisateur et le générateur ne les échappe pas (sauf `fontFamily`) ; un token `red; } body { display: none` sortirait de sa déclaration. `validerCss(css, { base })` contrôle la sortie **ligne à ligne** : commentaire sans `*/` interne, sélecteur exactement `html.theme-<base>-<id>` (ou liste), `}`, déclaration `  --[a-z0-9-]+: <valeur>;` où la valeur n'a aucun de `; { } < > @ \`, ni caractère de contrôle, ni `/*`, `url(`, `src(`, `image(`, `image-set(`, `expression(`, `@import`, et des parenthèses et guillemets équilibrés. Toute autre ligne : « CSS généré invalide ligne N » et l'import est refusé. |
| `correspondance.mjs` | ensembles exportés (`ROLES_MD3`, `STYLES_TYPO`, `RAYONS_MD3`…) et deux listes dérivées : `variablesRequises()` (132 variables que le pont Material référence sans repli : 49 rôles `--md-sys-color-*`, 15 styles × 5 propriétés, 7 rayons, `--md-ref-typeface-plain` ; une absence est une **erreur bloquante** qui nomme la variable et le token attendu, par exemple `--md-sys-color-surface-dim absent : token Colors.Schemes.Surface Dim`) et `variablesCustomAttendues(nom)` (41 variables `--app-*` ; une absence est un **avertissement** : la valeur du thème intégré s'applique, voir les limites). |
| `navigateur.mjs` | l'enchaînement ci-dessus ; `apercu` est ramené à `#808080` s'il n'est pas un hex. |

`fflate` est une **dépendance d'exécution** (`dependencies`) : il est embarqué dans le chunk différé du générateur, avec l'adaptateur (le chunk passe de ≈ 23 à ≈ 32 kB ; le bundle initial ne bouge pas). Le plafond de 5 Mo **par** zip est contrôlé par la page, qui accepte 1 ou 2 archives.

Tests (`node:test`, `lire-source-memoire`, `portee`, `valider-css`, `variables-requises`, `navigateur`) : zips construits en mémoire depuis `tokens/` (lecture seule, `fixtures-tokens.mjs`) ; sélecteurs avec 4 familles et avec une seule, déclarations identiques avec et sans `portee`, refus de chaque construction dangereuse, `tokens/` sans variable requise manquante, erreurs françaises (cycle d'alias, famille incomplète, variable absente, zip illisible, fichier trop gros, trop de fichiers). Pour l'export natif (`navigateur.test.mjs`) : deux zips, zips inversés et zip combiné donnent les mêmes familles et le même rapport que `tokens/`, avec un CSS équivalent (`comparerSorties`) ; un seul zip → « export incomplet » ; garde-fous (total de JSON, fichier trop gros) ; valeur dangereuse refusée (couleur par construction, nom de police par `validerCss`) ; avertissements de l'adaptateur dans le rapport.

## Utilisation hors Angular

```html
<link rel="stylesheet" href="themes-app/index.css">
<html class="theme-app-medium-contrast" style="color-scheme: dark">
```

Toutes les variables `--md-sys-*`, `--md-ref-*` et `--app-*` sont alors disponibles ; il n'y a ni dépendance ni JavaScript.

## Décisions de mise en œuvre

- `mat.theme()` reçoit les surcharges en **second argument** plutôt que `mat.theme-overrides()` : ce dernier ignore les clés hors des variables système (dont `neutral10`), le second argument les honore et évite un second bloc de déclarations.
- `sass` est une devDependency explicite (le script et ses tests l'importent) ; `fflate` lit les zips et est une dépendance d'exécution (embarqué dans le chunk du générateur de la page « Thèmes importés »).
- Découpage du plan complété par `ecrire-fichiers.mjs` (en-tête, écriture idempotente, suppression limitée aux fichiers générés).
- Nombre et noms des modes libres (cf. « Clair/sombre et contraste ») ; seules les familles détectées sont générées. Le catalogue, lui, n'a que les 4 entrées `app*` de `themes.ts` : en changer les familles demande de les adapter (cf. « Intégration au catalogue »).
- Zips d'essai de l'import dans le navigateur : `node testing/scratchpad/generer-zips.mjs` (jeux acceptés, dont deux jeux pastel, et fichiers à refuser ; voir [qualite-et-accessibilite.md](qualite-et-accessibilite.md#zips-dessai-de-limport-de-thèmes)).
- Banc d'essai de robustesse : `node testing/run-variantes.mjs` (copies de `tokens/` dans `testing/variantes/`, jamais modifié ; familles en moins, renommées, ajoutées, tokens manquants…).
- En-tête : nom du dossier ou du zip source (pas de chemin machine) ; le rapport affiche en revanche le chemin complet.
- Les tests (`node:test`) lisent `tokens/` et construisent leurs zips en mémoire ; ils ne font pas partie de `ng test`.

## Fichiers du script

```
scripts/themes/
  generer-themes.mjs     CLI : options, enchaînement, rapport
  lire-source.mjs        dossier(s) ou .zip → { primitives, semantiques } (délègue à lire-source-memoire.mjs)
  lire-source-memoire.mjs  zip en mémoire, détection du format, assemblage, garde-fous (partagé avec le navigateur)
  format-figma.mjs       export natif de Figma → forme interne (partagé avec le navigateur)
  familles.mjs           noms de fichiers sémantiques → familles clair/sombre
  resoudre-tokens.mjs    aplatissement DTCG, résolution récursive des alias (cycle / absent = erreur)
  correspondance.mjs     chemin de token → variable CSS (ou ignoré / inconnu) ; opacités d'état
  ecrire-variables.mjs   étape 1 : fichiers CSS
  ecrire-material.mjs    étape 2 : fichier SCSS + contrôle par compilation Sass
  ecrire-fichiers.mjs    en-tête, écriture idempotente, suppression des fichiers périmés
  valider-css.mjs        contrôle ligne à ligne du CSS injecté dans la page (import dans le navigateur)
  navigateur.mjs         point d'entrée du navigateur : zip(s) (octets) → { css, familles, rapport } ; types : navigateur.d.mts
  comparer-sorties.mjs   comparaison de deux sorties (identique / équivalent / écarts nommés) : tests et banc
  fixtures-tokens.mjs    fixtures des tests (zips en mémoire depuis tokens/)
  fixtures-natif.mjs     fixtures de l'export natif : inverse de l'adaptateur, `tokens/` → Primitives + Semantics
  fixtures/natif-extrait/  copie littérale de jetons de l'export réel (garde-fou contre la circularité de fixtures-natif.mjs)
  *.test.mjs             tests node:test
testing/comparer-formats.mjs  banc : ancien format ↔ export natif réel, écarts de valeur attendus
```
