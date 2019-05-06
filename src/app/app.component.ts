import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from './services/order.service';
import { Order } from './models/order.model';
import { Product } from './models/product.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

     title = 'shop';
     orderlist: Array<Order>;
     cartTotalSum = 0;

    constructor(private router: Router, private orderService: OrderService) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => {
            return false;
        };
    }

    ngOnInit(): void {
        this.orderlist = this.orderService.getOrders();
        this.orderService.sumTotal$().subscribe((result) => {
            this.cartTotalSum = result;
        });
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

}

