import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../core/services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public productsService: ProductsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // console.log(this.productsService.mainCarouselProducts);
    // console.log(this.activatedRoute.snapshot.data.products);
  }

}
