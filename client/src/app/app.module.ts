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
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { HeaderComponent } from './fragments/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainCarouselComponent } from './fragments/main-carousel/main-carousel.component';
import { TestimonyComponent } from './fragments/testimony/testimony.component';
import { SWIPER_CONFIG, SwiperConfigInterface, SwiperModule } from 'ngx-swiper-wrapper';
import { StatisticsComponent } from './fragments/statistics/statistics.component';
import { NewsletterComponent } from './fragments/newsletter/newsletter.component';
import { ServicesSummaryComponent } from './fragments/services-summary/services-summary.component';
import { InViewportModule } from 'ng-in-viewport';
import { FileUploaderComponent } from './ui/file-uploader/file-uploader.component';
import { CoreModule } from './core/core.module';
import { FramesComponent } from './ui/frames/frames.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxCheckboxModule } from 'ngx-checkbox';
import { NgxPaginationModule } from 'ngx-pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';
import { QuickViewProductComponent } from './products/quick-view-product/quick-view-product.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ProfileComponent } from './profile/profile.component';
import { FavoritesComponent } from './fragments/favorites/favorites.component';

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
    ServicesSummaryComponent,
    FileUploaderComponent,
    FramesComponent,
    CheckoutPageComponent,
    QuickViewProductComponent,
    AuthenticationComponent,
    ProfileComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    CoreModule.forRoot(),
    CarouselModule.forRoot(),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    SwiperModule,
    InViewportModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-top-center'
    }),
    ReactiveFormsModule,
    NgxNavbarModule,
    NgSelectModule,
    FormsModule,
    NgxCheckboxModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [QuickViewProductComponent]
})
export class AppModule {
}
