import { Ingredient } from './ingredient';
import { Validators, FormControl } from '@angular/forms';

export class Dish {
    name: String;
    category: String;
    description: String;
    price: Number;
    ingredients: Array<Ingredient>;
    stock;
    totalCalories;

  constructor() {
    this.name = '',
    this.category = '',
    this.description = '',
    this.price = null,
    this.ingredients = [],
    this.stock = null,
    this.totalCalories = 0;
  }
}
