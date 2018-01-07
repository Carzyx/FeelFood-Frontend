import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MapComponent } from '../../map/map.component';
import { Restaurant } from '../../../models/restaurant';
import { EnvironmentHelper } from '../../../../environments/environment';
import { MapHelper } from '../../../helpers/mapHelper';
import { AuthService } from "../../../services/authentication/auth.service";

@Component({
  selector: 'app-restaurantSummary',
  templateUrl: './restaurantSummary.component.html',
  styleUrls: ['./restaurantSummary.component.css']
})
export class RestaurantSummaryComponent implements OnInit {
  envHelper: EnvironmentHelper;
  private mapHelper: MapHelper;

  @Input() restaurantId;
  @Input() restaurant: Restaurant;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
    this.envHelper = new EnvironmentHelper();
    this.mapHelper = new MapHelper();
  }

  ngOnInit() {
    if (this.restaurant != undefined || null) {
      return;
    }

    if (this.restaurantId == undefined || null) {
      this.restaurantId = this.route.snapshot.params['_id'];
    }

    this.authService.getPublicRestaurant(this.restaurantId).subscribe(data => {
      this.restaurant = this.mapHelper.map(Restaurant, data);
      console.log('RestaurantSummary:'+ JSON.stringify(this.restaurant));
    });
  }

}
