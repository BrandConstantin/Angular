import { Component } from '@angular/core';
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
}
