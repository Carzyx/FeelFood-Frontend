import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/authentication/auth.service';
import {User} from '../../models/user';
import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [LoginComponent]
})
export class DashboardComponent implements OnInit {
  currentUser;
  user;
  signupDate;
  constructor(private authService: AuthService) {
    this.user = new User;
    this.getUser();
  }

  ngOnInit() {
  }

  private getUser() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.authService.getProfile(this.currentUser.username).subscribe(data => {
        this.user = data;
        this.signupDate = this.user.signupDate.split('T')[0];
        console.log(this.user);
      },
      err => { console.log(err)});
  }
}
