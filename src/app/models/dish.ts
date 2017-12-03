import { Ingredient } from './ingredient';

export class Dish {
    name: String;
    category: String;
    description: String;
    amount: Number;
    ingredients: Array<Ingredient>;
    stock: Number;
    totalCalories: Number;

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
