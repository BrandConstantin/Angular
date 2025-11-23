import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Country } from "./interfaces/country.interface";

@Injectable({providedIn: 'root'})
export class CountryService{
    private baseUrl = 'https://restcountries.com/v3.1';

    http = inject(HttpClient);

    private _regions = ['Africa', 'America', 'Asia', 'Europa', 'Oceania'];

    get regions(): string[]{
        return [...this._regions];
    }

    getCountriesByRegions(region: string): Observable<Country[]>{
        if(!region) return of([]);

        const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
        return this.http.get<Country[]>(url);
    }

    getCountryByAlphaCode(alphaCode: string): Observable<Country>{
        const url = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;
        return this.http.get<Country>(url);
    }

    getCountryBordersByCodes(borders: string[]){
        
    }
}