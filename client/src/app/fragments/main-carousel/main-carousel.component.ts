import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-carousel',
  templateUrl: './main-carousel.component.html',
  styleUrls: ['./main-carousel.component.scss']
})
export class MainCarouselComponent implements OnInit {
  slides: any[] = [];
  config = {
    effect: 'fade',
    speed: 1500,
    pagination: {
      type: 'bullets',
      el: '.swiper-pagination',
      clickable: true
    },
    autoplay: {
      delay: 5000,
    },
    fadeEffect: {crossFade: true}
  };

  constructor(private productsService: ProductsService, private router: Router) {
  }

  ngOnInit() {
    this.loadMainCarouselImages();
  }

  loadMainCarouselImages() {
    return this.productsService.loadMainCarouselImages().subscribe((products: any) => {
      this.slides = products;
    });
  }

  goToProductDetailPage(product) {
    this.router.navigate(['./products/detail/', product.id], {
      queryParams: {
        productId: product.id
      }
    });
  }
}