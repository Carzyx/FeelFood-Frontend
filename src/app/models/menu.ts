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
  constructor () {
    this.name = ''
    this.description = ''
    this.comments = ''
    this.price = null
    this.starters = []
    this.firstOptions = []
    this.secondOptions = []
    this.thirdOptions = []
    this.drinksOptions = []
    this.othersOptions = []
  }
}
