import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';

declare var $: any;

export interface Product {
    title: string;
    price: number;
}

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, AfterViewInit {

    products: Product[] = [];
    page = 0;

    constructor(private db: AngularFireDatabase, private productService: ProductService) { }

    ngOnInit() {
        this.loadMore();
    }

    loadMore() {
        this.page += 1;
        this.productService.getProductsList(this.page, 3).subscribe(result => {
             this.products = [];
            result.forEach(item => {
                const obj = item.payload.toJSON();
                obj['$key'] = item.key;
                this.products.push(obj as Product);
            });
        });
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

        if ($('.home_slider_nav_prev').length) {
            const prev = $('.home_slider_nav_prev');
            prev.on('click', function () {
                homeSlider.trigger('prev.owl.carousel');
            });
        }

        if ($('.home_slider_nav_next').length) {
            const next = $('.home_slider_nav_next');
            next.on('click', function () {
                homeSlider.trigger('next.owl.carousel');
            });
        }

        /* Custom dots events */
        if ($('.home_slider_custom_dot').length) {
            $('.home_slider_custom_dot').on('click', function () {
                $('.home_slider_custom_dot').removeClass('active');
                $(this).addClass('active');
                homeSlider.trigger('to.owl.carousel', [$(this).index(), 1200]);
            });
        }

        /* Change active class for dots when slide changes by nav or touch */
        homeSlider.on('changed.owl.carousel', function (event) {
            $('.home_slider_custom_dot').removeClass('active');
            $('.home_slider_custom_dots li').eq(event.page.index).addClass('active');
        });
    }

}
