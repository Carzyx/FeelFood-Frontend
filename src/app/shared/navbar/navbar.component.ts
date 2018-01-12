import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class AppNavbar implements OnInit {
  profile: String;

  constructor(private router: Router, private authService: AuthService) { }

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
    const search = this.router.url
    console.log(search);
    if(search.indexOf('search') > 0)
      alert('Do it')
   this.router.navigate(['/search', value]);
  }

  selectProfile() {
    if (JSON.parse(localStorage.getItem('user'))) {
      this.profile = 'userProfile';
    } else {
      this.profile = 'restaurantProfile';
    }
  }
}
