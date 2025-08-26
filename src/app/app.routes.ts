import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login.component';
import { ListIncidentsComponent } from './features/incidents/list-incidents.component';
import { IncidentDetailComponent } from './features/incidents/incident-detail.component';
import { IncidentFormComponent } from './features/incidents/incident-form.component';
import { StatsDashboardComponent } from './features/stats/stats-dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'incidents', component: ListIncidentsComponent, canActivate: [AuthGuard] },
  { path: 'incidents/new', component: IncidentFormComponent, canActivate: [AuthGuard] },
  { path: 'incidents/:id', component: IncidentDetailComponent, canActivate: [AuthGuard] },
  { path: 'stats', component: StatsDashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'incidents', pathMatch: 'full' },
  { path: '**', redirectTo: 'incidents' },
];
