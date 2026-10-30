import { Type } from '@angular/core';

export type CatalogCategory =
  | 'boutons-indicateurs'
  | 'formulaires'
  | 'navigation'
  | 'mise-en-page'
  | 'popups-modales'
  | 'donnees';

export interface CatalogCategoryInfo {
  id: CatalogCategory;
  label: string;
  icon: string;
}

export interface CatalogEntry {
  id: string;
  label: string;
  category: CatalogCategory;
  icon: string;
  loadComponent: () => Promise<Type<unknown>>;
}

export interface CatalogGroup extends CatalogCategoryInfo {
  entries: readonly CatalogEntry[];
}

export const CATALOG_CATEGORIES: readonly CatalogCategoryInfo[] = [
  { id: 'boutons-indicateurs', label: 'Boutons et indicateurs', icon: 'smart_button' },
  { id: 'formulaires', label: 'Formulaires', icon: 'edit_note' },
  { id: 'navigation', label: 'Navigation', icon: 'explore' },
  { id: 'mise-en-page', label: 'Mise en page', icon: 'dashboard' },
  { id: 'popups-modales', label: 'Popups et modales', icon: 'web_asset' },
  { id: 'donnees', label: 'Données', icon: 'table_chart' },
];

export const CATALOG: readonly CatalogEntry[] = [
  {
    id: 'bouton',
    label: 'Bouton',
    category: 'boutons-indicateurs',
    icon: 'smart_button',
    loadComponent: () =>
      import('../../pages/composants/bouton/bouton.page').then((m) => m.BoutonPage),
  },
  {
    id: 'bouton-bascule',
    label: 'Bouton bascule',
    category: 'boutons-indicateurs',
    icon: 'toggle_on',
    loadComponent: () =>
      import('../../pages/composants/bouton-bascule/bouton-bascule.page').then(
        (m) => m.BoutonBasculePage,
      ),
  },
  {
    id: 'badge',
    label: 'Badge',
    category: 'boutons-indicateurs',
    icon: 'notification_important',
    loadComponent: () => import('../../pages/composants/badge/badge.page').then((m) => m.BadgePage),
  },
  {
    id: 'icone',
    label: 'Icône',
    category: 'boutons-indicateurs',
    icon: 'emoji_symbols',
    loadComponent: () => import('../../pages/composants/icone/icone.page').then((m) => m.IconePage),
  },
  {
    id: 'barre-progression',
    label: 'Barre de progression',
    category: 'boutons-indicateurs',
    icon: 'linear_scale',
    loadComponent: () =>
      import('../../pages/composants/barre-progression/barre-progression.page').then(
        (m) => m.BarreProgressionPage,
      ),
  },
  {
    id: 'indicateur-circulaire',
    label: 'Indicateur circulaire',
    category: 'boutons-indicateurs',
    icon: 'progress_activity',
    loadComponent: () =>
      import('../../pages/composants/indicateur-circulaire/indicateur-circulaire.page').then(
        (m) => m.IndicateurCirculairePage,
      ),
  },
  {
    id: 'ripple',
    label: 'Ripple',
    category: 'boutons-indicateurs',
    icon: 'touch_app',
    loadComponent: () =>
      import('../../pages/composants/ripple/ripple.page').then((m) => m.RipplePage),
  },
  {
    id: 'champ-saisie',
    label: 'Champ de saisie',
    category: 'formulaires',
    icon: 'input',
    loadComponent: () =>
      import('../../pages/composants/champ-saisie/champ-saisie.page').then((m) => m.ChampSaisiePage),
  },
  {
    id: 'autocompletion',
    label: 'Autocomplétion',
    category: 'formulaires',
    icon: 'manage_search',
    loadComponent: () =>
      import('../../pages/composants/autocompletion/autocompletion.page').then((m) => m.AutocompletionPage),
  },
  {
    id: 'liste-deroulante',
    label: 'Liste déroulante',
    category: 'formulaires',
    icon: 'arrow_drop_down_circle',
    loadComponent: () =>
      import('../../pages/composants/liste-deroulante/liste-deroulante.page').then((m) => m.ListeDeroulantePage),
  },
  {
    id: 'case-a-cocher',
    label: 'Case à cocher',
    category: 'formulaires',
    icon: 'check_box',
    loadComponent: () =>
      import('../../pages/composants/case-a-cocher/case-a-cocher.page').then((m) => m.CaseACocherPage),
  },
  {
    id: 'bouton-radio',
    label: 'Bouton radio',
    category: 'formulaires',
    icon: 'radio_button_checked',
    loadComponent: () =>
      import('../../pages/composants/bouton-radio/bouton-radio.page').then((m) => m.BoutonRadioPage),
  },
  {
    id: 'interrupteur',
    label: 'Interrupteur',
    category: 'formulaires',
    icon: 'toggle_off',
    loadComponent: () =>
      import('../../pages/composants/interrupteur/interrupteur.page').then((m) => m.InterrupteurPage),
  },
  {
    id: 'curseur',
    label: 'Curseur',
    category: 'formulaires',
    icon: 'tune',
    loadComponent: () =>
      import('../../pages/composants/curseur/curseur.page').then((m) => m.CurseurPage),
  },
  {
    id: 'selecteur-date',
    label: 'Sélecteur de date',
    category: 'formulaires',
    icon: 'calendar_month',
    loadComponent: () =>
      import('../../pages/composants/selecteur-date/selecteur-date.page').then((m) => m.SelecteurDatePage),
  },
  {
    id: 'selecteur-heure',
    label: 'Sélecteur d’heure',
    category: 'formulaires',
    icon: 'schedule',
    loadComponent: () =>
      import('../../pages/composants/selecteur-heure/selecteur-heure.page').then((m) => m.SelecteurHeurePage),
  },
  {
    id: 'chips',
    label: 'Chips',
    category: 'formulaires',
    icon: 'label',
    loadComponent: () =>
      import('../../pages/composants/chips/chips.page').then((m) => m.ChipsPage),
  },
  {
    id: 'barre-outils',
    label: 'Barre d’outils',
    category: 'navigation',
    icon: 'web_asset',
    loadComponent: () =>
      import('../../pages/composants/barre-outils/barre-outils.page').then((m) => m.BarreOutilsPage),
  },
  {
    id: 'menu-lateral',
    label: 'Menu latéral',
    category: 'navigation',
    icon: 'left_panel_open',
    loadComponent: () =>
      import('../../pages/composants/menu-lateral/menu-lateral.page').then((m) => m.MenuLateralPage),
  },
  {
    id: 'menu',
    label: 'Menu',
    category: 'navigation',
    icon: 'menu_open',
    loadComponent: () =>
      import('../../pages/composants/menu/menu.page').then((m) => m.MenuPage),
  },
  {
    id: 'onglets',
    label: 'Onglets',
    category: 'navigation',
    icon: 'tab',
    loadComponent: () =>
      import('../../pages/composants/onglets/onglets.page').then((m) => m.OngletsPage),
  },
  {
    id: 'carte',
    label: 'Carte',
    category: 'mise-en-page',
    icon: 'crop_landscape',
    loadComponent: () =>
      import('../../pages/composants/carte/carte.page').then((m) => m.CartePage),
  },
  {
    id: 'separateur',
    label: 'Séparateur',
    category: 'mise-en-page',
    icon: 'horizontal_rule',
    loadComponent: () =>
      import('../../pages/composants/separateur/separateur.page').then((m) => m.SeparateurPage),
  },
  {
    id: 'liste',
    label: 'Liste',
    category: 'mise-en-page',
    icon: 'list',
    loadComponent: () =>
      import('../../pages/composants/liste/liste.page').then((m) => m.ListePage),
  },
  {
    id: 'grille',
    label: 'Grille',
    category: 'mise-en-page',
    icon: 'grid_view',
    loadComponent: () =>
      import('../../pages/composants/grille/grille.page').then((m) => m.GrillePage),
  },
  {
    id: 'panneau-extensible',
    label: 'Panneau extensible',
    category: 'mise-en-page',
    icon: 'expand_circle_down',
    loadComponent: () =>
      import('../../pages/composants/panneau-extensible/panneau-extensible.page').then((m) => m.PanneauExtensiblePage),
  },
  {
    id: 'etapes',
    label: 'Étapes',
    category: 'mise-en-page',
    icon: 'linear_scale',
    loadComponent: () =>
      import('../../pages/composants/etapes/etapes.page').then((m) => m.EtapesPage),
  },
  {
    id: 'arbre',
    label: 'Arbre',
    category: 'mise-en-page',
    icon: 'account_tree',
    loadComponent: () =>
      import('../../pages/composants/arbre/arbre.page').then((m) => m.ArbrePage),
  },
  {
    id: 'boite-dialogue',
    label: 'Boîte de dialogue',
    category: 'popups-modales',
    icon: 'chat_bubble',
    loadComponent: () =>
      import('../../pages/composants/boite-dialogue/boite-dialogue.page').then((m) => m.BoiteDialoguePage),
  },
  {
    id: 'feuille-du-bas',
    label: 'Feuille du bas',
    category: 'popups-modales',
    icon: 'call_to_action',
    loadComponent: () =>
      import('../../pages/composants/feuille-du-bas/feuille-du-bas.page').then((m) => m.FeuilleDuBasPage),
  },
  {
    id: 'snackbar',
    label: 'Snackbar',
    category: 'popups-modales',
    icon: 'notifications',
    loadComponent: () =>
      import('../../pages/composants/snackbar/snackbar.page').then((m) => m.SnackbarPage),
  },
  {
    id: 'infobulle',
    label: 'Infobulle',
    category: 'popups-modales',
    icon: 'info',
    loadComponent: () =>
      import('../../pages/composants/infobulle/infobulle.page').then((m) => m.InfobullePage),
  },
];

export const CATALOG_GROUPS: readonly CatalogGroup[] = CATALOG_CATEGORIES.map((category) => ({
  ...category,
  entries: CATALOG.filter((entry) => entry.category === category.id),
})).filter((group) => group.entries.length > 0);
