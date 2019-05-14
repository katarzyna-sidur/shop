import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from '../../services/product.service';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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

    constructor(private productService: ProductService, private route: ActivatedRoute) { }

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




}
