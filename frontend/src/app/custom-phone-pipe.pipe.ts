import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'phonePipe',
  standalone: true
})
export class CustomPhonePipe implements PipeTransform {

  transform(value: any, format?: string, region?: string): string | null {
    if(!value ) {
      return null
    }

    const cleanValue = value.toString().replace(/\D/g, '')

    if(cleanValue.length !== 10) {
      return null
    }
    let newString = ''

    for (let i = 0; i < cleanValue.length; i++) {
      if(i === 0) {
        newString += '('
      }
      if(newString.length === 4) {
        newString += ') '
      }
      if(newString.length === 9) {
        newString += '-'
      }

      newString += cleanValue[i]
    }
    return newString
  }

}
