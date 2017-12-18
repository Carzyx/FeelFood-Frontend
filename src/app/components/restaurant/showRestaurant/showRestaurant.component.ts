import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { Restaurant } from '../../../models/restaurant';
import { MapHelper } from '../../../helpers/mapHelper';
import { EnvironmentHelper } from '../../../../environments/environment';


@Component({
    selector: 'app-showRestaurant',
    templateUrl: './showRestaurantComponent.component.html',
    styleUrls: ['./showRestaurantComponent.component.css']
})

export class ShowRestaurantComponent implements OnInit {

    @Input() restaurantId;
    //@Input()
    myRestaurant;

    private envHelper: EnvironmentHelper;
    private url: String;
    private mapHelper: MapHelper;

    constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
        this.envHelper = new EnvironmentHelper();
        this.mapHelper = new MapHelper();
        this.url = this.envHelper.urlbase + this.envHelper.urlDictionary.restaurant.restaurant;
      }

    ngOnInit() {
        if(this.myRestaurant != undefined || null)
        {
          return;      
        }
    
        if (this.restaurantId == undefined || null) {
          this.restaurantId = this.route.snapshot.params['_id'];
        }
    
        this.http.get(this.url + `?id=${this.restaurantId}`).subscribe(data => {
          console.log(data);
          if (data) {
            this.myRestaurant = this.mapHelper.map(Restaurant, data);
            console.log("I have the restaurant!")
            console.log(JSON.stringify(this.myRestaurant))
          }
        });
      }

}
