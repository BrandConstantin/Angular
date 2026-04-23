import { JsonPipe } from '@angular/common';
import { Component, viewChild } from '@angular/core';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
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
  ngForm = viewChild(NgForm);

  verifyAccountWithMethod: VerifyAccount = 'email';

  applicantForm: ApplicantForm = {
    name: {
      first: 'First Name',
      last: 'Last Name'
    },
    email: {
      email: 'Email',
      confirmEmail: 'Confirm Email',
    },
    employmentStatus: 'Employment Status',
    position: 'Position',
    resumeLink: 'Resume Link',
    phoneNumber: 'Phone Number'
  };

  initialFormValues!: {[key: string]: string};

  ngAfterViewInit() {
    console.log(this.ngForm()?.form);

    Promise.resolve().then(() => {
      this.initialFormValues = this.ngForm()!.value;
    });
  }


  handleSubmit() {
    this.markAllAsDirty(this.ngForm()!.form);

    if(this.ngForm()!.form.invalid) return;

    this.ngForm()!.resetForm();
  }

  handleReset(event: Event) {
    event.preventDefault();

    this.ngForm()!.resetForm(this.initialFormValues);
  }

  allowOnlyNumbers(event: KeyboardEvent) {
    if (!RegExp(/^\d$/).exec(event.key)) {
      event.preventDefault();
    }
  }

  handlePhoneNumberInput() {
    this.applicantForm.phoneNumber = '';
  }

  markAllAsDirty(form: FormGroup) {
    Object.values(form.controls).forEach(control => {
      // console.log(control);
      if(control instanceof FormGroup) {
        this.markAllAsDirty(control);
      }

      control.markAsDirty();
    });

  }
}
