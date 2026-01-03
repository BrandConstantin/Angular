import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { User, UserResponse, UsersResponse } from "@interfaces/req-response";
import { delay, map } from "rxjs";

interface State{
    users: User[],
    loading: boolean
}

@Injectable({
    providedIn: 'root'
})
export class UsersService{
    private http = inject(HttpClient);

    #state = signal<State>({ // # es igual a private pero más estricto
        loading: true,
        users: []
    })

    // al ser privado necesitamos una señal computada
    public users = computed(() => this.#state().users);

    constructor(){ 
        this.http.get<UsersResponse>('https://reqres.in/api/users')
        .pipe( delay(1500) )
        .subscribe( res => {

            this.#state.set({
            loading: false,
            users: res.data,
            })

        });
        console.log("Cargando data ...");
    }

    getUserById( id: string ) {
        return this.http.get<UserResponse>(`https://reqres.in/api/users/${ id }`)
        .pipe(
            delay(1500),
            map( resp => resp.data )
        )

    }
}