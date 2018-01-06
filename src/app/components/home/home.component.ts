import { Component, OnInit } from '@angular/core';
import { EnvironmentHelper } from '../../../environments/environment';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  envHelper: EnvironmentHelper;
  restaurants;
  constructor(private authService: AuthService) {
    this.envHelper = new EnvironmentHelper();
    this.getRandomRestaurants();
  }
  ngOnInit() {
  }
  private getRandomRestaurants() {
    this.authService.getAllRestaurants().subscribe(data => {
      this.restaurants = data;
      console.log(this.restaurants);
    });
  }
}
