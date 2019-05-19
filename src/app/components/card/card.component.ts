import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { OrderItem } from '../../models/orderItem.model';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

    pageTitle = 'Shopping Cart';
    categoryTitle = 'Your cart';

    order: Order;

    constructor(private orderService: OrderService, private router: Router) {
    }

    ngOnInit() {
        this.order = this.orderService.getOrder();

        this.orderService.getOrder$().subscribe((result) => {
            this.order = result;
        });
    }

    changeAmount(item: OrderItem, value: number) {
        this.orderService.changeAmount(item, value);
    }


}
