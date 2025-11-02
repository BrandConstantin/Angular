import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

import { CountrySearchInputComponent } from '../../components/search-input.component/search-input.component';
import { CountryListComponent } from '../../components/country-list.component/country-list.component';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);

  /*
  isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<Country[]>([]);

  onSearchCapital( query: string ) {
    if(this.isLoading()) return;

    this.isLoading.set(true);
    this.isError.set(null);

    this.countryService.searchByCapital( query ).subscribe({
      next: (resp) =>{
      this.isLoading.set(false);
      this.countries.set(resp);

      console.log(resp);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.isError.set(err.message);
        this.countries.set([]);
      }
    });
  }
  

  // en la version 20 y tiene problemas con resources, han cambiado "request" por "params"
  countryResources = resource({
    params: () => ({ query: this.query() }),
    loader: async ({ params }) => {
      if (!params.query) return []
      return await firstValueFrom(
        this.countryService.searchByCapital(params.query)
      )
    }
  })
  */

  // Usando rxResource, ha cambiado de request por params y loader por stream a partir de Angular 20
  query = signal('');

  countryResource = rxResource({
    params: this.query,
    stream: ({ params }) => {
      if (!params) return of([])
      return this.countryService.searchByCapital(params)
    },
  });
}
