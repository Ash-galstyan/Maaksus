import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Carousel } from '../../models/product.model';

@Component({
  selector: 'app-main-carousel',
  templateUrl: './main-carousel.component.html',
  styleUrls: ['./main-carousel.component.scss']
})
export class MainCarouselComponent implements OnInit {
  slides: Carousel[] = [];
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

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.productsService.loadMainCarousel().subscribe((res: any) => {
      this.slides = res.data;
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
