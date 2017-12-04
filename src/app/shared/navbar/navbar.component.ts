import { Component } from '@angular/core';
import { AuthService} from '../../services/authentication/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class AppNavbar {
  profile;

  constructor (private router: Router, private authService: AuthService) {}

  onLogOutClick () {
    this.authService.logout();
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1000);
  }

  selectProfile() {
    if (JSON.parse(localStorage.getItem('user'))) {
      this.profile = 'userProfile';
    } else {
      this.profile = 'restaurantProfile';
    }
  }
}
