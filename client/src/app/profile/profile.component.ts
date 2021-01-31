import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../core/services/authentication.service';
import { UserDetails } from '../models/user.model';
import { ProductsService } from '../core/services/products.service';
import { Router } from '@angular/router';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { QuickViewProductComponent } from '../products/quick-view-product/quick-view-product.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  details: UserDetails;
  products: any;
  faShoppingCart = faShoppingCart;
  faEye = faEye;
  bsModalRef: BsModalRef;

  constructor(
    private authService: AuthenticationService,
    private productsService: ProductsService,
    private router: Router,
    private cartService: CartService,
    private toastService: ToastrService,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
    this.authService.profile().subscribe(
      user => {
        this.details = user;
      },
      err => {
        console.error(err);
      }
    );
    this.productsService.loadPopularProducts().subscribe( (res: any) => {
      this.products = res.popularProducts;
    });
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

  addToCart(product: any) {
    this.cartService.addToCart(product, 'increment');
    this.toastService.success('Product added to cart');
    console.log('Added to cart');
  }

  openProductQuickViewModal(product) {
    this.bsModalRef = this.modalService.show(QuickViewProductComponent, {class: 'modal-lg'});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.slides = product.detailImages;
    this.bsModalRef.content.product = product;
  }

}
