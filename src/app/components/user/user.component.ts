import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  edit;
  user;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.edit = false;
    this.user = new User();
    }
    OnChange(value: string) {
      this.http.get(`http://localhost:3001/user/${value}`).subscribe(data => {
        if (data) {
          this.user = data;
          if (this.user.allergies.length === 0)
            this.user.allergies.push('No tienes alergias definidas');
          if (this.user.orders.length === 0)
            this.user.orders.push('No tienes orders definidas');
        }
      });
    }
    Edit() {
      this.edit = this.edit ? false : true;
      this.getUser();
    }
  Update() {
    alert(JSON.stringify(this.user));
    this.getUser();
  }
  private getUser() {

  }
}
