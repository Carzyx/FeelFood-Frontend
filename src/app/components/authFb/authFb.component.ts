import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './authFb.component.html'
})
export class AuthFbComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }
  token;
  username;
  messageClass;
  message;
  body;
  ngOnInit() {
    this.token = this.route.snapshot.params['token'];
    this.username = this.route.snapshot.params['username'];
    if (this.token && this.username) {
      this.body = {
        username: this.username,
        tokenFb: this.token
      };
      this.authService.loginFb(this.body).subscribe(data => {
        this.authService.storeUserData(data['token'], data['user']);
        this.router.navigate(['home']);
      },
        err => {
          console.log(err);
          this.messageClass = 'alert alert-danger';
          this.message = 'Login failed.';
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 1500);
        });
    }
  }
}
