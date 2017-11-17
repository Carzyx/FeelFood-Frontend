import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  //ShowHide
  showItemDictionary = { showProfile: true, showAccount: false, showAllergies: false };
  user: User;
  userRequest;


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
  }

  //Get user to show info -- temporal function, data will be provided by cookie or another component.
  private getUser() {
    this.http.get('http://localhost:3001/user?username=MiguelPower')
      .subscribe(data => {
        this.userRequest = data;
        this.user = this.userRequest;
        console.log(this.user)
      },
      err => { console.log(err) }
      );
  }

  //TODO Add update user method.
  updateUser(){

  }

}