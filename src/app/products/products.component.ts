import { Component, ElementRef, HostListener, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { ProductsService } from '../core/products.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { animate, stagger, style, transition, trigger, query, keyframes } from '@angular/animations';

function myInlineMatcherFn(fromState: string, toState: string, element: any, params: {[key:
    string]: any}): boolean {
  // notice that `element` and `params` are also available here
  return toState == 'show';
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    trigger('scrollAnimation', [
      transition('* => *', [
        // Initially the all cards are not visible
        query(':enter', style({ opacity: 0 }), { optional: true }),

        // Each card will appear sequentially with the delay of 300ms
        query(':enter', stagger('300ms', [
          animate('.5s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-50%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(-10px) scale(1.1)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
          ]))]), { optional: true }),

      ]),
    ])
  ]
})

export class ProductsComponent implements OnInit {
  @ViewChild('productsTpl') productsTpl: TemplateRef<any>;
  products: any[] = [];
  faShoppingCart = faShoppingCart;
  faEye = faEye;
  productsComponentIsInView = false;
  toState = 'hide';
  productsLength: number;

  constructor(
    private productsService: ProductsService,
    private renderer: Renderer2,
    public el: ElementRef
  ) { }

  ngOnInit() {
    this.getProducts();
    console.log(this.productsComponentIsInView);
    console.log(this.productsTpl);
  }

  getProducts() {
    return this.productsService.loadProducts().subscribe((products: any[]) => {
      this.products = products;
    });
  }

  addToCart() {
    console.log('Added to cart');
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.productsTpl.nativeElement.parentNode.offsetTop - 360;
    const scrollPosition = window.pageYOffset;

    if (scrollPosition >= componentPosition) {
      this.productsComponentIsInView = true;
      console.log(this.productsComponentIsInView);
    }
  }
}
