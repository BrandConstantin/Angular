import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  // Inyección del HttpClient  
  private http = inject(HttpClient);

  // cache de países buscados
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<string, Country[]>();

  searchByCapital( query: string ):Observable<Country[]> {
    query = query.toLowerCase();
    //console.log('service - URL', `API_URL/capital/${ query }`);

    // para retornar un observable vacío
    //console.log(`Emitiendo valor : ${query}`);
    //return of([]);

    if( this.queryCacheCapital.has( query ) ) {
      return of( this.queryCacheCapital.get( query )! );
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      delay(1500),
      tap( countries => this.queryCacheCapital.set( query, countries ) ),
      catchError((error) => {
        console.log('Error fetching ', error);

        return throwError(
          () => new Error(`No se pudo obtener países por capital con esa query ${query}`)
        );
      })
    );
  }

  searchByCountry( query: string ):Observable<Country[]> {
    query = query.toLowerCase();

    if( this.queryCacheCountry.has( query ) ) {
      return of( this.queryCacheCountry.get( query ) ?? [] );
    }
    
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      delay(1500),
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap( countries => this.queryCacheCountry.set( query, countries ) ),
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

  searchByRegion( region: string ):Observable<Country[]> {
    region = region.toLowerCase();  

    if( this.queryCacheRegion.has( region ) ) {
      return of( this.queryCacheRegion.get( region )! );
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap( countries => this.queryCacheRegion.set( region, countries ) ),
      catchError((error) => {
        console.log('Error fetching ', error);
        return throwError(
          () => new Error(`No se pudo obtener países por región con esa query ${region}`)
        );
      })
      
    );
  }

}
