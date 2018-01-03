import { Menu } from './menu';
import { Dish } from './dish';
import { Location } from './location';


export class Order {
    username: String
    restaurant_id: Number
    createDate: Date
    deliveryDate: Date
    //status: [{ state: { type: String }, dataState: { type: Date } }],
    location: Location
    menusDetails: Array<Menu>
    dishesDetails: Array<Dish>
    totalPrice: Number
}
    