# Thème du design system pour Angular Material

Ce dossier est généré par `npm run themes` : **ne pas modifier ses fichiers à la main**, relancer la commande.
Ce fichier explique comment brancher le thème dans un projet Angular (Angular Material 19 ou plus).

## 1. Copier le dossier

Copier ce dossier dans le projet, par exemple dans `src/styles/<dossier>/` (`<dossier>` = le nom du dossier copié).

## 2. Charger les variables CSS (`angular.json`)

Ajouter `index.css` dans la liste `styles` du projet, **avant** la feuille globale :

```json
"styles": [
  "src/styles/<dossier>/index.css",
  "src/styles.scss"
]
```

## 3. Brancher Angular Material (`src/styles.scss`)

La feuille globale doit être en SCSS (`styles.scss`), pas en CSS. Une seule ligne suffit :

```scss
@use './styles/<dossier>';
```

Pour régler la densité des composants (0 par défaut, jusqu'à -5) :

```scss
@use './styles/<dossier>' with ($densite: -2);
```

## 4. Choisir la famille de contraste et le mode

- **Famille** : classe posée sur `<html>` : `theme-<nom>` (standard, aussi appliquée sans classe), puis `theme-<nom>-<famille>` pour les autres (contraste moyen, contraste élevé, monochrome…). `<nom>` vaut `app` par défaut (option `--nom`). La liste exacte est dans `families.ts`.
- **Clair ou sombre** : propriété `color-scheme` sur `<html>` (`light`, `dark`, ou `light dark` pour suivre le système). Les fichiers générés ne la posent pas : sans elle, le rendu est clair.

## 5. Polices

Les polices référencées par `--md-ref-typeface-plain` et `--md-ref-typeface-brand` (voir `md3/ref.css`) ne sont pas chargées par le thème : les inclure dans le projet (Google Fonts, `@font-face`…).

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.css` | point d'entrée CSS (variables `--md-sys-*`, `--md-ref-*`, `--app-*`) |
| `index.scss` | point d'entrée Sass (`@use` du dossier) |
| `_themes-<nom>.scss` | mixin Angular Material utilisé par `index.scss` |
| `md3/`, `<nom>.css` | variables CSS (couleurs par famille, formes, typographie, espacements) |
| `families.ts` | liste des familles, utile pour un sélecteur de thème (facultatif) |
