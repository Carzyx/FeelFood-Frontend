import { Menu } from './menu';
import { Dish } from './dish';
import { Location } from './location';


export class Order {
    username: String
    restaurant_id: String
    restaurant: String
    restaurant_location: Location
    
    username_id: String
    firstName: String
    lastName: String
    user_location: Location
    
    createDate: Date
    deliveryDate: Date
    //status: [{ state: { type: String }, dataState: { type: Date } }],
    menusDetails: Array<Menu>
    dishesDetails: Array<Dish>
    totalPrice: Number
}
    