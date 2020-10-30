import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import {ProductsService} from '../services/products.service';

@Injectable()
export class ProductsResolver implements Resolve<any> {

  constructor(private productsService: ProductsService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot) {
    return this.productsService.loadProducts();
  }
}
