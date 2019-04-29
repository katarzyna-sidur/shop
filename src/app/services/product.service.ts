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


    constructor(private db: AngularFireDatabase) { }

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


}
