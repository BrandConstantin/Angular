import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function bannedWords(bannedWord: string | string[]): ValidatorFn {
    return function(control: AbstractControl<string>): ValidationErrors | null {
        const bannedWordsList: string[] = Array.isArray(bannedWord) ? bannedWord : [bannedWord]; // Asegurarse de que sea un array
        const controlValue = control.value?.toLowerCase();
        
        const foundBannedWord = bannedWordsList.find((word) => controlValue.includes(word.toLowerCase())); // Verificar si el valor del control coincide con alguna palabra prohibida

        return foundBannedWord 
            ? { bannedWordValidator: foundBannedWord } // Retorna un error si se encuentra una palabra prohibida, de lo contrario retorna null
            : null; // Retorna null si no se encuentra ninguna palabra prohibida
    }
}