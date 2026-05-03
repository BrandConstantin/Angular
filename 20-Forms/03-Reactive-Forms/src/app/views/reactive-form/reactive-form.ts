import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { GetAditionalService } from '../../services/get-aditional.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { bannedWords } from './validators/banned-words.validator';
import { confirmEmailValidator } from './validators/confirm-email.validator';
import { checkEmailAsyncValidator } from './validators/check-email-async.validator';
import { GetEmailService } from '../../services/get-email.service';

@Component({
  selector: 'app-reactive-form',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.css',
})
export class ReactiveForm {
  private _fb = inject(FormBuilder);
  private _getEmailService = inject(GetEmailService);
  additionalSkillsService = inject(GetAditionalService);

  verifyAccountWithControl = new FormControl('email');

  additionalSkills = toSignal(
    this.additionalSkillsService.getAditionalSkills()
      .pipe(tap((additionalSkills: string[]) => {
        additionalSkills.forEach((skill) => {
          this.form.controls.additionalSkills.addControl(skill, this._fb.nonNullable.control(false));
        });
      }),
      tap(() => { this.initialFormValue = this.form.value; }) 
    )
  );

  form = this._fb.group({
    personalInfo: this._fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]], // con FormBuilder
      //lastName: new FormControl('', [Validators.required, Validators.minLength(3)]), // de la forma tradicional
      lastName: ['', [Validators.required, Validators.minLength(3), bannedWords(['admin', 'root'])]], // con FormBuilder y un validador asíncrono personalizado
    }),
    email: this._fb.group({
      email: ['', [Validators.required, Validators.email], [checkEmailAsyncValidator(this._getEmailService)]],
      confirmEmail: ['', [Validators.required]],
    }, { validators: [confirmEmailValidator('email', 'confirmEmail')] }),
    employmentStatus: this._fb.nonNullable.control('employee', Validators.required),
    //employmentStatus: this._fb.control('employee', {nonNullable: true, validators: Validators.required}), // otra forma de marcar el control como nonNullable
    //employmentStatus: new FormControl('employee', {nonNullable: true, validators: Validators.required}), // de la forma tradicional
    position: this._fb.control('', Validators.required),
    //additionalSkills: new FormGroup<{[key: string]: FormControl<boolean>}>({}),
    additionalSkills: this._fb.record<boolean>({}),
    resumeLink: ['', [Validators.required, Validators.pattern(/^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/)]],
    references: this._fb.array([
      this._fb.group({
        name: [''],
        description: [''],
      }),
    ]),
    phoneNumber: '' // sin validación, solo formateo
  });

  dynamicValidators: ValidatorFn[] = [Validators.required, Validators.minLength(9)];

  constructor() {
    setTimeout(() => { // marcar checkbox
      this.form.controls.additionalSkills.controls['Angular'].setValue(true);
      this.form.controls.additionalSkills.controls['MongoDB'].setValue(true);
    }, 2000);

    this.verifyAccountWithControl.valueChanges.subscribe((value) => {
      console.log('Value changed: ', value);

      if(value === 'email') {
        //this.form.controls.phoneNumber.removeValidators(this.dynamicValidators); // remover validadores específicados
        this.form.controls.phoneNumber.clearValidators(); // remover todos los validadores, sin importar cuáles sean
      } else {
        //this.form.controls.phoneNumber.addValidators(this.dynamicValidators); // agregar validadores sin importar si ya existen o no, lo que puede causar validadores duplicados
        this.form.controls.phoneNumber.setValidators(this.dynamicValidators); // agregar validadores, pero reemplazando los existentes, lo que evita validadores duplicados
      }

      this.form.controls.phoneNumber.updateValueAndValidity();
    });
  }

  addReference(name = '', description = '') {
    this.form.controls.references.push(this._fb.group({
      name: name,
      description: description,
    }));
  }

  removeReference(index: number) {
    this.form.controls.references.removeAt(index);
  }

  onSubmit() {
    console.log(this.form);
    this.markAllAsDirty(this.form);

    if(this.form.invalid) {
      console.log('Form is invalid');
      return;
    }

    this.initialFormValue = this.form.value;
  }

  initialFormValue!: any;

  handleReset(event: Event, groupDirective: FormGroupDirective) {
    event.preventDefault();
    this.form.reset();
    console.log('Form reset ', groupDirective);
    this.form.reset(this.initialFormValue);

    // referencias
    const firstReference = this.initialFormValue.references[0];
    const {name, description} = firstReference;
    this.form.controls.references.clear();
    this.addReference(name, description);
  }

  handleKeyPress(event: KeyboardEvent) {
    if(!RegExp(/^\d$/).exec(event.key)) {
      event.preventDefault();
    }
  }

  markAllAsDirty(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if(control instanceof FormGroup) {
        this.markAllAsDirty(control);
      }
      
      if(control instanceof FormArray) {
        control.controls.forEach(group => {
          if(group instanceof FormGroup) {
            this.markAllAsDirty(group);
          }
        });
      }

      control.markAsDirty();
    });
  }
    
}
