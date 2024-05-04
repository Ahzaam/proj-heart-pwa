import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FirestoreService } from './firestore.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private firestoreService: FirestoreService,
    private router: Router
  ) {}

  user: any;
  async login(username: string, password: string): Promise<boolean> {
    const user: any = await this.firestoreService.getUser('users', username);

    this.user = user;

    this.redirect(user);

    if (user) {
      if (user.password === password) {
        localStorage.setItem('user', JSON.stringify(user));
        return true;
      }
      return false;
    } else {
      return false;
    }
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  getUser(): any {
    return localStorage.getItem('user');
  }

  redirect(user: any) {
    if (user) {
      if (user.role === 'caretaker') {
        this.router.navigate(['/caretaker']);
      } else if (user.role === 'patient') {
        this.router.navigate(['/patient']);
      } else if (user.role === 'doctor') {
        this.router.navigate(['/doctor']);
      } else if (user.role === 'admin') {
        this.router.navigate(['/admin']);
      } else if (user.role === 'driver') {
        this.router.navigate(['/driver']);
      }
    }
  }
  redirectHome() {
    if (!this.user) {
      this.router.navigate(['/']);
    }
  }
}
