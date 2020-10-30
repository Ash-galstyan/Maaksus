// import { Directive, HostListener, forwardRef } from '@angular/core';
// import { NG_VALUE_ACCESSOR } from '@angular/forms';
// import { NumberValueAccessor } from '@angular/forms/src/directives/number_value_accessor';
//
// export const FIXED_NUMBER_VALUE_ACCESSOR: any = {
//   provide: NG_VALUE_ACCESSOR,
//   useExisting: forwardRef(() => NumberValueAccessorDirective),
//   multi: true
// };
//
// @Directive({
//   selector: 'input[type=number][formControl][fixedNumberField],input[type=number][formControlName][fixedNumberField],input[type=number][ngModel][fixedNumberField]',
//   providers: [FIXED_NUMBER_VALUE_ACCESSOR],
// })
// export class NumberValueAccessorDirective extends NumberValueAccessor {
//   private lastValue: string;
//
//   @HostListener('change', ['$event.target.value']) handleOnChange(value) {
//     this.handleUpdate(value);
//   }
//
//   @HostListener('input', ['$event.target.value']) handleOnInput(value) {
//     this.handleUpdate(value);
//   }
//
//   private handleUpdate(value: string) {
//     if (value === this.lastValue) {
//       return;
//     }
//     this.lastValue = value;
//     this.onChange(value);
//   }
// }
