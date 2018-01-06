import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private envHelper: EnvironmentHelper;
  private mapHelper: MapHelper;

  //DateTime Picker Configuration
  deliveryDate: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'medium',
    defaultOpen: false
  }

  constructor(private authService: AuthService, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
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

    var url = this.envHelper.urlbase + this.envHelper.urlDictionary.restaurant.restaurant;


    this.http.get(url + `?id=${this.restaurantId}`).subscribe(data => {
      if (data) {
        this.myRestaurant = this.mapHelper.map(Restaurant, data);
        console.log("ShowRestaurantComponent:")
        console.log(JSON.stringify(this.myRestaurant))
      }
    });
  }

  getUser() {
    this.myUser = JSON.parse(localStorage.getItem('user'));
    this.authService.getProfile(this.myUser.username).subscribe(data => {
      this.myUser = this.mapHelper.map(User, data);
    });
  }

  setUserLocationToOrder(locationName: String) {
    this.myOrder.user_location = this.myUser.locations.find(loc => loc.locationName == locationName);
    return this.myOrder.user_location;
  }

  sendOrder() {
    this.myOrder.deliveryDate = this.deliveryDate;
    this.myOrder.createDate = new Date();

    this.myOrder.username_id = this.myUser._id;
    this.myOrder.firstName = this.myUser.firstName;
    this.myOrder.lastName = this.myUser.lastName;

    this.myOrder.restaurant_id = this.myRestaurant._id;
    this.myOrder.restaurant = this.myRestaurant.name;
    this.myOrder.restaurant_location = this.myRestaurant.locations[0];

    this.authService.sendOrder(this.myOrder).subscribe(data => console.log(data));
  }
}
