import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductsService} from '../core/services/products.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  title = 'Product Details';
  subTitle: string;
  productId: number = this.activatedRoute.snapshot.params['productId'];
  product: any;
  config = {
    pagination: {
      type: 'fraction',
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 5000,
    },
    fadeEffect: {crossFade: true}
  };
  slides: any[] = [];

  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute) {
  }

  get getProductDetails() {
    return this.activatedRoute.snapshot.data.products.filter(product => {
      return product.id === +this.productId;
    });
  }

  ngOnInit() {
    this.product = this.getProductDetails[0];
    this.subTitle = this.product.productName;
  }

}
