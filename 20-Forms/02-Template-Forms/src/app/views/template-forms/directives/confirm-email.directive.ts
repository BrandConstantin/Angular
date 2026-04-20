import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector: '[confirmEmail]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: ConfirmEmailDirective,
        multi: true
    }]
})
export class ConfirmEmailDirective implements Validator {
    validate(formGroup: AbstractControl): ValidationErrors | null {
        const email = formGroup.get('email');
        const confirmEmail = formGroup.get('confirmEmail')?.value;

        return email?.value === confirmEmail?.value ? null : { noMatch: true };
    }
}