import { Component } from '@angular/core';
import { CHILDREN_COMPONENT, ChildrenInterface } from '../../views/bonus/tokens/my-token';

@Component({
  selector: 'app-first-child',
  imports: [],
  templateUrl: './first-child.html',
  styleUrl: './first-child.css',
  providers: [
    {provide: CHILDREN_COMPONENT, useExisting: FirstChild}
  ]
})
export class FirstChild implements ChildrenInterface{
  childrenName = 'FirstChield';
}
