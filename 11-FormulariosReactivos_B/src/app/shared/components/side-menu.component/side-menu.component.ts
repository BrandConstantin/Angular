import { Component } from '@angular/core';
import { reactiveRoutes } from '../../../reactive/reactive.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Title } from '@angular/platform-browser';

interface MenuItem {
  title: string;
  route: string;
}

const reactiveItemRoute = reactiveRoutes[0].children ?? []; // asegurarnos que hay alguna ruta y no un undefined

@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent { 
  reactiveMenu: MenuItem[] = reactiveItemRoute
  .filter((item) => item.path !== '**')
  .map((item) => ({
    route: `reactive/${item.path}`,
    title: `${item.title}`
  }));

  authMenu: MenuItem[] = [{
    title: 'Registro', route: './auth'
  }]

  countryMenu: MenuItem[] = [{
    title: 'Paises', route: './country'
  }]

}
