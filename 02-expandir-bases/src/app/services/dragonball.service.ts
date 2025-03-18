import { effect, Injectable, signal } from '@angular/core';
import { Character } from '../interfaces/character.interface';

@Injectable({providedIn: 'root'})
export class DragonballService {
  loadFromLocalStorage = (): Character[] => {
    const characters = localStorage.getItem('characters');
    return characters ? JSON.parse(characters) : [];
  }

  characters = signal<Character[]>(this.loadFromLocalStorage());

  addCharacter(character: Character){
    this.characters.update(
      (list) => [...list, character]
    );
  }

  saveToLocalStorage = effect(() =>{
    console.log(`Character count ${this.characters().length}`);

    localStorage.setItem('characters', JSON.stringify(this.characters()))
  });

}
