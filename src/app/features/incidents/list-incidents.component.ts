import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentsService } from '../../core/services/incidents.service';
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

  constructor(private incidentService: IncidentsService) {}

  ngOnInit() {
    this.fetchIncidents();
  }

  fetchIncidents() {
    this.loading = true;
    const page = 0;
    const size = 10;
    this.incidentService.getIncidents(page, size).subscribe({
      next: (res: any) => {
        this.incidents = res.content; // porque o serviço retorna { content, totalElements }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        console.error('Erro ao carregar incidentes');
      }
    });
  }
}
