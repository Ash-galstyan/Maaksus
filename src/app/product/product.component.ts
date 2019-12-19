import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../core/products.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  faShoppingCart = faShoppingCart;
  faEye = faEye;
  productImage: any;
  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    return this.productsService.loadProducts().subscribe((p: any[]) => {
      this.products = p;
    });
  }

  addToCart() {
    console.log('Added to cart');
  }
}
