import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { TitleOverlayComponent } from './components/title-overlay/title-overlay.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { CardComponent } from './components/card/card.component';
import { BsDropdownModule, TypeaheadModule } from 'ngx-bootstrap';
import { FavouriteProductsComponent } from './components/favourite-products/favourite-products.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { SearchComponent } from './components/search/search.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SummaryComponent } from './components/summary/summary.component';



const appRoutes: Routes = [
    { path: 'home', component: HomePageComponent },
    { path: 'category/:type', component: CategoryComponent },
    { path: 'product/:id', component: ProductPageComponent },
    { path: 'card', component: CardComponent },
    { path: 'favourite', component: FavouriteProductsComponent },
    { path: 'contact', component: ContactPageComponent },
    { path: 'search/:term', component: SearchComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'summary', component: SummaryComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        FooterComponent,
        TitleOverlayComponent,
        CategoryComponent,
        ProductPageComponent,
        CardComponent,
        FavouriteProductsComponent,
        ContactPageComponent,
        SearchComponent,
        CheckoutComponent,
        SummaryComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,

        RouterModule.forRoot(appRoutes),

        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireDatabaseModule,

        BsDropdownModule.forRoot(),
        TypeaheadModule.forRoot(),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
