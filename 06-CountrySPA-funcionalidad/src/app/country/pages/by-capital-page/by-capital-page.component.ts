import { Component, inject } from '@angular/core';
import { CountrySearchInputComponent } from '../../components/search-input.component/search-input.component';
import { CountryListComponent } from '../../components/country-list.component/country-list.component';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  // Inyección del servicio  
  countryService = inject(CountryService);

  onSearchCapital( query: string ) {
    this.countryService.searchByCapital( query ).subscribe( response => {
      console.log(response);
    });
  }
}
