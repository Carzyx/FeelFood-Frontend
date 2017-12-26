import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { Restaurant } from '../../../models/restaurant';
import { Order } from '../../../models/order';
import { MapHelper } from '../../../helpers/mapHelper';
import { EnvironmentHelper } from '../../../../environments/environment';


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

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.envHelper = new EnvironmentHelper();
    this.mapHelper = new MapHelper();
    this.restaurantId = "5a2c426ef5ad533e44a818bc";

    this.getRestaurant();
  }

  ngOnInit() {
    console.log("ShowRestaurantComponent");
    console.log(this.myOrder);
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

}
