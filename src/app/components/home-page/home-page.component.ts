import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/models/product.model';
import { Router } from '@angular/router';

declare var $: any;

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, AfterViewInit {

    products: Product[] = [];
    product: Product;
    page = 0;
    category = 1;

    constructor(private db: AngularFireDatabase, private productService: ProductService, private router: Router) { }

    ngOnInit() {
        this.loadMore();
    }

    loadMore() {
        this.page += 1;
        this.productService.getProductsList(this.page, 3, this.category).subscribe(result => {
            this.products = result;
            console.log(this.products);
        });
    }

    setCategory(categoryId: number) {
        this.page = 0;
        this.category = categoryId;
        this.loadMore();
    }

    viewProduct(product: Product) {
        this.router.navigate(['/product/', product.$key], {
        });
    }

    gotoCategory(product: Product) {
        const categoryTitle = this.productService.getCategoryName(product.categoryId);
        const name = categoryTitle.charAt(0).toLowerCase() + categoryTitle.slice(1);
        this.router.navigate(['/category', name]);
    }

    ngAfterViewInit() {
        const homeSlider = $('.home_slider');
        homeSlider.owlCarousel({
            items: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            loop: true,
            mouseDrag: true,
            smartSpeed: 1200,
            nav: false,
            dots: false,
            responsive:
            {
                0:
                {
                    mouseDrag: true
                },
                558:
                {
                    mouseDrag: false
                }
            }
        });
    }

}
