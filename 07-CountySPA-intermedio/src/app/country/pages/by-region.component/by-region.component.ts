import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list.component/country-list.component';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { Region } from '../../interfaces/region.interface';

@Component({
  selector: 'by-region.component',
  imports: [CountryListComponent],
  templateUrl: './by-region.component.html',
})
export class ByRegionComponent { 
  public regionOptions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  selectedRegion = signal<Region | ''>('');
  // click en el botón de región
  /*selectRegion(region: Region) {
    this.selectedRegion.set(region);
  }*/

  countryService = inject(CountryService);

  countryResource = rxResource({
    params: () => ({ region: this.selectedRegion() }),
    stream: ({ params }) => {
      if (!params.region) return of([]);
      return this.countryService.searchByRegion(params.region);
    },
  });
}

