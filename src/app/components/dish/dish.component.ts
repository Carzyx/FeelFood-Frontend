import {Component, Input, OnInit, Directive} from '@angular/core';
import 'rxjs/add/operator/map';
import { EnvironmentHelper } from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/authentication/auth.service';

import {Router} from '@angular/router';
import {Restaurant} from '../../models/restaurant';
import {Ingredient} from '../../models/ingredient';
import {Dish} from '../../models/dish';


@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})

export class DishComponent implements OnInit {

  @Input() restaurant: Restaurant;
  @Input() dishes;
  @Input() menuName ;
  @Input() currentList ;

  positionMenu;
  addDish = false;
  editDish = false;
  import = false;
  dish: Dish;
  envHelper: EnvironmentHelper;
  ingredients;
  currentImport;


  constructor(private router: Router, private authService: AuthService) {
    this.dish = new Dish();
    this.envHelper = new EnvironmentHelper();
    this.currentList = 'Dishes';
  }

  ngOnInit() {
    if (!this.menuName)
      this.dishes = this.restaurant.dishes;
    this.getMenuPosition();
  }


  // TODO Add update method.
  private updateRestaurant() {
    this.authService.updateProfilerRestaurant(this.restaurant.id).subscribe(data => {
      this.dish = new Dish();
      if (!this.menuName)
        this.dishes = this.restaurant.dishes;
    });
  }

  private ShowDish() {
    this.dish = new Dish();
    this.addDish = !this.addDish ;
    this.getIngredients();
  }
  private AddDish(value) {
    this.addDish = this.addDish ? false : true ;
    if ((!this.addDish) && (value === 'Dishes')) {
      this.restaurant.dishes.push(this.dish);
      this.updateRestaurant();
      this.getIngredients();
    }
    else {
      this.importDish();
    }
  }
  private EditDish(dish: Dish) {
    this.dish = dish ;
    this.addDish = !this.addDish ;
    this.editDish = !this.editDish ;
  }
  private UpdateDish() {
    for (let i  = 0; i < this.restaurant.dishes.length; i++) {
      if (this.restaurant.dishes[i].name === this.dish.name)
        this.restaurant.dishes[i] = this.dish;
    }
    const dish = new Dish();
    this.EditDish(dish);
    this.updateRestaurant();
  }
  private DelDish(name) {
    if (this.confirmar()) {
      this.dishes.forEach(function (value, index, array) {
        if (value['name'] === name) {
          array.splice(index, 1);
          return;
        }
      });
    if (this.currentList === 'Dishes')
      this.restaurant.dishes = this.dishes;
    else
      this.restaurant.menus[this.positionMenu][this.currentList] = this.dishes;
    this.updateRestaurant();
    }
  }

  private AddIngredient(name, weigth) {
    if ((weigth > 0) && (weigth < 3000)) {
      for (let i = 0; i < this.ingredients.length; i++)
      {
        if (name === this.ingredients[i].name) {
          const ingredient = new Ingredient(name, (this.ingredients[i].calories * weigth) / 100, weigth);
          this.dish.ingredients.push(ingredient);
          this.ingredients.splice(i, 1);
        }
      }
    }
    else alert('Valor no valido\n Tiene que ser un valor entre 1 y 3 Kg');
  }
  private DeleteIngredient(name) {
    for (let i = 0; i < this.dish.ingredients.length; i++) {
      if (name === this.dish.ingredients[i].ingredient) {
        this.dish.ingredients.splice(i, 1);
      }
    }
    this.getIngredients();
  }

  private findIngredient() {

  }
  private getIngredients() {
    this.authService.getIngredients().subscribe(data => {
      this.ingredients = data;
      for (let i = 0; i < this.dish.ingredients.length; i++) {
        for (let j = 0; j < this.ingredients.length; j++) {
          if (this.ingredients[j].name === this.dish.ingredients[i].ingredient)
            this.ingredients.splice(j, 1);
        }
      }
    });
  }
  private confirmar() {
    return confirm('Estas seguro?');
  }


  private ShowImport() {
    this.ShowDish();
    this.import = !this.import;
    console.log(this.restaurant);
  }

  private ListToImport(value) {
    this.currentImport = new Array<Dish>();
    if (value !== 'Select one') {
      if ( value === 'Dishes') {
        this.currentImport = this.restaurant.dishes;
      }
      else {
       for (let i = 0; i < this.restaurant.menus.length; i++) {
         if (this.restaurant.menus[i].name === value) {
           for (let j = 0; j < this.restaurant.menus[i].starters.length; j++) {
           this.currentImport.push(this.restaurant.menus[i].starters[j]);
           }
           for (let j = 0; j < this.restaurant.menus[i].firstOptions.length; j++) {
             this.currentImport.push(this.restaurant.menus[i].firstOptions[j]);
           }
           for (let j = 0; j < this.restaurant.menus[i].secondOptions.length; j++) {
             this.currentImport.push(this.restaurant.menus[i].secondOptions[j]);
           }
           for (let j = 0; j < this.restaurant.menus[i].thirdOptions.length; j++) {
             this.currentImport.push(this.restaurant.menus[i].thirdOptions[j]);
           }
           for (let j = 0; j < this.restaurant.menus[i].drinksOptions.length; j++) {
             this.currentImport.push(this.restaurant.menus[i].drinksOptions[j]);
           }
         }
       }
      }
    }
  }

  private importDish() {
    if (this.currentList === 'Dishes')
      this.AddDish('Dishes');
    else
      this.restaurant.menus[this.positionMenu][this.currentList].push(this.dish);
    this.updateRestaurant();
    this.import = false;
  }

  private GetImport(value) {
    for (let i = 0; i < this.currentImport.length; i++) {
      if (value === this.currentImport[i].name)
        this.dish = this.currentImport[i];
    }
  }

  private Cancel() {
    this.dish = new Dish();
    this.addDish = false;
    this.import = false;
  }
  private getMenuPosition() {
    for (let i = 0; i < this.restaurant.menus.length; i++) {
      if (this.restaurant.menus[i].name === this.menuName)
        this.positionMenu = i ;
    }
  }
}
