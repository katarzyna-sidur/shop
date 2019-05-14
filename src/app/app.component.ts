import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from './services/order.service';
import { Order } from './models/order.model';
import { Product } from './models/product.model';
import { ProductService } from './services/product.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'shop';
    orderlist: Array<Order>;
    cartTotalSum = 0;
    favouriteList: Array<Product>;

    products: Product[];

    searchValue = '';


    constructor(private router: Router, private orderService: OrderService, private productService: ProductService) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => {
            return false;
        };
    }

    ngOnInit(): void {
        this.orderlist = this.orderService.getOrders();
        this.orderService.sumTotal$().subscribe((result) => {
            this.cartTotalSum = result;
        });
        this.favouriteList = this.productService.getFavourities();

    }

    removeOrder(order: Order) {
        this.orderService.removeOrder(order.item.$key);
    }

    viewProduct(product: Product) {
        this.router.navigate(['/product/', product.$key], {
        });
    }

    goCard() {
        this.router.navigate(['/card']);
    }

    goSearch() {
        this.router.navigate(['/search']);
    }

    getSearch(a: string) {
        return this.products.filter((product: Product) => {
            return product.name.toLowerCase().includes(a.toLowerCase());
        });
    }

    onSearch(term: string) {
         this.router.navigate(['search', term]);
    }

}

