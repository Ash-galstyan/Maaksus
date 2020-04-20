import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap';
import { Product } from '../../models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CartService {
  @Output() productAdded = new EventEmitter();
  items: any[] = [];

  private readonly cartItemChanges: BehaviorSubject<Product[]>;

  cartItems(): Observable<any> {
    const items = new BehaviorSubject([]);
    items.next(this.items);
    return items;
  }

  constructor(
    private http: HttpClient,
    private modalService: BsModalService
  ) {
    this.cartItemChanges = new BehaviorSubject<Product[]>([]);
  }

  addToCart(product: any): Observable<any> {
    const productExistInCart = this.items.find(({name}) => name === product.productName);
    if (!productExistInCart) {
      this.items.push({...product, num: 1}); // enhance "porduct" opject with "num" property
      this.cartItemChanges.next(this.items);
      return;
    }
    productExistInCart.num += 1;
  }

  getItems() {
    return this.items;
  }

  getCartItemChanges() {
    return this.cartItemChanges.pipe(
      map(items => items.filter((o: Product) => {
        return o;
      }))
    );
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  // removeFromCart() {
  //   return this.http.get('http://localhost:3000/mainCarouselProducts');
  // }
}
