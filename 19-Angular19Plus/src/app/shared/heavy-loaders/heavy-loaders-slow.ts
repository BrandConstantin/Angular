import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-heavy-loaders-slow',
  standalone: true,
  imports: [CommonModule],
    template: `<h1>View Heavy Loaders Slow Page</h1>`,
  styles: ``,
})
export class HeavyLoadersSlow { }
