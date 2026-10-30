# Inspecteur de contraste

Mode du catalogue qui affiche, sur chaque texte de la page, son **rapport de contraste** et signale ceux qui sont **sous le minimum WCAG AA**. Il sert à voir, écran par écran, l'effet d'un thème (notamment les thèmes du design system, dont les tokens produisent des contrastes insuffisants à certains endroits) sans lancer `npm run a11y`.

L'inspecteur **mesure et affiche, il ne corrige rien** : aucune couleur, aucun thème, aucun style de composant n'est modifié.

## Utilisation

1. Cliquer sur le bouton **contraste** (icône ◐) de la barre d'outils, à gauche du sélecteur de thème. Il est enfoncé (`aria-pressed`) tant que le mode est actif.
2. Attendre l'analyse (« Analyse en cours… », 1 à 2 secondes). Elle est relancée seule à chaque changement de **page, thème, mode ou densité** ; le bouton « Relancer » du panneau la relance à la main (après avoir ouvert un menu, déplié un panneau…).
3. Lire les badges :

| Badge | Signification |
|---|---|
| Rouge `2,65 : 1` + cadre pointillé rouge | Texte **sous le minimum** (4,5 : 1, ou 3 : 1 pour le grand texte). L'info-bulle (survol du badge) donne le minimum exigé et les couleurs mesurées : « Texte #86a315 sur fond #f5f6ef ». |
| Gris `?` | axe **ne peut pas conclure** (fond en dégradé ou en image, fond recouvert par un autre élément, élément partiellement masqué…). La cause est dans l'info-bulle ; à vérifier à la main. Les entrées du menu latéral en font partie (« fond recouvert par un autre élément »). |
| Noir `12,63 : 1` | Texte **conforme** ; affiché seulement si la case « Afficher les contrastes conformes » est cochée. |

4. Le panneau en bas à gauche résume : « N échec(s) · M conforme(s) · K à vérifier ». « Fermer » (ou le bouton de la barre d'outils) quitte le mode.

Le mode est **désactivé au chargement** et n'est pas mémorisé : il ne gêne ni l'usage normal ni les scripts `npm run a11y` / `npm run captures`.

## Fonctionnement

```
src/app/core/a11y/
  contrast-items.ts          pur : résultats axe → ContrastItem[] (statut, tri, libellés)
  contrast-inspector.ts      @Service : état + exécution d'axe + relance automatique
src/app/layout/contrast-inspector/
  contrast-toggle.ts         bouton de la barre d'outils
  contrast-overlay.ts/.html/.scss   calque de badges + panneau récapitulatif
```

- **Mesure** : règle `color-contrast` d'**axe-core**, le moteur de `npm run a11y` : mêmes résultats que l'audit (ex. `2,65 : 1` pour l'olive `#86a315` sur `#f5f6ef`, `2,40 : 1` pour la ligne sélectionnée du tableau en contraste élevé). `axe.run()` est appelé avec `elementRef: true` pour récupérer les éléments DOM, et `resultTypes: violations, passes, incomplete`.
- **Chargement à la demande** : axe-core (≈ 675 kB, chunk différé) n'est importé (`import()`) qu'à la première analyse ; le bundle initial ne grossit que de ≈ 9 kB (le code de l'inspecteur). Le chargement passe par le jeton `AXE_LOADER`, remplaçable dans les tests. `angular.json` déclare `axe-core` dans `allowedCommonJsDependencies` (module CommonJS).
- **Relance** : un `effect` du service lit `active`, `ThemeService.theme/scheme/density` et les `NavigationEnd`, puis relance avec un anti-rebond de 300 ms (le temps du rendu). Un compteur d'analyse écarte les résultats périmés (changement de page ou fermeture pendant l'analyse). `running` passe à vrai dès la planification : le panneau n'affiche jamais de comptes périmés.
- **Calque** : `position: fixed`, `pointer-events: none` (sauf les badges, pour l'info-bulle), au-dessus des overlays CDK (z-index 1100), `aria-hidden`. Les positions viennent de `getBoundingClientRect()` et sont recalculées à chaque `scroll` (écouté **en phase de capture** : le contenu défile dans `mat-sidenav-content`, pas dans la fenêtre) et `resize`, limitées par `requestAnimationFrame`. Les éléments détachés du DOM ou hors de l'écran sont ignorés.
- **Auto-exclusion** : le calque et le panneau portent `data-inspecteur-contraste` ; le service les exclut du contexte d'axe (`INSPECTOR_ATTRIBUTE`).
- **Couleurs** : uniquement via `--mat-sys-*` (`error`/`on-error`, `inverse-surface`/`inverse-on-surface`, `surface-container-highest`, `outline`).

## Limites

- **Texte seulement** : c'est le périmètre de la règle `color-contrast` d'axe. Les contrastes d'éléments d'interface (3 : 1, bordures de champs, icônes) ne sont pas mesurés.
- **États non couverts** : survol, focus, appui. Un élément n'est mesuré que dans l'état où il est affiché.
- **Résultats « à vérifier »** : dégradés, images, éléments qui en recouvrent d'autres ; ils sont signalés par `?`, pas évalués.
- **Contenu masqué ou hors zone visible** : comme pour `npm run a11y`, ce qu'un débordement masque (ex. catégories du menu latéral sous le bas de la fenêtre) n'est pas mesuré. Un menu ou un dialogue n'est mesuré que s'il est ouvert au moment de l'analyse (ouvrir, puis « Relancer »).
- Le panneau de l'inspecteur utilise les couleurs du thème courant et n'est pas analysé ; son propre contraste dépend donc du thème.
- Dans jsdom (Vitest), axe ne sait pas calculer les couleurs : les tests simulent axe ; la mesure réelle se vérifie dans Chrome.

## Choix

- **axe plutôt qu'un calcul maison** : fonds composites, transparence et opacité déjà gérés ; résultats identiques à `npm run a11y`.
- **Chargement à la demande** : aucun coût pour le bundle initial, déjà proche de son budget.
- **Désactivé au chargement, non persisté** : l'analyse prend 1 à 2 s et ne doit pas fausser les audits.
- **Case à cocher native** pour « Afficher les contrastes conformes » : évite d'ajouter un module Material au bundle initial.
- **Pas de correction** : un contraste insuffisant dû aux tokens du design system doit rester visible pour être remonté aux designers.

## Tests

`ng test --watch=false` (14 tests) :

| Fichier | Vérifie |
|---|---|
| `core/a11y/contrast-items.spec.ts` | statuts échec/conforme/à vérifier, tri (échecs les plus faibles d'abord), nœuds sans élément ou d'une autre règle ignorés, cause inconnue, formatage `2,66 : 1`, libellés et info-bulles |
| `core/a11y/contrast-inspector.spec.ts` | inactif tant que non activé, appel d'axe (règle `color-contrast`, exclusion du calque), une seule relance au changement de thème, fermeture pendant l'analyse, erreur d'analyse |

Contrôle navigateur (manuel) : `npm start`, thème « Design system » en clair, page Bouton → 5 badges rouges `2,65 : 1` (catégories du menu latéral, boutons « Texte », « Relevé », « Contour ») ; thème Azur → aucun badge rouge ; thème « Design system, contraste élevé » en clair, page Tableau, ligne sélectionnée → 2 badges `2,40 : 1`.
