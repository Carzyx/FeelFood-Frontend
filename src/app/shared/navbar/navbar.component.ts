import { Component, OnInit,Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class AppNavbar implements OnInit {
  profile: String;
  namesList;

  constructor(private router: Router, private authservice: AuthService, private authService: AuthService, private elementRef: ElementRef ) {
  }

  ngOnInit() {
    if (this.authService.readTypeUser()) {
      this.profile = '/userProfile';
    } else {
      this.profile = '/restaurantProfile';
    }
  }

  onLogOutClick() {
    this.authService.logout();
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1000);
  }
  Search(value) {
    this.router.navigate(['/home', value]);
  }
  speedSearch(name) {
    this.authservice.speedSerachRestaurantByName(name).subscribe(data => {
      this.namesList = data;
      console.log(data);
    });
  }
  selectProfile() {
    if (JSON.parse(localStorage.getItem('user'))) {
      this.profile = 'userProfile';
    } else {
      this.profile = 'restaurantProfile';
    }
  }
}
