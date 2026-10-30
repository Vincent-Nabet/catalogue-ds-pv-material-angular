# Plan : inspecteur de contraste dans le catalogue

## 0. Conduite de l'exécution

- **Exécution autonome jusqu'au bout** : toutes les étapes du § 6 s'enchaînent sans demander de validation. On ne s'arrête que si un point d'attention exige une décision non tranchée ici, par exemple :
  - une hypothèse du plan s'avère fausse et change le résultat visible (ex. axe ne renvoie pas les éléments ou les ratios attendus) ;
  - il faudrait modifier un fichier hors périmètre ;
  - une vérification reste rouge sans correction évidente.
  Les choix mineurs d'implémentation sont faits sans demander et consignés dans `docs/inspecteur-contraste.md`.
- **Branche dédiée** : `feat/inspecteur-contraste`, fille de `feat/generation-themes` (déjà créée). Pas de push ni de PR sans demande.
- **Commits réguliers et logiques** : un commit par étape cohérente et vérifiée (tests verts), Conventional Commits en français, trailer `Co-Authored-By`. Découpage indicatif :
  1. `docs: plan de l'inspecteur de contraste`
  2. `feat(a11y): conversion des résultats axe en éléments d'inspection`
  3. `feat(a11y): service de l'inspecteur de contraste (axe-core chargé à la demande)`
  4. `feat(a11y): calque de badges et bouton de l'inspecteur de contraste`
  5. `docs: inspecteur de contraste`
- Indexation fichier par fichier (jamais `git add -A`).
- **Les thèmes ne sont pas corrigés** : l'inspecteur **mesure et affiche**, il ne modifie ni les couleurs ni les styles des composants. Un contraste insuffisant dû aux tokens du design system reste visible, c'est le but.
- **Fin d'exécution** : bilan court (commits créés, résultats des vérifications avec sortie, décisions prises en route, points restants).

## 1. Objectif et périmètre

Un mode **« Inspecteur de contraste »**, activable depuis la barre d'outils, qui affiche sur chaque texte de la page son **rapport de contraste** et signale ceux qui **ne respectent pas WCAG AA**. Sert à voir, écran par écran, l'effet d'un thème (notamment les thèmes du design system) sans lancer `npm run a11y`.

- Mesure : règle `color-contrast` d'**axe-core** (déjà une devDependency, utilisée par `npm run a11y`), exécutée dans le navigateur. Même moteur, mêmes résultats que l'audit.
- Affichage : un badge par élément (`2,66 : 1`), rouge avec un cadre pointillé si le texte est sous le minimum, neutre s'il est conforme (affiché à la demande), gris `?` si axe ne peut pas conclure (dégradé, image, superposition).
- Relance automatique au changement de page, de thème, de mode ou de densité ; bouton « Relancer ».

**Hors périmètre** :
- aucune correction de couleur, de thème ou de composant ;
- pas de contrôle des contrastes d'éléments d'interface (3 : 1, bordures de champs) ni des états survol/focus : axe ne les teste pas ;
- pas de persistance de l'état (outil de contrôle, désactivé au chargement) ;
- `tokens/` et `src/styles/themes-app/` inchangés.

## 2. Constats

- `axe-core` 4.14 est installé (devDependency). `axe.run()` accepte `elementRef: true` (le nœud DOM est renvoyé dans `node.element`) et `resultTypes` pour inclure les `passes`.
- Pour la règle `color-contrast`, `node.any[0].data` contient `contrastRatio`, `expectedContrastRatio`, `fgColor`, `bgColor` ; les nœuds `incomplete` portent un `messageKey` (ex. `bgImage`, `bgGradient`, `bgOverlap`) et pas toujours de ratio.
- `axe.min.js` pèse ≈ 650 kB : il doit être chargé **à la demande** (`import()` au premier clic). Le bundle initial est à 857,93 kB pour un avertissement à 880 kB.
- Le contenu défile dans `mat-sidenav-content`, pas dans la fenêtre : les badges doivent suivre les éléments quand n'importe quel conteneur défile (écouteur `scroll` en phase de capture).
- jsdom (Vitest) ne sait pas calculer les couleurs de fond : les tests unitaires portent sur la conversion des résultats et le service avec une analyse simulée ; la mesure réelle est vérifiée dans Chrome (étape 4).

## 3. Architecture

```
src/app/core/a11y/
  contrast-items.ts            pur : résultats axe → ContrastItem[] (tri, statut, formatage du ratio)
  contrast-items.spec.ts
  contrast-inspector.ts        @Service : état (actif, en cours, éléments, conformes visibles) + exécution d'axe
  contrast-inspector.spec.ts
src/app/layout/contrast-inspector/
  contrast-toggle.ts           bouton de la barre d'outils (aria-pressed)
  contrast-overlay.ts          calque fixe de badges + panneau récapitulatif
```

### `ContrastItem`

```ts
interface ContrastItem {
  element: HTMLElement;
  status: 'fail' | 'pass' | 'unknown';
  ratio: number | null;      // 2.66
  expected: number | null;   // 4.5 (3 pour le grand texte)
  foreground: string | null; // '#86a315'
  background: string | null;
  reason: string | null;     // pour 'unknown' : libellé français de messageKey
}
```

### Service

- `active` (signal, `false`), `running`, `items`, `showPassing` (signaux). `toggle()`, `refresh()`.
- Exécution : `const axe = (await import('axe-core')).default`, `axe.run(document, { runOnly: { type: 'rule', values: ['color-contrast'] }, resultTypes: ['violations', 'passes', 'incomplete'], elementRef: true, selectors: false })`, avec le calque de l'inspecteur exclu du contexte (`[data-inspecteur-contraste]`).
- Relance : un `effect` lit `active`, `ThemeService.theme/scheme/density` et les `NavigationEnd` ; relance avec un anti-rebond (≈ 300 ms, le temps du rendu) ; un compteur d'exécution écarte les résultats périmés.

### Calque

- `position: fixed; inset: 0; pointer-events: none; z-index` au-dessus des overlays CDK ; `aria-hidden="true"`, `data-inspecteur-contraste`.
- Position des badges recalculée via `getBoundingClientRect()` à chaque scroll/resize (limité par `requestAnimationFrame`) ; éléments détachés ou hors écran ignorés.
- Couleurs uniquement via `--mat-sys-*` (`error`/`on-error`, `inverse-surface`/`inverse-on-surface`, `surface-container-highest`), police `--mat-sys-label-small`.
- Panneau récapitulatif (bas gauche) : « N échecs · M conformes · K à vérifier », case « Afficher les conformes » (case native, pas de module Material ajouté), bouton « Relancer », bouton « Fermer ».

### Bouton

Bouton icône `contrast` dans la barre d'outils, avant le sélecteur de thème, `aria-pressed`, `aria-label="Inspecteur de contraste"`.

## 4. Choix à retenir

- axe plutôt qu'un calcul maison : fonds composites, transparence et opacité déjà gérés, et résultats identiques à `npm run a11y`.
- Chargement à la demande : aucun coût pour le bundle initial.
- Désactivé au chargement et non persisté : l'analyse prend 1 à 2 s et ne doit pas gêner l'usage normal ni les audits `a11y`/`captures`.
- Seuls les textes sont mesurés (limite d'axe) ; documenté.

## 5. Documentation

- **Nouveau `docs/inspecteur-contraste.md`** : rôle, usage, lecture des badges, fonctionnement (axe, relance, calque), limites, choix, tests.
- `docs/README.md` : entrée dans l'index « Catalogue (site) ».
- `docs/fonctionnel.md` : la barre d'outils et le mode d'inspection.
- `docs/architecture.md` : arborescence (`core/a11y/`, `layout/contrast-inspector/`) et chargement à la demande d'axe-core.
- `docs/qualite-et-accessibilite.md` : l'inspecteur comme complément de `npm run a11y`, nouveaux tests.
- `docs/decisions-et-limites.md` : décisions et limites (texte seul, pas de survol/focus, `incomplete`).
- `CLAUDE.md` : ligne dans la table des docs.

## 6. Étapes de réalisation

1. Plan (ce fichier) → commit 1.
2. `contrast-items.ts` + tests → vérif : `ng test` (statuts fail/pass/unknown, tri échecs d'abord, nœuds sans élément ignorés, ratio absent, formatage fr) ; lint.
3. `contrast-inspector.ts` + tests → vérif : `ng test` (activation, analyse simulée, relance sur changement de thème avec anti-rebond, résultats périmés écartés, désactivation vide la liste) ; lint ; `ng build` : initial inchangé (axe en chunk différé).
4. `contrast-toggle.ts`, `contrast-overlay.ts`, branchement dans le shell → vérif : `ng build` (initial < 880 kB, chunk axe séparé), `ng lint`, `ng test` ; contrôle dans Chrome (puppeteer) sur `app` clair : badges rouges sur les catégories du menu latéral, ratios concordant avec l'audit, thème Azur : aucun échec ; captures consultées.
5. Documentation (§ 5) → commit 5.
Chaque étape se termine par son commit (cf. § 0), sur la branche `feat/inspecteur-contraste`.
