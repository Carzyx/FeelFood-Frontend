import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../../models/user';
import { MapHelper } from '../../helpers/mapHelper';
import { AuthService} from '../../services/authentication/auth.service';
import { Location } from '../../models/location';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  // ShowHide
  showItemDictionary = { showProfile: true, showAddress: false, showAccount: false, showAllergies: false, showAddAddress: false};
  user: User;
  location: Location;
  userOriginal;
  currentUser;
  addressForm;
  passwordForm;
  emailForm;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router, private mapHelper: MapHelper, private formBuilder: FormBuilder) {
    this.getUser();
    this.createForm();  
    this.location = new Location;
  }

  createForm() {
    this.addressForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      postalCode: ['', Validators.compose([
        Validators.required,
        this.validatePostalCode
      ])],
      city: ['', Validators.required],
      country: ['', Validators.required],
    });
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
      confirm: ['', Validators.required]
    }, { validator: this.matchingPasswords('password', 'confirm') });
    this.emailForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        this.validateEmail
      ])]});
  }

  validateEmail(controls) {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // Test email against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid email
    } else {
      return { 'validateEmail': true }; // Return as invalid email
    }
  }

  validatePostalCode(controls) {
    const regExp = new RegExp(/^\d{5}(?:[-\s]\d{4})?$/);
    // Test email against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid email
    } else {
      return { 'validatePostalCode': true }; // Return as invalid email
    }
  }

  matchingPasswords(password, confirm) {
    return (group: FormGroup) => {
      // Check if both fields are the same
      if (group.controls[password].value === group.controls[confirm].value) {
        return null; // Return as a match
      } else {
        return { 'matchingPasswords': true }; // Return as error: do not match
      }
    };
  }

  ngOnInit() {
  }

  changeShowStatus(key) {

    var itemsList = Object.keys(this.showItemDictionary);
    for (var index = 0; index < itemsList.length; index++) {
      var specificKey = itemsList[index];
      this.showItemDictionary[specificKey] = specificKey == key ? true : false;
    }

    // Update user to avoid erroneous changes
    this.user = this.mapHelper.map(User, this.userOriginal);

  }

  private updateEmail () {
    this.user.email = this.emailForm.get('email').value;
    this.updateUser();
  }

  private updatePassword () {
    this.user.password = this.passwordForm.get('password').value;
    this.updateUser();
  }

  private updateAddress () {
    this.location.locationName = this.addressForm.get('name').value;
    this.location.address = this.addressForm.get('address').value;
    this.location.postalCode = this.addressForm.get('postalCode').value;
    this.location.city = this.addressForm.get('city').value;
    this.location.country = this.addressForm.get('country').value;
    this.user.locations.push(this.location);
    this.updateUser();
    this.changeShowStatus('showAddress');
    this.location = new Location;
  }

  private getUser() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.authService.getProfile(this.currentUser.username).subscribe(data => {
        this.userOriginal = data;
        this.user = this.userOriginal;
        console.log(this.user);
      },
      err => { console.log(err)});
  }

  // TODO Add update method.
  private updateUser() {
    this.authService.updateProfile(this.user).subscribe(data => {
      this.userOriginal = data;
      this.user = this.userOriginal;
      alert('User updated.');
      this.getUser();
    },
    err => { console.log(err)});
  }

  private deleteUser() {
    this.authService.deleteProfile(this.currentUser._id).subscribe(data => {
      alert('User deleted.');
      this.authService.logout();
      this.router.navigate(['/home']);
    }, err => { console.log(err)});
  }
}
