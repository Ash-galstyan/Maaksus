import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Carousel, Product } from '../../models/product.model';
import { share } from 'rxjs/operators';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  constructor(private http: HttpClient) {
  }

  loadProducts() {
    const obs = this.http.get('/api/products').pipe(share());
    obs.subscribe((res: any) => {
      this.products = res.products;
    });
    return obs;
  }

  loadRecommendedProducts(user: any) {
    return this.loadPopularProducts();
  }

  loadMainCarousel() {
    return this.http.get('/api/mainCarousel');
  }

  loadPopularProducts() {
    return this.http.get('/api/popularProducts');
  }
}
