import { AuthService } from '@/auth/services/auth.services';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'front-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './front-navbar.html',
})
export class FrontNavbar { 
  authService = inject(AuthService);
}
