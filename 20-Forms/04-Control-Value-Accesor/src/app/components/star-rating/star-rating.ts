import { Component, input, model, OnInit, signal } from '@angular/core';

@Component({
  selector: 'star-rating',
  imports: [],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.css',
  host: {
    '[class.disabled]': 'isDisabled()',
    'mouseleave': 'handleMouseLeave()'
  }
})
export class StarRating implements OnInit {
  stars = input.required<boolean[], number>({transform: gettingStars}); // input para recibir el número de estrellas
  rating = model<number>(0); // modelo para almacenar la calificación actual
  hoveredIndex = signal<number>(-1); // índice de la estrella actualmente hoverada
  isDisabled = input<boolean>(false, {alias: 'disabled'}); // input para deshabilitar la calificación

  ngOnInit(): void {
    //this.stars.set(Array(this.starCount()).fill(false));
  }

  rate(rating: number) {
    if(this.isDisabled()) return; // si el componente está deshabilitado, no se permite calificar
    this.rating.set(rating); // actualiza la calificación actual
  }

  handleMouseOver(index: number) {
    this.hoveredIndex.set(index); // actualiza el índice de la estrella hoverada
  }
  
  handleMouseLeave() {
    this.hoveredIndex.set(-1); // restablece el índice de la estrella hoverada
  }
}

function gettingStars(value: number): boolean[] {
  return Array(value).fill(false);
}