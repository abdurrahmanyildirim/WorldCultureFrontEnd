import { Pipe, PipeTransform } from '@angular/core';
import { CountryForCard } from '../models/countryForCard';

@Pipe({
  name: 'filterCountry'
})
export class FilterCountryPipe implements PipeTransform {

  transform(value: CountryForCard[], args: string): CountryForCard[] {
    if (!args) {
      return value;
    }
    return value.filter(c => c.countryName.toLocaleLowerCase()
      .indexOf(args.toLocaleLowerCase()) !== -1)
  }

}
