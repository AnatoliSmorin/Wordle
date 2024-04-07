import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appValidityState',
  standalone: true,
})
export class ValidityStatePipe implements PipeTransform {

  transform(value: string[]|null, index:number): string {
    console.log(value);
    if(value){
      return value[index];
    }
    return "empty"
  }

}
