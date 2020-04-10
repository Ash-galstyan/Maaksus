import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServicesPageComponent } from './services-page/services-page.component';
import { ProductsComponent } from './products/products.component';
import { ContactComponent } from './contact/contact.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import {ProductsResolver} from './core/resolvers/products.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'products',
    resolve: {
      products: ProductsResolver
    },
    data: {
      name: 'Products'
    },
    children: [
      {
        path: '',
        component: ProductsComponent
      },
      {
        path: 'detail/:productId',
        component: ProductDetailsComponent,
        data: {
          name: 'Product Details'
        }
      }
    ]
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'services-page',
    component: ServicesPageComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
