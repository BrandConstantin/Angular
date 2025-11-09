import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'basic',
        title: 'Pipes básicos',
        loadComponent: () => import('./pages/basic-page/basic-page.component').then(m => m.default)
    },
    {
        path: 'numbers',
        title: 'Pipes de números',
        loadComponent: () => import('./pages/numbers-page/numbers-page').then(m => m.NumbersPage)
    },
    {
        path: 'custom',
        title: 'Pipes personalizados',
        loadComponent: () => import('./pages/custom-page/custom-page').then(m => m.CustomPage)
    },
    {
        path: 'uncommon',
        title: 'Pipes poco comunes',
        loadComponent: () => import('./pages/uncommon-page/uncommon-page').then(m => m.default)
    },
    {
        path: '**',
        redirectTo: 'basic'
    }
];
