import { Component, signal } from '@angular/core';
import { Card } from '../../components/card/card';
import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { interval, map, tap } from 'rxjs';

const client1 = {
  name: 'Constantin',
  gender: 'male',
  age: 38,
  address: 'Málaga, Spain'
}

const client2 = {
  name: 'Olivia',
  gender: 'female',
  age: 38,
  address: 'Málaga, Spain'
}

@Component({
  selector: 'app-uncommon-page',
  imports: [Card, I18nSelectPipe, I18nPluralPipe, SlicePipe, UpperCasePipe, JsonPipe, KeyValuePipe, TitleCasePipe, AsyncPipe],
  templateUrl: './uncommon-page.html',
})
export default class UncommonPage { 
  // i18n select
  client = signal(client1);

  invitationMap ={
    male: 'invitado',
    female: 'invitada'
  }

  changeClient(){
    if(this.client() === client1){
      this.client.set(client2);
      return;
    }

    this.client.set(client1);
  }

  // i18n plural
  clientsMap = signal({
    '=0': 'no tenemos clientes esperando',
    '=1': 'tenemos un cliente esperano',
    '=2': 'tenemos 2 clientes esperando',
    other: 'tenemos # clientes esperando'
  })

  clients = signal([
    'María',
    'Pedro',
    'Natalia',
    'Andrea',
    'Carlos',
    'Elisabeth'
  ]);

  deleteClient(){
    this.clients.update((prev) => prev.slice(1));
  }

  // keyValue pipe
  profile = {
    name: 'Jesús',
    gender: 'none',
    age: 56,
    address: 'Ottawa, Canada'
  }

  // async pipe
  promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() =>{
      //reject('Tenemos un error en la data')
      resolve('Tenemos data en la promesa')
      console.log('Promesa finalizada');
    }, 2500);
  });

  myObservableTimer = interval(2000).pipe(
    map((value) => value + 1),
    tap((value) => console.log('tap: ', value))
  );
}
