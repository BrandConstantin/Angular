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
        const emailControl = formGroup.get('email');
        const confirmEmailControl = formGroup.get('confirm-email')?.value;

        const error: ValidationErrors | null = emailControl?.value === confirmEmailControl ? null : { noMatch: true };
        formGroup.get('confirm-email')?.setErrors(error);

        return error;
    }
}