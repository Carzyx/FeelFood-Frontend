import { Location } from './location';
import { Menu } from './menu';
import { Dish } from './dish';

export class Restaurant {
  _id: String
  username: String
  password: String
  email: String
  name: String
  tags: {
    homeDelivery: Boolean ,
    takeAway: Boolean ,
    average: {
      dish: Number,
      menu: Number
    }};
  description: [{
    name: String ,
    value: Number
  }];
  images: Array<String>
  phone: Number
  locations: Array<Location>
  menus: Array<Menu>
  dishes: Array<Dish>;
}
