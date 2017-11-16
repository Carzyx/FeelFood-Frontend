import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Restaurant} from '../../models/restaurant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() restaurantName;
  edit = false;
  editRestaurant;
  restaurant;
  lat = 41.275103;
  lng = 1.985314;
  constructor(private http: HttpClient) {
    this.restaurantName = 'Bulli';

  }
  ngOnInit() {
    this.restaurant = new Restaurant();
    this.http.get(`http://localhost:3001/restaurant/${this.restaurantName}`).subscribe(data => {
      if (data) {
        this.restaurant = data;
      }
    });
  }
  OnChange(value: string) {
    this.http.get(`http://localhost:3001/restaurant/${value}`).subscribe(data => {
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
    alert(JSON.stringify(this.restaurant))
    this.http.put(`http://localhost:3001/restaurant`, this.restaurant, {headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(data => {
    alert(data);
    });
    this.edit = false;
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
