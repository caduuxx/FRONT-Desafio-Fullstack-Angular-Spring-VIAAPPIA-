import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IncidentsService } from '../../core/services/incidents.service';
import { Incident } from '../../core/models/incident.model';

@Component({
  selector: 'app-incident-detail',
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.css'],
  standalone: true
})
export class IncidentDetailComponent implements OnInit {
  incident?: Incident;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private incidentsService: IncidentsService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchIncident(id);
    }
  }

  fetchIncident(id: string) {
    this.loading = true;
    this.incidentsService.getIncidentById(id).subscribe({
      next: (res) => {
        this.incident = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar ocorrência';
        this.loading = false;
      }
    });
  }
}
