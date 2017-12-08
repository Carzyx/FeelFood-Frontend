// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export class EnvironmentHelper {

  readonly environment = {
    production: false,
    developer: true
  };

  readonly urlbase: string = this.environment.developer ? 'http://localhost:3001' : 'http://147.83.7.157:3001';

  private readonly userDictionary = {
    signup : '/user/signup',
    login: '/user/login',
    loginFb: '/auth/facebook',
    user: '/user',
    profile: '/user?username=',
    delete: '/user?id=',
    allergies: '/allergies'
  }

  private readonly restaurantDictionary = {
    signup : '/restaurant/signup',
    login: '/restaurant/login',
    loginFb: '/auth/facebook',
    restaurant: '/restaurant',
    allRestaurants: '/restaurants',
    profile: '/restaurant?username=',
    ingredients: '/ingredient'
  }

  readonly urlDictionary = {
    user: this.userDictionary,
    restaurant : this.restaurantDictionary
  }
}
