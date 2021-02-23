import { Component, OnInit, Renderer2 } from '@angular/core';
import { TestimoniesService } from '../../core/services/testimonies.service';

@Component({
  selector: 'app-testimony',
  templateUrl: './testimony.component.html',
  styleUrls: ['./testimony.component.scss']
})
export class TestimonyComponent implements OnInit {
  config = {
    loop: true,
    effect: 'fade',
    fadeEffect: { crossFade: true }
  };
  testimonies: any;

  constructor(private renderer: Renderer2, private testimoniesService: TestimoniesService) { }

  ngOnInit() {
    this.testimoniesService.loadTestimonies().subscribe((res: any) => {
      this.testimonies = res.data[0].testimonies;
    });
  }

  public onIntersection({ target, visible }: { target: Element; visible: boolean }): void {
    this.renderer.addClass(target, visible ? 'fadeInUp' : 'notFadeIn');
    this.renderer.removeClass(target, visible ? 'notFadeIn' : 'fadeInUp');
  }

}
