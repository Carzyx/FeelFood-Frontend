export class Ingredient{
    ingredient: String
    calories: Number
    weight: Number

  constructor(ingredient?: String, calories?: Number, weight?: Number) {
    this.ingredient = ingredient;
    this.calories = calories;
    this.weight = weight;
  }
}
