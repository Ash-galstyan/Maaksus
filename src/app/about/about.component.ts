import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  public onIntersection({ target, visible }: { target: Element; visible: boolean }, animationName: string): void {
    if (animationName === 'fadeIn') {
      this.renderer.addClass(target, visible ? 'fadeIn' : 'notFadeIn');
      this.renderer.removeClass(target, visible ? 'notFadeIn' : 'fadeIn');
    } else {
      this.renderer.addClass(target, visible ? 'fadeInUp' : 'notFadeIn');
      this.renderer.removeClass(target, visible ? 'notFadeIn' : 'fadeInUp');
    }
  }

}
