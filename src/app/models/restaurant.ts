import { Location } from './location';
import { Menu } from './menu';
import { Dish } from './dish';
import {Order} from './order';
import { Rate } from './rate';
import {Images} from './images';

export class Restaurant {
  _id: String;
  username: String;
  password: String;
  email: String;
  name: String;
  images: Array<Images>;
  phone: String;
  locations: Array<Location>;
  menus: Array<Menu>;
  dishes: Array<Dish>;
  orders: Array<Order>;
  ratings: Array<Rate>;
  avatar: String;
}
