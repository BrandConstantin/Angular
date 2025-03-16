import { Component, signal } from '@angular/core';
import { CharacterListComponent } from '../../components/shared/navbar/dragonball/character-list/character-list.component';
import { Character } from '../../interfaces/character.interface';
import { CharacterAddComponent } from '../../components/shared/navbar/dragonball/character-list/character-add/character-add.component';

@Component({
  standalone: true,
  selector: 'app-dragonball-super',
  templateUrl: './dragonball-super.component.html',
  styleUrl: './dragonball-super.component.css',
  imports: [CharacterListComponent, CharacterAddComponent]
})

export class DragonballSuperComponent {
  name = signal('');
  power = signal(0);

  characters = signal<Character[]>([
    {id: 1, name: 'Goku', power: 9001},
    {id: 1, name: 'Vegeta', power: 8060},
  ]);

  addCharacter(character: Character){
    this.characters.update(
      (list) => [...list, character]
    );
  }

  resetFields(){
    this.name.set('');
    this.power.set(0);
  }
}
