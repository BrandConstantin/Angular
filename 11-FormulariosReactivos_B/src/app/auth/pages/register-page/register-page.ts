import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.html',
})
export class RegisterPageComponent { 
  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  myRegisterForm: FormGroup = this.fb.group({
    //name: ['', Validators.required, Validators.pattern(FormUtils.namePattern)], // se puede usar FormUtils directamente
    name: ['', Validators.required, Validators.pattern(this.formUtils.namePattern)],
    email: ['', [Validators.required, Validators.email, Validators.pattern(this.formUtils.emailPattern)], [FormUtils.checkingServerResponse]],
    username: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.formUtils.notOnlySpacesPattern), FormUtils.notStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  },
  {
    validators: [FormUtils.isFieldOneEqualFieldTwo('password', 'confirmPassword')]
  })

  onSubmit(){
    this.myRegisterForm.markAllAsTouched();
    console.log(this.myRegisterForm.value);
  }
}
