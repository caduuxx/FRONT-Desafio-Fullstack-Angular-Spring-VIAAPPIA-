import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IncidentsService } from '../../core/services/incidents.service';
import { normalizeTags } from '../../shared/utils/form-utils';
import { Incident } from '../../core/models/incident.model';

@Component({
  selector: 'app-incident-form',
  templateUrl: './incident-form.component.html',
  styleUrls: ['./incident-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class IncidentFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private incidentService: IncidentsService) {
    // Inicializa o form dentro do construtor
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      descricao: [''],
      prioridade: ['MEDIA', Validators.required],
      status: ['ABERTA', Validators.required],
      responsavelEmail: ['', [Validators.required, Validators.email]],
      tags: [[]]
    });
  }

  submit() {
    const formValues = this.form.value;

    // Cria o objeto Partial<Incident> garantindo que não existam nulls
    const data: Partial<Incident> = {
      titulo: formValues.titulo || '',
      descricao: formValues.descricao || '',
      prioridade: formValues.prioridade || 'MEDIA',
      status: formValues.status || 'ABERTA',
      responsavelEmail: formValues.responsavelEmail || '',
      tags: normalizeTags(formValues.tags || [])
    };

    this.incidentService.createIncident(data).subscribe({
      next: () => console.log('Incidente criado com sucesso!'),
      error: () => console.error('Erro ao criar incidente')
    });
  }
}
