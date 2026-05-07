import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { catchError, map, Observable, of } from "rxjs";
import { GetEmailService } from "../../../services/get-email.service";

export function checkEmailAsyncValidator(service: GetEmailService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return service.getEmail().pipe(
      map((emails: string[]) => {
        const emailExists = emails.find((email) => email === control?.value);
        return emailExists ? { isAnExistingEmail: true } : null;        
      }),
      catchError((error) => {
        console.error('Error in async validator:', error);
        return of(error); // En caso de error, no marcar el control como inválido
      })
    );
  };
}