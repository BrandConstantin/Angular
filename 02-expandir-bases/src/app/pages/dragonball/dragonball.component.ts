import { Component, signal } from '@angular/core';

interface Character{
  id: number;
  name: string;
  power: number;
}

@Component({
  standalone: true,
  selector: 'app-dragonball',
  templateUrl: './dragonball.component.html',
  styleUrl: './dragonball.component.css'
})

export class DragonballComponent {
  characters = signal<Character[]>([
    {id: 1, name: 'Goku', power: 9001},
    {id: 1, name: 'Vegeta', power: 8060},
    {id: 1, name: 'Piccolo', power: 7993},
    {id: 1, name: 'Chi-Chi', power: 4002},
  ]);
}
