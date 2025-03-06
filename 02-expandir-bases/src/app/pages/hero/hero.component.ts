import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  imports: [CommonModule],
  styleUrl: './hero.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent {
  name = signal('Ironman');
  age = signal(45);
  heroDescription = computed(() =>{
    const description = `${ this.name() } - ${ this.age() }`;
    return description;
  })

  /*
  getHeroDescription(){
    return `${ this.name() } - ${ this.age() }`;
  }
  */

  changeHero(){
    this.name.set('Spiderman');
    this.age.set(22);
  }

  resetForm(){
    this.name.set('Ironman');
    this.age.set(45);
  }

  chageAge(){
    this.age.update(current => 60);
  }
}
