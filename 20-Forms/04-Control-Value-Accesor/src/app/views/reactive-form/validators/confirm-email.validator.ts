import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"

export function confirmEmailValidator(email: string, confirmEmail: string): ValidatorFn {
    return function(formGroup: AbstractControl): ValidationErrors | null {
        const emailControl = formGroup.get(email);
        const confirmEmailControl = formGroup.get(confirmEmail);

        let error: ValidationErrors | null = null;

        if(emailControl?.value === ''){
            error = { emailIsRequired: true };
        } else {
            error = emailControl?.value === confirmEmailControl?.value 
                ? null 
                : { noMatch: true };
        }

        if(emailControl?.dirty && confirmEmailControl?.pristine) {
            confirmEmailControl.markAsDirty();
        }

        confirmEmailControl?.setErrors(error);

        return error;
    }
}