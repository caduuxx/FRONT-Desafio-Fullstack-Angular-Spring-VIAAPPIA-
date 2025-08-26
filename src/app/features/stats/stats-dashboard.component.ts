// features/stats/stats-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentsService } from '../../core/services/incidents.service';

@Component({
  selector: 'app-stats-dashboard',
  templateUrl: './stats-dashboard.component.html',
  styleUrls: ['./stats-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class StatsDashboardComponent implements OnInit {
  stats: any = null;
  loading = true;
  error: string | null = null;

  constructor(private incidentsService: IncidentsService) {}

  ngOnInit() {
    this.fetchStats();
  }

  fetchStats() {
    this.loading = true;
    this.incidentsService.getStats().subscribe({
      next: (res) => {
        this.stats = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar estatísticas.';
        this.loading = false;
      }
    });
  }
}
