import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../Services/authentication.service';
import { FirestoreService } from '../../Services/firestore.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  newUser = {
    name: '',
    username: '',
    password: '',
    role: '',
  };

  newPatient: any;
  constructor(
    private auth: AuthenticationService,
    private firestore: FirestoreService
  ) {}

  ngOnInit() {
    this.auth.redirectHome();
  }
  onSubmitUser() {
    console.log(this.newUser);
    this.firestore.createUsers('users', this.newUser);
    this.newUser = {
      name: '',
      role: '',
      username: '',
      password: '',
    };
  }
  onSubmitPatient() {
    console.log('Submitted Patient');
  }

  redirectToUserPage() {}
  redirectToPatientPage() {}
}
