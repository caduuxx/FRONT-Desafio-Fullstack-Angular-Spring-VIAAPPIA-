import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IncidentsService } from '../../core/services/incidents.service';
import { Status } from '../../core/models/enums';

@Component({
  selector: 'app-incident-detail',
  standalone: true,
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.css'],
  imports: [CommonModule, FormsModule]
})
export class IncidentDetailComponent implements OnInit {
  incident: any;
  newComment: string = '';
  statusOptions = Object.values(Status); // Para dropdown de status
  loading = false;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private incidentsService: IncidentsService) {}

  ngOnInit() {
    this.loadIncident();
  }

  loadIncident() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.loading = true;
    this.incidentsService.getIncidentById(id).subscribe({
      next: (res) => {
        this.incident = res;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erro ao carregar incidente';
        this.loading = false;
      }
    });
  }

  addComment() {
    if (!this.newComment) return;
    this.incidentsService.addComment(this.incident.id, this.newComment, 'Usuário').subscribe({
      next: (res) => {
        if (!this.incident.comments) this.incident.comments = [];
        this.incident.comments.push(res);
        this.newComment = '';
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erro ao adicionar comentário';
      }
    });
  }

  changeStatus(newStatus: Status) {
    if (newStatus === this.incident.status) return;
    this.incidentsService.changeStatus(this.incident.id, newStatus).subscribe({
      next: (res) => this.incident.status = res.status,
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erro ao alterar status';
      }
    });
  }
}
