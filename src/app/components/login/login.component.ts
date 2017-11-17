import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private data: User;
  private showLogin: boolean;
  private showSignup: boolean;
  token;


  constructor(private http: HttpClient, private router: Router) {
    this.data = new User();
    this.showLogin = true;
    this.showSignup = !this.showLogin;

  }

  ngOnInit() {
  }

  changeShowStatus() {
    this.showLogin = !this.showLogin;
    this.showSignup = !this.showSignup;
  }

  loginSubmit(email, password) {

    this.data.email = email;
    this.data.password = password;
    this.http.post('http://localhost:3001/authenticate', JSON.stringify(this.data), { headers: new HttpHeaders()
      .set('Content-Type', 'application/json') })
      .subscribe(data => {
        this.token = data;
        this.router.navigate(['/auth/' + this.token.token]);
      }, (err) => alert('User or password is not correct.'));
  }

  singupSubmit(username, email, password) {

    this.data.username = username;
    this.data.email = email;
    this.data.password = password;
    this.http.post('http://localhost:3001/register', JSON.stringify(this.data), { headers: new HttpHeaders()
      .set('Content-Type', 'application/json')})
      .subscribe(data => alert('User register success.'), (err) => alert('This e-mail is in use.'));
  }
}
