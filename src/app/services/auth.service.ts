import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';
import {EnvironmentHelper} from '../../environments/environment';

@Injectable()
export class AuthService {

  authToken;
  user;
  options;
  envHelper: EnvironmentHelper;

  constructor(private http: HttpClient) {
    this.envHelper = new EnvironmentHelper();
  }

  createAuthHeaders () {
    this.readToken();
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      })
    };
  }

  createHeaders () {
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  storeUserData (token, user) {
    localStorage.setItem('token', 'JWT ' + token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  readToken () {
    this.authToken = localStorage.getItem('token');
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logout () {
    localStorage.clear();
    this.authToken = null;
    this.user = null;
  }

  login (user) {
    this.createHeaders();
    return this.http.post(this.envHelper.urlbase + this.envHelper.urlDictionary.user.login, JSON.stringify(user), this.options);
  }

  signUp (user) {
    this.createHeaders();
    return this.http.post(this.envHelper.urlbase + this.envHelper.urlDictionary.user.signup, JSON.stringify(user), this.options);
  }

  getProfile(name) {
    this.createAuthHeaders();
    return this.http.get(this.envHelper.urlbase + this.envHelper.urlDictionary.user.profile + name, this.options);
  }

  updateProfile (user) {
    this.createAuthHeaders();
    return this.http.put(this.envHelper.urlbase + this.envHelper.userDictionary.user, JSON.stringify(user), this.options);
  }

  deleteProfile (name) {
    this.createAuthHeaders();
    return this.http.delete(this.envHelper.urlbase + this.envHelper.urlDictionary.user.profile + name, this.options);
  }

}
