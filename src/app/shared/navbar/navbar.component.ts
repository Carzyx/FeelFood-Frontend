import {Component, OnInit} from '@angular/core';
import { AuthService} from '../../services/authentication/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class AppNavbar implements OnInit {
  profile: String;

  constructor (private router: Router, private authService: AuthService) {}

  ngOnInit() {
    if (this.authService.readTypeUser()) {
      this.profile = '/userProfile';
    } else {
      this.profile = '/restaurantProfile';
    }
  }

  onLogOutClick () {
    this.authService.logout();
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1000);
  }
}
