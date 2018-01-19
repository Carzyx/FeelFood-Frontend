import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';
import { EnvironmentHelper } from '../../../environments/environment';

@Injectable()
export class AuthService {

  authToken;
  user;
  options;
  envHelper: EnvironmentHelper;

  constructor(private http: HttpClient) {
    this.envHelper = new EnvironmentHelper();
  }

  createAuthHeaders() {
    this.readToken();
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      })
    };
  }

  createHeaders() {
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  storeUserData(token, user) {
    localStorage.setItem('token', 'JWT ' + token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  storeRestaurantData(token, restaurant) {
    localStorage.setItem('token', 'JWT ' + token);
    localStorage.setItem('restaurant', JSON.stringify(restaurant));
    this.authToken = token;
    this.user = restaurant;
  }

  readTypeUser() {
    if (localStorage.getItem('user')) {
      return true;
    }
  }

  readToken() {
    this.authToken = localStorage.getItem('token');
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logout() {
    localStorage.clear();
    this.authToken = null;
    this.user = null;
  }

  login(body) {
    this.createHeaders();
    return this.http.post(this.envHelper.urlbase + this.envHelper.urlDictionary.user.login, JSON.stringify(body), this.options);
  }

  loginFb(body) {
    this.createHeaders();
    return this.http.post(this.envHelper.urlbase + this.envHelper.urlDictionary.user.loginFb, body, this.options);
  }

  signUpUser(user) {
    this.createHeaders();
    return this.http.post(this.envHelper.urlbase + this.envHelper.urlDictionary.user.signup, JSON.stringify(user), this.options);
  }

  signUpRestaurant(restaurant) {
    this.createHeaders();
    return this.http.post(this.envHelper.urlbase + this.envHelper.urlDictionary.restaurant.signup, JSON.stringify(restaurant), this.options);
  }

  getProfile(name) {
    this.createAuthHeaders();
    return this.http.get(this.envHelper.urlbase + this.envHelper.urlDictionary.user.profile + name, this.options);
  }

  getProfileRestaurant(id) {
    this.createAuthHeaders();
    return this.http.get(this.envHelper.urlbase + this.envHelper.urlDictionary.restaurant.profile + id, this.options);
  }

  updateProfile(user) {
    this.createAuthHeaders();
    return this.http.put(this.envHelper.urlbase + this.envHelper.urlDictionary.user.user, JSON.stringify(user), this.options);
  }

  updateProfileRestaurant(user) {
    this.createAuthHeaders();
    return this.http.put(this.envHelper.urlbase + this.envHelper.urlDictionary.restaurant.restaurant, JSON.stringify(user), this.options);
  }

  deleteProfile(id) {
    this.createAuthHeaders();
    return this.http.delete(this.envHelper.urlbase + this.envHelper.urlDictionary.user.delete + id, this.options);
  }

  deleteProfileRestaurant (id) {
    this.createAuthHeaders();
    return this.http.delete(this.envHelper.urlbase + this.envHelper.urlDictionary.restaurant.delete + id, this.options);
  }

  getAllRestaurants() {
    this.createHeaders();
    return this.http.get(this.envHelper.urlbase + this.envHelper.urlDictionary.restaurant.allRestaurants, this.options);
  }

  getPublicRestaurant (id) {
    this.createHeaders();
    return this.http.get(this.envHelper.urlbase + this.envHelper.urlDictionary.restaurant.publicRestaurant + id, this.options);
  }

  getAllergies() {
    this.createHeaders();
    return this.http.get(this.envHelper.urlbase + this.envHelper.urlDictionary.user.allergies, this.options);
  }

  sendOrder(order) {
    this.createAuthHeaders();
    return this.http.post(this.envHelper.urlbase + this.envHelper.urlDictionary.restaurant.orders, JSON.stringify(order), this.options)
  }

  getOrder(id) {
    this.createAuthHeaders();
    return this.http.get(this.envHelper.urlbase + this.envHelper.urlDictionary.restaurant.orderDetail + id, this.options);
  }

  updateOrder(order) {
    this.createAuthHeaders();
    return this.http.put(this.envHelper.urlbase + this.envHelper.urlDictionary.restaurant.orders, JSON.stringify(order), this.options);
  }
}
