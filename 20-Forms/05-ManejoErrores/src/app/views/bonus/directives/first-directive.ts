import { Directive } from "@angular/core";
import { MY_VALIDATOR, MyValidatorInterface } from "../tokens/my-token";

@Directive({
    selector: '[FirstValidator]',
    providers: [
        {provide: MY_VALIDATOR, useExisting: FirstValidator}
    ]
})

export class FirstValidator implements MyValidatorInterface {
    validate(){
        console.log('FirstValidator');
    }
}