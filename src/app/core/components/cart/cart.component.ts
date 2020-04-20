import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Output() productAdded = new EventEmitter();
  @Output() productRemoved = new EventEmitter();
  products = [];
  closeBtnName: string;
  calcTotal() {
    return this.products.reduce((acc, prod) => acc += prod.num , 0);
  }

  removeProduct(product) {
    this.productRemoved.emit(product);
  }

  constructor(
    public bsModalRef: BsModalRef,
    private cartService: CartService
    ) {
  }

  ngOnInit() {
    this.products = this.cartService.getItems();
  }

}
