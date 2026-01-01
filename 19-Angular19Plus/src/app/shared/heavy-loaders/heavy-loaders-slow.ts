import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heavy-loaders-slow',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section [ngClass]="['w-full h-[600px]', cssClass]"> View Heavy Loaders Slow Page </section>
  `
})
export class HeavyLoadersSlow { 
  @Input({required: true}) cssClass!: string;

  constructor(){
    const start = Date.now();
    // no se puede hacer nada en la aplicación hasta pasado este tiempo
    while(Date.now() - start < 3000) {}

    console.log("Cargado");
  }
}
