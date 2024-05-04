import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirestoreService } from './Services/firestore.service';
import { NavbarComponent } from './Components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'proj-heart-pwa';

  constructor() {
    console.log('Hello, proj-heart-pwa');
    // clear localStorage.getItem('alert')
    localStorage.removeItem('alert');
  }
}
