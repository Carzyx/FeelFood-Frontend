import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from '../../../models/restaurant';


@Component({
    selector: 'app-restaurantServices',
    templateUrl: './restaurantServices.component.html',
    styleUrls: ['./restaurantServices.component.css']
})
export class RestaurantServicesComponent implements OnInit {

    @Input() myRestaurant;

    showItemDictionary = { showMenu: true, showCard: false};
    
    constructor() {
    }


    ngOnInit() {
        console.log("log info myRestaurant 222:")
        console.log(this.myRestaurant)
    }

    changeShowStatus(key) {

        var itemsList = Object.keys(this.showItemDictionary);
        for (var index = 0; index < itemsList.length; index++) {
            var specificKey = itemsList[index];
            this.showItemDictionary[specificKey] = specificKey == key ? true : false;
        }
    }

}
