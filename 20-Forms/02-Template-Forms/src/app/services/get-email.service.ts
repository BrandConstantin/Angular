import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { delay, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GetEmailService {
    private _http = inject(HttpClient);
    
    getEmail(): Observable<string[]> {
        return this._http.get<string[]>('assets/json/email-data.json').pipe(
            delay(2000)
        );
    }
}