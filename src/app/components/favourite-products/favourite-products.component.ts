import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
    selector: 'app-favourite-products',
    templateUrl: './favourite-products.component.html',
    styleUrls: ['./favourite-products.component.css']
})
export class FavouriteProductsComponent implements OnInit {

    pageTitle = 'Favourite Products';
    categoryTitle = 'Your Favourite';

    favouriteProductList = [];

    constructor(private productService: ProductService,  private router: Router, private orderService: OrderService) { }

    ngOnInit() {
        this.favouriteProductList = this.productService.getFavourities();
    }

    removeFromList(product: Product) {
        this.productService.removeFavProd(product.$key);
    }

     viewProduct(product: Product) {
        this.router.navigate(['/product/', product.$key], {
        });
    }

    FromFavToCart(product: Product) {
        const order: Order = {
            amount: 1,
            item: product,
            size: 'S'
        };
        this.orderService.addOrder(order);
        this.removeFromList(product);
    }

     goCard() {
        this.router.navigate(['/card']);
    }

    backToCategory() {
        this.router.navigate(['/home']);
    }
}
