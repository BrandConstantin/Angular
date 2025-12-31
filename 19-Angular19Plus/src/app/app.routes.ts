import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard'), // because of "export default class Dashboard"
        children: [
            {
                path: 'change-detection',
                title: 'Change Detection',
                loadComponent: () => import('./dashboard/pages/change-detection/change-detection')
            },
            {
                path: 'control-flow',
                title: 'Control Flow',
                loadComponent: () => import('./dashboard/pages/control-flow/control-flow')
            },
            {
                path: 'defer-options',
                title: 'Defer Options',
                loadComponent: () => import('./dashboard/pages/defer-options/defer-options')
            },
            {
                path: 'defer-view',
                title: 'Defer View',
                loadComponent: () => import('./dashboard/pages/defer-view/defer-view')
            },
            {
                path: 'user/:id',
                title: 'User Details',
                loadComponent: () => import('./dashboard/pages/user/user')
            },
            {
                path: 'users',
                title: 'User List',
                loadComponent: () => import('./dashboard/pages/users/users')    
            },
            {
                path: 'view-transition',
                title: 'View Transition',
                loadComponent: () => import('./dashboard/pages/view-transition/view-transition')
            },
            {
                path: '',
                redirectTo: 'control-flow',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }
];
