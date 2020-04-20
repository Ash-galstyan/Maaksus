import { Component, OnInit } from '@angular/core';
import { faShoppingCart, faEye, faImage, faHourglass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  faEye = faEye;
  faImage = faImage;
  faHourglass = faHourglass;
  productsSold = 0;
  happyClients = 0;
  hoursSpent = 0;
  positiveFeedbacks = 0;

  constructor() { }

  ngOnInit() {
  }

  public onIntersection({ target, visible }: { target: Element; visible: boolean }): void {
    if (visible === true) {
      this.productsSold = 800;
      this.happyClients = 476;
      this.hoursSpent = 120;
      this.positiveFeedbacks = 90;
    }
  }

}
