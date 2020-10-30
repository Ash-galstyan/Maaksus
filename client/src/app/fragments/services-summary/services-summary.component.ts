import { Component, OnInit, Renderer2 } from '@angular/core';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-services-summary',
  templateUrl: './services-summary.component.html',
  styleUrls: ['./services-summary.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('4s ease-out', style({ opacity: '1' })),
      ])
    ])
  ]
})
export class ServicesSummaryComponent implements OnInit {
  faWallet = faWallet;
  faCreditCard = faCreditCard;
  faPaperPlane = faPaperPlane;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  public onIntersection({ target, visible }: { target: Element; visible: boolean }): void {
    this.renderer.addClass(target, visible ? 'fadeIn' : 'notFadeIn');
    this.renderer.removeClass(target, visible ? 'notFadeIn' : 'fadeIn');
  }

}
