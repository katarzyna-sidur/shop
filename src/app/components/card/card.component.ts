import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order.model';
import { Shipping } from 'src/app/models/shipping.model';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

    pageTitle = 'Shopping Cart';
    categoryTitle = 'Your cart';

    orderlist: Array<Order>;
    shippingList = [];

    shipping = 3;
    selectShipping: Shipping =  {id: 3, name: 'Personal Pickup', price: 0.00};

    constructor(private orderService: OrderService,  private router: Router) { }

    ngOnInit() {
        this.orderlist = this.orderService.getOrders();
        this.orderService.getShippingOptions().subscribe((data) => {
            this.shippingList = data;
        });
    }

    changeAmount(item: Order, value: number) {
        this.orderService.changeAmount(item, value);
    }

    getTotalPrice() {
        return this.orderService.sumTotal();
    }

    getShippingPrice(object: Shipping) {
        this.selectShipping =  this.orderService.getShippingObject(object.id);
    }

    backToCategory() {
        this.router.navigate(['/home']);
    }

    removeOrder(order: Order) {
        this.orderService.removeOrder(order.item.$key);
    }

     viewProduct(product: Product) {
        this.router.navigate(['/product/', product.$key], {
        });
    }
}
