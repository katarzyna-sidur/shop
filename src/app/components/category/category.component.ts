import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { OrderItem } from 'src/app/models/orderItem.model';



@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

    pageTitle = 'Category Page';
    categoryTitle: string;

    category: number;
    page = 0;

    products: Product[] = [];

    constructor(private route: ActivatedRoute,
        private productServices: ProductService,
        private router: Router,
        private orderService: OrderService) { }

    ngOnInit() {
        this.categoryTitle = this.route.snapshot.params['type'];
        this.category = this.productServices.getCategoryId(this.categoryTitle);
        this.loadMore();
    }

    loadMore() {
        this.page += 1;
        this.productServices.getProductsList(this.page, 6, this.category).subscribe(result => {
            this.products = result;
        }
        );
    }

    viewProduct(product: Product) {
        this.router.navigate(['/product/', product.$key], {
        });
    }

    saveOrder(product: Product) {
        const order: OrderItem = {
            amount: 1,
            product: product,
            size: 'S'
        };
        this.orderService.addProduct(order);
    }

    addToFavourities(product: Product) {
        this.productServices.addToFavourities(product);
    }

    sort(option: string) {
        this.products = this.products.sort((a, b) => {
            if (a[option] > b[option]) {
                return 1;
            } else if (a[option] < b[option]) {
                return -1;
            } else if (a[option] === b[option]) {
                return 0;
            }
        });
    }

}
