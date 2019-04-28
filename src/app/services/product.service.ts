import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { AngularFireDatabase, AngularFireList, AngularFireObject,  } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    products: AngularFireList<Product[]> = null;
    product:  AngularFireObject<Product> = null;

  constructor(private db: AngularFireDatabase) { }

    getProductsList() {
        this.products = this.db.list('products');
        return this.products;
    }

}
