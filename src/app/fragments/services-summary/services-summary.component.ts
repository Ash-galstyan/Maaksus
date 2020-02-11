import { Component, OnInit, Renderer2 } from '@angular/core';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-services-summary',
  templateUrl: './services-summary.component.html',
  styleUrls: ['./services-summary.component.scss']
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
