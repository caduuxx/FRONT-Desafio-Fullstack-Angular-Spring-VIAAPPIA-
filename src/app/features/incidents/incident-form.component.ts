import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IncidentsService } from '../../core/services/incidents.service';
import { normalizeIncidentFormValue } from '../../shared/utils/form-utils'; // <-- importa o novo util
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
    if (this.form.invalid) return;

    const data: Partial<Incident> = normalizeIncidentFormValue(this.form.value);

    this.incidentService.createIncident(data).subscribe({
      next: () => console.log('Incidente criado com sucesso!'),
      error: () => console.error('Erro ao criar incidente')
    });
  }
}
