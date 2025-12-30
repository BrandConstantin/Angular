import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountrySearchInputComponent } from '../../components/search-input.component/search-input.component';
import { CountryListComponent } from '../../components/country-list.component/country-list.component';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'by-country.component',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country.component.html',
})
export class ByCountryComponent {
  countryService = inject(CountryService);
  // tomar la información de la ruta activa
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('pais') ?? '';
  pais = linkedSignal(() => this.queryParam);

  countryResource = rxResource({
    params: () => ({ query: this.pais() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);

      this.router.navigate(['/country/by-country'], {
        queryParams: { 
          query: params,
          params: "pais" 
        },
      });

      return this.countryService.searchByCountry(params.query);
    },
  });
}
