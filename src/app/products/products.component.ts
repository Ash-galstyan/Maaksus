import {Component, ElementRef, HostListener, Input, OnInit, Renderer2, TemplateRef, ViewChild} from '@angular/core';
import { ProductsService } from '../core/services/products.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { animate, stagger, style, transition, trigger, query, keyframes } from '@angular/animations';
import {ActivatedRoute, Router} from '@angular/router';

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
  @ViewChild('productsTpl') productsTpl: ElementRef<any>;
  @Input() isInSeparatePage = true;

  products: any[] = [];
  resolverData: any = this.isInSeparatePage ? this.activatedRoute.snapshot.data : undefined;
  faShoppingCart = faShoppingCart;
  faEye = faEye;
  productsComponentIsInView = false;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.productsComponentIsInView = this.isInSeparatePage;
    this.getProducts();
  }

  getProducts() {
    return this.productsService.loadProducts().subscribe((products: any[]) => {
      this.products = products;
    });
  }

  addToCart() {
    console.log('Added to cart');
  }

  goToProductDetailPage(product) {
    this.router.navigate(['./products/detail/', product.id], {
      queryParams: {
        productId: product.id
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    if (!this.isInSeparatePage) {
      const componentPosition = this.productsTpl.nativeElement.offsetTop - 360;
      const scrollPosition = window.pageYOffset;

      if (scrollPosition >= componentPosition) {
        this.productsComponentIsInView = true;
      }
    }
  }
}
