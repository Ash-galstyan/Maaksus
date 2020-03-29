import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './fragments/navigation/navigation.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './fragments/footer/footer.component';
import { ServicesPageComponent } from './services-page/services-page.component';
import { ProductsComponent } from './products/products.component';
import { ContactComponent } from './contact/contact.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HeaderComponent } from './fragments/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from './core/services/products.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDropdownModule, CarouselModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainCarouselComponent } from './fragments/main-carousel/main-carousel.component';
import { TestimonyComponent } from './fragments/testimony/testimony.component';
import { SWIPER_CONFIG, SwiperConfigInterface, SwiperModule } from 'ngx-swiper-wrapper';
import { StatisticsComponent } from './fragments/statistics/statistics.component';
import { NewsletterComponent } from './fragments/newsletter/newsletter.component';
import { ServicesSummaryComponent } from './fragments/services-summary/services-summary.component';
import { InViewportModule } from 'ng-in-viewport';
import { TestimoniesService } from './core/services/testimonies.service';
import { ProductsResolver } from './core/resolvers/products.resolver';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    AboutComponent,
    FooterComponent,
    ServicesPageComponent,
    ProductsComponent,
    ContactComponent,
    ProductDetailsComponent,
    HeaderComponent,
    MainCarouselComponent,
    TestimonyComponent,
    StatisticsComponent,
    NewsletterComponent,
    ServicesSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    CarouselModule.forRoot(),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    SwiperModule,
    InViewportModule
  ],
  providers: [
    ProductsService,
    TestimoniesService,
    ProductsResolver,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
