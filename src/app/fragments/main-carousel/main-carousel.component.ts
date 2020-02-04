import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/products.service';

@Component({
  selector: 'app-main-carousel',
  templateUrl: './main-carousel.component.html',
  styleUrls: ['./main-carousel.component.scss']
})
export class MainCarouselComponent implements OnInit {
  slides: any[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.loadMainCarouselImages();
  }

  loadMainCarouselImages() {
    return this.productsService.loadMainCarouselImages().subscribe((products: any) => {
      this.slides = products;
    });
  }

}
