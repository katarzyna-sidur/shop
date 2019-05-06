import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { Subject, of } from 'rxjs';
import { Shipping } from '../models/shipping.model';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private orderList: Array<Order> = [];
    private totalPrice: Subject<number> = new Subject<number>();
    private totalPriceWithShipping: Subject<number> = new Subject<number>();

    private shippingOptions: Shipping[] =  [
        {id: 1, name: 'Next day delivery', price: 4.99},
        {id: 2, name: 'Standard delivery', price: 1.99},
        {id: 3, name: 'Personal Pickup', price: 0.00}
    ];

    constructor() {
        this.totalPrice.next(0);
    }

    getShippingOptions() {
        return of(this.shippingOptions);
    }

    getShippingObject(id: number) {
       const obj = this.shippingOptions.find((data) => data.id === id);
       return obj;
    }

    sumTotal$() {
        return this.totalPrice.asObservable();
    }

    getOrders() {
        return this.orderList;
    }

    addOrder(order: Order) {
        this.orderList.push(order);

        this.totalPrice.next(this.sumTotal());
    }

    sumTotal() {
        let total = 0;
        this.orderList.forEach((item) => {
            total += item.item.price * item.amount;
        });
        return total;
    }

    changeAmount(item: Order, value: number) {
        item.amount = item.amount + value;

        this.totalPrice.next(this.sumTotal());
    }

}
