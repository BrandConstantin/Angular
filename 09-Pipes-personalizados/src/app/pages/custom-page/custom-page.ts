import { Component, signal } from '@angular/core';
import { ToggleCasePipe } from '../../pipes/toggle-case.pipe';
import { heroes } from '../../data/hero.data';
import { CanFlyPipe } from '../../pipes/can-fly.pipe';
import { HeroColorPipe } from '../../pipes/hero-color.pipe';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { HeroTextColorPipe } from '../../pipes/hero-text-color.pipe';
import { heroCreatorPipe } from '../../pipes/hero-creator.pipe';
import { HeroSortByPipe } from '../../pipes/hero-sort-by.pipe';
import { Hero } from '../../interfaces/hero.interface';
import { HeroFilterPipe } from '../../pipes/hero-filter.pipe';

@Component({
  selector: 'app-custom-page',
  imports: [ToggleCasePipe, CanFlyPipe, HeroColorPipe, TitleCasePipe, HeroTextColorPipe, UpperCasePipe, heroCreatorPipe,
            HeroSortByPipe, HeroFilterPipe],
  templateUrl: './custom-page.html',
})
export class CustomPage { 
  name = signal('Brand Constantin');

  upperCase = signal(true);

  heroes = signal(heroes)

  sortBy = signal<keyof Hero | null>(null);

  searchQuery = signal('');
}
