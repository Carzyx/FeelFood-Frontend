
import { Location } from './location';
import { Restaurant } from './restaurant';

export class User {
    username: String
    password: String
    email: String
    firstName: String
    lastName: String
    locations: Array<Location>
    allergies: Array<String>
    favoriteRestaurants: Array<Restaurant>
    //orders: [Schema.Types.ObjectId, ref: 'orders' }],
    //isAdmin: Boolean   
}