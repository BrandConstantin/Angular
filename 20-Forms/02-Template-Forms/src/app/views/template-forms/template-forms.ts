import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApplicantForm, VerifyAccount } from './interfaces/applicant-form.directive';
import { PersonalizateDirective } from './directives/personalizate.directive';
import { ConfirmEmailDirective } from './directives/confirm-email.directive';
import { CheckEmailDirective } from './directives/check-email.directive';

@Component({
  selector: 'app-template-forms',
  imports: [FormsModule, JsonPipe, PersonalizateDirective, ConfirmEmailDirective, CheckEmailDirective],
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
    email: {
      email: '',
      confirmEmail: '',
    },
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
