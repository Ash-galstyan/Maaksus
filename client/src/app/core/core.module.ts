import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from './services/products.service';
import { ProductsResolver } from './resolvers/products.resolver';
import { ImageService } from './services/image.service';
import { CounterComponent } from './components/counter/counter.component';
import { CartService } from './services/cart.service';
import { TestimoniesService } from './services/testimonies.service';
import { CartComponent } from './components/cart/cart.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LimitProductsShownPipe } from './pipes/limitProductsShown';
import { CarouselComponent } from './components/carousel/carousel.component';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  declarations: [CounterComponent, CartComponent, LimitProductsShownPipe, CarouselComponent],
  entryComponents: [
    CartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports: [CounterComponent, LimitProductsShownPipe, CarouselComponent]
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [
        ProductsService,
        ProductsResolver,
        ImageService,
        TestimoniesService,
        CartService,
        AuthenticationService
      ],
    };
  }
}
