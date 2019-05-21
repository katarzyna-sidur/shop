import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { OrderItem } from 'src/app/models/orderItem.model';

@Component({
    selector: 'app-product-page',
    templateUrl: './product-page.component.html',
    styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

    pageTitle = 'Product Page';
    categoryTitle: string;

    product: Product;
    size = 'S';

    constructor(private productService: ProductService,
        private actRoute: ActivatedRoute,
        private router: Router,
        private orderService: OrderService) { }

    ngOnInit() {
        const id = this.actRoute.snapshot.paramMap.get('id');
        this.productService.getProduct(id).subscribe((result) => {
            this.product = result;
            this.categoryTitle = this.productService.getCategoryName(this.product.categoryId);
        });
    }

    gotoCategory() {
        const name = this.categoryTitle.charAt(0).toLowerCase() + this.categoryTitle.slice(1);
        this.router.navigate(['/category', name]);
    }

       saveOrder(product: Product) {
        const order: OrderItem = {
            amount: 1,
            product: product,
            size: 'S'
        };
        this.orderService.addProduct(order);
    }


    goCard() {
        this.router.navigate(['/card']);
    }

    addToFavourities(product: Product) {
        this.productService.addToFavourities(product);
    }
}
