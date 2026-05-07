import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, delay, Observable, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GetEmailService {
    private _http = inject(HttpClient);
    
    getEmail(): Observable<string[]> {
        return this._http.get<string[]>('assets/json/email-data.json')
            .pipe(
                catchError((error) => {
                    console.error('Error fetching email data:', error);
                    return throwError(() => ({error: {status: 0, type: 'error', message: 'Unable to fetch email data. Please try again later.'}}));
                }),
                delay(2000)
            );
    }
}