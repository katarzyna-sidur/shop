import { Injectable } from '@angular/core';
import { Coupon } from '../models/coupon.model';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CouponService {

    private couponList: Coupon[] = [
        { id: 1, code: 'aa20', percent: 20 },
        { id: 2, code: 'bb10', percent: 10 }
    ];

    constructor() { }

    getCupons() {
        return of(this.couponList);
    }
}
