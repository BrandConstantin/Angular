import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, FormRecord, ReactiveFormsModule } from '@angular/forms';
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
          this.form.controls.additionalSkills.addControl(skill, this._fb.nonNullable.control(false));
        });
      })
    )
  );

  private _fb = inject(FormBuilder);

  form = this._fb.group({
    personalInfo: this._fb.group({
      firstName: '',
      lastName: '',
    }),
    email: '',
    employmentStatus: this._fb.nonNullable.control('employee'),
    position: '',
    //additionalSkills: new FormGroup<{[key: string]: FormControl<boolean>}>({}),
    additionalSkills: this._fb.record<boolean>({}),
    resumeLink: '',
    references: this._fb.array([
      this._fb.group({
        name: '',
        description: '',
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
    this.form.controls.references.push(this._fb.group({
      name: '',
      description: '',
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
