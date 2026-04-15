import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApplicantForm, VerifyAccount } from './interfaces/applicant-form.directive';
import { PersonalizateDirective } from './directives/personalizate.directive';

@Component({
  selector: 'app-template-forms',
  imports: [FormsModule, JsonPipe, PersonalizateDirective],
  templateUrl: './template-forms.html',
  styleUrl: './template-forms.css',
})
export class TemplateForms {
  verifyAccountWithMethod: VerifyAccount = 'email';

  applicantForm: ApplicantForm = {
    name: {
      first: '',
      last: ''
    },
    email: '',
    employmentStatus: '',
    position: '',
    resumeLink: '',
    phoneNumber: ''
  };


  handleSubmit(form: NgForm) {
    console.log('Form submitted', form);
  }

  allowOnlyNumbers(event: KeyboardEvent) {
    if (!RegExp(/^\d$/).exec(event.key)) {
      event.preventDefault();
    }
  }

  handlePhoneNumberInput() {
    this.applicantForm.phoneNumber = '';
  }
}
