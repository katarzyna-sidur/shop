import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { Subject, of } from 'rxjs';
import { Product } from '../models/product.model';
import { OrderItem } from '../models/orderItem.model';
import { Delivery } from '../models/delivery.model';
import { CouponService } from './coupon.service';
import { Payment } from '../models/payment.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})
export class OrderService {


    private order$: Subject<Order> = new Subject<Order>();
    private order: Order = {
        $key: '',
        orderItem: [],
        adress: {
            firstName: null,
            lastName: null,
            company: null,
            country: null,
            adress1: null,
            adress2: null,
            zipCode: null,
            city: null,
            province: null,
            phone: null,
            email: null,
        },
        payment: { id: 1, name: 'Paypal' },
        delivery: { id: 3, name: 'Personal Pickup', price: 0.00 },
        coupon: null,
        subtotal: 0,
        total: 0,
    };

    private deliveryOptions: Delivery[] = [
        { id: 1, name: 'Next day delivery', price: 4.99 },
        { id: 2, name: 'Standard delivery', price: 1.99 },
        { id: 3, name: 'Personal Pickup', price: 0.00 }
    ];

    private paymentOptions: Payment[] = [
        { id: 1, name: 'Paypal' },
        { id: 2, name: 'Cash on Delivery' },
        { id: 3, name: 'Credit Card' }
    ];

    constructor(private couponService: CouponService) {
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

        if (this.order.delivery) {
            this.order.total = this.order.subtotal + this.order.delivery.price;
        }

        if (this.order.coupon) {
            const couponValue = this.order.total * this.order.coupon.percent / 100;
            this.order.total = this.order.total - couponValue;
        }

    }

    changeAmount(item: OrderItem, value: number) {
        const found = this.order.orderItem.find(e => e.product.$key === item.product.$key);
        found.amount = found.amount + value;
        this.recalculatePrice();
        this.order$.next(this.order);
    }

    getDeliveryOptions() {
        return of(this.deliveryOptions);
    }

    setSelectedDelivery(id: number) {
        this.order.delivery = this.deliveryOptions.find(e => e.id === id);
        this.recalculatePrice();
        this.order$.next(this.order);
    }

    setCoupon(code: string) {
        this.couponService.getCupons().subscribe((result) => {
            const coupon = result.find(e => e.code.toLowerCase() === code.toLowerCase());
            this.order.coupon = coupon;
            this.recalculatePrice();
        });
    }

    removeOrder(id: string) {
        const i = this.order.orderItem.findIndex(e => e.product.$key === id);
        if (i !== -1) {
            this.order.orderItem.splice(i, 1);
        }
        this.recalculatePrice();
        this.order$.next(this.order);
    }

    getPaymentOptions() {
        return of(this.paymentOptions);
    }

    setSelectedPayment(id: number) {
        this.order.payment = this.paymentOptions.find(e => e.id === id);
        this.order$.next(this.order);
    }

    resetOrder() {
        this.order = {
            $key: '',
            orderItem: [],
            adress: {
                firstName: null,
                lastName: null,
                company: null,
                country: null,
                adress1: null,
                adress2: null,
                zipCode: null,
                city: null,
                province: null,
                phone: null,
                email: null,
            },
            payment: { id: 1, name: 'Paypal' },
            delivery: { id: 3, name: 'Personal Pickup', price: 0.00 },
            coupon: null,
            subtotal: 0,
            total: 0,
        };
        this.order$.next(this.order);
    }
}


