import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

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
        const order: Order = {
            amount: 1,
            item: product,
            size: 'S'
        };
        this.orderService.addOrder(order);
    }

}
