import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.css',
})
export class ReactiveForm {
  form = new FormGroup({
    personalInfo: new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    }),
    email: new FormControl(''),
    employmentStatus: new FormControl(''),
    position: new FormControl(''),
    resumeLink: new FormControl(''),
    references: new FormArray([
      new FormGroup({
        name: new FormControl(''),
        description: new FormControl(''),
      }),
    ]),
  });

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
