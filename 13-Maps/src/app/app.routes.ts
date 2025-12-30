import { Routes } from '@angular/router';
import { FullscreenMapPage } from './pages/fullscreen-map-page/fullscreen-map-page';
import { MarkerPage } from './pages/marker-page/marker-page';
import { HousesPage } from './pages/houses-page/houses-page';
import { DinamicMarkerPage } from './pages/dinamic-marker-page/dinamic-marker-page';

export const routes: Routes = [
    {
        path: 'fullsreen', component: FullscreenMapPage,
        title: 'FullScreen Map'
    },
    {
        path: 'markers', component: MarkerPage,
        title: 'Marcadores'
    },
    {
        path: 'houses', component: HousesPage,
        title: 'Propriedades'
    },
    {
        path: 'dinamic', component: DinamicMarkerPage,
        title: 'Marcadores dinámicos'
    },
    {
        path: '**', redirectTo: ''
    },
];
