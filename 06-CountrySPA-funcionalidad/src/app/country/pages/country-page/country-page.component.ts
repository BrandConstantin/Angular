import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from '../../../shared/components/not-found/not-found.component';
import { CountryInformationComponent } from './country-information/country-information.component';


@Component({
  selector: 'app-country-page.component',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  //countryCode = inject(ActivatedRoute).snapshot.paramMap.get('code') || ''; // coincide con la ruta definida en country.routes.ts 'by/:code'
  // alternativa:
  countryCode = inject(ActivatedRoute).snapshot.params['code'] || '';
  countryService = inject(CountryService);

  countryResource = rxResource({
    params: () => this.countryCode,
    stream: ({ params }) => { 
      console.log('Parametro recibido: ', params);
      // Aquí se podría llamar a un servicio para obtener los datos del país por su código
      return this.countryService.searchCountryByAlpha(params)
    },
  });
}
