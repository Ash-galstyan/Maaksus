import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartComponent } from '../../core/components/cart/cart.component';
import { CartService } from '../../core/services/cart.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class NavigationComponent implements OnInit, OnDestroy {
  faShoppingCart = faShoppingCart;
  bsModalRef: BsModalRef;
  itemsInCart = 0;

  constructor(
    private router: Router,
    private modalService: BsModalService,
    public cartService: CartService
  ) {
  }

  ngOnInit() {

  }

  openCartModal() {
    this.bsModalRef = this.modalService.show(CartComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    // this.subscribeToCartChanges().unsubscribe();
  }

}
