import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { User } from 'src/app/models/userDeatils.model';
import { Order } from 'src/app/models/order.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

    pageTitle = 'Checkout';
    categoryTitle = 'Your checkout';

    order: Order;

    paymentList = [];
    paymentId: number;

    constructor(private orderService: OrderService, private router: Router) { }

    ngOnInit() {
        this.order = this.orderService.getOrder();
        if (this.order.payment) {
            this.paymentId = this.order.payment.id;
        } else {
            this.paymentId = 1;
        }

        this.orderService.getOrder$().subscribe((result) => {
            this.order = result;
        });

        this.orderService.getPaymentOptions().subscribe((result) => {
            this.paymentList = result;
        });

    }

    onSelectPayment() {
        this.orderService.setSelectedPayment(this.paymentId);
    }

    saveOrder() {
        this.orderService.resetOrder();
        this.router.navigate(['/summary']);
    }

}
