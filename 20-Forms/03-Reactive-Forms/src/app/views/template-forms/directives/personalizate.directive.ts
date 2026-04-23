import { Directive, input, InputSignal } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector: '[personalizateDirective]',
    providers: [
        // REGISTRAR NUESTRA DIRECTIVA COMO UN VALIDADOR PERSONALIZADO
        {provide: NG_VALIDATORS, useExisting: PersonalizateDirective, multi: true}
    ]
})

export class PersonalizateDirective implements Validator{
    personalizateDirective: InputSignal<string | string[]> = input.required<string | string[]>();

    validate(control: AbstractControl<string>): ValidationErrors | null {
        const bannedWords: string[] = Array.isArray(this.personalizateDirective()) 
            ? this.personalizateDirective() as string[] 
            : [this.personalizateDirective() as string];

        const controlValue = control.value?.toLowerCase();
        const foundBannedWord = bannedWords.find(bannedWord => controlValue?.includes(bannedWord.toLowerCase()));

        return foundBannedWord ? { bannedWordValidator: foundBannedWord } : null;
    }
}