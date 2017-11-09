import { Component, OnInit } from '@angular/core';
import "rxjs/add/operator/map";
import {HttpClient} from "@angular/common/http";
import { FormsModule} from "@angular/forms";

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{
  constructor(private http: HttpClient) {
    this.data = {
      username: String,
      password: String,
      firstName: String,
      lastName: String,
      email: String
    }
  }

  onSubmit() {
    this.http.post('http://localhost:3001/user', JSON.stringify(this.data))
      .subscribe();
  }
  data: Object;
}
