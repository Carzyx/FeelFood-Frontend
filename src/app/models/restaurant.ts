import { Location } from './location';
import { Menu } from './menu';
import { Dish } from './dish';
import { Rate } from './rate';

export class Restaurant {
  _id: String
  username: String
  password: String
  email: String
  name: String
  images: Array<String>
  phone: Number
  locations: Array<Location>
  menus: Array<Menu>
  dishes: Array<Dish>;
  ratings: Array<Rate>
}
