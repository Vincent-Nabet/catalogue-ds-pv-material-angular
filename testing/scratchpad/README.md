# Zips d'essai de l'import de thèmes

Fichiers à envoyer à la page `/themes-importes` (`npm start`, puis `http://localhost:4200/themes-importes`).
Ils ne sont **pas versionnés** (dossier `zips/` ignoré) : `node testing/scratchpad/generer-zips.mjs` les produit tous depuis `tokens/` (lecture seule), y compris `gros-zip.zip` (6 Mo).

## Acceptés

| Fichier | Contenu | Résultat attendu |
|---|---|---|
| `zips/tokens-test.zip` | copie de `tokens/` | 4 familles, 8 modes, 142 variables MD3, 41 variables du design system, aucun avertissement |
| `zips/tokens-primary.zip` | idem, `primary` clair = `#E8F5A0` | 4 familles ; à importer sous un autre nom pour comparer : le ratio `primary` / `surface` passe de 2,76 à 1,11 (page Couleurs, inspecteur de contraste) |
| `zips/pastel-bleu.zip` | jeu pastel bleu : 3 familles (Standard, Contraste moyen, Contraste élevé), **sans** Monochrome ; toutes les couleurs des 9 palettes primitives refaites (primaire bleu ciel, secondaire pervenche, tertiaire menthe bleutée, neutres gris bleutés, erreur corail, succès, info, alerte pastel), chaque teinte gardant sa luminance WCAG | 3 familles, 6 modes, 142 variables MD3, 41 du design system, aucun avertissement ; contrastes identiques à ceux de `tokens/` à 1 % près (Contraste moyen reste un bleu plus soutenu : il en faut pour tenir 4,5 : 1) |
| `zips/pastel-rose.zip` | même principe en rose : primaire rose bonbon, secondaire orchidée, tertiaire pêche, neutres gris rosés, erreur corail (distinct du primaire), succès, info, alerte pastel | idem ; écart de contraste ≤ 1,6 % |
| `zips/une-famille.zip` | seulement `light` et `dark` | 1 famille ; élément direct dans le sélecteur, sans sous-menu |

## Refusés (message français, rien n'est enregistré, « Importer » reste désactivé)

| Fichier | Message attendu |
|---|---|
| `zips/notes.txt` | Archive illisible |
| `zips/pas-un-zip.zip` | Archive illisible |
| `zips/sans-primitives.zip` | `primitives.tokens.json` introuvable |
| `zips/famille-incomplete.zip` | Famille incomplète : `light-medium-contrast` n'a pas de mode sombre |
| `zips/cycle.zip` | Cycle d'alias sur `Colors.Schemes.Primary` |
| `zips/json-invalide.zip` | JSON invalide dans `semantics/dark.tokens.json` |
| `zips/gros-zip.zip` | Archive de plus de 5 Mo refusée (6 Mo) |
| `zips/json-decompresse-gros.zip` | Un fichier JSON dépasse 5 Mo une fois décompressé |
| `zips/injection.zip` | CSS généré invalide ligne 111 : valeur refusée pour `--md-sys-color-primary` |

## Autres contrôles

- **Nom en texte brut** : importer `tokens-test.zip` sous le nom `<img src=x onerror=alert(1)>`.
- **Quota** : remplir `localStorage` depuis la console, puis importer un zip valide (« Espace de stockage plein… »).
