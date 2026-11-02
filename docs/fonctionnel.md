# Fonctionnel

## Objectif

Fournir aux designers et intégrateurs un **catalogue visuel façon Figma** des composants Angular Material : une page par composant, qui montre toutes les variantes, tailles et états disponibles, sans recopier la documentation officielle. Un sélecteur de thème permet de voir immédiatement le rendu dans chaque palette, en clair et en sombre.

Public : designers, intégrateurs, développeurs front. Langue de l'interface : français uniquement.

## Parcours utilisateur

1. **Accueil** (`/`) : bandeau de présentation (compteurs : composants, catégories, thèmes) puis une carte par catégorie listant ses composants.
2. **Navigation latérale** : toujours visible sur ordinateur (`side`), tiroir sur mobile (`over`, ouvert par le bouton menu). Composants groupés par catégorie, lien actif mis en évidence (`aria-current="page"`).
3. **Page de composant** (`/composants/<id>`) : un `<h1>` puis des sections de specimens.
4. **Sélecteur de thème** (bouton « Thème : Azur » en haut à droite) : thème, mode, densité.
5. **Inspecteur de contraste** (bouton « Contraste » à gauche du sélecteur de thème, présent sur les pages de composants seulement) : affiche sur chaque texte du contenu de la page son rapport de contraste et signale ceux qui sont sous WCAG AA. Voir [inspecteur-contraste.md](inspecteur-contraste.md).
6. **Code** : sur chaque specimen, un bouton icône `</>` (discret, opacité 0,4, plein au survol et au focus) ouvre une boîte de dialogue avec le code, un bouton « Copier » (suivi d'une snackbar « Code copié ») et « Fermer ».

## Le sélecteur de thème

| Réglage | Valeurs | Défaut |
|---|---|---|
| Thème | Deux sous-menus : **Design system** (Standard, Contraste moyen, Contraste élevé, Monochrome) et **Thèmes Angular Material** (Azur, Violet, Rose, Vert, Orange, Cyan) ; pastille de couleur + coche sur l'actif | Design system, contraste moyen |
| Mode | Clair, Sombre, Système | **Clair** |
| Densité | 0 (par défaut), −1, −2, −3, −4 | 0 |

Les préférences sont conservées dans `localStorage` (clé `catalogue-material-theme`). Le bouton affiche le thème courant (« Thème : Violet », « Thème : Design system, contraste moyen »). Sous 600 px, seul l'icône et la pastille restent visibles (le libellé reste lu par les lecteurs d'écran).

## Anatomie d'une page de composant

```
<h1>Bouton</h1>
  Section  « Boutons »                (titre + description facultative)
    Specimen « Rempli »  matButton="filled"      [</>]
    Specimen « Tonal »   matButton="tonal"       [</>]
  Section  « Tailles »
    …
```

- **Specimen** : cadre avec le composant rendu, le nom de la variante (en français) et l'API utilisée en petit (`<code>`). Le bouton `</>` n'apparaît que si un snippet est fourni.
- **Section** : titre, description facultative, grille CSS de colonnes (largeur minimale réglable, 300 px par défaut).
- Les états non forçables (survol, appui) ne sont pas montrés.
- Les popups (dialog, bottom-sheet, snackbar, menu, tooltip) sont présentés par un bouton déclencheur, sans aperçu statique.
- **Section « Personnalisation (jetons) »** : 33 pages sur 35 (toutes sauf Bouton et Icône, dont les sections Tailles/Couleurs/Formes jouent ce rôle) se terminent par une section qui montre comment restyler le composant avec son mixin Sass `mat.<composant>-overrides` : rôles de couleur (secondaire, tertiaire, erreur), formes (`--mat-sys-corner-*`), tailles et hauteurs, élévation, typographie (`--mat-sys-*-size`). Le champ `api` du specimen nomme le mixin et le premier jeton ; le snippet donne le template et le SCSS. Voir [ajouter-un-composant.md](ajouter-un-composant.md) §5.

## Composants couverts (35 pages)

### Boutons et indicateurs (7)
| Page | Id | Variantes principales |
|---|---|---|
| Bouton | `bouton` | 5 apparences × normal/désactivé/icône ; boutons icône ; FAB, mini FAB, FAB étendu ; **tailles** (petit, standard, grand, très grand) et **formes** et **couleurs** (primaire, secondaire, tertiaire, erreur × 5 apparences, boutons icône, FAB, mini FAB, FAB étendu) par les mixins `mat.*-overrides` ; chargement (`showProgress`) ; icône à droite ; lien ; désactivé mais focalisable |
| Bouton bascule | `bouton-bascule` | choix unique/multiple, icônes, sans coche, vertical, désactivé, apparence standard/legacy, sans coche multiple, désactivé focalisable |
| Badge | `badge` | tailles, pastille, positions, sur bouton, masqué, désactivé, description accessible, texte long |
| Icône | `icone` | tailles, couleurs (`mat.icon-overrides`), couleur héritée d'un conteneur, remplie, accessibilité, dans le texte (`inline`), axes de la police (graisse, taille optique) |
| Barre de progression | `barre-progression` | déterminé, indéterminé, tampon, requête, 0 %/100 % |
| Indicateur circulaire | `indicateur-circulaire` | déterminé, indéterminé, diamètres, épaisseurs |
| Ripple | `ripple` | défaut, centré, non borné, couleur, désactivé, rayon, animation lente, déclencheur externe |

### Formulaires (10)
| Page | Id | Variantes principales |
|---|---|---|
| Champ de saisie | `champ-saisie` | fill/outline, indices, icônes préfixe/suffixe, textarea, valeur, compteur, désactivé, lecture seule, erreur ; types (password, number, email, search), liste native, textarea auto-ajustable ; placeholder seul, libellé toujours flottant, **sous-champ fixe vs dynamique (compact)** ; obligatoire avec/sans astérisque, préfixe/suffixe texte, bouton d'effacement, indices début/fin, `hintLabel`, désactivé focalisable |
| Autocomplétion | `autocompletion` | simple, groupes, désactivé, option désactivée, valeurs objets (`displayWith`), première option active, sélection obligatoire, largeur du panneau, panneau désactivé |
| Liste déroulante | `liste-deroulante` | simple, contour, multiple, groupes, option désactivée, désactivé, erreur ; placeholder, icône préfixe, déclencheur personnalisé, sans coche, panneau sous le champ, option vide, panneau à largeur du contenu |
| Case à cocher | `case-a-cocher` | décochée/cochée/indéterminée, désactivées, libellé avant, requise, désactivée focalisable, sans ripple, cases imbriquées |
| Bouton radio | `bouton-radio` | vertical/horizontal, libellé avant, option/groupe désactivé, désactivé focalisable, sans ripple |
| Interrupteur | `interrupteur` | éteint/allumé, sans icône, libellé avant, inactifs, pleine largeur, sans libellé visible, désactivé focalisable |
| Curseur | `curseur` | continu, étiquette, graduations, plage, désactivé, étiquette formatée, plage avec graduations, pas décimal |
| Sélecteur de date | `selecteur-date` | date, plage, désactivé, calendrier intégré ; min/max, filtre jours ouvrés, interface tactile, ouverture par les années, séparateur de plage ; calendriers vue année / multi-années / bornes + sélection |
| Sélecteur d'heure | `selecteur-heure` | heure, pas de 15 min, désactivé ; min/max, pas d'une heure, ouverture par le bouton seul |
| Chips | `chips` | ensemble, avatar/icône finale, désactivé, listbox (unique/multiple), saisie amovible ; mis en évidence, non sélectionnable, modifiable |

### Navigation (4)
| Page | Id | Variantes principales |
|---|---|---|
| Barre d'outils | `barre-outils` | simple, avec actions, plusieurs lignes ; personnalisation (rôles de couleur, hauteur et titre, surface relevée). L'entrée `color` n'a aucun effet en M3 : l'ancien specimen « primaire » a été retiré |
| Menu latéral | `menu-lateral` | position début/fin, fermé ; modes `over`, `push`, avec fond assombri (fermés, bouton « Basculer le menu ») |
| Menu | `menu` | simple, icônes + séparateur, sous-menu, bouton icône, option désactivée, position ; contextuel (clic droit), désactivée focalisable, contenu différé, sans fond |
| Onglets | `onglets` | simple, icônes, étirés, désactivé, barre de navigation ; centrés/à la fin/non étirés, en-tête en bas, barre ajustée, onglet initial, hauteur dynamique, sans animation, nombreux onglets avec/sans flèches |

### Mise en page (7)
| Page | Id | Variantes principales |
|---|---|---|
| Carte | `carte` | relevée/contour/remplie, actions, avatar ; contenu seul, actions à droite, pied de carte |
| Séparateur | `separateur` | horizontal, vertical, décalé, avec sous-titre |
| Liste | `liste` | simple, icônes, deux lignes + méta, avatar, liste d'actions, sélection multiple/unique ; navigation avec élément actif, trois lignes, méta icône, case avant, sans coche |
| Grille | `grille` | simple, tuiles étendues, en-tête, ratio carré ; hauteur ajustée, ratio 4:1 |
| Panneau extensible | `panneau-extensible` | simple, ouvert, sans indicateur, désactivé, accordéon, multi ; indicateur avant, plat, barre d'actions, hauteurs d'en-tête, contenu différé |
| Étapes | `etapes` | horizontal, vertical, optionnelle, linéaire ; libellés dessous, en-tête en bas, terminées, non modifiable, icônes personnalisées |
| Arbre | `arbre` | plat à plusieurs niveaux, imbriqué, indentation personnalisée (dépliés au chargement) |

### Popups et modales (4)
| Page | Id | Variantes principales |
|---|---|---|
| Boîte de dialogue | `boite-dialogue` | simple, avec actions, contenu long, largeur, données injectées ; actions à droite/centrées, sans titre, fermeture bloquée, plein écran, position en haut |
| Feuille du bas | `feuille-du-bas` | liste d'actions, contenu libre, sans fond, fermeture bloquée |
| Snackbar | `snackbar` | simple, avec action, durée longue, persistante, en haut à droite ; en bas à gauche, en haut au centre, composant personnalisé, annonce assertive |
| Infobulle | `infobulle` | simple, icône, délai, désactivée, positions, texte long ; masquage différé, au curseur, avant/après |

### Données (3)
| Page | Id | Variantes principales |
|---|---|---|
| Tableau | `tableau` | simple, ligne de pied, en-tête figé, sélection ; aucune donnée, colonnes de texte, première colonne figée |
| Tri | `tri` | tri par colonne, options (flèche avant, en-tête désactivé, tri initial décroissant) ; premier clic décroissant, tri désactivé |
| Pagination | `pagination` | simple, extrémités, sans taille, page initiale, désactivé, traduction ; grand volume, une seule page, liste de tailles sous le champ |

## Ce que le catalogue ne montre volontairement pas

- Les entrées `color` des composants : elles ne s'appliquent qu'aux thèmes M2, sans effet avec le thème M3 utilisé ici. Les rôles de couleur M3 sont montrés par les mixins `mat.*-overrides` (page Bouton, section « Couleurs »).
- Les cartes avec image (nécessiteraient un asset et `NgOptimizedImage`).
