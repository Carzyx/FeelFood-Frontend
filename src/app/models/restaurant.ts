import { Location } from './location';
import { Menu } from './menu';
import { Dish } from './dish';

export class Restaurant {
  id: String
  username: String
  password: String
  email: String
  name: String
  images: Array<String>
  phone: Number
  location: Array<Location>
  menus: Array<Menu>
  dishes: Array<Dish>;
}
