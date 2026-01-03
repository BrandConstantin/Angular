import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@shared/title/title';

@Component({
  selector: 'app-view-transition',
  standalone: true,
  imports: [CommonModule, Title],
  template: `
  <app-title title="View transition"/>

  <section class="flex justify-start">
    <img srcset="https://picsum.photos/id/237/200/300"
      alt="Picsum" width="200" height="300" />

    <div class="bg-blue-400 w-56 h-56"></div>  
  </section>
  `,
})
export default class ViewTransition { }
