import { Status, Priority } from './enums';
import { Comment } from './comment.model';

export interface Incident {
  id: string;
  titulo: string;
  descricao?: string;
  prioridade: Priority;
  status: Status;
  responsavelEmail: string;
  tags: string[];
  dataAbertura: string;       // ISO string do backend
  dataAtualizacao: string;    // ISO string do backend
  comentarios?: Comment[];    // opcional, pode carregar só quando buscar detalhes
}
