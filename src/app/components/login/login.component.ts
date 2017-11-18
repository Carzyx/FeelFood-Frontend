import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';
import { mapNewObject } from '../../models/user';
import { EnvironmentHelper } from '../../../environments/environment'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: User;
  envHelper: EnvironmentHelper;
  showItemDictionary = { showLogin: true, showSignup: false };
  signinError: string;


  constructor(private http: HttpClient, private router: Router) {
    this.user = new User();
    this.envHelper = new EnvironmentHelper();
  }

  ngOnInit() {
  }

  changeShowStatus(key) {

    var itemsList = Object.keys(this.showItemDictionary);
    for (var index = 0; index < itemsList.length; index++) {
      var specificKey = itemsList[index];
      this.showItemDictionary[specificKey] = specificKey == key ? true : false;
    }
  }

  loginSubmit(email, password) {

    this.user.email = email;
    this.user.password = password;

    var url = this.envHelper.urlbase + this.envHelper.urlDictionary.user.login;
    var headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    var body = JSON.stringify(this.user);

    this.http.post(url, body, headers)
      .subscribe(data => {
        console.log(JSON.stringify(data));
        this.user = mapNewObject(data['user']);
        this.router.navigate(['/auth/' + this.user.username + '/' + data['token']]);
      }, (err) => alert(err));
  }

  singupSubmit(username, email, password) {
    this.user.username = username;
    this.user.email = email;
    this.user.password = password;

    var url = this.envHelper.urlbase + this.envHelper.urlDictionary.user.signup;
    var headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    var body = JSON.stringify(this.user);

    this.http.post(url, body, headers)
      .subscribe(
      data => {
        this.signinError = data['success'] ? '' : data['message'];

        if (!data['success'])
          return

        console.log(data)
        this.user = mapNewObject(data['model']);
        this.loginSubmit(this.user.email, this.user.password)
      },
      err => alert(err));
  }
}
