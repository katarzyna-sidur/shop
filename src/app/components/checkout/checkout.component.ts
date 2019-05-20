import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { User } from 'src/app/models/userDeatils.model';
import { Order } from 'src/app/models/order.model';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

    pageTitle = 'Checkout';
    categoryTitle = 'Your checkout';

    user: User = {
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
    };

    order: Order;

    constructor(private orderService: OrderService) { }

    ngOnInit() {
        this.order = this.orderService.getOrder();

        this.orderService.getOrder$().subscribe((result) => {
            this.order = result;
        });

    }



}
