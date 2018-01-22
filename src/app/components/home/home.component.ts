import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationStart, ResolveStart, Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentHelper } from '../../../environments/environment';
import { Restaurant } from '../../models/restaurant';
import {AuthService} from '../../services/authentication/auth.service';
import {isNullOrUndefined} from "util";
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  envHelper: EnvironmentHelper;
  restaurants;
  @Input() inRestaurants;
  eventChangeRoute;
  anyRestaurant;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private authservice: AuthService ) {
    this.envHelper = new EnvironmentHelper();
    const url = route.snapshot.paramMap.get('search');
    if(!url)
      this.getRandomResturants();
    else
      this.searchByName(url);
  }

  ngOnInit() {
    this.eventChangeRoute = this.router.events.filter(event => event instanceof NavigationStart)
      .subscribe((event: NavigationStart) => {
        const url = event.url.split('home/').pop();
        if(url !== isNullOrUndefined()) {
          this.searchByName(url);
          return;
        }
    });
  }
  search(data) {
    this.restaurants = data;
  }
  ngOnDestroy() {
    this.eventChangeRoute.unsubscribe();
  }

  searchByName(name) {
    this.authservice.searchReastaurantByName(name).subscribe(data => {
      this.restaurants = data;
      this.anyRestaurant = this.restaurants.length
    });
  }
  private getRandomResturants() {
    var url = this.envHelper.urlbase + this.envHelper.urlDictionary.restaurant.allRestaurants;
    this.http.get(url, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }).subscribe(data => {
      this.restaurants = data;
      this.restaurants
    });
  }
}
