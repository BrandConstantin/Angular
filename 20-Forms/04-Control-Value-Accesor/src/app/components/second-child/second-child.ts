import { Component } from '@angular/core';
import { CHILDREN_COMPONENT, ChildrenInterface } from '../../views/bonus/tokens/my-token';

@Component({
  selector: 'app-second-child',
  imports: [],
  templateUrl: './second-child.html',
  styleUrl: './second-child.css',
    providers: [
      {provide: CHILDREN_COMPONENT, useExisting: SecondChild}
    ]
})
export class SecondChild implements ChildrenInterface{
  childrenName = 'SecondChield';
}
