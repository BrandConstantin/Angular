import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from './shared/components/side-menu.component/side-menu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideMenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('10-FormulariosReactivos_A');
}
