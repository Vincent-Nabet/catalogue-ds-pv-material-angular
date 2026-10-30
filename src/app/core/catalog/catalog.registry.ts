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
];

export const CATALOG_GROUPS: readonly CatalogGroup[] = CATALOG_CATEGORIES.map((category) => ({
  ...category,
  entries: CATALOG.filter((entry) => entry.category === category.id),
})).filter((group) => group.entries.length > 0);
