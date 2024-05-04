import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // new import
import { AuthenticationService } from '../../Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private auth: AuthenticationService, private router: Router) {}
  // form group for user
  user = {
    username: '',
    password: '',
  };

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}') || null;
    this.auth.user = user;
    if (user) {
      this.auth.redirect(user);
    }
  }

  // on submit

  onSubmit() {
    this.auth.login(this.user.username, this.user.password);
  }
}
