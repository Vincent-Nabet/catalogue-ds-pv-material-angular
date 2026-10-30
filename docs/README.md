# Documentation du projet

Catalogue visuel des composants **Angular Material 22**, destiné aux designers et intégrateurs. Cette documentation décrit le projet assez en détail pour travailler dessus sans relire tout le code.

## Index

| Fichier | Contenu | À lire quand… |
|---|---|---|
| [fonctionnel.md](fonctionnel.md) | Ce que fait l'application : pages, sélecteur de thème, snippets, liste des composants et variantes couvertes | on doit comprendre le produit ou décider du contenu d'une page |
| [architecture.md](architecture.md) | Arborescence, registre, routage, shell, services, composants partagés, build et budgets | on touche à la structure, au routage ou au shell |
| [ajouter-un-composant.md](ajouter-un-composant.md) | Pas-à-pas pour ajouter une page ou une variante, gabarit, pièges de template | on ajoute ou modifie une page de composant |
| [themes-et-styles.md](themes-et-styles.md) | Thèmes Material, modes, densité, polices, icônes, jetons CSS, styles du shell | on touche aux couleurs, à la typographie ou à `styles.scss` |
| [qualite-et-accessibilite.md](qualite-et-accessibilite.md) | Lint, tests, budgets, accessibilité (axe-core), méthode de vérification visuelle | on valide un changement ou on corrige une violation |
| [decisions-et-limites.md](decisions-et-limites.md) | Décisions prises, particularités d'Angular Material 22, limites connues, hors périmètre | on s'étonne d'un choix ou on rencontre un comportement inattendu |

## En une minute

- Angular 22.2, Angular Material et CDK 22.2.5, application **zoneless**, SCSS, Vitest, ESLint (angular-eslint).
- **Interface uniquement en français.**
- 35 pages de composants, 6 catégories, lazy loading, générées depuis un registre unique (`src/app/core/catalog/catalog.registry.ts`).
- Chaque page présente des **specimens** (variantes et états) avec un bouton `</>` qui ouvre le code dans une boîte de dialogue avec bouton « Copier ».
- 6 thèmes Material prédéfinis × 3 modes (clair, sombre, système) × 5 densités, modifiables en direct et mémorisés dans `localStorage`.
- Police **Poppins**, icônes **Material Symbols Outlined** (les deux via Google Fonts).

## Commandes

```bash
npm start            # ng serve, http://localhost:4200
npm run build        # ng build (production, budgets appliqués)
npm run lint         # ng lint
npm test             # ng test (Vitest) ; ajouter -- --watch=false pour un seul passage
```

Avant tout commit : `ng build`, `ng lint` et `ng test --watch=false` doivent passer.

## Hors périmètre

Le dossier `tokens/` et les fichiers `TOKENS-MD3.md` / `TOKENS-NON-APPLICABLES-MD3.md` concernent un design system distinct (tokens au format DTCG). Ils ne sont **pas** utilisés par l'application, qui s'appuie uniquement sur les palettes Material prédéfinies. Ne pas les modifier dans le cadre du catalogue.
