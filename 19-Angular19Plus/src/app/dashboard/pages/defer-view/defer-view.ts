import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeavyLoadersSlow } from '@shared/heavy-loaders/heavy-loaders-slow';
import { Title } from '@shared/title/title';

@Component({
  selector: 'app-defer-view',
  standalone: true,
  imports: [CommonModule, HeavyLoadersSlow, Title],
  templateUrl: './defer-view.html',
  styles: ``,
})
export default class DeferView { }
