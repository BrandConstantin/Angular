import { Component, contentChild, inject, Inject, OnInit, SkipSelf } from '@angular/core';
import { FirstService } from '../../services/first.service';
import { CAR_BRAND, CHILDREN_COMPONENT, MY_TOKEN, MY_VALIDATOR, MyValidatorInterface } from '../../views/bonus/tokens/my-token';



@Component({
  selector: 'app-container',
  imports: [],
  templateUrl: './container.html',
  styleUrl: './container.css',
  providers: [
    //firstService // la forma antigua
    {provide: MY_TOKEN, useClass: FirstService}, // la forma nueva
    {provide: CAR_BRAND, useValue: ['Seat', 'Skoda', 'VW']}
  ]
})
export class Container implements OnInit{
  // la forma antigua, angular 14 o anterior
  /*
  private _firstService = inject(MY_TOKEN);
  constructor(){ }
  */

  carBrands = inject(CAR_BRAND, {skipSelf: true});

  private _myValidators: MyValidatorInterface[] | null = inject(MY_VALIDATOR, {optional: true, self: true});

  // la forma nueva
  constructor(@Inject(MY_TOKEN) private _firstService: FirstService) {}

  child = contentChild(CHILDREN_COMPONENT);

  ngOnInit(): void {
    console.log(this._firstService.message);
    console.log("Chield ... ", this.child()?.childrenName);

    this._myValidators?.forEach((validator) =>{
      validator.validate();
    })
  }
}
