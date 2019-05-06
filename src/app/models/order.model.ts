import { Product } from './product.model';

export interface Order {
    item: Product;
    amount: number;
    size: string;
}
