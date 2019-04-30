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


const appRoutes: Routes = [
    { path: 'home', component: HomePageComponent },
    { path: 'category/:type', component: CategoryComponent },
    { path: 'product/:id', component: ProductPageComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        FooterComponent,
        TitleOverlayComponent,
        CategoryComponent,
        ProductPageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,

        RouterModule.forRoot(appRoutes),

        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireDatabaseModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
