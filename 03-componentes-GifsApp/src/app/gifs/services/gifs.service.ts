import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import type { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';


@Injectable({providedIn: 'root'})
export class GifService {
  private readonly http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  // chache
  searchHistory = signal<Record<string, Gif[]>>({});
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));


  constructor(){
    this.loadTrendingGifs();
    console.log("Servicio load creado")
  }

  loadTrendingGifs(){
    this.http
      .get<GiphyResponse>(`${environment.urlGiphy}/gifs/trending`, {
        params: {
          api_key: environment.apiKeyGiphy,
          limit: 20
        }
      })
      .subscribe((resp) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        this.trendingGifs.set(gifs);
        this.trendingGifsLoading.set(false);
        console.log({gifs})
      })
  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http
      .get<GiphyResponse>(`${environment.urlGiphy}/gifs/search`, {
        params: {
          api_key: environment.apiKeyGiphy,
          limit: 20,
          q: query
        }
      }).pipe(
        //tap(resp => console.log({tap: resp}))
        map(({data}) => data),
        map((items) => GifMapper.mapGiphyItemsToGifArray(items)),

        // historial
        tap(items => {
          this.searchHistory.update(hitory => ({
            ... hitory,
            [query.toLowerCase()]: items,
          }))
        })
      );
      /*
      .subscribe((resp) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        console.log({search: gifs})
      })
      */
  }

  // mostrar historial búsqueda
  getHistoryGifs(query: string): Gif[]{
    return this.searchHistory()[query] ?? [];
  }
}
