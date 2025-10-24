import { Component } from '@angular/core';
import { CountrySearchInputComponent } from '../../components/search-input.component/search-input.component';
import { CountryListComponent } from '../../components/country-list.component/country-list.component';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  onSearchCapital( capital: string ) {
    console.log({ capital });
  }
}
