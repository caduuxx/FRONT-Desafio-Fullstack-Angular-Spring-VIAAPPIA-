import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../core/services/stats.service';
import { CommonModule } from '@angular/common';

interface IncidentStats {
  statusCount: Record<string, number>;
  priorityCount: Record<string, number>;
}

@Component({
  selector: 'app-stats-dashboard',
  templateUrl: './stats-dashboard.component.html',
  styleUrls: ['./stats-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class StatsDashboardComponent implements OnInit {
  stats?: IncidentStats;
  loading = false;
  error = '';

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    this.fetchStats();
  }

  fetchStats() {
    this.loading = true;
    this.statsService.getIncidentStats().subscribe({
      next: (res) => {
        this.stats = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar estatísticas';
        this.loading = false;
      }
    });
  }

  objectKeys(obj: object): string[] {
    return obj ? Object.keys(obj) : [];
  }
}
