import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';
import {mapNewObject} from '../../models/user';


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

  constructor(private http: HttpClient) {
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
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.http.get('http://localhost:3001/user?username=' + this.currentUser.name, { headers: new HttpHeaders()
      .set('Authorization', this.currentUser.token)})
      .subscribe(data => {
        this.userOriginal = data;
        this.user = this.userOriginal;
        console.log(this.user);
      },
      err => { console.log(err)});
  }

  // TODO Add update user method.
  private updateUser() {
    this.http.put('http://localhost:3001/user', JSON.stringify(this.user), { headers: new HttpHeaders()
      .set('Authorization', this.currentUser.token)
      .set('Content-Type', 'application/json')})
    .subscribe(data => {
      this.userOriginal = data;
      this.user = this.userOriginal;
      alert('User updated.');
      this.getUser();
    },
    err => { console.log(err)});
  }

  private deleteUser() {
    this.http.delete('http://localhost:3001/user', { headers: new HttpHeaders()
      .set('Authorization', this.currentUser.token)
      .set('Content-Type', 'application/json')}).subscribe(data => {alert('User deleted.');
    }, err => { console.log(err)});
  }
}
