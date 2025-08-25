import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListIncidentsComponent } from './list-incidents.component';
import { IncidentDetailComponent } from './incident-detail.component';
import { IncidentFormComponent } from './incident-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListIncidentsComponent,
    IncidentDetailComponent,
    IncidentFormComponent
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    ListIncidentsComponent,
    IncidentDetailComponent,
    IncidentFormComponent
  ]
})
export class IncidentsModule {}
