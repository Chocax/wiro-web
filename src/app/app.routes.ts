import { Routes } from '@angular/router';
import { Shell } from './layout/shell';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      { path: '', loadComponent: () => import('./pages/home/home').then((m) => m.Home) },
      { path: 'how-it-works', loadComponent: () => import('./pages/how/how').then((m) => m.How) },
      { path: 'technology', loadComponent: () => import('./pages/technology/technology').then((m) => m.Technology) },
      { path: 'business', loadComponent: () => import('./pages/business/business').then((m) => m.Business) },
      { path: 'campaign', loadComponent: () => import('./pages/campaign/campaign').then((m) => m.Campaign) },
      { path: 'screens', loadComponent: () => import('./pages/gallery/gallery').then((m) => m.Gallery) },
      { path: 'team', loadComponent: () => import('./pages/team/team').then((m) => m.Team) },
    ],
  },
  { path: 'record', loadComponent: () => import('./pages/record/record').then((m) => m.Record) },
  { path: '**', redirectTo: '' },
];
