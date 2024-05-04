import { Component } from '@angular/core';
import { FirestoreService } from '../../Services/firestore.service';
import { AuthenticationService } from '../../Services/authentication.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-caretaker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './caretaker.component.html',
  styleUrl: './caretaker.component.css',
})
export class CaretakerComponent {
  patients: any;
  date = new Date();
  abnormal: any[] = [];
  audio;
  constructor(
    private firestoreService: FirestoreService,
    private auth: AuthenticationService,
    private router: Router
  ) {
    console.log('Hello, proj-heart-pwa');
    this.audio = new Audio('/assets/alter.mp3');
  }
  ngOnInit() {
    this.auth.redirectHome();

    try {
      this.firestoreService.getCollection('Patients').subscribe((data) => {
        this.patients = data;
        this.abnormal = [];
        console.log(this.audio);
        this.audio.pause();
        data.forEach((patient) => {
          if (patient.status === 'ABNORMAL') {
            this.abnormal.push(patient);
            if (patient.noted === 'true') return;
            this.ifAbnormal();
          }
        });
      });
    } catch (e) {
      console.log(e);
    }

    // this.firestoreService.getCollection('Patients').subscribe((data) => {
    //   this.patients = data;
    // });
  }
  redirectToHistoryPage(patientId: string) {
    console.log('Redirecting to history page');
    this.router.navigate(['/history'], { queryParams: { patientId } });
  }
  stopAlert() {
    console.log(this.audio);
    this.audio.pause();
    // update firebase with noted
    this.abnormal.forEach((patient) => {
      this.firestoreService.updatPatient(patient.device_id, {
        noted: !patient.noted,
      });
    });
    console.log('stopAlert');
    localStorage.setItem('alert', 'false');
  }
  ifAbnormal() {
    console.log('ifAbnormal');
    if (localStorage.getItem('alert') !== 'false') {
      this.audio.loop = true;
      this.audio.volume = 0.05;
      this.audio.play();
    }
  }
}
