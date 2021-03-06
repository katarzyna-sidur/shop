import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { AngularFireDatabase, AngularFireList, AngularFireObject, } from '@angular/fire/database';
import { take, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    products: AngularFireList<Product[]> = null;
    product: AngularFireObject<Product> = null;

    searchProducts: AngularFireList<Product[]> = null;

    private FavouriteProductsList: Array<Product> = [];

    constructor(private db: AngularFireDatabase) {
    }

    getProductsList(page: number = 1, size: number = 1, category: number) {
        const total = page * size;

        this.products = this.db.list('products', ref => ref
            .limitToFirst(total)
            .orderByChild('categoryId')
            .equalTo(category)
        );

        return this.products.snapshotChanges()
            .pipe(
                take(1),
                map(e => {
                    return e.map(el => {
                        const obj = el.payload.toJSON();
                        obj['$key'] = el.key;
                        return obj as Product;
                    });
                }),
            );
    }

    getCategoryName(id: number) {
        switch (id) {
            case 1:
                return 'Women';
            case 2:
                return 'Men';
            case 3:
                return 'Kids';
            default:
                return '';
        }
    }

    getCategoryId(type: string) {
        switch (type) {
            case 'women':
                return 1;
            case 'men':
                return 2;
            case 'kids':
                return 3;
            default:
                return 0;
        }
    }

    getProduct(id: string) {
        this.product = this.db.object('products/' + id);
        return this.product.valueChanges();
    }

    addToFavourities(product: Product) {
        this.FavouriteProductsList.push(product);
    }

    getFavourities() {
        return this.FavouriteProductsList;
    }

    removeFavProd(id: string) {
        const i = this.FavouriteProductsList.findIndex(e => e.$key === id);
        if (i !== -1) {
            this.FavouriteProductsList.splice(i, 1);
        }
    }

    getSearchProducts() {
        this.searchProducts = this.db.list('products'
        );
        return this.searchProducts.snapshotChanges()
            .pipe(
                take(1),
                map(e => {
                    return e.map(el => {
                        const obj = el.payload.toJSON();
                        obj['$key'] = el.key;
                        return obj as Product;
                    });
                }),
            );
    }


}
