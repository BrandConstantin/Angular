import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Sidemenu } from '../shared/sidemenu/sidemenu';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, Sidemenu],
  templateUrl: './dashboard.html',
  styles: ``,
})
export default class Dashboard { }
