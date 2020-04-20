import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CartComponent } from '../../core/components/cart/cart.component';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  faShoppingCart = faShoppingCart;
  bsModalRef: BsModalRef;
  itemsInCart = 0;

  constructor(
    private router: Router,
    private modalService: BsModalService,
    private cartService: CartService
  ) {
  }

  ngOnInit() {
    this.subscribeToCartChanges();
  }

  openCartModal() {
    this.bsModalRef = this.modalService.show(CartComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  subscribeToCartChanges() {
    return this.cartService.getCartItemChanges().subscribe(item => {
      this.itemsInCart = item.length;
    });
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscribeToCartChanges().unsubscribe();
  }

}
