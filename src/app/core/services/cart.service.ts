import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap';
import { Product } from '../../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CartService {
  @Output() productAdded = new EventEmitter();
  items: any[] = [];
  public totalItems = 0;
  public totalPrice = 0;

  private readonly cartItemChanges: BehaviorSubject<Product[]>;
  private readonly itemsQuantityChanges: BehaviorSubject<number>;

  constructor(
    private http: HttpClient,
    private modalService: BsModalService
  ) {
    this.cartItemChanges = new BehaviorSubject<Product[]>([]);
    this.itemsQuantityChanges = new BehaviorSubject(null);
  }

  addToCart(product: any, quantity: string) {
    let itemRemoved = false;
    const productExistInCart = this.items.find((item, index) => {
      if (item.id === product.id) {
        if (quantity === 'increment') {
          item.quantity += 1;
          this.totalPrice += +item.price;
        } else {
          if (item.quantity > 1) {
            item.quantity -= 1;
            this.totalPrice -= +item.price;
          } else {
            itemRemoved = true;
          }
        }
      }
      if (!itemRemoved) {
        return item.id === product.id;
      } else {
        this.items.splice(index, 1);
        this.totalPrice -= +item.price;
        return item;
      }
    });
    if (!productExistInCart && !itemRemoved) {
      this.items.push({...product, quantity: 1}); // enhance "porduct" opject with "num" property
      this.totalPrice += +product.price;
    }
    this.totalItems = 0;
    this.items.forEach(item => {
      this.totalItems += item.quantity;
    });
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    this.totalItems = 0;
    return this.items;
  }
}
