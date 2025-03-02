import { Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { HeroComponent } from './heroes/hero/hero.component';

export const routes: Routes = [
  {path: '', component: CounterComponent},
  {path: 'hero', component: HeroComponent},
  {path: '**', redirectTo: ''},
];
