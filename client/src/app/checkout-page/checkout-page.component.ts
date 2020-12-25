import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CartService } from '../core/services/cart.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {
  checkoutForm;

  constructor(private cartService: CartService, private formBuilder: FormBuilder) {
    this.checkoutForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      postalCode: '',
      phone: null,
      email: ''
    });
  }

  ngOnInit() {
  }

  onSubmit(customerData) {
    // Process checkout data here
    this.cartService.clearCart();
    this.checkoutForm.reset();

    console.warn('Your have been subscribed', customerData);
  }

}
