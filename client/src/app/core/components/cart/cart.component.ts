import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

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
    private cartService: CartService,
    private router: Router
    ) {
  }

  ngOnInit() {
    this.products = this.cartService.getItems();
  }

  changeProductQuantity(product, action: string) {
    product.quantity = product.quantity ? product.quantity : 1;
    if (action === 'add') {
      this.cartService.addToCart(product, 'increment');
    } else {
      this.cartService.addToCart(product, 'decrement');
    }
  }

  proceedToCheckout(products: any[]) {
    this.bsModalRef.hide();
    const productIds = [];
    let price = 0;
    let quantity = 0;
    products.forEach(product => {
      products.push(product.id);
      price += +product.price;
      quantity += +product.quantity;
    });
    console.log('Go to checkout form');
    this.router.navigate(['checkout'], {
      queryParams: {
        productIds,
        price,
        quantity
      }
    });
  }

  clearCart() {
    this.products = this.cartService.clearCart();
  }

}
