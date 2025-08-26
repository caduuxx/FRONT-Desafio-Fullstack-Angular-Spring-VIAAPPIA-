import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IncidentsService } from '../../core/services/incidents.service';
import { FormsModule } from '@angular/forms';
import { Status } from '../../core/models/enums';

@Component({
  selector: 'app-incident-detail',
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class IncidentDetailComponent implements OnInit {
  incident: any;
  newComment: string = '';
  statusOptions = Object.values(Status); // Para dropdown de status
  loading = false;
  error = '';

  constructor(private route: ActivatedRoute, private incidentService: IncidentsService) {}

  ngOnInit() {
    this.loadIncident();
  }

  loadIncident() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.loading = true;
    this.incidentService.getIncidentById(id).subscribe({
      next: (res) => {
        this.incident = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar incidente.';
        this.loading = false;
      }
    });
  }

  addComment() {
    if (!this.newComment) return;
    this.incidentService.addComment(this.incident.id, this.newComment, 'Usuário').subscribe({
      next: (res) => {
        if (!this.incident.comments) this.incident.comments = [];
        this.incident.comments.push(res);
        this.newComment = '';
      },
      error: () => {
        this.error = 'Erro ao adicionar comentário.';
      }
    });
  }

  changeStatus(newStatus: Status) {
    if (newStatus === this.incident.status) return;
    this.incidentService.changeStatus(this.incident.id, newStatus).subscribe({
      next: (res) => this.incident.status = res.status,
      error: () => {
        this.error = 'Erro ao alterar status.';
      }
    });
  }
}
