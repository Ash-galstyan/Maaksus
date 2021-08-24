import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faShoppingCart, faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import { CartComponent } from '../../core/components/cart/cart.component';
import { CartService } from '../../core/services/cart.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class NavigationComponent implements OnInit, OnDestroy {
  faShoppingCart = faShoppingCart;
  faBars = faBars;
  faSearch = faSearch;
  bsModalRef: BsModalRef;
  isLoginSectionVisible = false;

  constructor(
    private router: Router,
    private modalService: BsModalService,
    public cartService: CartService,
    private authService: AuthenticationService,
    private elRef: ElementRef
  ) {
  }

  ngOnInit() {
  }

  openCartModal() {
    this.bsModalRef = this.modalService.show(CartComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  toggleSection() {
    this.isLoginSectionVisible = !this.isLoginSectionVisible;
    this.isLoginSectionVisible ? this.elRef.nativeElement.ownerDocument.body.style.overflow = 'hidden' :
      this.elRef.nativeElement.ownerDocument.body.style.overflow = null;
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    // this.subscribeToCartChanges().unsubscribe();
  }

}
