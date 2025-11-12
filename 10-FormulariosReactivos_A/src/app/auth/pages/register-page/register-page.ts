import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './register-page.html',
})
export class RegisterPageComponent { }
