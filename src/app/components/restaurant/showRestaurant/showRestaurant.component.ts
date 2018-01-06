import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Restaurant } from '../../../models/restaurant';
import { Order } from '../../../models/order';
import { MapHelper } from '../../../helpers/mapHelper';
import { EnvironmentHelper } from '../../../../environments/environment';
import { AuthService } from '../../../services/authentication/auth.service';


@Component({
  selector: 'app-showRestaurant',
  templateUrl: './showRestaurant.component.html',
  styleUrls: ['./showRestaurant.component.css']
})

export class ShowRestaurantComponent implements OnInit {

  private restaurantId: String;
  @Input() myOrder: Order;

  private myRestaurant;

  private envHelper: EnvironmentHelper;
  private mapHelper: MapHelper;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.envHelper = new EnvironmentHelper();
    this.mapHelper = new MapHelper();
    this.restaurantId = this.route.snapshot.params['_id'];
    this.getRestaurant();
  }

  ngOnInit() {
    console.log('ShowRestaurantComponent');
    console.log(this.myOrder);
    this.getRestaurant();
  }

  getRestaurant() {

    if (this.myRestaurant !== undefined || null) {
      console.log('ShowRestaurantComponent: Unable get Restaurant');
      return;
    }

    if (this.restaurantId === undefined || null) {
      console.log('ShowRestaurantComponent: Unable get Restaurant');
      return;
    }

    this.authService.getPublicRestaurant(this.restaurantId).subscribe(data => {
      this.myRestaurant = this.mapHelper.map(Restaurant, data);
      console.log('RestaurantSummary:' + this.myRestaurant);
    });
  }
}
