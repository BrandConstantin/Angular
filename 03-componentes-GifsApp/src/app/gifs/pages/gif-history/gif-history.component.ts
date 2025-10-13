import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-gif-history',
  imports: [],
  templateUrl: './gif-history.component.html'
})

export default class gifHistoryComponent{
    // una forma de hacer
    /*
    query = inject(ActivatedRoute).params.subscribe((params) => {
        console.log(params.queryHistory);
    })
    */

    // otra forma más simplificada
    query = toSignal(
        inject(ActivatedRoute).params.pipe(map(params => params['query']))
    )
}