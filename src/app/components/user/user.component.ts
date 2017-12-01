import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';
import {mapNewObject} from '../../models/user';
import { AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  // ShowHide
  showItemDictionary = { showProfile: true, showAddress: false, showAccount: false, showAllergies: false};
  user: User;
  userOriginal;
  currentUser;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
    this.getUser();
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
    this.authService.deleteProfile(this.currentUser.username).subscribe(data => {
      alert('User deleted.');
      this.authService.logout();
      this.router.navigate(['/home']);
    }, err => { console.log(err)});
  }
}
