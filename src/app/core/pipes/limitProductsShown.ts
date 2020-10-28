import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitProductsShown'
})
export class LimitProductsShownPipe implements PipeTransform {
  transform(items: any[], isInSeparatePage: boolean): any {
    if (!isInSeparatePage) {
      return items.slice(0, 3);
    }
    return items;
  }
}
