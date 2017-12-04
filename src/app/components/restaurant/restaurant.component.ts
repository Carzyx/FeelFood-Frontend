import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MapComponent} from '../map/map.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Restaurant} from '../../models/restaurant';
import { EnvironmentHelper } from '../../../environments/environment';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  envHelper: EnvironmentHelper;
  url;
  @Input() restaurantId;
  edit = false;
  canEdit= false;
  @Input() profile: boolean;
  editRestaurant;
  restaurant;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.profile = true;
    this.restaurantId =  this.route.snapshot.params['_id'];
    this.envHelper = new EnvironmentHelper();
    this.url = this.envHelper.urlbase + this.envHelper.urlDictionary.restaurant.restaurant;

  }
  ngOnInit() {
    this.restaurant = new Restaurant();
    this.http.get(this.url + `?id=${this.restaurantId}`).subscribe(data => {
      console.log(data);
      if (data) {
        this.restaurant = data;
      }
    });
  }
  Edit() {
    if (this.edit) {
      this.restaurant = this.editRestaurant;
      this.edit = false;
    }
    else {
      this.editRestaurant = this.restaurant;
      this.edit = true;
    }
  }
  Update() {
    this.http.put(this.url, this.restaurant, {headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(data => {
    });
    this.edit = false;
  }

  // initialize_google_map()
  // {
  //   let myLatlng = new google.maps.LatLng(get_latitude, get_longitude);
  //   let mapOptions = {
  //     zoom: 14,
  //     scrollwheel: false,
  //     center: myLatlng
  //   };
  //   let map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
  //   let marker = new google.maps.Marker({
  //     position: myLatlng,
  //     map: map
  //   });
  //    }

}
