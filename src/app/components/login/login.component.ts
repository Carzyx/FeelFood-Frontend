import { Component, OnInit } from '@angular/core';
import "rxjs/add/operator/map";
import { HttpClient } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public data: User;
  constructor(private http: HttpClient) {
    this.data = new User(); 
  } 
  

  loginSubmit() {
    this.http.post('http://localhost:3001/user', JSON.stringify(this.data))
      .subscribe();
    alert("loginSubmit done! " + JSON.stringify(this.data))
  }

}
