import { Component, OnInit } from '@angular/core';
import { IncidentsService } from '../../core/services/incidents.service';
import { Incident } from '../../core/models/incident.model';

@Component({
  selector: 'app-list-incidents',
  templateUrl: './list-incidents.component.html',
  styleUrls: ['./list-incidents.component.css'],
  standalone: true
})
export class ListIncidentsComponent implements OnInit {
  incidents: Incident[] = [];
  loading = false;
  error = '';

  constructor(private incidentsService: IncidentsService) {}

  ngOnInit() {
    this.fetchIncidents();
  }

  fetchIncidents() {
    this.loading = true;
    this.incidentsService.getIncidents().subscribe({
      next: (res) => {
        this.incidents = res.content;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar ocorrências';
        this.loading = false;
      }
    });
  }
}
