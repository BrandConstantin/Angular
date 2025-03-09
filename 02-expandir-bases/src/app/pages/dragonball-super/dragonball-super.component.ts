import { Component, signal } from '@angular/core';
import { CharacterListComponent } from '../../components/shared/navbar/dragonball/character-list/character-list.component';
import { Character } from '../../interfaces/character.interface';

@Component({
  standalone: true,
  selector: 'app-dragonball-super',
  templateUrl: './dragonball-super.component.html',
  styleUrl: './dragonball-super.component.css',
  imports: [CharacterListComponent]
})

export class DragonballSuperComponent {
  name = signal('');
  power = signal(0);

  characters = signal<Character[]>([
    {id: 1, name: 'Goku', power: 9001},
    {id: 1, name: 'Vegeta', power: 8060},
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
