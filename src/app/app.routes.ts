import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { ListIncidentsComponent } from './features/incidents/list-incidents.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'incidents', component: ListIncidentsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'incidents', pathMatch: 'full' },
  { path: '**', redirectTo: 'incidents' }
];
