import { Location } from './location';
import { Menu } from './menu';
import { Dish } from './dish';

export class Restaurant {
    username: String
    password: String
    email: String
    name: String
    phone: Number
    location: Location[]
    menus: Menu[]
    dishes: Dish[]
}