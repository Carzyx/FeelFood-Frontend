/*
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() lat = 41.275103;
  @Input() lng = 1.985314;
  constructor() {
    this.lat = 41.275103;
    this.lng = 1.985314;
  }

  ngOnInit() {
    this.lat = 41.275103;
    this.lng = 1.985314;
  }
}
*/

import { Component, ElementRef, NgZone, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { Location } from '../../models/location'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  @Input() latitudeIn: number;
  @Input() longitudeIn: number;
  @Output() addressCompletedOut: EventEmitter<Location> = new EventEmitter();

  private location: Location;

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;
  private placeResult: google.maps.places.PlaceResult;

  private componentKeys = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    country: 'long_name',
    postal_code: 'short_name'
  };

  private addressCompleted: any = {
    street_number: '',
    route: '',
    locality: '',
    country: '',
    postal_code: '',
    formatedAddress: '',
    lat: '',
    lng: ''
  };
  private showSearch: Boolean = true;


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {

    //set google maps defaults
    this.zoom = 4;

    if (!this.latitudeIn && !this.longitudeIn) {
      this.latitude = 39.8282;
      this.longitude = -98.5795;
    }
    else {
      this.latitude = this.latitudeIn;
      this.longitude = this.longitudeIn;
      this.zoom = 15;
      this.showSearch = false;
    }

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // Get each component of the address from the place details
          // and fill the corresponding field on the form.
          for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            if (this.componentKeys[addressType]) {
              var val = place.address_components[i][this.componentKeys[addressType]];
              this.addressCompleted[addressType] = val;
            }
          }
          if (place.address_components.length > 0) {
            this.addressCompleted.formatedAddress = place.formatted_address;
            this.addressCompleted.lat = place.geometry.location.lat();
            this.addressCompleted.lng = place.geometry.location.lng();
            console.log(this.addressCompleted);
          }

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 15;
          this.sendAddresSelected()
        });
      });
    });

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
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;

        console.log('Geolocation permissions granted');
        console.log('Latitude:' + position.coords.latitude);
        console.log('Longitude:' + position.coords.longitude);
        console.log(this.placeResult)

      });
    }
    console.log(this.placeResult)
  }

  sendAddresSelected() {
    this.location = new Location();
    this.location.address = this.addressCompleted.route;
    this.location.streetNumber = this.addressCompleted.street_number;
    this.location.city = this.addressCompleted.locality;
    this.location.country = this.addressCompleted.country;
    this.location.postalCode = this.addressCompleted.postal_code;
    this.location.formatedAddress = this.addressCompleted.formatted_address;
    this.location.lat = this.addressCompleted.lat;
    this.location.lng = this.addressCompleted.lng;
    console.log("location parsed")
    console.log(this.location)

    this.addressCompletedOut.emit(this.location);
  }
}
