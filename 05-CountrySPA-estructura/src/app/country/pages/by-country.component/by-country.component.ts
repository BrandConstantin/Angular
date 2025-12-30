import { Component } from '@angular/core';
import { CountrySearchInputComponent } from '../../components/search-input.component/search-input.component';
import { CountryListComponent } from '../../components/country-list.component/country-list.component';

@Component({
  selector: 'by-country.component',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country.component.html',
})
export class ByCountryComponent { }
