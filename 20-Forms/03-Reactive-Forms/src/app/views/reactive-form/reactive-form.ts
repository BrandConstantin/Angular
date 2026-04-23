import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
  });
}
