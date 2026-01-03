import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [CommonModule],
  template: `<h1 class="text-3xl mb-5">{{ title }} </h1>`,
})
export class Title { 
  @Input({required: true}) title!: string;
  @Input({transform: booleanAttribute}) withShadow: boolean = false;
}
