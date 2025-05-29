import { Component, Input, input } from '@angular/core';
import type { Gif } from 'src/app/gifs/interfaces/gif.interface';


@Component({
  selector: 'gifs-list-item',
  standalone: true,
  imports: [],
  templateUrl: './gifs-list-item.component.html'
})
export class GifsListItemComponent {
  //imageUrl = input.required<Gif[]>();

  @Input() imageUrl!: string | string[];
  test: string = '';
  ngOnInit() {
    if(typeof this.imageUrl === 'string') {
        this.test = this.imageUrl;
    }
  }
}
