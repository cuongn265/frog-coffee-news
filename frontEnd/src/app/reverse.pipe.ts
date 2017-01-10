import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(array: any, args?: any): any {
    let reverseArray = array.slice();
    return reverseArray.reverse();
  }

}
