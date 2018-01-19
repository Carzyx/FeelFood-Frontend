import { Location } from './location';
import { Menu } from './menu';
import { Dish } from './dish';
import {Order} from './order';

export class Restaurant {
  _id: String;
  username: String;
  password: String;
  email: String;
  name: String;
  images: Array<String>;
  phone: String;
  locations: Array<Location>;
  menus: Array<Menu>;
  dishes: Array<Dish>;
  orders: Array<Order>;
}
