import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.html',
})
export class BasicPage {
  // forma muy tediosa
  /*
  myForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(0),
    inStorage: new FormControl(0)
  })
  */

  // con formBuilder
  private fb = inject(FormBuilder);
  myForm: FormGroup = this.fb.group({
    //name: ['', /** validadores sincronos */, /** validadores asincronos */],
    name: ['', [Validators.required, Validators.minLength(3)], []],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  })

  isValidField(fieldName: string): boolean | null{
    return !!this.myForm.controls[fieldName].errors;
  }

  getFieldError(fieldName: string): string | null {
    if(!this.myForm.controls[fieldName]) return null;

    const errors = this.myForm.controls[fieldName].errors ?? {};

    for(const hey of Object.keys(errors)){
      switch(hey){
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres`;
        
        case 'min':
          return `Vallor mínimo de ${errors['min'].min}`;
      }
    }

    return null;
  }
}
