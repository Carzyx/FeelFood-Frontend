import { Dish } from './dish';

export class Menu {
    name: String
    description: String
    comments: String
    price: Number
    starters: Dish[]
    firstOptions: Dish[]
    secondOptions: Dish[]
    thirdOptions: Dish[]
    drinksOptions: Dish[]
    othersOptions: Dish[]
}