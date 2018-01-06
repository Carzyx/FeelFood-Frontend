import { Component, OnInit, ViewChild } from '@angular/core';
import 'rxjs/add/operator/map';
import { User } from '../../models/user';
import { Location } from '../../models/location';
import { Allergy } from '../../models/allergy';
import { mapNewObject } from '../../models/user';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/authentication/auth.service';

import { ModalComponent } from '../../shared/modal/modal.component';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild('modal') modalUpdate: ModalComponent;

  // ShowHide
  showItemDictionary = { showProfile: true, showAddress: false, showAccount: false, showAllergies: false, showAddAddress: false };
  user: User;
  location: Location;
  allergy: Allergy;
  userOriginal;
  currentUser;
  addressForm;
  passwordForm;
  emailForm;
  profileForm;
  allAllergies;
  address;
  message;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.createForm();
    this.getUser();
    this.getAllergies();
    this.location = new Location;
    this.allergy = new Allergy;
    this.allAllergies = new Array;
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
        this.validatePostalCode
      ])],
      city: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(20)])],
      country: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(20)])]
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
      ])]
    });
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
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
      return null; // Return as valid postal code
    } else {
      return { 'validatePostalCode': true }; // Return as invalid postal code
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
    this.user = mapNewObject(this.userOriginal);

  }

  private updateEmail() {
    this.user.email = this.emailForm.get('email').value;
    this.emailForm.reset();
    this.updateUser();
  }

  private updatePassword() {
    this.user.password = this.passwordForm.get('password').value;
    this.passwordForm.reset();
    this.updateUser();
  }

  private updateName() {
    this.user.firstName = this.profileForm.get('firstName').value;
    this.user.lastName = this.profileForm.get('lastName').value;
    this.profileForm.reset();
    this.updateUser();
  }

  private updateAddress() {
    this.location.locationName = this.addressForm.get('name').value;
    this.location.address = this.addressForm.get('address').value;
    this.location.postalCode = this.addressForm.get('postalCode').value;
    this.location.city = this.addressForm.get('city').value;
    this.location.country = this.addressForm.get('country').value;
    this.user.locations.push(this.location);
    this.addressForm.reset();
    this.updateUser();
    this.changeShowStatus('showAddress');
    this.location = new Location;
  }

  deleteAddress() {
    const location = this.address;
    if (location) {
      this.user.locations.forEach(function (value, index, array) {
        if (value['locationName'] === location) {
          array.splice(index, 1);
          return;
        }
      });
      this.updateUser();
    } else {
      this.message = 'Select one address.';
      this.modalUpdate.show();
    }
  }

  selectedAddress(locationName: String) {
    this.address = locationName;
  }

  private addAllergy(name) {
    let found = false;
    this.user.allergies.forEach(function (value) {
      if (value['name'] === name) {
        return found = true;
      }
    });
    if (found === false) {
      this.allergy.name = name;
      this.user.allergies.push(this.allergy);
      this.updateUser();
      this.allergy = new Allergy;
    } else {
      this.message = 'You already have this allergy.';
      this.modalUpdate.show();
    }
  }

  private deleteAllergy(name) {
    if (name) {
      this.user.allergies.forEach(function (value, index, array) {
        if (value['name'] === name) {
          array.splice(index, 1);
          return;
        }
      });
      this.updateUser();
    } else {
      this.message = 'Select one allergy.';
      this.modalUpdate.show();
    }
  }

  private getAllergies() {
    this.authService.getAllergies().subscribe(data => {
      this.allAllergies = data;
    }, err => { console.log(err) });
  }

  private getUser() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.authService.getProfile(this.currentUser.username).subscribe(data => {
      this.userOriginal = data;
      this.user = this.userOriginal;
      console.log(this.user);
    },
      err => { console.log(err) });
  }

  // TODO Add update method.
  private updateUser() {
    this.authService.updateProfile(this.user).subscribe(data => {
      this.userOriginal = data;
      this.user = this.userOriginal;
      this.message = 'User update success.';
      this.modalUpdate.show();
      this.getUser();
      setTimeout(() => this.modalUpdate.hide(), 1500);
    },
      err => { console.log(err) });
  }

  private deleteUser() {
    this.authService.deleteProfile(this.currentUser._id).subscribe(data => {
      this.authService.logout();
      this.router.navigate(['/home']);
    }, err => { console.log(err) });
  }
}
