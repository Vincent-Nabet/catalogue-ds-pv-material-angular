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
];

export const CATALOG_GROUPS: readonly CatalogGroup[] = CATALOG_CATEGORIES.map((category) => ({
  ...category,
  entries: CATALOG.filter((entry) => entry.category === category.id),
})).filter((group) => group.entries.length > 0);
