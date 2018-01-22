import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import 'rxjs/add/operator/map';
import { EnvironmentHelper } from '../../../environments/environment';
import { AuthService } from '../../services/authentication/auth.service';
import {ActivatedRoute, NavigationStart, ResolveStart, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {forEach} from '@angular/router/src/utils/collection';
import { MapsAPILoader } from '@agm/core';
import { Location } from '../../models/location';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  searchDetails;
  restaurants;
  image;
  search: boolean;
  namesList;
  showItemDictionary= { someRangePrice: false, someRangeDistance: false, Others: false };
  @Input() someRangePrice: number[];
  @Input() someRangeDistance: number[];
  @Output() outRestaurants: EventEmitter<Object> = new EventEmitter<Object>();
  @Input() latitudeIn: number;
  @Input() longitudeIn: number;
  private location: Location;
  public latitude: number;
  public longitude: number;
  private placeResult: google.maps.places.PlaceResult;

  constructor(private authservice: AuthService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    this.searchDetails = this.formBuilder.group({
      priceMin: [],
      priceMax: [],
      distanceMin: [],
      distanceMax: [],
      homeDelivery: [false],
      takeAway: [false]
    });
    this.someRangePrice = [0, 100];
    this.someRangeDistance = [0, 100];
    this.search = true;
  }

  changeShowStatus(key) {
    this.showItemDictionary[key] = ! this.showItemDictionary[key];
  }
  ngOnInit() {
    if (!this.latitudeIn && !this.longitudeIn) {
      //set current position
      this.setCurrentPosition();
    }
    else {
      this.latitude = this.latitudeIn;
      this.longitude = this.longitudeIn;
    }

    Notification.requestPermission(function (result) {
      if (result === 'denied') {
        console.log('Permission wasn\'t granted. Allow a retry.');
        return;
      } else if (result === 'default') {
        console.log('The permission request was dismissed.');
        return;
      }
      console.log('Permission was granted for notifications');
    });
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log('Geolocation permissions granted');
        console.log('Latitude:' + position.coords.latitude);
        console.log('Longitude:' + position.coords.longitude);
        console.log(this.placeResult);

      });
    }
    console.log(this.placeResult);
  }

  upateSearch(url) {
    this.searchByName(url);
  }
  ChangeStatus() {
    this.search = !this.search;
  }

  plainValueChanged(event, container: any) {
    const el = this.getElement(container);

  }

  getElement(data) {
    if (typeof(data) === 'string') {
      return document.getElementById(data);
    }
    if (typeof(data) === 'object' && data instanceof Element) {
      return data;
    }
    return null;
  }
  searchByName(name) {
    console.log(name);
    this.authservice.searchReastaurantByName(name).subscribe(data => {
      this.restaurants = data;
      this.outRestaurants = this.restaurants;
      this.outRestaurants.emit(this.restaurants);
    });
  }
  searchByDetails() {
    let details = {
      homeDelivery: false,
      takeAway: false,
      priceMin: null,
      priceMax: null,
      distanceMin: null,
      distanceMax: null,
      location: {
        lat: 0,
        lng: 0
      }
    };

      details.homeDelivery = this.searchDetails.get('homeDelivery').value;
      details.takeAway = this.searchDetails.get('takeAway').value;
    if (this.someRangePrice[0] !== 0 || this.someRangePrice[1] !== 100) {
      details.priceMin = this.someRangePrice[0];
      details.priceMax = this.someRangePrice[1];
    }
    if (this.someRangeDistance[0] !== 0 || this.someRangeDistance[1] !== 100) {
      details.distanceMin = this.someRangeDistance[0];
      details.distanceMax = this.someRangeDistance[1];
      details.location.lat =  this.latitude;
      details.location.lng = this.longitude;
    }
    console.log(details);
    this.authservice.searchReastaurantByConditions(details).subscribe(data => {
      this.restaurants = data;
      this.outRestaurants.emit(this.restaurants);
    });
  }
}
