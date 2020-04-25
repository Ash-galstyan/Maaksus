import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { CartService } from '../../services/cart.service';
import { combineLatest, merge, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Output() productRemoved = new EventEmitter();
  products = [];
  closeBtnName: string;
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;

  constructor(
    public bsModalRef: BsModalRef,
    private cartService: CartService
    ) {
  }

  ngOnInit() {
    this.products = this.cartService.getItems();
  }

  removeProduct(product) {
    this.productRemoved.emit(product);
  }

  changeProductQuantity(product, action: string) {
    product.quantity = product.quantity ? product.quantity : 1;
    if (action === 'add') {
      this.cartService.addToCart(product, 'increment');
    } else {
      this.cartService.addToCart(product, 'decrement');
    }
  }

  clearCart() {
    this.products = this.cartService.clearCart();
  }

}
