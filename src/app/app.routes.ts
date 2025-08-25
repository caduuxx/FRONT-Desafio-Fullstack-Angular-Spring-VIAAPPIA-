import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login.component';
import { ListIncidentsComponent } from './features/incidents/list-incidents.component';
import { IncidentDetailComponent } from './features/incidents/incident-detail.component';
import { IncidentFormComponent } from './features/incidents/incident-form.component';
import { IncidentsStatsComponent } from './features/stats/incidents-stats.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'incidents',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ListIncidentsComponent },
      { path: 'new', component: IncidentFormComponent },
      { path: ':id', component: IncidentDetailComponent },
      { path: ':id/edit', component: IncidentFormComponent }
    ]
  },
  { path: 'stats', component: IncidentsStatsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'incidents', pathMatch: 'full' },
  { path: '**', redirectTo: 'incidents' }
];
