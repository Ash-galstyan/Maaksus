import {Component, Input, OnDestroy} from '@angular/core';
import {Subject, timer} from 'rxjs';
import {mapTo, scan, startWith, switchMap, takeUntil, takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-counter',
  template: `
    <span>{{currentNumber}}</span>
    <ng-content></ng-content>
  `
})
export class CounterComponent implements OnDestroy {

  @Input()
  set end(endRange: number) {
    this.counterSub$.next(endRange);
  }
  @Input() countInterval = 1;
  public currentNumber = 0;
  private counterSub$ = new Subject();
  private onDestroy$ = new Subject();

  constructor() {
    this.counterSub$
      .pipe(
        switchMap(endRange => {
          return timer(0, this.countInterval).pipe(
            mapTo(this.positiveOrNegative(endRange, this.currentNumber)),
            startWith(this.currentNumber),
            scan((acc: number, curr: number) => acc + curr),
            takeWhile(this.isApproachingRange(endRange, this.currentNumber))
          );
        }),
        takeUntil(this.onDestroy$)
      )
      .subscribe((val: number) => this.currentNumber = val);
  }

  private positiveOrNegative(endRange, currentNumber) {
    return endRange > currentNumber ? 1 : -1;
  }

  private isApproachingRange(endRange, currentNumber) {
    return endRange > currentNumber
      ? val => val <= endRange
      : val => val >= endRange;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
