import { Directive, inject } from "@angular/core";
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from "@angular/forms";
import { map, Observable, tap } from "rxjs";
import { GetEmailService } from "../../../services/get-email.service";

@Directive({
    selector: '[checkEmail]',
    providers: [
        {
            provide: NG_ASYNC_VALIDATORS,
            useExisting: CheckEmailDirective,
            multi: true
        }
    ]
})
export class CheckEmailDirective implements AsyncValidator {
    private _getEmailService = inject(GetEmailService);

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        return this._getEmailService.getEmail().pipe(
            tap(console.log),
            map((emails: string[]) => {
                return emails.includes(control?.value) ? { emailExists: true } : null;
            })
        );
    }
}