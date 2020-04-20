import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ProductsService } from '../../core/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService, TabDirective } from 'ngx-bootstrap';
import { CartComponent } from '../../core/components/cart/cart.component';
import { CartService } from '../../core/services/cart.service';

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
  bsModalRef: BsModalRef;
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
  isProductDetailsVisible = true;
  frameStyle: string;

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private modalService: BsModalService
  ) {
  }

  get getProductDetails() {
    return this.activatedRoute.snapshot.data.products.filter(product => {
      return product.id === +this.productId;
    });
  }

  ngOnInit() {
    this.product = this.getProductDetails[0];
    this.subTitle = this.product.productName;
    this.frameStyle = '#000000';
  }

  toggleProductDetailsVisibility(data: TabDirective) {
    return this.isProductDetailsVisible = data.heading !== 'Choose Frames';
  }

  onFrameSelected(frameStyle: any) {
    this.frameStyle = frameStyle;
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    console.log('Added to cart');
    this.bsModalRef = this.modalService.show(CartComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
