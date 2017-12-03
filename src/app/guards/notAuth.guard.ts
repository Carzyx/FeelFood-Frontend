import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/authentication/auth.service';

@Injectable()
export class NotAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  // Function to determine whether user is authorized to view route
  canActivate() {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/']);
      return false; // not allowed to view route
    } else {
      return true; // allowed to view route
    }
  }
}
