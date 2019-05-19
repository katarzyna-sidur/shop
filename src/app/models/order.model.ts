import { OrderItem } from './orderItem.model';
import { User } from './userDeatils.model';
import { Delivery } from './delivery.model';
import { Coupon } from './coupon.model';

export interface Order {
    id: number;
    orderItem: OrderItem[];
    adress: User;
    payment: string;
    delivery: Delivery;
    coupon: Coupon;
    subtotal: number;
    total: number;
}
