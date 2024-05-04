import { Routes } from '@angular/router';
import { CaretakerComponent } from './Components/caretaker/caretaker.component';
import { LoginComponent } from './Components/login/login.component';
import { HistoryComponent } from './Components/history/history.component';
import { AdminComponent } from './Components/admin/admin.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'caretaker',
    component: CaretakerComponent,
  },
  {
    path: 'history',
    component: HistoryComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'hospital',
    // component: HospitalComponent,
  },
  {
    path: 'driver',
    // component: DriverComponent,
  },
];
