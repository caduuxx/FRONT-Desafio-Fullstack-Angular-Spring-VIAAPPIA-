import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentService } from '../../core/services/incident.service';
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';
import { normalizeTags, buildQueryParams } from '../../shared/utils/form-utils';

@Component({
  selector: 'app-list-incidents',
  templateUrl: './list-incidents.component.html',
  styleUrls: ['./list-incidents.component.css'],
  standalone: true,
  imports: [CommonModule, DateFormatPipe]
})
export class ListIncidentsComponent implements OnInit {
  incidents: any[] = [];
  loading = false;

  constructor(private incidentService: IncidentService) {}

  ngOnInit() {
    this.fetchIncidents();
  }

  fetchIncidents() {
    this.loading = true;
    const query = buildQueryParams({ page: 0, size: 10 });
    this.incidentService.getIncidents(query).subscribe({
      next: (res: any) => {
        this.incidents = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        console.error('Erro ao carregar incidentes');
      }
    });
  }
}
