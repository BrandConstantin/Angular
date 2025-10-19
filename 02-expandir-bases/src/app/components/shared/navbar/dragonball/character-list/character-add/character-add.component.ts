import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { Character } from '../../../../../../interfaces/character.interface';

@Component({
  selector: 'character-add',
  standalone: true,
  imports: [],
  templateUrl: './character-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterAddComponent {
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
      };

      //this.characters.update((list) => [...list, newCharacter]);
      this.newCharacter.emit(newCharacter);
    }

    resetFields(){
      this.name.set('');
      this.power.set(0);
    }

    newCharacter = output<Character>();
 }
