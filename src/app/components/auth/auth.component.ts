import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }
  token: String;
  username: String;

  ngOnInit() {
    this.token = this.route.snapshot.params['token'];
    this.username = this.route.snapshot.params['username'];
    console.log('Token= ' + this.token);
    console.log('Username: ' + this.username);
    if (this.token) {
      localStorage.setItem('currentUser', JSON.stringify({token: 'JWT ' + this.token, name: this.username}));
      this.router.navigate(['home']);
    }
  }
}
