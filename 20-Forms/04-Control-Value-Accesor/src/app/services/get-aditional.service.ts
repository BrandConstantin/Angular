import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { delay, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetAditionalService {
    private http = inject(HttpClient);

    getAditionalSkills(): Observable<string[]> {
        return this.http.get<string[]>('/assets/json/additional-skills.json')
        .pipe(delay(1500));
    }
}