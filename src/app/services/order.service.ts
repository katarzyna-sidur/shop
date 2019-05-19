import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { Subject, of } from 'rxjs';
import { Product } from '../models/product.model';
import { OrderItem } from '../models/orderItem.model';
import { Delivery } from '../models/delivery.model';

@Injectable({
    providedIn: 'root'
})
export class OrderService {


    private order$: Subject<Order> = new Subject<Order>();
    private order: Order = {
        id: null,
        orderItem: [],
        adress: null,
        payment: null,
        delivery: null,
        coupon: null,
        subtotal: null,
        total: null,
    };



    constructor() {
    }

    getOrder$() {
        return this.order$.asObservable();
    }

    getOrder() {
        return this.order;
    }

    addProduct(item: OrderItem) {
        this.order.orderItem.push(item);
        this.recalculatePrice();
        this.order$.next(this.order);
    }

    private recalculatePrice() {
        let subtotal = 0;
        this.order.orderItem.forEach((item) => {
            subtotal += item.product.price * item.amount;
        });
        this.order.subtotal = Math.round(subtotal * 100) / 100;
    }

    changeAmount(item: OrderItem, value: number) {
        const found = this.order.orderItem.find(e => e.product.$key === item.product.$key);
        found.amount = found.amount + value;
        this.recalculatePrice();
        this.order$.next(this.order);
    }

}


