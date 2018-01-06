import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/authentication/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  redirectUrl;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.loggedIn()) {
      return true; // Return true: User is allowed to view route
    } else {
      this.redirectUrl = state.url;
      this.router.navigate(['/login']); // Return error and route to login page
      return false; // Return false: user not authorized to view page
    }
  }
}
