import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class CountrySearchInputComponent { 
  placeholder = input("Buscar país ..."); // establece un valor por defecto
  value = output<string>();
}
