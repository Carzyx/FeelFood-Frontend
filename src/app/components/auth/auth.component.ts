import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }
  token: String;

  ngOnInit() {
    this.token = this.route.snapshot.params['token'];
    console.log('Token= ' + this.token);
    if (this.token) {
      localStorage.setItem('token', JSON.stringify({token: 'JWT ' + this.token}));
      this.router.navigate(['home']);
    }
  }
}
