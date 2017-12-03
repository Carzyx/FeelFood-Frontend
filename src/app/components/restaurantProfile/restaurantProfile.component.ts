import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { EnvironmentHelper } from '../../../environments/environment';
// import { AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {Restaurant} from '../../models/restaurant';
import {Menu} from '../../models/menu';


@Component({
  selector: 'app-restaurantprofile',
  templateUrl: './restaurantProfile.component.html',
  styleUrls: ['./restaurantProfile.component.css']
})
export class RestaurantProfileComponent implements OnInit {

  // ShowHide
  showItemDictionary = { showProfile: true, showAddress: false, showAccount: false, showMenus: false , showDishes: false};
  addMenu = false;
  menu: Menu;
  envHelper: EnvironmentHelper;
  restaurant: Restaurant;
  restaurantOriginal;
  currentRestaurant;

  constructor(private http: HttpClient, private router: Router) {
    //USE THESE
    //this.getRestaurant();
    this.menu = new Menu();
    this.envHelper = new EnvironmentHelper();
    this.getFalseRestaurant();
  }

  ngOnInit() {
  }

  changeShowStatus(key) {

    const itemsList = Object.keys(this.showItemDictionary);
    for (let index = 0; index < itemsList.length; index++) {
      const specificKey = itemsList[index];
      this.showItemDictionary[specificKey] = specificKey == key ? true : false;
    }

    // Update restaurant to avoid erroneous changes
    //this.getRestaurant();

  }
//TRUE GET RESTAURANT
  private getRestaurant() {
    this.currentRestaurant = JSON.parse(localStorage.getItem('restaurant'));
    // this.authService.getProfile(this.currentRestaurant.id).subscribe(data => {
    //     this.restaurantOriginal = data;
    //     this.restaurant = this.restaurantOriginal;
    //     console.log(this.restaurant);
    //   },
    //   err => { console.log(err); });
  }


//GET RESTAURANT WITHOUT LOGIN
  private getFalseRestaurant() {
    this.http.get('http://localhost:3001/restaurant?id=5a15a4f6581ad320feeaf5b1').subscribe(data => {
        this.restaurantOriginal = data;
        this.restaurant = this.restaurantOriginal;
        console.log(this.restaurant);
      },
      err => { console.log(err); });
  }

  // TODO Add update method.
  private updateRestaurant() {
    const url = this.envHelper.urlbase + this.envHelper.restaurantDictionary.restaurant;
    this.http.put(url, this.restaurant, {headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(data => {
    });
    // this.authService.updateProfile(this.restaurant).subscribe(data => {
    //   this.restaurantOriginal = data;
    //   this.restaurant = this.restaurantOriginal;
    //   alert('Restaurant updated.');
    // },
    // err => { console.log(err); });
  }

  private deleteRestaurant() {
    if(this.confirmar()) {
      this.authService.deleteProfile(this.currentRestaurant.id).subscribe(data => {
        alert('Restaurant deleted.');
        this.authService.logout();
        this.router.navigate(['/home']);
      }, err => {
        console.log(err);
      });
    }
  }

  private ShowMenu() {
    this.addMenu = !this.addMenu;
  }

  private createMenu() {
    this.restaurant.menus.push(this.menu);
    this.updateRestaurant();
    this.ShowMenu();
    this.menu = new Menu();
  }
  private deleteMenu(id) {

    if(this.confirmar()) {
      console.log(id)
      for (let i = 0; i < this.restaurant.menus.length; i++) {
        if (id === this.restaurant.menus[i].id)
          this.restaurant.menus.splice(i, 1);
      }
      this.updateRestaurant();
    }
  }
  private confirmar() {
    return confirm('Estas seguro?');
  }
}
