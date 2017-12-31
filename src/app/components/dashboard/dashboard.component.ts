import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/authentication/auth.service';
import {User} from '../../models/user';
import {LoginComponent} from '../login/login.component';
import {Allergy} from '../../models/allergy';
import {Location} from '../../models/location';
import {ModalComponent} from '../../shared/modal/modal.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [LoginComponent]
})
export class DashboardComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;
  currentUser;
  user;
  signupDate;
  lastLogin;
  constructor(private authService: AuthService, private router: Router) {
    this.user = new User;
    this.user.locations = new Array(Location);
    this.user.allergies = new Array(Allergy);
    this.getUser();
  }

  ngOnInit() {
  }

  private getUser() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.authService.getProfile(this.currentUser.username).subscribe(data => {
        this.user = data;
        this.signupDate = new Date(this.user.signupDate).toLocaleDateString();
        this.lastLogin = new Date(this.user.lastLogin).toLocaleString();
        if (!this.user.firstName || !this.user.lastName) {
          this.modal.show();
          this.modal.block();
        }
        console.log(this.user);
      },
      err => { console.log(err)});
  }

  private redirect() {
    this.router.navigate(['userProfile']);
    this.modal.hide();
  }
}
