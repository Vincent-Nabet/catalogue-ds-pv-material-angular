# Documentation du projet

Catalogue visuel des composants **Angular Material 22**, destiné aux designers et intégrateurs, et outillage de **génération de thèmes** depuis les tokens du design system. Cette documentation décrit le projet assez en détail pour travailler dessus sans relire tout le code.

## Index

### Catalogue (site)

| Fichier | Contenu | À lire quand… |
|---|---|---|
| [fonctionnel.md](fonctionnel.md) | Ce que fait l'application : pages, sélecteur de thème, snippets, liste des composants et variantes couvertes | on doit comprendre le produit ou décider du contenu d'une page |
| [architecture.md](architecture.md) | Arborescence, registre, routage, shell, services, composants partagés, build et budgets | on touche à la structure, au routage ou au shell |
| [ajouter-un-composant.md](ajouter-un-composant.md) | Pas-à-pas pour ajouter une page ou une variante, gabarit, pièges de template | on ajoute ou modifie une page de composant |
| [themes-et-styles.md](themes-et-styles.md) | Thèmes Material, modes, densité, polices, icônes, jetons CSS, styles du shell | on touche aux couleurs, à la typographie ou à `styles.scss` |
| [qualite-et-accessibilite.md](qualite-et-accessibilite.md) | Lint, tests, budgets, accessibilité (axe-core), scripts `a11y` et `captures` | on valide un changement ou on corrige une violation |
| [decisions-et-limites.md](decisions-et-limites.md) | Décisions prises, particularités d'Angular Material 22, limites connues, hors périmètre | on s'étonne d'un choix ou on rencontre un comportement inattendu |
| [inspecteur-contraste.md](inspecteur-contraste.md) | Mode qui affiche le rapport de contraste de chaque texte (axe-core dans le navigateur) : usage, lecture des badges, fonctionnement, limites | on veut voir l'effet d'un thème sur le contraste, écran par écran |

### Construction des thèmes

| Fichier | Contenu | À lire quand… |
|---|---|---|
| [generation-themes.md](generation-themes.md) | Script `npm run themes` : tokens (dossier ou zip) → variables CSS MD3 + custom et thème Angular Material ; options, fichiers produits, correspondance, choix | on régénère les thèmes, on change de source de tokens ou on branche les fichiers générés |

Analyses de référence à la racine du dépôt (lecture seule) : `TOKENS-MD3.md` et `TOKENS-NON-APPLICABLES-MD3.md`.

## En une minute

- Angular 22.2, Angular Material et CDK 22.2.5, application **zoneless**, SCSS, Vitest, ESLint (angular-eslint).
- **Interface uniquement en français.**
- 35 pages de composants, 6 catégories, lazy loading, générées depuis un registre unique (`src/app/core/catalog/catalog.registry.ts`).
- Chaque page présente des **specimens** (variantes et états) avec un bouton `</>` qui ouvre le code dans une boîte de dialogue avec bouton « Copier ».
- 6 thèmes Material prédéfinis + 4 thèmes du design system (générés depuis `tokens/`) × 3 modes (clair, sombre, système) × 5 densités, modifiables en direct et mémorisés dans `localStorage`.
- Police **Poppins**, icônes **Material Symbols Outlined** (les deux via Google Fonts).
- Un **inspecteur de contraste** (bouton de la barre d'outils) affiche le rapport de contraste de chaque texte et signale ceux qui sont sous WCAG AA.
- Les thèmes du design system sont **générés** par `npm run themes` dans `src/styles/themes-app/`  et branchés au sélecteur de thème du catalogue.

## Commandes

```bash
npm start            # ng serve, http://localhost:4200
npm run build        # ng build (production, budgets appliqués)
npm run lint         # ng lint
npm test             # ng test (Vitest) ; ajouter -- --watch=false pour un seul passage
npm run a11y         # audit axe-core + erreurs console sur toutes les pages
npm run captures     # captures pleine page par thème et mode (dossier captures/)
npm run themes       # génère les thèmes depuis tokens/ (ou --source design.zip --nom <nom>)
node --test scripts/themes/   # tests du script de génération
```

Avant tout commit : `ng build`, `ng lint` et `ng test --watch=false` doivent passer.

## Hors périmètre

Le dossier `tokens/` et les fichiers `TOKENS-MD3.md` / `TOKENS-NON-APPLICABLES-MD3.md` concernent un design system distinct (tokens au format DTCG). L'application elle-même s'appuie uniquement sur les palettes Material prédéfinies ; seul le script `npm run themes` lit `tokens/` (en lecture seule). Ne jamais les modifier ni les committer dans le cadre du catalogue ou de la génération des thèmes.
