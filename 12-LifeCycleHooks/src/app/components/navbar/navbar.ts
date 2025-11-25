import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  styles:`
    nav {
      display: flex;
      gap: 1rem;
      justify:content: center;
      align-items: center;
    }

    .active {
      color: #341161,
      font-weight: bold;
    }
  `,
  templateUrl: './navbar.html',
})
export class Navbar { }
