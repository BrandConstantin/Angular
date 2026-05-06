import { Component, signal } from '@angular/core';
import { StarRating } from '../../components/star-rating/star-rating';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-value-accesor',
  imports: [StarRating, ReactiveFormsModule],
  templateUrl: './value-accesor.html',
  styleUrl: './value-accesor.css',
})
export class ValueAccesor {
  starRatingControl = new FormControl<number | null>({value: 3, disabled: true}); // valor inicial de 3 estrellas

  counter = signal(5); // contador para agregar estrellas

  constructor() {
    this.starRatingControl.valueChanges.subscribe(value => {
      console.log('Valor del control:', value); // muestra el valor del control cada vez que cambia
    });

    setTimeout(() => {
      this.starRatingControl.setValue(4); // actualiza el valor del control a 4 estrellas después de 2 segundos
    }, 2000);
  }

  adding() {
    this.counter.set(this.counter() + 1); // incrementa el contador
  }

  ratingChange(newRating: number | null) {
    console.log('Nueva calificación:', newRating);
  }
}
