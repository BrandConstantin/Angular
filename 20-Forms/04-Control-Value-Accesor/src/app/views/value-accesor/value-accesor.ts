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
  starRatingControl = new FormControl(3); // valor inicial de 3 estrellas

  counter = signal(4); // contador para agregar estrellas

  adding() {
    this.counter.update((count) => count + 1); // incrementa el contador
    this.starRatingControl.setValue(this.counter()); // actualiza el valor del control con el nuevo contador
  }

  ratingChange(newRating: number) {
    console.log('Nueva calificación:', newRating);
    this.starRatingControl.setValue(newRating); // actualiza el valor del control con la nueva calificación
  }
}
