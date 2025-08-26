import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IncidentService } from '../../../core/services/incident.service';
import { normalizeTags } from '../../../shared/utils/form-utils';

@Component({
  selector: 'app-incident-form',
  templateUrl: './incident-form.component.html',
  styleUrls: ['./incident-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class IncidentFormComponent {
  form = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
    descricao: [''],
    prioridade: ['MEDIA', Validators.required],
    status: ['ABERTA', Validators.required],
    responsavelEmail: ['', [Validators.required, Validators.email]],
    tags: [[]]
  });

  constructor(private fb: FormBuilder, private incidentService: IncidentService) {}

  submit() {
    const data = { ...this.form.value, tags: normalizeTags(this.form.value.tags) };
    this.incidentService.createIncident(data).subscribe({
      next: () => console.log('Incidente criado com sucesso!'),
      error: () => console.error('Erro ao criar incidente')
    });
  }
}
