import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../core/services/authentication.service';
import { UserDetails } from '../models/user.model';
import { ProductsService } from '../core/services/products.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  details: UserDetails;
  products: any;

  constructor(private authService: AuthenticationService, private productsService: ProductsService) { }

  ngOnInit() {
    this.authService.profile().subscribe(
      user => {
        this.details = user;
      },
      err => {
        console.error(err);
      }
    );
    this.productsService.loadRecommendedProducts(this.details).subscribe( (res: any) => {
      this.products = res.data[0].products;
    });
  }

}
