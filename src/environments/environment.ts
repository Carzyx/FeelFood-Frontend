// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export class EnvironmentHelper {

  readonly environment = {
    production: false,
    developer: true
  };

  readonly urlbase: string = this.environment.developer ? 'http://localhost:3001' : 'http://feelfood.es';

  readonly userDictionary = {
    signup : '/signup',
    login: '/login',
    loginFb: '/auth/facebook',
    user: '/user',
    profile: '/user?username=',
    delete: '/user?id=',
    allergies: '/allergies'
  };

  readonly restaurantDictionary = {
    signup : '/signup',
    login: '/login',
    loginFb: '/auth/facebook',
    restaurant: '/restaurant',
    allRestaurants: '/restaurants',
    profile: '/user?username=',
    ingredients: '/ingredient'
  };

  readonly urlDictionary = {
    user: this.userDictionary,
    restaurant: this.restaurantDictionary
  };

}
