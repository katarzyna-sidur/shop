import { OrderItem } from './orderItem.model';
import { User } from './userDeatils.model';
import { Delivery } from './delivery.model';
import { Coupon } from './coupon.model';
import { Payment } from './payment.model';

export interface Order {
    $key: string;
    orderItem: OrderItem[];
    adress: User;
    payment: Payment;
    delivery: Delivery;
    coupon: Coupon;
    subtotal: number;
    total: number;
}
