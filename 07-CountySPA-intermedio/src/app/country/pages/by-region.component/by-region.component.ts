import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list.component/country-list.component';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { Region } from '../../interfaces/region.interface';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(param: string | null): param is Region {
  param = param?.toLowerCase().replace(/^\w/, c => c.toUpperCase()) ?? null;
  const validRegions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  return param !== null && validRegions.includes(param as Region);
}

@Component({
  selector: 'by-region.component',
  imports: [CountryListComponent],
  templateUrl: './by-region.component.html',
})
export class ByRegionComponent { 
  public regionOptions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

    // tomar la información de la ruta activa
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';

  selectedRegion = linkedSignal<Region | ''>(() => validateQueryParam(this.queryParam) ? this.queryParam : '');
  // click en el botón de región
  /*selectRegion(region: Region) {
    this.selectedRegion.set(region);
  }*/

  countryService = inject(CountryService);

  countryResource = rxResource({
    params: () => ({ region: this.selectedRegion() }),
    stream: ({ params }) => {
      if (!params.region) return of([]);

      this.router.navigate(['/country/by-region'], {
        queryParams: { 
          region: params.region,
          saludo: 'hola' 
        },
      });

      return this.countryService.searchByRegion(params.region);
    },
  });
}

