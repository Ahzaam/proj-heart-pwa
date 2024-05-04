import { Component } from '@angular/core';
import { AuthenticationService } from '../../Services/authentication.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(public auth: AuthenticationService) {}

  logout() {
    localStorage.removeItem('user');
    window.location.reload();
  }
}
