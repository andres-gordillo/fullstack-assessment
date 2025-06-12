import { Pipe, PipeTransform } from '@angular/core';
 import { DatePipe } from '@angular/common';

@Pipe({
  name: 'datePipe',
  standalone: true
})
export class CustomDateFormatPipe implements PipeTransform {

  transform(value: any, format?: string, locale?: string, timezone?: string): string | null {
    const datePipe = new DatePipe('en-US')
    const newDate = datePipe.transform(value, format || "dd/MM/yyy", timezone, locale)
    return newDate
  }

}
