import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { ListComponent } from './heroes/list/list.component';
import { HeroComponent } from './heroes/hero/hero.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CounterComponent, ListComponent, HeroComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '02-expandir-base';
}
