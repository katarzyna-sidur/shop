import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from '../../services/product.service';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order.model';
import { OrderItem } from 'src/app/models/orderItem.model';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    pageTitle = 'Search';
    categoryTitle = 'Search';

    products: Product[] = [];

    searchText: string;
    searchResult: Array<Product>;

    constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService) { }

    ngOnInit() {
        this.searchText = this.route.snapshot.params['term'];
        this.productService.getSearchProducts()
        .subscribe(result => {
            this.products = result;
              this.searchResult = this.products.filter((product: Product) => {
              return product.name.toLowerCase().includes(this.searchText.toLowerCase());
          });
        });
    }

     gotoCategory(product: Product) {
        const categoryTitle = this.productService.getCategoryName(product.categoryId);
        const name = categoryTitle.charAt(0).toLowerCase() + categoryTitle.slice(1);
        this.router.navigate(['/category', name]);
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
        this.productService.addToFavourities(product);
    }


}
