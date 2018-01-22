import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { Restaurant } from '../../models/restaurant';
import { Menu } from '../../models/menu';
import { AuthService } from '../../services/authentication/auth.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Location } from '../../models/location';
import { CustomValidator } from '../../helpers/customValidator';
import {EnvironmentHelper} from '../../../environments/environment';


@Component({
  selector: 'app-restaurantprofile',
  templateUrl: './restaurantProfile.component.html',
  styleUrls: ['./restaurantProfile.component.css']
})
export class RestaurantProfileComponent implements OnInit {
  @Input() addressCompleted: Location;
  @ViewChild('modal') modalUpdate: ModalComponent;
  showItemDictionary = { showProfile: true, showAddress: false, showAddAddress: false, showAccount: false, showMenus: false, showDishes: false };
  location: Location;
  addMenu = false;
  menu: Menu;
  restaurant: Restaurant;
  restaurantOriginal;
  currentRestaurant;
  profileForm;
  addressForm;
  passwordForm;
  emailForm;
  tagsForm;
  address;
  message;
  currentImages;
  currentAvatar;
  avatarUpload = false;
  avatarUrl: String;
  imagesUpload = false;
  imagesUrl: String;
  imageCounter = 0;
  authHeader: { [name: string]: any };

  constructor(private envHelper: EnvironmentHelper, private authService: AuthService, private formBuilder: FormBuilder, private validator: CustomValidator, private router: Router) {
    this.menu = new Menu();
    this.location = new Location();
    this.addressCompleted = new Location();
    this.getRestaurant();
  }

  createForm() {
    this.addressForm = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(20)])],
      address: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(20)])],
      postalCode: ['', Validators.compose([
        Validators.required,
        this.validator.validatePostalCode
      ])],
      city: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(20)])],
      country: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(20)])]
    });
    this.profileForm = this.formBuilder.group({
      restaurantName: [this.restaurant.name ? this.restaurant.name : '', Validators.compose([
        Validators.required,
        Validators.maxLength(20)])],
      phone: [this.restaurant.phone ? this.restaurant.phone : '', Validators.compose([
        Validators.required,
        this.validator.validatePhoneNumber
      ])]
    });
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
      confirm: ['', Validators.required]
    }, { validator: this.validator.matchingPasswords('password', 'confirm') });
    this.emailForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        this.validator.validateEmail
      ])]
    });
    this.tagsForm = this.formBuilder.group({
      homeDelivery: [this.restaurant.tags.homeDelivery ? this.restaurant.tags.homeDelivery : false],
      takeAway: [this.restaurant.tags.takeAway ? this.restaurant.tags.takeAway : false],
      dish: [0],
      menu: [0],
      description: [{
        name: ['', Validators.required ],
        value: ['', Validators.compose([
          Validators.required,
          Validators.min(0),
          Validators.max(100)]
        )]
      }, Validators.max(3)],
    });
  }

  ngOnInit() {
  }

  changeShowStatus(key) {

    const itemsList = Object.keys(this.showItemDictionary);
    for (let index = 0; index < itemsList.length; index++) {
      const specificKey = itemsList[index];
      this.showItemDictionary[specificKey] = specificKey === key ? true : false;
    }
  }

  private updateName() {
    this.restaurant.name = this.profileForm.get('restaurantName').value;
    this.restaurant.phone = this.profileForm.get('phone').value;
    this.profileForm.reset();
    this.updateRestaurant();
  }
  private updateTags() {
    this.restaurant.tags.homeDelivery = this.tagsForm.get('homeDelivery').value;
    this.restaurant.tags.takeAway = this.tagsForm.get('takeAway').value;
    console.log(this.restaurant.tags);
  }
  private updatePassword() {
    this.restaurant.password = this.passwordForm.get('password').value;
    this.passwordForm.reset();
    this.updateRestaurant();
  }

  private updateEmail() {
    this.restaurant.email = this.emailForm.get('email').value;
    this.emailForm.reset();
    this.updateRestaurant();
  }

  private updateAddress() {
    this.location = this.addressCompleted;
    this.restaurant.locations.push(this.location);
    this.updateRestaurant();
    this.changeShowStatus('showAddress');
    this.location = new Location();
  }

  deleteAddress() {
    const location = this.address;
    if (location) {
      this.restaurant.locations.forEach(function (value, index, array) {
        if (value['locationName'] === location) {
          array.splice(index, 1);
          return;
        }
      });
      this.updateRestaurant();
    } else {
      this.message = 'Select one address.';
      this.modalUpdate.show();
    }
  }

  selectedAddress(locationName: String) {
    this.address = locationName;
  }

  // GET RESTAURANT WITHOUT LOGIN
  private getRestaurant() {
    this.currentRestaurant = JSON.parse(localStorage.getItem('restaurant'));
    this.authService.getProfileRestaurant(this.currentRestaurant._id).subscribe(data => {
      this.restaurantOriginal = data;
      this.restaurant = this.restaurantOriginal;
      this.onBeforeUpload();
      this.createForm();
      console.log(this.restaurant);
    },
      err => { console.log(err); });
  }

  // TODO Add update method.
  private updateRestaurant() {
    this.authService.updateProfileRestaurant(this.restaurant).subscribe(data => {
      this.message = 'User update success.';
      this.modalUpdate.show();
      this.getRestaurant();
      setTimeout(() => this.modalUpdate.hide(), 1500);
    },
      err => { console.log(err); });
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
    var find = false;
    for (var i=0; i<this.restaurant.menus.length; i++) {
      if(this.menu.name === this.restaurant.menus[i].name)
        find = true;
    }
    if (find)
      alert('These menu name is in use');
    else
      this.restaurant.menus.push(this.menu);
    // this.getAveragePrice();
    this.updateRestaurant();
    this.ShowMenu();
    this.menu = new Menu();
  }
  private deleteMenu(name) {

    if (this.confirmar()) {
      this.restaurant.menus.forEach(function (value, index, array) {
        if (value['name'] === name) {
          array.splice(index, 1);
          return;
        }
      });
      this.updateRestaurant();
    }
  }
  private confirmar() {
    return confirm('Are you sure?');
  }

  private onBeforeUpload() {
    this.currentAvatar = new Array(this.restaurant.avatar);
    let images = new Array();
    this.restaurant.images.forEach(function (value) {
      images.push(value['url']);
    });
    this.currentImages = images;

    const token = localStorage.getItem('token');
    this.authHeader = {
      'Authorization': token
    };
    this.avatarUrl = this.envHelper.urlbase + this.envHelper.urlDictionary.restaurant.avatar + this.restaurant._id;
    this.imagesUrl = this.envHelper.urlbase + this.envHelper.urlDictionary.restaurant.images + this.restaurant._id;
  }

  onUploadFinished($event: FileHolder) {
    if ($event.serverResponse.status === 201) {
      this.message = 'Avatar upload success.';
      this.modalUpdate.show();
      this.avatarUpload = true;
      setTimeout(() => this.modalUpdate.hide(), 1500);
    }
  }

  onUploadFinishedImages($event: FileHolder) {
    if ($event.serverResponse.status === 201) {
      this.imageCounter ++;
      console.log('N-images: ' + this.imageCounter);
      if (this.imageCounter >= 4) {
        this.message = 'Images upload success.';
        this.modalUpdate.show();
        this.imagesUpload = true;
        setTimeout(() => this.modalUpdate.hide(), 1500);
      }
    } else if ($event.serverResponse.status === 202) {
      this.message = 'You can upload only 4 restaurant images.';
      this.modalUpdate.show();
      setTimeout(() => this.modalUpdate.hide(), 1500);
    }
  }
}
