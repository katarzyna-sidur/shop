import { Product } from './product.model';

export interface OrderItem {
    product: Product;
    amount: number;
    size: string;
}
