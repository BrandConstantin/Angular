import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UsersService } from '../../../services/users.services';
import { Title } from '@shared/title/title';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, Title, RouterModule],
  templateUrl: './users.html',
  styles: ``,
})
export default class Users { 
  public usersService = inject(UsersService);
}
