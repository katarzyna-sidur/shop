import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { OrderItem } from '../../models/orderItem.model';
import { Delivery } from 'src/app/models/delivery.model';
import { Product } from 'src/app/models/product.model';


@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

    pageTitle = 'Shopping Cart';
    categoryTitle = 'Your cart';

    order: Order;

    deliveryList = [];
    deliveryId: number;
    coupon: string;

    constructor(private orderService: OrderService, private router: Router) {
    }

    ngOnInit() {
        this.order = this.orderService.getOrder();
        if (this.order.delivery) {
            this.deliveryId = this.order.delivery.id;
        } else {
            this.deliveryId = 3;
        }

        this.orderService.getOrder$().subscribe((result) => {
            this.order = result;
        });

        this.orderService.getDeliveryOptions().subscribe((result) => {
            this.deliveryList = result;
        });

    }

    changeAmount(item: OrderItem, value: number) {
        this.orderService.changeAmount(item, value);
    }

    onSelectDelivery() {
        this.orderService.setSelectedDelivery(this.deliveryId);
    }

    goToCheckout() {
        this.router.navigate(['/checkout']);
    }

    checkCoupon() {
        this.orderService.setCoupon(this.coupon);
    }

    backToCategory() {
        this.router.navigate(['/home']);
    }

    removeOrder(orderItem: OrderItem) {
        this.orderService.removeOrder(orderItem.product.$key);
    }

    viewProduct(product: Product) {
        this.router.navigate(['/product/', product.$key], {
        });
    }
}
