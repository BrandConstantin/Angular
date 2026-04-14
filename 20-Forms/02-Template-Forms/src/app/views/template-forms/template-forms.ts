import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApplicantForm } from './interfaces/applicant-form.directive';
import { PersonalizateDirective } from './directives/personalizate.directive';

@Component({
  selector: 'app-template-forms',
  imports: [FormsModule, JsonPipe, PersonalizateDirective],
  templateUrl: './template-forms.html',
  styleUrl: './template-forms.css',
})
export class TemplateForms {
  applicantForm: ApplicantForm = {
    name: {
      first: '',
      last: ''
    },
    email: '',
    employmentStatus: '',
    position: '',
    resumeLink: ''
  };


  handleSubmit(form: NgForm) {
    console.log('Form submitted', form);
  }
}
