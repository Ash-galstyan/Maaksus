import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TabDirective } from 'ngx-bootstrap/tabs';

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
    private modalService: BsModalService,
    private toastService: ToastrService
  ) {
  }

  get getProductDetails() {
    return this.activatedRoute.snapshot.data.products.data[0].products.filter(product => {
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
    this.cartService.addToCart(product, 'increment');
    this.toastService.success('Product added to cart');
    console.log('Added to cart');
  }

}
