
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

export function mapNewObject(data) {

    var myUser = new User();
    var keyList = Object.keys(data)
    for (var index = 0; index < keyList.length; index++) {
        var key = keyList[index];

        myUser[key] = data[key];
    }
    return myUser;
}


