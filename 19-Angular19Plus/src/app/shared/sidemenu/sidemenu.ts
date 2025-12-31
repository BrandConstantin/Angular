import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidemenu.html',
  styles: ``,
})
export class Sidemenu { 
  public menuItems = routes.map(
      route => route.children ?? []
    )
    .flat()
    .filter(route => route && route.path)
    .filter(route => !route.path?.includes(':')); // si la ruta tiene hijos, obtenerlos


  constructor() {  }
}
