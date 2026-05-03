import { Directive } from "@angular/core";

@Directive({
    selector: 'form',
    host: {
        '(submit)': 'onSubmit($event)'
    }
})

export class TemplateFormsDirective {
    onSubmit(event: Event) {
        console.log('Form submitted', event);
        return false; // Prevent default form submission behavior
    }
}
