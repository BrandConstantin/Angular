import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-basic-page',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './basic-page.html',
})
export class BasicPage { }
