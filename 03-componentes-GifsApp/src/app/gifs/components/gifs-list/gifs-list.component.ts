import { Component } from '@angular/core';
import { GifsListItemComponent } from './gifs-list-item/gifs-list-item.component';

@Component({
  selector: 'gifs-list',
  standalone: true,
  imports: [GifsListItemComponent],
  templateUrl: './gifs-list.component.html'
})
export class GifsListComponent { }
