import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-forms',
  imports: [FormsModule, JsonPipe],
  templateUrl: './template-forms.html',
  styleUrl: './template-forms.css',
})
export class TemplateForms {
  applicantForm = {
    firstName: '',
    lastName: '',
    email: '',
    employmentStatus: '',
    position: '',
    resumeLink: ''
  };


  handleSubmit(form: NgForm) {
    console.log('Form submitted', form);
  }
}
