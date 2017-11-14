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
  restaurant;
  edit: boolean;
  addIng: boolean;
  ingredients;
  dish: Dish;
  constructor(private http: HttpClient) {
    this.restaurantName = 'Bulli';
    this.dish = new Dish();
  }
  ngOnInit() {
    this.addIng = false;
    this.http.get(`http://localhost:3001/restaurant/${this.restaurantName}`).subscribe(data => {
      this.restaurant = data;
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
  private getUser() {

  }
  // initialize_google_map()
  // {
  //   let myLatlng = new google.maps.LatLng(get_latitude, get_longitude);
  //   let mapOptions = {
  //     zoom: 14,
  //     scrollwheel: false,
  //     center: myLatlng
  //   };
  //   let map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
  //   let marker = new google.maps.Marker({
  //     position: myLatlng,
  //     map: map
  //   });
  //    }

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
    console.log(this.dish)
    console.log(this.dish.name)
    this.addIng = !this.addIng;
    this.http.get(`http://localhost:3001/ingredient`).subscribe(data => {
      this.ingredients = data;
    });
    // this.http.get(`http://localhost:3001/ingredients`).subscribe(data => {
    //     for ( var i = 0; i < data.length; i++){
    //       let find = false;
    //       for ( var j = 0; j < this.dish.ingredients.length; j++) {
    //         if (data[i].name === this.dish.ingredients[j].name)
    //           find = true;
    //       }
    //       data.splice(i,1);
    //   }
    //   this.ingredients = data;
    // });
  }

  AddDish() {
      this.restaurant.dishes.push(this.dish);
      alert(JSON.stringify(this.dish.ingredients);
      this.http.put(`http://localhost:3001/restaurant`, this.restaurant, {headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(data => {
      alert(JSON.stringify(data);
  }
}
