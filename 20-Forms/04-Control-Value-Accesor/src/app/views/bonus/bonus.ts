import { Component } from '@angular/core';
import { Container } from '../../components/container/container';
import { FirstChild } from '../../components/first-child/first-child';
import { SecondChild } from '../../components/second-child/second-child';
import { FirstValidator } from './directives/first-directive';
import { SecondValidator } from './directives/second-directive';

@Component({
  selector: 'app-bonus',
  imports: [Container, FirstValidator, SecondValidator],
  templateUrl: './bonus.html',
  styleUrl: './bonus.css',
})
export class Bonus {

}
