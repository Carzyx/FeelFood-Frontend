
import { Location } from './location';
import { Restaurant } from './restaurant';

export class User {
    username: String
    password: String
    email: String
    firstName: String
    lastName: String
    locations: Location[]
    allergies: String
    favoriteRestaurants: Restaurant[]
    //orders: [Schema.Types.ObjectId, ref: 'orders' }],
    //isAdmin: Boolean
}


