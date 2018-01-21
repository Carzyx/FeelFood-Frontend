import { Dish } from './dish';

export class Menu {
  _id: String
  name: String
  description: String
  comments: String
  visible: boolean
  price: number
  starters: Array<Dish>
  firstOptions: Array<Dish>
  secondOptions: Array<Dish>
  thirdOptions: Array<Dish>
  drinksOptions: Array<Dish>
  othersOptions: Array<Dish>
  constructor() {
    this._id = ''
    this.name = ''
    this.description = ''
    this.comments = ''
    this.visible = false
    this.price = null
    this.starters = []
    this.firstOptions = []
    this.secondOptions = []
    this.thirdOptions = []
    this.drinksOptions = []
    this.othersOptions = []
  }
}
