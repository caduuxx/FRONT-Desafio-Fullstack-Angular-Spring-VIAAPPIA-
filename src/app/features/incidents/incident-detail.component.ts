import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IncidentsService } from '../../core/services/incidents.service';
import { FormsModule } from '@angular/forms';

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

  constructor(private route: ActivatedRoute, private incidentService: IncidentsService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.incidentService.getIncidentById(id).subscribe(res => this.incident = res);
  }

  addComment() {
    if (!this.newComment) return;
    this.incidentService.addComment(this.incident.id, this.newComment, 'Usuário').subscribe(res => {
      this.incident.comments.push(res);
      this.newComment = '';
    });
  }
}
