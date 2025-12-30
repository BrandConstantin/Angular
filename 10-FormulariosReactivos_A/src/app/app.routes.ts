import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'reactive',
        loadChildren: () => import('./reactive/reactive.routes').then((modulo) => modulo.reactiveRoutes), // modulo porque no hay exportación
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.route'),
    },
    {
        path: 'country',
        loadChildren: () => import('./country/country.routes').then((m) => m.countryRoutes),
    },
    {
        path: '**',
        redirectTo: 'reactive',
    },
];
