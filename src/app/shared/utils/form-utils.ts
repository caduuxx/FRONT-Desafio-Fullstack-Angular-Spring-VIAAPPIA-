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
  