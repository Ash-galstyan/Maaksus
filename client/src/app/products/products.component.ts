import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { ProductsService } from '../core/services/products.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { animate, stagger, style, transition, trigger, query, keyframes } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { Category, Product } from '../models/product.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { QuickViewProductComponent } from './quick-view-product/quick-view-product.component';

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
  @Output() productAdded = new EventEmitter();

  products: Product[] = [];
  resolverData: any = this.isInSeparatePage ? this.activatedRoute.snapshot.data : undefined;
  faShoppingCart = faShoppingCart;
  faEye = faEye;
  productsComponentIsInView = false;
  rememberLoginControl = new FormControl();
  sortingOptions = [
    {
      value: 'lowToHigh',
      label: 'Price, Low to High'
    },
    {
      value: 'highToLow',
      label: 'Price, High to Low'
    },
    {
      value: 'mostRecent',
      label: 'Most Recent'
    }
  ];
  sortedOption = 'lowToHigh';
  filters: any[];
  categoriesModel: Category = {};
  page = 1;
  bsModalRef: BsModalRef;
  isFilterSectionVisible = false;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private modalService: BsModalService,
    private toastService: ToastrService,
    private elRef: ElementRef
  ) { }

  ngOnInit() {
    this.productsComponentIsInView = this.isInSeparatePage;
    if (this.isInSeparatePage) {
      this.products = this.productsService.products;
    } else {
      this.productsService.loadPopularProducts().subscribe((res: any) => {
        this.products = res.popularProducts;
      });
    }
    this.filters = [
      {
        name: 'Artists',
        description: 'artists',
        id: 1,
        fields: [
          {
            name: 'Alan Mazetti',
            description: 'alanMazetti',
            value: '',
            id: 1
          },
          {
            name: 'Alfred Hansl',
            description: 'alfredHansl',
            value: '',
            id: 2
          },
          {
            name: 'Pablo Picasso',
            description: 'pabloPicasso',
            value: '',
            id: 2
          }
        ]
      },
      {
        name: 'Alignment',
        description: 'alignment',
        id: 2,
        fields: [
          {
            name: 'Portrait',
            description: 'portrait',
            value: '',
            id: 1
          },
          {
            name: 'Panorama',
            description: 'panorama',
            value: '',
            id: 2
          }
        ]
      }
    ];
  }

  addToCart(product: any) {
    this.cartService.addToCart(product, 'increment');
    this.toastService.success('Product added to cart');
    console.log('Added to cart');
  }

  goToProductDetailPage(product, event) {
    event.stopPropagation();
    if (event.target.className === 'product-icon-wrapper') {
      this.router.navigate(['./products/detail/', product.id], {
        queryParams: {
          productId: product.id
        }
      });
    }
  }

  openProductQuickViewModal(product) {
    this.bsModalRef = this.modalService.show(QuickViewProductComponent, {class: 'modal-lg'});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.slides = product.detailImages;
    this.bsModalRef.content.product = product;
  }

  filterCategories(event) {
    console.log(event);
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

  toggleSection() {
    this.isFilterSectionVisible = !this.isFilterSectionVisible;
    this.isFilterSectionVisible ? this.elRef.nativeElement.ownerDocument.body.style.overflow = 'hidden' :
      this.elRef.nativeElement.ownerDocument.body.style.overflow = null;
  }
}
