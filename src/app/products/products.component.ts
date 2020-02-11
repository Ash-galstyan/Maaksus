import { Component, OnInit, Renderer2 } from '@angular/core';
import { ProductsService } from '../core/products.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  faShoppingCart = faShoppingCart;
  faEye = faEye;
  productImage: any;
  constructor(private productsService: ProductsService, private renderer: Renderer2) { }

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

  public onIntersection({ target, visible }: { target: Element; visible: boolean }): void {
    this.renderer.addClass(target, visible ? 'fadeIn' : 'notFadeIn');
    this.renderer.removeClass(target, visible ? 'notFadeIn' : 'fadeIn');
  }
}
