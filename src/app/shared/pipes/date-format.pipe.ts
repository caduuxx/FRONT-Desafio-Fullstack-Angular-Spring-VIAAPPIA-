import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string | Date, format: string = 'dd/MM/yyyy HH:mm'): string {
    if (!value) return '';
    return formatDate(value, format, 'pt-BR');
  }
}
