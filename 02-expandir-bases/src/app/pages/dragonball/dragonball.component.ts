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
  name = signal('');
  power = signal(0);

  characters = signal<Character[]>([
    {id: 1, name: 'Goku', power: 9001},
    {id: 1, name: 'Vegeta', power: 8060},
    {id: 1, name: 'Piccolo', power: 7993},
    {id: 1, name: 'Chi-Chi', power: 4002},
  ]);

  addCharacter(){
    if(!this.name() || !this.power() || this.power() <= 0){
      return;
    }

    const newCharacter: Character = {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power()
    }

    this.characters.update(
      (list) => [...list, newCharacter]
    );
  }

  resetFields(){
    this.name.set('');
    this.power.set(0);
  }
}
