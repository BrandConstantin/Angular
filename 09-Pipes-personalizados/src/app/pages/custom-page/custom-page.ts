import { Component, signal } from '@angular/core';
import { ToggleCasePipe } from '../../pipes/toggle-case.pipe';

@Component({
  selector: 'app-custom-page',
  imports: [ToggleCasePipe],
  templateUrl: './custom-page.html',
})
export class CustomPage { 
  name = signal('Brand Constantin');

  upperCase = signal(true);
}
