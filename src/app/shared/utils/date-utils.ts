export function formatDateBR(date: string | Date, includeTime: boolean = true): string {
    const d = new Date(date);
    const options: Intl.DateTimeFormatOptions = includeTime
      ? { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }
      : { day: '2-digit', month: '2-digit', year: 'numeric' };
    return d.toLocaleDateString('pt-BR', options);
  }

  
  