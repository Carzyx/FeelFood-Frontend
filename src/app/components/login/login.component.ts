import { Component, OnInit } from '@angular/core';
import "rxjs/add/operator/map";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private data: User;
  private showLogin : boolean;
  private showSignup : boolean;

  constructor(private http: HttpClient) {
    this.data = new User();
    this.showLogin = true;
    this.showSignup = !this.showLogin;
  }
  
  ngOnInit() {
  }


  changeShowStatus(){
    this.showLogin = !this.showLogin;
    this.showSignup = !this.showSignup;
  }

  loginSubmit(email, password) {

    this.data.email = email
    this.data.password = password;

    this.http.post('http://localhost:3001/register', JSON.stringify(this.data), { headers: new HttpHeaders().set('Content-Type', 'application/json') })
      .subscribe(data => console.log(data));
  }

  singupSubmit(username, email, password) {
    
    this.data.username = username
    this.data.email = email
    this.data.password = password;

    this.http.post('http://localhost:3001/register', JSON.stringify(this.data), { headers: new HttpHeaders().set('Content-Type', 'application/json') })
      .subscribe(data => console.log(data));
  }

}
