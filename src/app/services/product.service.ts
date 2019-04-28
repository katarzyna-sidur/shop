import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { AngularFireDatabase, AngularFireList, AngularFireObject, } from '@angular/fire/database';
import { take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    products: AngularFireList<Product[]> = null;
    product: AngularFireObject<Product> = null;


    constructor(private db: AngularFireDatabase) { }

    getProductsList(page: number = 1, size: number = 1) {
        const total = page * size;

        this.products = this.db.list('products', ref => ref
            .limitToFirst(total)
        );
        return this.products.snapshotChanges()
            .pipe(
                take(1)
            );
    }

}
