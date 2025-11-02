import { Component, inject, signal } from '@angular/core';
import { CountrySearchInputComponent } from '../../components/search-input.component/search-input.component';
import { CountryListComponent } from '../../components/country-list.component/country-list.component';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'by-country.component',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country.component.html',
})
export class ByCountryComponent {
  countryService = inject(CountryService);
  query = signal('');

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);

      return this.countryService.searchByCountry(params.query);
    },
  });
}
