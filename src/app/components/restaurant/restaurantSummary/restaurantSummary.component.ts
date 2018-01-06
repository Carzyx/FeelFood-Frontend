import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MapComponent } from '../../map/map.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Restaurant } from '../../../models/restaurant';
import { EnvironmentHelper } from '../../../../environments/environment';
import { MapHelper } from '../../../helpers/mapHelper';

@Component({
  selector: 'app-restaurantSummary',
  templateUrl: './restaurantSummary.component.html',
  styleUrls: ['./restaurantSummary.component.css']
})
export class RestaurantSummaryComponent implements OnInit {
  envHelper: EnvironmentHelper;
  url;
  private mapHelper: MapHelper;

  @Input() restaurantId;
  @Input() restaurant: Restaurant;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.envHelper = new EnvironmentHelper();
    this.mapHelper = new MapHelper();
    this.url = this.envHelper.urlbase + this.envHelper.urlDictionary.restaurant.restaurant;
  }

  ngOnInit() {
    if (this.restaurant != undefined || null) {
      return;
    }

    if (this.restaurantId == undefined || null) {
      this.restaurantId = this.route.snapshot.params['_id'];
    }

    this.http.get(this.url + `?id=${this.restaurantId}`).subscribe(data => {
      if (data) {
        this.restaurant = this.mapHelper.map(Restaurant, data);
        console.log("RestaurantSummaryComponent:")
        console.log(JSON.stringify(this.restaurant))
      }
    });
  }

}
