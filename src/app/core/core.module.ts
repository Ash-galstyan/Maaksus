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

@NgModule({
  declarations: [CounterComponent, CartComponent],
  entryComponents: [
    CartComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [CounterComponent]
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
        CartService
      ],
    };
  }
}
