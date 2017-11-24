import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../../models/user';
import { mapNewObject } from '../../models/user';
import { EnvironmentHelper } from '../../../environments/environment';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: User;
  envHelper: EnvironmentHelper;
  showItemDictionary = { showLogin: true, showSignup: false };
  signupForm;
  loginForm;
  message;
  messageClass;
  proccessing = false;

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) {
    this.createForm();
    this.user = new User();
    this.envHelper = new EnvironmentHelper();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        this.validateEmail
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])]
    });
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        this.validateEmail
      ])],
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        this.validateUsername
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
      confirm: ['', Validators.required]
    }, { validator: this.matchingPasswords('password', 'confirm') });
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

  validateUsername(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    if (regExp.test(controls.value)) {
      return null; // Return as valid username
    } else {
      return { 'validateUsername': true }; // Return as invalid username
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

  disableForm() {
    this.signupForm.controls['email'].disable();
    this.signupForm.controls['username'].disable();
    this.signupForm.controls['password'].disable();
    this.signupForm.controls['confirm'].disable();
  }

  enableForm() {
    this.signupForm.controls['email'].enable();
    this.signupForm.controls['username'].enable();
    this.signupForm.controls['password'].enable();
    this.signupForm.controls['confirm'].enable();
  }

  ngOnInit() {
  }

  changeShowStatus(key) {

    var itemsList = Object.keys(this.showItemDictionary);
    for (var index = 0; index < itemsList.length; index++) {
      var specificKey = itemsList[index];
      this.showItemDictionary[specificKey] = specificKey === key ? true : false;
    }
  }

  loginSubmit(email, password) {
    this.proccessing = true;
    if (this.showItemDictionary.showLogin) {
      this.user.email = this.loginForm.get('email').value;
      this.user.password = this.loginForm.get('password').value;
    } else {
      this.user.email = email;
      this.user.password = password;
    }

    var url = this.envHelper.urlbase + this.envHelper.urlDictionary.user.login;
    var headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    var body = JSON.stringify(this.user);

    this.http.post(url, body, headers)
      .subscribe(data => {
        console.log(JSON.stringify(data));
        if (!data['success']) {
          this.messageClass = 'alert alert-danger';
          this.message = data['message'];
          this.proccessing = false;
        } else {
          this.messageClass = 'alert alert-success';
          this.message = data['message'];
          this.user = mapNewObject(data['user']);
          setTimeout(() => {
            this.router.navigate(['/auth/' + this.user.username + '/' + data['token']]);
          }, 2000);
        }
      });
  }

  singupSubmit() {
    this.proccessing = true;
    this.disableForm();
    this.user.username = this.signupForm.get('username').value;
    this.user.email = this.signupForm.get('email').value;
    this.user.password = this.signupForm.get('password').value;

    var url = this.envHelper.urlbase + this.envHelper.urlDictionary.user.signup;
    var headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    var body = JSON.stringify(this.user);

    this.http.post(url, body, headers)
      .subscribe(
      data => {
        console.log(JSON.stringify(data));
        if (!data['success']) {
          this.messageClass = 'alert alert-danger';
          this.message = data['message'];
          this.proccessing = false;
          this.enableForm();
        } else {
          console.log(data);
          this.loginSubmit(this.user.email, this.user.password);
        }
      });
  }
}
