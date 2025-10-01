import { Component, inject, signal } from '@angular/core';
import { GifService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [],
  templateUrl: './search-page.component.html'
})
export default class SearchPageComponent {
  gifsSearch = inject(GifService)
  gifs = signal<Gif[]>([])

  onSearch(query: string){
    this.gifsSearch.searchGifs(query)
      .subscribe((resp) => {
        console.log(resp);
        this.gifs.set(resp)
      });
  }
}
