import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-trending-page',
  standalone: true,
  imports: [],
  templateUrl: './trending-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendingPageComponent { }
