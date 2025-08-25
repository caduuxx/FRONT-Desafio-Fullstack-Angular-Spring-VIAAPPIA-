import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IncidentsService } from '../../core/services/incidents.service';
import { Status, Priority } from '../../core/models/enums';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-incident-form',
  templateUrl: './incident-form.component.html',
  styleUrls: ['./incident-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class IncidentFormComponent implements OnInit {
  incidentForm!: FormGroup;
  loading = false;
  error = '';
  isEditMode = false;
  incidentId?: string;

  prioridades = Object.values(Priority);
  statusList = Object.values(Status);

  constructor(
    private fb: FormBuilder,
    private incidentsService: IncidentsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.incidentId = this.route.snapshot.paramMap.get('id') || undefined;
    this.isEditMode = !!this.incidentId;

    this.incidentForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      descricao: [''],
      prioridade: [Priority.MEDIA, Validators.required],
      status: [Status.ABERTA, Validators.required],
      responsavelEmail: ['', [Validators.required, Validators.email]],
      tags: ['']
    });

    if (this.isEditMode && this.incidentId) {
      this.loadIncident(this.incidentId);
    }
  }

  loadIncident(id: string) {
    this.incidentsService.getIncidentById(id).subscribe({
      next: (incident) => {
        this.incidentForm.patchValue({
          titulo: incident.titulo,
          descricao: incident.descricao,
          prioridade: incident.prioridade,
          status: incident.status,
          responsavelEmail: incident.responsavelEmail,
          tags: incident.tags.join(', ')
        });
      },
      error: () => (this.error = 'Erro ao carregar ocorrência')
    });
  }

  submit() {
    if (this.incidentForm.invalid) return;

    const formValue = this.incidentForm.value;
    const incidentPayload = {
      ...formValue,
      tags: formValue.tags.split(',').map((t: string) => t.trim())
    };

    this.loading = true;

    const request$ = this.isEditMode && this.incidentId
      ? this.incidentsService.updateIncident(this.incidentId, incidentPayload)
      : this.incidentsService.createIncident(incidentPayload);

    request$.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/incidents']);
      },
      error: () => {
        this.error = 'Erro ao salvar ocorrência';
        this.loading = false;
      }
    });
  }
}
