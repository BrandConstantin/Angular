import { computed, inject, Injectable, signal } from "@angular/core";
import { User } from "../interfaces/user.interface";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.development";
import { AuthResponse } from "../interfaces/auth-response.interface";
import { catchError, map, Observable, of, tap } from "rxjs";
import { rxResource } from "@angular/core/rxjs-interop";

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _authStatus = signal<AuthStatus>('checking');
    private _user = signal<User | null>(null);
    private _token = signal<string | null>(null);
    private http = inject(HttpClient);

    checkStatusResource = rxResource({
        stream: () => this.checkAuthStatus(),
    });

    authStatus = computed<AuthStatus>(() => {
        if(this._authStatus() === 'checking') return 'checking';

        if(this._user() && this._token()) {
            return 'authenticated';
        }

        return 'not-authenticated';
    });

    user = computed<User | null>(() => this._user());
    token = computed<string | null>(() => this._token());

    login(email: string, password: string): Observable<boolean> {
    return this.http.post<AuthResponse>(`${baseUrl}/auth/login`, { 
        email: email, password: password })
        .pipe(tap(response => {
            this._authStatus.set('authenticated');
            this._user.set(response.user);
            this._token.set(response.token);

            localStorage.setItem('token', response.token);
        }), 
        map(() => true),
        catchError((error: any) => {
            this._authStatus.set('not-authenticated');
            this._user.set(null);
            this._token.set(null);
            return of(false);
        }));
    }

    checkAuthStatus(): Observable<boolean> {
        const token = localStorage.getItem('token');
        if(!token) {
            this._authStatus.set('not-authenticated');
            return of(false);
        }

        return this.http.get<AuthResponse>(`${baseUrl}/auth/check-status`, { 
            headers: { 'Authorization': `Bearer ${token}` }})
         .pipe(tap(response => {
            this._authStatus.set('authenticated');
            this._user.set(response.user);
            this._token.set(response.token);

            localStorage.setItem('token', response.token);
        }), 
        map(() => true),
        catchError((error: any) => {
            this._authStatus.set('not-authenticated');
            this._user.set(null);
            this._token.set(null);
            return of(false);
        }));
    }
}