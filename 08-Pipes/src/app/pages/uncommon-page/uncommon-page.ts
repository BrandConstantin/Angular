import { Component, signal } from '@angular/core';
import { Card } from '../../components/card/card';
import { I18nPluralPipe, I18nSelectPipe } from '@angular/common';

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
  imports: [Card, I18nSelectPipe, I18nPluralPipe],
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
}
