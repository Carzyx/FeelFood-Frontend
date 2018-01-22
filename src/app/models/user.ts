
import { Location } from './location';
import { Restaurant } from './restaurant';
import { Allergy } from "./allergy";
import {Order} from "./order";

export class User {
    _id: String;
    username: String;
    password: String;
    email: String;
    firstName: String;
    lastName: String;
    locations: Array<Location>;
    allergies: Array<Allergy>;
    favoriteRestaurants: Array<Restaurant>;
    lastLogin: Date;
    avatar: String;
    orders: Array<Order>;
}

export function mapNewObject(data) {

    var myUser = new User();
    var keyList = Object.keys(data)
    for (var index = 0; index < keyList.length; index++) {
        var key = keyList[index];

        myUser[key] = data[key];
    }
    return myUser;
}
