import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn, fadeOut } from './carousel.animations';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [useAnimation(fadeIn, {params: { time: '600ms' }} )]),
      transition('* => void', [useAnimation(fadeOut, {params: { time: '600ms' }} )]),
    ])
  ]
})
export class CarouselComponent implements OnChanges {
  @Input() slides: any[];

  currentSlide = 0;

  constructor() {
  }

  ngOnChanges() {
    this.preloadImages();
  }

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
  }

  preloadImages() {
    for (const slide of this.slides) {
      new Image().src = slide;
    }
  }

  onThumbClick(index) {
    this.currentSlide = index;
  }

}
