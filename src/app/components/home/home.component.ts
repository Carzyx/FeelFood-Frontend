import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { EnvironmentHelper } from '../../../environments/environment';
import {Restaurant} from '../../models/restaurant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  envHelper: EnvironmentHelper;
  restaurants;
  constructor(private http: HttpClient) {
    this.envHelper = new EnvironmentHelper();
    this.getRandomResturants();
  }
  ngOnInit() {
  }
  private getRandomResturants() {
    var url = this.envHelper.urlbase + this.envHelper.urlDictionary.restaurant.allRestaurants;
    this.http.get(url, { headers: new HttpHeaders()
      .set('Content-Type', 'application/json')}).subscribe(data => {
      this.restaurants = data;
      console.log(this.restaurants);
    });
  }
}
