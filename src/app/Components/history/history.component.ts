import { Component } from '@angular/core';
import { AuthenticationService } from '../../Services/authentication.service';
import { FirestoreService } from '../../Services/firestore.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent {
  date = new Date();
  history: any = [];

  constructor(
    private auth: AuthenticationService,
    private firestoreService: FirestoreService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.auth.redirectHome();

    // get parameter form url
    this.activatedRoute.queryParams.subscribe((params: any) => {
      console.log(params.patientId);
      this.firestoreService
        .getCollectionWithWhere('History', 'device_id', params.patientId)
        .subscribe((data) => {
          console.log(data);
          this.history = data;
        });
    });
  }
}
