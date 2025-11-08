import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-numbers-page',
  imports: [DecimalPipe, CurrencyPipe, PercentPipe],
  templateUrl: './numbers-page.html',
})
export class NumbersPage {
  totalSells = signal(2_567_789.5567);
  percent = signal(0.4856);
}
