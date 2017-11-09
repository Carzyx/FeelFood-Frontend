import { Component, OnInit } from '@angular/core';
import "rxjs/add/operator/map";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'restaurantFinder',
  templateUrl: './restaurantFinder.component.html',
  styleUrls: ['./restaurantFinder.component.css']
})
export class RestaurantFinderComponent implements OnInit {

  constructor(private http: HttpClient) {}

  public deleteUser(id){
    let url = 'http://localhost:3001/user?id=' + id;
    this.http.delete(url);
  }

  ngOnInit(): void {
    this.http.get('http://localhost:3001/restaurant').subscribe(data => {
      this.restaurants = data;
    });
  }

  title: string = 'User management';
  restaurants;
}
