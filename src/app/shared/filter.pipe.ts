import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string, propertyName: string): any[] {
    const result : any = [];
    //need to check value is null or empty it should return same thing -not filter 
    if(!value || filterString === '' || propertyName === ''){
      return value;
    }
    value.forEach((a: any) => {
      if(a[propertyName].trim().toLowerCase().includes(filterString.toLocaleLowerCase()))
      result.push(a);
    });

    return result;
  }

}
