import { Location } from './location';
import { Menu } from './menu';
import { Dish } from './dish';

export class Restaurant {
    id: String
    username: String
    password: String
    email: String
    name: String
    images: String[]
    phone: Number
    location: Location[]
    menus: Menu[]
    dishes: Dish[];
    constructor() {
      this.id = ''
      this.username = ''
      this.password = ''
      this.email = ''
      this. name = ''
      this.images = []
      this.phone = null
      this.location = []
      this.menus = []
      this.dishes = [];
    }
}
