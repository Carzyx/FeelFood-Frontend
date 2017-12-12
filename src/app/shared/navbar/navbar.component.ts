import { Component } from '@angular/core';
import { AuthService} from '../../services/authentication/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class AppNavbar {
  profile: String;

  constructor (private router: Router, private authService: AuthService) {}

  onLogOutClick () {
    this.authService.logout();
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1000);
  }
}
