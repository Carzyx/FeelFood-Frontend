///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, Input , OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Dish} from '../../models/dish';
import {Ingredient} from '../../models/ingredient';
import {Restaurant} from '../../models/restaurant';
import {isUndefined} from 'util';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() restaurantName;
  canEdit: boolean;
  restaurant;
  edit: boolean;
  addIng: boolean;
  addMen: boolean;
  ingredients;
  dish: Dish;
  constructor(private http: HttpClient) {
    this.restaurantName = 'Bulli';
    this.dish = new Dish();

  }
  ngOnInit() {
    this.restaurant = new Restaurant();
    this.canEdit = true;
    this.addIng = false;
    this.http.get(`http://localhost:3001/restaurant/${this.restaurantName}`).subscribe(data => {
      this.restaurant = data[0];
    });
  }
  OnChange(value: string) {
    this.http.get(`http://localhost:3001/restaurant/${value}`).subscribe(data => {
      if (data) {
        this.restaurant = data;
      }
    });
  }
  Edit() {
      this.edit = !this.edit;
  }
  Update() {
    alert(JSON.stringify(this.restaurant))
    this.http.put(`http://localhost:3001/restaurant`, this.restaurant, {headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(data => {
    alert(data);
    });
    this.edit = false;
  }

//DISH
  AddIngredient(name, weigth) {
    if ((weigth > 0) && (weigth < 3000)) {
      for (let i = 0; i < this.ingredients.length; i++)
      {
        if (name === this.ingredients[i].name) {
          let ingredient = new Ingredient(name, (this.ingredients[i].calories * weigth) / 100, weigth);
          this.dish.ingredients.push(ingredient);
          this.ingredients.splice(i, 1);
        }
      }
    }
    else alert('Valor no valido\n Tiene que ser un valor entre 1 y 3 Kg');
  }

  Dish() {
    this.addIng = !this.addIng;
    this.http.get(`http://localhost:3001/ingredient`).subscribe(data => {
      this.ingredients = data;
    });
  }
  Menu() {
    this.addMen = !this.addMen;
  }

  AddDish() {
      this.restaurant.dishes.push(this.dish);
      this.http.put(`http://localhost:3001/restaurant`, this.restaurant, {headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(data => {
      alert(JSON.stringify(data));
      this.dish = new Dish();
        this.http.get(`http://localhost:3001/ingredient`).subscribe(data => {
          this.ingredients = data;
        });
  });
  }
}
