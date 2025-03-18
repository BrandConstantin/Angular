import { Component, inject, signal } from '@angular/core';
import { CharacterListComponent } from '../../components/shared/navbar/dragonball/character-list/character-list.component';
import { CharacterAddComponent } from '../../components/shared/navbar/dragonball/character-list/character-add/character-add.component';
import { DragonballService } from '../../services/dragonball.service';

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

  // injectar dependencias
  public dragonballService = inject(DragonballService);

  resetFields(){
    this.name.set('');
    this.power.set(0);
  }
}
