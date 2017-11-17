import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  //ShowHide
  showItemDictionary = { showProfile: true, showAddress: false, showAccount: false, showAllergies: false};
  user: User;
  userOriginal;


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

    //Update user to avoid erroneous changes   
    this.user = new User().mapNewObject(this.userOriginal)
    
  }

  //Get user to show info -- temporal function, data will be provided by cookie or another component.
  private getUser() {
    this.http.get('http://localhost:3001/user?username=MiguelPower')
      .subscribe(data => {
        this.userOriginal = data;
        this.user = this.userOriginal
        console.log(this.user)
      },
      err => { console.log(err) }
      );
  }

  //TODO Add update user method.
  updateUser(){
    this.http.put('http://localhost:3001/user', JSON.stringify(this.user), { headers: new HttpHeaders().set('Content-Type', 'application/json') })
    .subscribe(data => {
      this.userOriginal = data;
      this.user = this.userOriginal;
      console.log(this.user)
    },
    err => { console.log(err) }
    );
  }

}