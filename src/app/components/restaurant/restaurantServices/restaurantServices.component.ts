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
    showDictionaryMenu = new Array<boolean>();
    
    constructor() {
    }


    ngOnInit() {
        console.log(this.myRestaurant)
        this.createShowDictionaryMenu();        
    }

    changeShowStatus(key) {

        var itemsList = Object.keys(this.showItemDictionary);
        for (var index = 0; index < itemsList.length; index++) {
            var specificKey = itemsList[index];
            this.showItemDictionary[specificKey] = specificKey == key ? true : false;
        }
    }

    createShowDictionaryMenu(){

        for (var index = 0; index < this.myRestaurant.menus.length; index++) {
             this.showDictionaryMenu[index] = true;            
        }
    }

    changeShowIndexMenu(index) {
        
        this.showDictionaryMenu[index] = !this.showDictionaryMenu[index];       
    }
}
