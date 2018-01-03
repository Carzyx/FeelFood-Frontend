import {Component, OnInit, ViewChild} from '@angular/core';
import 'rxjs/add/operator/map';
import {Restaurant} from '../../models/restaurant';
import {Menu} from '../../models/menu';
import {AuthService} from '../../services/authentication/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ModalComponent} from '../../shared/modal/modal.component';
import {Location} from '../../models/location';
import {CustomValidator} from '../../helpers/customValidator';
import {Router} from '@angular/router';


@Component({
  selector: 'app-restaurantprofile',
  templateUrl: './restaurantProfile.component.html',
  styleUrls: ['./restaurantProfile.component.css']
})
export class RestaurantProfileComponent implements OnInit {
  @ViewChild('modal') modalUpdate: ModalComponent;
  // ShowHide
  showItemDictionary = { showProfile: true, showAddress: false, showAddAddress: false, showAccount: false, showMenus: false , showDishes: false};
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
  address;
  message;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private validator: CustomValidator, private router: Router) {
    this.menu = new Menu();
    this.location = new Location;
    this.createForm();
    this.createForm();
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
      restaurantName: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(20)])],
      phone: ['', Validators.compose([
        Validators.required,
        this.validator.validatePhoneNumber
      ])]});
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
      ])]});
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

  private updateName() {
    this.restaurant.name = this.profileForm.get('restaurantName').value;
    this.restaurant.phone = this.profileForm.get('phone').value;
    this.profileForm.reset();
    this.updateRestaurant();
  }

  private updatePassword () {
    this.restaurant.password = this.passwordForm.get('password').value;
    this.passwordForm.reset();
    this.updateRestaurant();
  }

  private updateEmail () {
    this.restaurant.email = this.emailForm.get('email').value;
    this.emailForm.reset();
    this.updateRestaurant();
  }

  private updateAddress () {
    this.location.locationName = this.addressForm.get('name').value;
    this.location.address = this.addressForm.get('address').value;
    this.location.postalCode = this.addressForm.get('postalCode').value;
    this.location.city = this.addressForm.get('city').value;
    this.location.country = this.addressForm.get('country').value;
    this.restaurant.location.push(this.location);
    this.addressForm.reset();
    this.updateRestaurant();
    this.changeShowStatus('showAddress');
    this.location = new Location;
  }

  deleteAddress() {
    const location = this.address;
    if (location) {
      this.restaurant.location.forEach(function (value, index, array) {
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
      err => { console.log(err)});
  }

  private deleteRestaurant() {
    this.authService.deleteProfileRestaurant(this.currentRestaurant._id).subscribe(data => {
      this.authService.logout();
      this.router.navigate(['/home']);
    }, err => { console.log(err)});
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
