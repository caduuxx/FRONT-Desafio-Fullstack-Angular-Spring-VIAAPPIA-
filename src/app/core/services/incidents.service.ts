import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incident } from '../models/incident.model';
import { Comment } from '../models/comment.model';
import { Status, Priority } from '../models/enums';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {
  private apiUrl = 'http://localhost:8080/incidents'; // ajuste conforme backend

  constructor(private http: HttpClient) {}

  // Lista com filtros, paginação e ordenação
  getIncidents(
    page = 0,
    size = 10,
    status?: Status,
    prioridade?: Priority,
    q?: string,
    sort?: string
  ): Observable<{ content: Incident[]; totalElements: number }> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (status) params = params.set('status', status);
    if (prioridade) params = params.set('prioridade', prioridade);
    if (q) params = params.set('q', q);
    if (sort) params = params.set('sort', sort);

    return this.http.get<{ content: Incident[]; totalElements: number }>(this.apiUrl, { params });
  }

  getIncidentById(id: string): Observable<Incident> {
    return this.http.get<Incident>(`${this.apiUrl}/${id}`);
  }

  createIncident(incident: Partial<Incident>): Observable<Incident> {
    return this.http.post<Incident>(this.apiUrl, incident);
  }

  updateIncident(id: string, incident: Partial<Incident>): Observable<Incident> {
    return this.http.put<Incident>(`${this.apiUrl}/${id}`, incident);
  }

  deleteIncident(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  changeStatus(id: string, status: Status): Observable<Incident> {
    return this.http.patch<Incident>(`${this.apiUrl}/${id}/status`, { status });
  }

  getComments(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/${id}/comments`);
  }

  addComment(id: string, message: string, autor: string): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/${id}/comments`, { mensagem: message, autor });
  }
}
