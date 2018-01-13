import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Restaurant } from '../../../models/restaurant';
import { Menu } from '../../../models/menu';
import { Dish } from '../../../models/dish';
import { Order } from '../../../models/order';


@Component({
    selector: 'app-restaurantServices',
    templateUrl: './restaurantServices.component.html',
    styleUrls: ['./restaurantServices.component.css']
})
export class RestaurantServicesComponent implements OnInit {

    @Input() myRestaurant;

    @Output() myOrderOutput: EventEmitter<Order> = new EventEmitter();

    private myOrder: Order;


    showItemDictionary = { showMenu: true, showCard: false };
    showDictionaryMenu = new Array<boolean>();

    constructor() {

        this.myOrder = new Order();
        this.myOrder.menusDetails = new Array<Menu>();
        this.myOrder.dishesDetails = new Array<Dish>();
    }

    ngOnInit() {
        if (this.myRestaurant != undefined || null) {
            this.createShowDictionaryMenu();
        }
        this.sendOrder();
    }

    changeShowStatus(key) {

        var itemsList = Object.keys(this.showItemDictionary);
        for (var index = 0; index < itemsList.length; index++) {
            var specificKey = itemsList[index];
            this.showItemDictionary[specificKey] = specificKey == key ? true : false;
        }
    }

    createShowDictionaryMenu() {

        for (var index = 0; index < this.myRestaurant.menus.length; index++) {
            this.showDictionaryMenu[index] = true;
        }
    }

    changeShowIndexMenu(index) {

        this.showDictionaryMenu[index] = !this.showDictionaryMenu[index];
    }

    dishToMenu(menu: Menu, dish: Dish, option: string) {

        var myMenu = this.myOrder.menusDetails.find(m => m.name == menu.name)
        var index = this.myOrder.menusDetails.indexOf(myMenu);
        if (!myMenu) {

            myMenu = new Menu();
            myMenu.name = menu.name;
            myMenu.description = menu.description;
            myMenu.comments = menu.comments;
            myMenu.price = menu.price;

            this.myOrder.menusDetails.push(myMenu);
            var index = this.myOrder.menusDetails.indexOf(myMenu);

            this.setOrRemoveOptionDishToMenu(this.myOrder.menusDetails[index], dish, option)

        }
        else {
            this.setOrRemoveOptionDishToMenu(myMenu, dish, option)
        }

        this.updateServiceTotalPrice();
        this.sendOrder();
    }

    setOrRemoveOptionDishToMenu(myMenu: Menu, dish: Dish, option: string) {

        var isDishAdded = myMenu[option].find(myDish => myDish == dish);
        if (!isDishAdded) {

            //Add element
            myMenu[option].push(dish);
            return;
        }

        //Remove element
        myMenu[option] = myMenu[option].filter(obj => obj !== dish);

        if (!this.containsAnyDish(myMenu)) {
            this.myOrder.menusDetails = this.myOrder.menusDetails.filter(obj => obj !== myMenu);
        }
    }

    containsAnyDish(menu: Menu) {
        return (menu.starters.length > 0) || (menu.firstOptions.length > 0) ||
            (menu.secondOptions.length > 0) || (menu.thirdOptions.length > 0) ||
            (menu.othersOptions.length > 0) || (menu.drinksOptions.length > 0)
    }

    setOrRemoveDishToList(dish: Dish) {

        var isDishAdded = this.myOrder.dishesDetails.find(myDish => myDish == dish);
        if (!isDishAdded) {

            //Add element
            this.myOrder.dishesDetails.push(dish);
            return;
        }

        //Remove element
        this.myOrder.dishesDetails = this.myOrder.dishesDetails.filter(obj => obj !== dish);
    }

    sendOrder() {
        this.myOrderOutput.emit(this.myOrder);
    }

    updateServiceTotalPrice() {

        var totalPrice = 0;
        this.myOrder.menusDetails.forEach(menu => {
            totalPrice += menu.price;
        });

        this.myOrder.dishesDetails.forEach(dish => {
            totalPrice += dish.price;
        });

        this.myOrder.totalPrice = totalPrice;
    }
}
