import { Component, computed, input, model, OnInit, signal } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'star-rating',
  imports: [],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.css',
  host: {
    '[class.disabled]': 'disabled()',
    'mouseleave': 'handleMouseLeave()'
  },
  providers: [
    {provide: 'NG_VALUE_ACCESSOR',
      useExisting: StarRating,
      multi: true
    }
  ]
})
export class StarRating implements OnInit, ControlValueAccessor {
  stars = input.required<boolean[], number>({transform: gettingStars}); // input para recibir el número de estrellas
  rating = model<number | null>(0); // modelo para almacenar la calificación actual
  hoveredIndex = signal<number>(-1); // índice de la estrella actualmente hoverada
  isDisabled = input<boolean>(false, {alias: 'disabled'}); // input para deshabilitar la calificación
  isControlDisabled = signal<boolean>(false); // señal para controlar el estado de deshabilitado

  disabled = computed(() => this.isDisabled() || this.isControlDisabled()); // estado combinado de deshabilitado

  ngOnInit(): void {
    //this.stars.set(Array(this.starCount()).fill(false));
  }

  onChanges:(value: number | null) => void = () => {};
  onTouched: () => void = () => {};

  rate(rating: number) {
    if(this.disabled()) return; // si el componente está deshabilitado, no se permite calificar
    this.rating.set(rating); // actualiza la calificación actual
    this.onChanges(rating);
    this.onTouched(); // notifica al formulario que la calificación ha sido tocada
  }

  handleMouseOver(index: number) {
    this.hoveredIndex.set(index); // actualiza el índice de la estrella hoverada
  }
  
  handleMouseLeave() {
    this.hoveredIndex.set(-1); // restablece el índice de la estrella hoverada
  }

  writeValue(value: number | null): void {
    this.rating.set(value ?? 0); // actualiza la calificación con el valor recibido del formulario
  }
  registerOnChange(fn: any): void {
    this.onChanges = fn; // registra la función de cambio para notificar al formulario cuando la calificación cambia
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn; // registra la función de toque para notificar al formulario cuando la calificación es tocada
  }
  setDisabledState?(isDisabled: boolean): void { // método opcional para manejar el estado de deshabilitado
    this.isControlDisabled.set(isDisabled); // actualiza la señal de estado de deshabilitado
  }
}

function gettingStars(value: number): boolean[] {
  return Array(value).fill(false);
}