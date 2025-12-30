import { Component } from '@angular/core';
import { CountryListComponent } from '../../components/country-list.component/country-list.component';

@Component({
  selector: 'by-region.component',
  imports: [CountryListComponent],
  templateUrl: './by-region.component.html',
})
export class ByRegionComponent { }
