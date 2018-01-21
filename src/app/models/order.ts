import { Menu } from './menu';
import { Dish } from './dish';
import { Location } from './location';


export class Order {
    _id: String;
    restaurant_id: String;
    restaurant: String;
    restaurantPhone: String;
    restaurant_location: Location;
    user_id: String;
    userName: String;
    firstName: String;
    lastName: String;
    user_location: Location;
    createDate: Date;
    deliveryDate: Date;
    status: [{ state: String , dataState: Date}];
    isRated: Boolean;
    menusDetails: Array<Menu>;
    dishesDetails: Array<Dish>;
    totalPrice: Number;
    comment: String;
}
