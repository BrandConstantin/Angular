import { Component, signal } from "@angular/core";

@Component({
  standalone: true,
  selector: 'app-counter',
  template: `<h3>Counter</h3>
    <h4>Counter Signal: {{counterSignal()}}</h4>
    <p>Un curso de {{counter}}</p>
    <button (click)="this.increaseOrDecreaseBy(1)">+1</button>
    <button (click)="this.resetCounter()">Reset</button>
    <button (click)="this.increaseOrDecreaseBy(-1)">-1</button>
    `
})
export class CounterComponent{
  public counter: number = 10;
  counterSignal = signal(10);

  // crear método
  increaseOrDecreaseBy(value: number): void{
    this.counter += value;
    this.counterSignal.update(currentValue => currentValue + value);
  }
  resetCounter():void{
    this.counter = 10;
    this.counterSignal.set(10);
  }
}
