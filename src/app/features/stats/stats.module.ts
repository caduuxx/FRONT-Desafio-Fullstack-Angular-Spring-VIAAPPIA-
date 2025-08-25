import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsDashboardComponent } from './stats-dashboard.component';

@NgModule({
  declarations: [StatsDashboardComponent],
  imports: [CommonModule],
  exports: [StatsDashboardComponent]
})
export class StatsModule {}
