import { Dish } from './dish';

export class Menu {
  _id: String
  name: String
  description: String
  comments: String
  visible: boolean
  price: number
  starters: Dish[]
  firstOptions: Dish[]
  secondOptions: Dish[]
  thirdOptions: Dish[]
  drinksOptions: Dish[]
  othersOptions: Dish[]
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
