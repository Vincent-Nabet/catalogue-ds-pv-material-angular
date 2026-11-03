# Fonctionnel

## Objectif

Fournir aux designers et intégrateurs un **catalogue visuel façon Figma** des composants Angular Material : une page par composant, qui montre toutes les variantes, tailles et états disponibles, sans recopier la documentation officielle. Un sélecteur de thème permet de voir immédiatement le rendu dans chaque palette, en clair et en sombre.

Public : designers, intégrateurs, développeurs front. Langue de l'interface : français uniquement.

## Parcours utilisateur

1. **Accueil** (`/`) : bandeau de présentation (compteurs : 35 composants, 7 catégories, thèmes) puis une carte par catégorie listant ses pages (« 3 pages » pour Fondations, « N composants » ailleurs).
2. **Navigation latérale** : toujours visible sur ordinateur (`side`), tiroir sur mobile (`over`, ouvert par le bouton menu). Composants groupés par catégorie, lien actif mis en évidence (`aria-current="page"`).
3. **Page de composant** (`/composants/<id>`) : un `<h1>` puis des sections de specimens.
4. **Sélecteur de thème** (bouton « Thème : Azur » en haut à droite) : thème, mode, densité. Il mène aussi à la page « Thèmes importés » (`/themes-importes`) pour importer ses propres tokens.
5. **Inspecteur de contraste** (bouton « Contraste » à gauche du sélecteur de thème, présent sur les pages de composants et de Fondations) : affiche sur chaque texte du contenu de la page son rapport de contraste et signale ceux qui sont sous WCAG AA. Voir [inspecteur-contraste.md](inspecteur-contraste.md).
6. **Code** : sur chaque specimen, un bouton icône `</>` (discret, opacité 0,4, plein au survol et au focus) ouvre une boîte de dialogue avec le code, un bouton « Copier » (suivi d'une snackbar « Code copié ») et « Fermer ».

## Le sélecteur de thème

| Réglage | Valeurs | Défaut |
|---|---|---|
| Thème | Trois sous-menus : **Design system** (Standard, Contraste moyen, Contraste élevé, Monochrome), **Thèmes Angular Material** (Azur, Violet, Rose, Vert, Orange, Cyan) et **Thèmes importés** (voir plus bas) ; pastille de couleur + coche sur l'actif | Design system, contraste moyen |
| Mode | Clair, Sombre, Système | **Clair** |
| Densité | 0 (par défaut), −1, −2, −3, −4 | 0 |

Les préférences sont conservées dans `localStorage` (clé `catalogue-material-theme`). Le bouton affiche le thème courant (« Thème : Violet », « Thème : Design system, contraste moyen »). Sous 600 px, seul l'icône et la pastille restent visibles (le libellé reste lu par les lecteurs d'écran).

## Thèmes importés

Un designer peut voir **ses propres tokens** dans tout le catalogue, sans développeur : il importe un zip de tokens dans le navigateur, lui donne un nom, puis l'utilise comme n'importe quel thème (composants, pages Fondations, inspecteur de contraste). Page dédiée : `/themes-importes` (titre « Thèmes importés — Catalogue Material »), atteinte par **« Importer et gérer les thèmes… »** en bas de la section « Thèmes importés » du sélecteur ; pas d'entrée dans le menu latéral.

Vocabulaire : un **thème importé** = un zip = un nom choisi par l'utilisateur ; une **famille** = une famille de contraste à l'intérieur d'un thème importé (« Standard », « Contraste moyen »…), déduite des noms des fichiers `semantics/*.tokens.json` comme pour `npm run themes` (leur nombre dépend du zip, une suffit).

### Dans le sélecteur

Troisième entrée du groupe « Thème », après « Design system » et « Thèmes Angular Material » :

- un élément par thème importé : sous-menu des familles (une entrée `menuitemradio` par famille, pastille + coche) s'il en a plusieurs, élément direct sinon ;
- « Aucun thème importé » (désactivé) quand la liste est vide ;
- « Importer et gérer les thèmes… » (toujours actif) vers `/themes-importes`.

Le bouton principal affiche « Thème : <nom> » (« <nom>, contraste moyen » pour une famille autre que la défaut) ; le nom est tronqué par des points de suspension si besoin. Un thème importé actif est mémorisé comme les autres préférences ; s'il a été supprimé entre-temps, on retombe sur le thème par défaut.

### Parcours sur la page

1. **Choisir le zip** : le glisser-déposer sur la zone en pointillés, ou un clic sur cette zone (ouvre le sélecteur de fichiers ; un seul fichier à la fois, 5 Mo au plus). Le contrôle reste un vrai champ fichier natif, masqué visuellement : au clavier, `Tab` le focalise (contour visible sur la zone) et les lecteurs d'écran l'annoncent par le libellé de la zone. Archive contenant `primitives.tokens.json` et `semantics/*.tokens.json`, au moins une paire clair/sombre, comme pour `npm run themes`. L'analyse démarre au choix du fichier (« Analyse en cours… »).
2. **Lire le rapport** : « 8 modes lus · 4 familles : Standard, Contraste moyen, Contraste élevé, Monochrome · 142 variables MD3 · 41 variables du design system », pastilles des familles, avertissements (tokens non reconnus, modes ignorés, jetons `--app-*` absents) et police des tokens (« Le catalogue ne charge que Poppins : une autre police ne s'affichera que si elle est installée sur la machine »). En cas d'échec, un message français (`role="alert"`) explique pourquoi ; rien n'est enregistré.
3. **Nommer** : champ prérempli avec le nom du zip, requis, 40 caractères au plus, unique parmi les thèmes importés (sans tenir compte de la casse ni des espaces de bord).
4. **Importer** : le thème est enregistré (20 thèmes au plus), **sa famille par défaut est appliquée** (la « Standard » s'il y en a une), le formulaire se vide pour enchaîner un autre zip, « Thème « X » importé et appliqué. » est annoncé et le focus va sur le titre du thème dans la liste. Si le stockage refuse (plein, indisponible, limite atteinte), un message l'explique et le formulaire reste tel quel.
5. **Gérer** : la liste « Thèmes importés (N) » montre pour chaque thème son nom, sa date d'import et le nom du zip, ses familles (la famille active est signalée par du texte) et ses avertissements (`<details>`). « Supprimer » demande une **confirmation en ligne** (« Supprimer « X » ? », focus sur « Annuler ») ; supprimer le thème actif ramène au thème par défaut (annoncé). Pas de renommage, d'export ni de mise à jour : réimporter un zip.

Aucune boîte de dialogue ni snackbar : confirmations et annonces sont en ligne, dans des régions `aria-live`. Détail technique : [architecture.md](architecture.md) et [generation-themes.md](generation-themes.md#import-dans-le-navigateur) ; limites : [decisions-et-limites.md](decisions-et-limites.md#thèmes-importés-dans-le-navigateur).

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
- **Section « Couleurs personnalisées »** : 25 pages (Bouton, Bouton bascule, Badge, Icône, Barre de progression, Indicateur circulaire, Ripple, Champ de saisie, Case à cocher, Bouton radio, Interrupteur, Curseur, Sélecteur de date, Sélecteur d'heure, Chips, Barre d'outils, Menu, Onglets, Carte, Séparateur, Liste, Étapes, Snackbar, Tableau, Pagination), celles qui ont déjà des exemples de rôles de couleur, présentent en fin de page un exemple **par famille de couleur du design system** (`--app-color-<famille>` complète : rôle, `on-`, `-container`, `on-…-container`). Les familles sont **détectées dans le CSS chargé** (aujourd'hui Succès, Info, Alerte) : une nouvelle famille livrée par le design system apparaît sur toutes ces pages sans toucher au code. Chaque exemple porte la pastille « Jeton personnalisé ». Avec un thème Angular Material (aucune famille), la section est masquée. Les pages sans exemple de couleur (Autocomplétion, Liste déroulante, Boîte de dialogue, Feuille du bas, Infobulle, Panneau extensible, Menu latéral, Grille, Arbre, Tri) n'en ont pas. Voir [ajouter-un-composant.md](ajouter-un-composant.md) §5 bis.

## Fondations (3 pages)

Catégorie placée **en tête** du menu et de l'accueil. Les pages montrent les jetons eux-mêmes (rôles de couleur, typographie, formes) lus dans le CSS chargé, et non un composant. URL `/composants/<id>` comme les autres pages ; l'inspecteur de contraste y est disponible.

| Page | Id | Contenu | Thème utilisé |
|---|---|---|---|
| Couleurs | `couleurs` | rôles de couleur en paires texte / fond : échantillon rendu, valeurs hexadécimales, rapport de contraste WCAG 2.x, statut (icône et texte « Conforme » / « Insuffisant, minimum 4,5 : 1 »), puis les rôles hors paires (pastille, nom, hex) | thème courant |
| *Matrice de contraste (débranchée)* | `matrice-contraste` | toutes les paires × les **8 modes du design system** (4 familles × clair / sombre) côte à côte, échecs et régressions | indépendant du thème courant |
| Typographie | `typographie` | les 15 styles MD3 rendus avec leurs valeurs (police, taille, interligne, graisse, interlettrage) ; graisses renforcées du design system | thème courant |
| Formes et espacements | `formes-espacements` | rayons MD3 et Expressive, espacements (10 jetons), élévations, opacités d'état | thème courant |

- **Couleurs** : une section par groupe de rôles (Primaire, Secondaire, Tertiaire, Erreur, Surfaces, Contours et inverses, Couleurs fixes, Succès, Info, Alerte). Les paires d'éléments d'interface (`outline`, seuil 3) et décoratives (`outline-variant`, sans seuil) sont montrées par un cadre de 2 px, sans texte dans la couleur testée. Le rapport est **tronqué** à deux décimales, comme dans axe-core (4,4896 s'affiche « 4,48 : 1 »).
- **Matrice de contraste** : résumé par mode (nombre d'échecs et de régressions), filtres « Échecs et régressions seulement » et « Inclure les paires décoratives », puis un tableau natif (en-têtes à deux niveaux : famille, puis clair / sombre) groupé par rôle. Chaque cellule montre fond et texte en deux mini-pastilles, le ratio, une icône et le statut. Une **régression** est une cellule dont le ratio est inférieur de plus de 0,01 à celui de la famille précédente, dans le même mode (Standard → Contraste moyen → Contraste élevé ; Monochrome hors progression). Sur petit écran, le tableau défile horizontalement dans une région focusable.
- **Jetons propres au design system** (`--app-*` : succès, info, alerte, rayons Expressive, espacements, graisses renforcées) : affichés avec un thème Design system ; avec un thème Angular Material, une phrase invite à choisir un thème Design system. Chaque exemple qui utilise une de ces variables porte une pastille sombre **« Jeton personnalisé »**, et la section rappelle qu'il est absent de Material Design 3 et généré par le design system en variable `--app-*`. Dans la section des graisses renforcées, Label Large et Label Moyen (jeton MD3 natif `…-weight-prominent`) portent une pastille neutre **« Jeton MD3 »**.
- La **matrice de contraste** est écrite (`pages/fondations/matrice-contraste/`) mais **absente du registre** : ni route, ni menu, ni accueil. Pour la rebrancher, ré-ajouter son entrée dans `CATALOG` (voir [decisions-et-limites.md](decisions-et-limites.md)).
- Les snippets de ces pages sont dérivés des données (ex. `color: var(--mat-sys-on-primary); background: var(--mat-sys-primary);`) ; la matrice n'en a pas.

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

- Les entrées `color` des composants : elles ne s'appliquent qu'aux thèmes M2, sans effet avec le thème M3 utilisé ici. Les rôles de couleur M3 sont montrés par les mixins `mat.*-overrides` (page Bouton, section « Couleurs »), les familles du design system par la section « Couleurs personnalisées » de chaque page.
- Les cartes avec image (nécessiteraient un asset et `NgOptimizedImage`).
