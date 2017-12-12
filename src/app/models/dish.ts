import { Ingredient } from './ingredient';
import { Validators, FormControl } from '@angular/forms';

export class Dish {
    name;
    category;
    description;
    amount;
    ingredients: Array<Ingredient>;
    stock;
    totalCalories;

  constructor() {
    this.name = '',
    this.category = '',
    this.description = '',
    this.amount = null,
    this.ingredients = [],
    this.stock = null,
    this.totalCalories = 0;
  }
}
