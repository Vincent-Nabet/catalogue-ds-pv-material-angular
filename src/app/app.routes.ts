import { Routes } from '@angular/router';
import { CATALOG } from './core/catalog/catalog.registry';

const TITRE = 'Catalogue Material';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: `Accueil — ${TITRE}`,
    loadComponent: () => import('./pages/accueil/accueil').then((m) => m.Accueil),
  },
  ...CATALOG.map((entry) => ({
    path: `composants/${entry.id}`,
    title: `${entry.label} — ${TITRE}`,
    loadComponent: entry.loadComponent,
  })),
  { path: '**', redirectTo: '' },
];
