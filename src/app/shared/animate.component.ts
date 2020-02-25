// import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
// import { $animations } from './animate-animations';
// import { Observable, of, Subject } from 'rxjs';
// import { ScrollDispatcher } from '@angular/cdk/scrolling';
// import { coerceBooleanProperty } from '@angular/cdk/coercion';
// import { delay, distinctUntilChanged, flatMap, map, scan, startWith, takeUntil, takeWhile } from 'rxjs/operators';
//
// @Component({
//   selector: 'app-animate',
//   template: '<ng-content></ng-content>',
//   animations: $animations
// })
// export class AnimateComponent implements OnInit, OnDestroy {
//
//   readonly timings = {slower: '3s', slow: '2s', normal: '1s', fast: '500ms', faster: '300ms'};
//   private replay$ = new Subject<boolean>();
//   private dispose$ = new Subject<void>();
//
//   constructor(private elm: ElementRef, private scroll: ScrollDispatcher, private zone: NgZone) {
//   }
//
//   public paused = false;
//   public aos = false;
//   public once = false;
//   @Input() threshold = 0.2;
//
//   private get idle() {
//     return {value: 'idle'};
//   }
//
//   private get play() {
//     return {
//       value: this.animate,
//       // delay: this.delay,
//       params: {
//         timing: this.timings[this.speed] || '1s'
//       }
//     };
//   }
//
//   /** Selects the animation to be played */
//   @Input('wmAnimate') animate: wmAnimations;
//
//   /** Speeds up or slows down the animation */
//   @Input() speed: wmAnimateSpeed = 'normal';
//
//   @HostBinding('@animate')
//   private trigger: string | {} = 'idle';
//
//   /** Disables the animation */
//   @Input('disabled') set disableAnimation(value: boolean) {
//     this.disabled = coerceBooleanProperty(value);
//   }
//
//   @HostBinding('@.disabled')
//   public disabled = false;
//
//   /** Emits at the end of the animation */
//   @Output() start = new EventEmitter<void>();
//
//   @HostListener('@animate.start')
//   private animationStart() {
//     this.start.emit();
//   }
//
//   /** Emits at the end of the animation */
//   @Output() done = new EventEmitter<void>();
//
//   @HostListener('@animate.done')
//   private animationDone() {
//     this.done.emit();
//   }
//
//   /** When true, keeps the animation idle until the next replay triggers */
//   @Input('paused') set pauseAnimation(value: boolean) {
//     this.paused = coerceBooleanProperty(value);
//   }
//
//   /** When true, triggers the animation on element scrolling in the viewport */
//   @Input('aos') set enableAOS(value: boolean) {
//     this.aos = coerceBooleanProperty(value);
//   }
//
//   /** When true, triggers the animation on element scrolling in the viewport */
//   @Input('once') set aosOnce(value: boolean) {
//     this.once = coerceBooleanProperty(value);
//   }
//
//   /** Specifies the amout of visibility triggering AOS */
//
//   /** Replays the animation */
//   @Input() set replay(replay: any) {
//
//     // Skips whenever the animation never triggered
//     if (this.trigger === 'idle') {
//       return;
//     }
//
//     // Re-triggers the animation again on request
//     if (coerceBooleanProperty(replay)) {
//
//       this.trigger = this.idle;
//       this.replay$.next(true);
//     }
//   }
//
//   ngOnInit() {
//     // Triggers the animation based on the input flags
//     this.animateTrigger(this.elm).subscribe( trigger => {
//       // Triggers the animation to play or to idle
//       this.trigger = trigger ? this.play : this.idle;
//     });
//   }
//
//   ngOnDestroy() { this.dispose(); }
//
//   private dispose() {
//     this.dispose$.next();
//     this.dispose$.complete();
//   }
//
//   // Triggers the animation
//   private animateTrigger(elm: ElementRef<HTMLElement>): Observable<boolean> {
//
//     return this.animateReplay().pipe( flatMap( trigger => this.aos ? this.animateOnScroll(elm) : of(trigger)) );
//   }
//
//   // Triggers the animation deferred
//   private animateReplay(): Observable<boolean> {
//
//     return this.replay$.pipe( takeUntil(this.dispose$), delay(0), startWith(!this.paused) );
//   }
//
//   // Triggers the animation on scroll
//   private animateOnScroll(elm: ElementRef<HTMLElement>): Observable<boolean> {
//
//     // Returns an AOS observable
//     return this.scroll.ancestorScrolled(elm, 100).pipe(
//       // Makes sure to dispose on destroy
//       takeUntil(this.dispose$),
//       // Starts with initial element visibility
//       startWith(!this.paused  && this.visibility >= this.threshold),
//       // Maps the scrolling to the element visibility value
//       map(() => this.visibility),
//       // Applies an hysteresys, so, to trigger the animation on based on the treshold while off on full invisibility
//       scan<number, boolean>((result, visiblility) => (visiblility >= this.threshold || (result ? visiblility > 0 : false))),
//       // Distincts the resulting triggers
//       distinctUntilChanged(),
//       // Stop taking the first on trigger when aosOnce is set
//       takeWhile(trigger => !trigger || !this.once, true),
//       // Run NEXT within the angular zone to trigger change detection back on
//       flatMap(trigger => new Observable<boolean>(observer => this.zone.run(() => observer.next(trigger))))
//     );
//   }
//
//   // Computes the element visibility ratio
//   private get visibility() {
//     return this.intersectRatio( this.clientRect(this.elm), this.getScrollingArea(this.elm) );
//   }
//
//   private intersectRatio(rect: wmRect, cont: wmRect): number {
//
//     // Return 1.0 when the element is fully within its scroller container
//     if(rect.left > cont.left && rect.top > cont.top && rect.right < cont.right && rect.bottom < cont.bottom) {
//       return 1.0;
//     }
//
//     // Computes the intersection area otherwise
//     const a = Math.round(rect.width * rect.height);
//     const b = Math.max(0, Math.min(rect.right, cont.right) - Math.max(rect.left, cont.left));
//     const c = Math.max(0, Math.min(rect.bottom, cont.bottom) - Math.max(rect.top, cont.top));
//
//     // Returns the amount of visible area
//     return Math.round(b * c / a * 10) / 10;
//   }
//
//   // Returns the rectangular surface area of the element's scrolling container
//   private getScrollingArea(elm: ElementRef<HTMLElement>): wmRect {
//     // Gets the cdkScolling container, if any
//     const scroller = this.scroll.getAncestorScrollContainers(elm).pop();
//     // Returns the element's most likely scrolling container area
//     return !!scroller ? this.clientRect( scroller.getElementRef() ) : this.windowRect();
//   }
//
//   // Element client bounding rect helper
//   private clientRect(elm: ElementRef<HTMLElement>): wmRect {
//     const el = !!elm && elm.nativeElement;
//     return !!el && el.getBoundingClientRect();
//   }
//
//   private windowRect(): wmRect {
//     return new wmRect(0,0, window.innerWidth, window.innerHeight);
//   }
//
// }
