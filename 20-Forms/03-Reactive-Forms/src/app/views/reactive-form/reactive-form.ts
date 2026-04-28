import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormGroupDirective, FormRecord, ReactiveFormsModule } from '@angular/forms';
import { GetAditionalService } from '../../services/get-aditional.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  selector: 'app-reactive-form',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.css',
})
export class ReactiveForm {
  additionalSkillsService = inject(GetAditionalService);

  additionalSkills = toSignal(
    this.additionalSkillsService.getAditionalSkills()
      .pipe(tap((additionalSkills: string[]) => {
        additionalSkills.forEach((skill) => {
          this.form.controls.additionalSkills.addControl(skill, new FormControl(false, {nonNullable: true}));
        });
      })
    )
  );

  form = new FormGroup({
    personalInfo: new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    }),
    email: new FormControl(''),
    employmentStatus: new FormControl('employee', { nonNullable: true }),
    position: new FormControl(''),
    //additionalSkills: new FormGroup<{[key: string]: FormControl<boolean>}>({}),
    additionalSkills: new FormRecord<FormControl<boolean>>({}),
    resumeLink: new FormControl(''),
    references: new FormArray([
      new FormGroup({
        name: new FormControl(''),
        description: new FormControl(''),
      }),
    ]),
  });

  constructor() {
    setTimeout(() => { // marcar checkbox
      this.form.controls.additionalSkills.controls['Angular'].setValue(true);
      this.form.controls.additionalSkills.controls['MongoDB'].setValue(true);
    }, 2000);
  }

  addReference() {
    this.form.controls.references.push(new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
    }));
  }

  removeReference(index: number) {
    this.form.controls.references.removeAt(index);
  }

  onSubmit() {
    console.log(this.form);
  }

  handleReset(event: Event, groupDirective: FormGroupDirective) {
    event.preventDefault();
    // this.form.reset();
    console.log('Form reset ', groupDirective);
  }
}
