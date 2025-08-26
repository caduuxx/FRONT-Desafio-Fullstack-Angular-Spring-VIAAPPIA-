import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsService } from '../../core/services/stats.service';
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';

@Component({
  selector: 'app-stats-dashboard',
  templateUrl: './stats-dashboard.component.html',
  styleUrls: ['./stats-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, DateFormatPipe]
})
export class StatsDashboardComponent implements OnInit {
  stats: any;
  loading = false;
  error = '';

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    this.fetchStats();
  }

  fetchStats() {
    this.loading = true;
    this.statsService.getIncidentStats().subscribe({
      next: (res) => { this.stats = res; this.loading = false; },
      error: () => { this.error = 'Erro ao carregar estatísticas'; this.loading = false; }
    });
  }
}
