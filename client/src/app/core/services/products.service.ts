import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable()
export class ProductsService {
  private products: Observable<Product[]>;

  constructor(private http: HttpClient) {
  }

  loadProducts() {
    return this.http.get('http://localhost:3000/products');
  }

  loadMainCarouselImages() {
    return this.http.get('http://localhost:3000/mainCarouselProducts');
  }
}
