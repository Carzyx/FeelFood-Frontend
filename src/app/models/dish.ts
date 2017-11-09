import { Ingredient } from './ingredient';

export class Dish {
    name: String
    description: String
    amount: Number
    ingredients: Ingredient[]
    stock: Number  
    totalCalories: Number
}