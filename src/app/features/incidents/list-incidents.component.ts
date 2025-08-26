import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentsService } from '../../core/services/incidents.service';
import { Status, Priority } from '../../core/models/enums';
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';
import { buildQueryParams } from '../../shared/utils/form-utils';

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
  error = '';

  // filtros
  statusFilter: string = '';
  priorityFilter: string = '';
  searchQuery: string = '';

  // paginação
  page = 0;
  size = 10;
  totalElements = 0;

  constructor(private incidentsService: IncidentsService) {}

  ngOnInit() {
    this.fetchIncidents();
  }

  fetchIncidents() {
    this.loading = true;
    this.error = '';

    // converte strings do select para enums
    const statusEnum = this.statusFilter ? (Status as any)[this.statusFilter] : undefined;
    const priorityEnum = this.priorityFilter ? (Priority as any)[this.priorityFilter] : undefined;

    this.incidentsService
      .getIncidents(this.page, this.size, statusEnum, priorityEnum, this.searchQuery)
      .subscribe({
        next: (res: any) => {
          this.incidents = res.content;
          this.totalElements = res.totalElements;
          this.loading = false;
        },
        error: () => {
          this.error = 'Erro ao carregar incidentes.';
          this.loading = false;
        }
      });
  }

  // métodos de paginação
  goToPage(page: number) {
    this.page = page;
    this.fetchIncidents();
  }

  nextPage() {
    if ((this.page + 1) * this.size < this.totalElements) {
      this.page++;
      this.fetchIncidents();
    }
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
      this.fetchIncidents();
    }
  }
}
