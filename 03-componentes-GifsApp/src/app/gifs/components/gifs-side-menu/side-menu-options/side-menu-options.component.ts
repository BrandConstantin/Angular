import { Component, inject } from '@angular/core';
import { GifService } from '/src/app/gifs/services/gifs.service.ts';

interface MenuOptions{
  icon: string;
  label: string;
  subLabel: string;
  route: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  standalone: true,
  imports: [],
  templateUrl: './side-menu-options.component.html'
})
export class SideMenuOptionsComponent {
  gifService = inject(GifService)

  menuOptions: MenuOptions[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      subLabel: 'Gifs Populares',
      route: '/dashboard/trending'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      subLabel: 'Buscar gifs',
      route: '/dashboard/search'
    },
  ];
}
