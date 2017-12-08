import { Component, Input } from '@angular/core';
import { Restaurant } from '../../../models/restaurant';


@Component({
    selector: 'app-restaurantServices',
    templateUrl: './restaurantServices.component.html',
    styleUrls: ['./restaurantServices.component.css']
})
export class RestaurantServicesComponent {

    @Input() myRestaurant: Restaurant;


    constructor() {
    }




}
