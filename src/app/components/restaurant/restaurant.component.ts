import {Component, OnInit} from '@angular/core';
import {MapComponent} from '../map/map.component';
import {HttpClient} from '@angular/common/http';
import {Restaurant} from '../../models/restaurant';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  edit = false;
  restaurant;
  lat = 41.275103;
  lng = 1.985314;
  constructor(private http: HttpClient) {

  }
  ngOnInit() {
    this.restaurant = new Restaurant();
  }
  OnChange(value: string) {
    this.http.get(`http://localhost:3001/restaurant/${value}`).subscribe(data => {
      if (data) {
        this.restaurant = data;
      }
    });
  }
  Edit() {
    if (this.edit)
      this.edit = false;
    else
      this.edit = true;
  }
  Update() {
    alert(JSON.stringify(this.restaurant));
    this.getUser();
  }
  private getUser() {

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
