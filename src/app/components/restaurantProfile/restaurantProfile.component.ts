import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { EnvironmentHelper } from '../../../environments/environment';
import {AuthService} from '../../services/authentication/auth.service';
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

  constructor(private authService: AuthService, private router: Router) {
    this.menu = new Menu();
    this.envHelper = new EnvironmentHelper();
    this.getRestaurant();
  }

  ngOnInit() {
  }

  changeShowStatus(key) {

    const itemsList = Object.keys(this.showItemDictionary);
    for (let index = 0; index < itemsList.length; index++) {
      const specificKey = itemsList[index];
      this.showItemDictionary[specificKey] = specificKey == key ? true : false;
    }
  }

  private getRestaurant() {
    this.currentRestaurant = JSON.parse(localStorage.getItem('restaurant'));
    this.authService.getProfileRestaurant(this.currentRestaurant._id).subscribe(data => {
        this.restaurantOriginal = data;
        this.restaurant = this.restaurantOriginal;
      },
      err => { console.log(err); });
  }

  // TODO Add update method.
  private updateRestaurant() {
    this.authService.updateProfilerRestaurant(this.restaurant).subscribe(data => {
      this.getRestaurant();
    });
  }

  private deleteRestaurant() {
    if (this.confirmar()) {
      this.authService.deleteRestaurantProfile(this.currentRestaurant.id).subscribe(data => {
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

    if (this.confirmar()) {
      this.restaurant.menus.forEach(function (value, index, array) {
        if (value['_id'] === id) {
          array.splice(index, 1);
          return;
        }
      });
      this.updateRestaurant();
    }
  }
  private confirmar() {
    return confirm('Estas seguro?');
  }
}
