import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../core/products.service';

@Component({
  selector: 'app-single-shop',
  templateUrl: './single-shop.component.html',
  styleUrls: ['./single-shop.component.scss']
})
export class SingleShopComponent implements OnInit {
title = 'Product Details';
subTitle: string;
products: any;
product: any;
  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.products = this.getProducts();
    console.log(this.products);
    this.subTitle = this.product.productName;
  }

  getProducts() {
    return this.productsService.loadProducts().subscribe(p => {
      console.log(p);
    });
  }

}
