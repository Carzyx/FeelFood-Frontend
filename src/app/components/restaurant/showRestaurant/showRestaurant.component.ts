import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../../services/authentication/auth.service';
import { User } from '../../../models/user';
import { Restaurant } from '../../../models/restaurant';
import { Order } from '../../../models/order';
import { MapHelper } from '../../../helpers/mapHelper';
import { EnvironmentHelper } from '../../../../environments/environment';
import { ModalComponent } from '../../../shared/modal/modal.component';

@Component({
  selector: 'app-showRestaurant',
  templateUrl: './showRestaurant.component.html',
  styleUrls: ['./showRestaurant.component.css']
})

export class ShowRestaurantComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;

  private restaurantId: String;
  @Input() myOrder: Order;

  private myRestaurant: Restaurant;
  private myUser: User;
  private show: boolean = false;
  private showNewAddress: boolean = false;
  private isLogin: boolean = false;
  private envHelper: EnvironmentHelper;
  private mapHelper: MapHelper;
  private messageResult: String;
  private messageClass: String;

  //DateTime Picker Configuration
  deliveryDate: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'medium',
    defaultOpen: false
  }

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
    this.envHelper = new EnvironmentHelper();
    this.mapHelper = new MapHelper();
    this.restaurantId = this.route.snapshot.params['_id'];

    this.getUser();
    this.getRestaurant();
  }

  ngOnInit() {
    this.getRestaurant();
  }

  getRestaurant() {

    if (this.myRestaurant != undefined || null) {
      console.log("ShowRestaurantComponent: Unable get Restaurant;")
      return;
    }

    if (this.restaurantId == undefined || null) {
      console.log("ShowRestaurantComponent: Unable get Restaurant;")
      return;
    }

    this.authService.getPublicRestaurant(this.restaurantId).subscribe(data => {
      if (data) {
        this.myRestaurant = this.mapHelper.map(Restaurant, data);
      }
    });
  }

  getUser() {
    this.myUser = JSON.parse(localStorage.getItem('user'));
    if (!this.myUser) {
      return;
    }

    this.authService.getProfile(this.myUser._id).subscribe(data => {
      this.myUser = this.mapHelper.map(User, data);
      this.isLogin = this.myUser ? true : false;
      console.log("user loaded in showRestaurant")
    });
  }

  setUserLocationToOrder(locationName: String) {
    this.myOrder.user_location = this.myUser.locations.find(loc => loc.locationName == locationName);
    return this.myOrder.user_location;
  }

  setCommentToOrder(commentTextArea) {

    this.myOrder.comment = commentTextArea;

  }

  sendOrder() {
    this.myOrder.deliveryDate = this.deliveryDate;
    this.myOrder.user_id = this.myUser._id;
    this.myOrder.userName = this.myUser.username;
    this.myOrder.firstName = this.myUser.firstName;
    this.myOrder.lastName = this.myUser.lastName;
    this.myOrder.restaurantPhone = this.myRestaurant.phone;
    this.myOrder.restaurant_id = this.myRestaurant._id;
    this.myOrder.restaurant = this.myRestaurant.name;
    this.myOrder.restaurant_location = this.myRestaurant.locations[0];

    this.authService.sendOrder(this.myOrder).subscribe(data => {

      //Update restaurant
      this.authService.getPublicRestaurant(this.restaurantId).subscribe(data => {

        this.myRestaurant = this.mapHelper.map(Restaurant, data);
        // Update restaurant stock
        this.updateStock()

        this.authService.updateProfileRestaurant(this.myRestaurant).subscribe(data => {
        });
      });
      this.messageResult ="Delivery successfully";
      this.messageClass = 'success-delivery-action';
    },
      err => {
        this.messageResult = "An error occurred please try again later";
        this.messageClass = 'error-delivery-action';
      });
  }

  updateStock() {   
    this.updateDishesToCard();
    this.updateMenus();    
  }

  updateDishesToCard() {

    //Update dish stock
    this.myOrder.dishesDetails.forEach(element => {
      var dishToUpdate = this.myRestaurant.dishes.find(dish => dish.name == element.name);

      if (dishToUpdate) {
        --dishToUpdate.stock;

        var index = this.myRestaurant.dishes.findIndex(dish => dish.name == element.name);
        this.myRestaurant.dishes[index] = dishToUpdate;
      }
    });
  }

  updateMenus() {

    this.myOrder.menusDetails.forEach(menu => {
      var menuToUpdate = this.myRestaurant.menus.find(menu => menu.name == menu.name);

      menu.starters.forEach(element => {
        menuToUpdate = this.updateDishesToMenu(menuToUpdate, element, 'starters')
      });

      menu.firstOptions.forEach(element => {
        menuToUpdate = this.updateDishesToMenu(menuToUpdate, element, 'firstOptions')
      });
      menu.secondOptions.forEach(element => {
        menuToUpdate = this.updateDishesToMenu(menuToUpdate, element, 'secondOptions')
      });
      menu.thirdOptions.forEach(element => {
        menuToUpdate = this.updateDishesToMenu(menuToUpdate, element, 'thirdOptions')
      });

      menu.drinksOptions.forEach(element => {
        menuToUpdate = this.updateDishesToMenu(menuToUpdate, element, 'drinksOptions')
      });

      menu.othersOptions.forEach(element => {
        menuToUpdate = this.updateDishesToMenu(menuToUpdate, element, 'othersOptions')
      });

      var index = this.myRestaurant.menus.findIndex(menu => menu.name == menu.name);
      this.myRestaurant.menus[index] = menuToUpdate;

    });
  }

  updateDishesToMenu(menuToUpdate, dishConsumed, key) {

    var dishToUpdate = menuToUpdate[key].find(dish => dish.name == dishConsumed.name);

    if (dishToUpdate) {
      --dishToUpdate.stock;

      var index = this.myRestaurant.dishes.findIndex(dish => dish.name == dishConsumed.name);
      menuToUpdate[key][index] = dishToUpdate;
      return menuToUpdate;
    }
  }

  showMap(show) {
    if (show) {
      this.show = show;
    }
    return this.show;
  }

  showMapNewAddress(show) {
    if (show) {
      this.showNewAddress = show;
    }
    return this.showNewAddress;
  }

  IsUserRegister() {
    this.showMapNewAddress(this.myUser ? true : false);
    return this.myUser;
  }
}
