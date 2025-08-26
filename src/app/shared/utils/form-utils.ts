// form-utils.ts

export function normalizeString(value: string | null | undefined): string {
  return value?.trim().toLowerCase() || '';
}

export function normalizeTags(tags: string[] = []): string[] {
  return tags
    .map(tag => tag?.trim().toLowerCase())
    .filter(tag => !!tag)
    .filter((tag, index, self) => self.indexOf(tag) === index);
}

export function buildQueryParams(params: Record<string, any>): string {
  const query = new URLSearchParams();
  for (const key in params) {
    if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
      query.append(key, params[key]);
    }
  }
  return query.toString();
}

/**
 * Normaliza os valores do formulário de Incident antes de enviar ao backend.
 * - Remove espaços extras
 * - Converte strings pra lowercase (quando aplicável)
 * - Remove tags duplicadas/vazias
 */
export function normalizeIncidentFormValue(formValue: any): any {
  return {
    title: formValue.title?.trim() || '',
    description: formValue.description?.trim() || '',
    status: formValue.status || 'open',
    priority: formValue.priority || 'medium',
    tags: normalizeTags(formValue.tags),
  };
}
