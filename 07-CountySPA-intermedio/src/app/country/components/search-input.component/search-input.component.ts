import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class CountrySearchInputComponent { 
  placeholder = input("Buscar país ..."); // establece un valor por defecto
  value = output<string>();
  debounceTime = input(300); // tiempo de espera por defecto, reutilizable en otros componentes

  inputValue = signal<string>(''); // tener la última cadena ingresada
  debouncedEffct = effect((onCleanup) => {
    const val = this.inputValue();

    const timeout = setTimeout(() => {
      this.value.emit(val);
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });
}
