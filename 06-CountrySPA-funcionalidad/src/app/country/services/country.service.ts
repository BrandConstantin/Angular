import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { map, Observable, catchError, throwError, delay } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  // Inyección del HttpClient  
  private http = inject(HttpClient);

  searchByCapital( query: string ):Observable<Country[]> {
    query = query.toLocaleUpperCase();
    //console.log('service - URL', `API_URL/capital/${ query }`);

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      delay(1500),
      catchError((error) => {
        console.log('Error fetching ', error);

        return throwError(
          () => new Error(`No se pudo obtener países por capital con esa query ${query}`)
        );
      })
    );
  }

  searchByCountry( query: string ):Observable<Country[]> {
    query = query.toLocaleUpperCase();
    
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      delay(1500),
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      catchError((error) => {
        console.log('Error fetching ', error);

        return throwError(
          () => new Error(`No se pudo obtener países por su nombre con esa query ${query}`)
        );
      })
    );
  }

  searchCountryByAlpha( code: string ):Observable<Country | null> {
    //code = code.toLocaleUpperCase();
    
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      map((countries) => countries.at(0) ?? null),


      //map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      //map((countries) => countries.at(0)),
      catchError((error) => {
        console.log('Error fetching ', error);

        return throwError(
          () => new Error(`No se pudo obtener países con ese código ${code}`)
        );
      })
    );
  }

}
