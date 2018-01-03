import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/authentication/auth.service';
import {User} from '../../models/user';
import {LoginComponent} from '../login/login.component';
import {Allergy} from '../../models/allergy';
import {Location} from '../../models/location';
import {ModalComponent} from '../../shared/modal/modal.component';
import {Router} from '@angular/router';
import {Restaurant} from "../../models/restaurant";
import {AppNavbar} from "../../shared/navbar/navbar.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [LoginComponent]
})
export class DashboardComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;
  currentUser;
  user;
  restaurant;
  signupDate;
  lastLogin;
  constructor(private authService: AuthService, private router: Router, private navbar: AppNavbar) {
    this.user = new User;
    this.user.locations = new Array(Location);
    this.user.allergies = new Array(Allergy);
    this.restaurant = new Restaurant;
    this.restaurant.location = new Array(Location);
    this.getUser();
  }

  ngOnInit() {
  }

  private getUser() {
    if (this.navbar.profile === '/userProfile') {
      this.currentUser = JSON.parse(localStorage.getItem('user'));
      this.authService.getProfile(this.currentUser._id).subscribe(data => {
          this.user = data;
          this.signupDate = new Date(this.user.signupDate).toLocaleDateString();
          this.lastLogin = new Date(this.user.lastLogin).toLocaleString();
          if (!this.user.firstName || !this.user.lastName) {
            this.modal.show();
            this.modal.block();
          }
          console.log(this.user);
        },
        err => { console.log(err)});
    } else if (this.navbar.profile === '/restaurantProfile') {
      this.currentUser = JSON.parse(localStorage.getItem('restaurant'));
      this.authService.getProfileRestaurant(this.currentUser._id).subscribe(data => {
          this.restaurant = data;
          this.signupDate = new Date(this.restaurant.signupDate).toLocaleDateString();
          this.lastLogin = new Date(this.restaurant.lastLogin).toLocaleString();
          if (!this.restaurant.name || !this.restaurant.phone) {
            this.modal.show();
            this.modal.block();
          }
          console.log(this.restaurant);
        },
        err => { console.log(err)});
    }
  }

  private redirect() {
    this.router.navigate([this.navbar.profile]);
    this.modal.hide();
  }
}
