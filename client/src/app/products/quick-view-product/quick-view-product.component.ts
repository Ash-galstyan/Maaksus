import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quick-view-product',
  templateUrl: './quick-view-product.component.html',
  styleUrls: ['./quick-view-product.component.scss']
})
export class QuickViewProductComponent implements OnInit {
  slides: any[] = [];
  product: any = {};
  galleryThumbs: {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true
  };
  config = {
    effect: 'fade',
    speed: 1500,
    pagination: {
      type: 'fraction',
      el: '.swiper-pagination',
      clickable: true
    },
    autoplay: {
      delay: 5000,
    },
    loop: true,
    // fadeEffect: {crossFade: true},
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    thumbs: {
      swiper: this.galleryThumbs
    }
  };

  constructor(
    private cartService: CartService,
    private toastService: ToastrService,
    public modalRef: BsModalRef,
    private router: Router
  ) {
  }

  ngOnInit() {
    // this.slides = this.product.detailImages;
  }

  addToCart() {
    this.cartService.addToCart(this.product, 'increment');
    this.toastService.success('Product added to cart');
    this.modalRef.hide();
  }

  goToProductDetailPage() {
    this.modalRef.hide();
    this.router.navigate(['./products/detail/', this.product.id], {
      queryParams: {
        productId: this.product.id
      }
    });
  }

}
