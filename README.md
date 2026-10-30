# Catalogue Material

Catalogue visuel des composants **Angular Material 22** pour designers et intégrateurs : une page par composant avec toutes ses variantes et ses états, un sélecteur de thème en direct (6 thèmes, clair/sombre, 5 densités) et le code de chaque variante à copier. Interface en français.

Projet généré avec [Angular CLI](https://github.com/angular/angular-cli) 22.2.5 (Angular 22.2, Angular Material et CDK 22.2.5, zoneless, SCSS, Vitest).

## Démarrer

```bash
npm install
npm start          # http://localhost:4200
```

| Commande | Rôle |
|---|---|
| `npm start` | serveur de développement (`ng serve`) |
| `npm run build` | build de production, budgets appliqués (sortie dans `dist/`) |
| `npm run lint` | ESLint (angular-eslint) |
| `npm test` | tests unitaires Vitest (`-- --watch=false` pour un seul passage) |
| `npm run a11y` | audit d'accessibilité (axe-core) et erreurs console sur toutes les pages, clair et sombre |
| `npm run captures` | captures pleine page par thème et mode, dans `captures/` (voir `docs/qualite-et-accessibilite.md` pour les options) |

Avant tout commit : build, lint et tests doivent passer.

## Documentation

Tout est décrit dans [`docs/`](docs/README.md) :

- [Fonctionnel](docs/fonctionnel.md) : pages, sélecteur de thème, snippets, composants et variantes couvertes
- [Architecture](docs/architecture.md) : arborescence, registre, routage, shell, services, build et budgets
- [Ajouter un composant](docs/ajouter-un-composant.md) : gabarit de page et pièges de template
- [Thèmes et styles](docs/themes-et-styles.md) : thèmes Material, modes, densité, polices, icônes, jetons
- [Qualité et accessibilité](docs/qualite-et-accessibilite.md) : lint, tests, axe-core, méthode de vérification
- [Décisions et limites](docs/decisions-et-limites.md) : choix de conception et particularités d'Angular Material 22

Le dossier `tokens/` et les fichiers `TOKENS-*.md` concernent un design system distinct et ne sont pas utilisés par l'application.
