import { Component, Input, OnInit } from '@angular/core';
import { MapComponent } from '../../map/map.component';
import { Restaurant } from '../../../models/restaurant';
import { Order } from '../../../models/order';

import { EnvironmentHelper } from '../../../../environments/environment';
import { MapHelper } from '../../../helpers/mapHelper';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    @Input() myOrder: Order;

    constructor() {

    }

    ngOnInit() {

    }

}