import { Directive } from "@angular/core";
import { MY_VALIDATOR, MyValidatorInterface } from "../tokens/my-token";

@Directive({
    selector: '[SecondValidator]',
    providers: [
        {provide: MY_VALIDATOR, useExisting: SecondValidator, multi: true} // el multi para que el compoenente reciba un array de validadores
    ]
})

export class SecondValidator implements MyValidatorInterface {
    validate(){
        console.log('SecondValidator');
    }
}