import {Component, Input, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { EnvironmentHelper } from '../../../environments/environment';
import { AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {Restaurant} from '../../models/restaurant';
import {Ingredient} from '../../models/ingredient';
import {Menu} from '../../models/menu';
import {Dish} from '../../models/dish';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
  }

}
