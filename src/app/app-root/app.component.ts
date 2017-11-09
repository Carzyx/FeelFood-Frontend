import { Component } from '@angular/core';

import { SignupComponent } from './signup/signup.component'
import { ManagementComponent } from './management/management.component'
import { RestaurantFinderComponent } from './restaurantFinder/restaurantFinder.component'

import "rxjs/add/operator/map";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{

  activeComponents = {
    management : false,
    signup : true,
    restaurantFinder : false
  };

  public toggleComponent(component){
    this.activeComponents[component] =! this.activeComponents[component];
  }

  public reset(){
    Object.keys(this.activeComponents).forEach(cmp => this.activeComponents[cmp] = false);
  }

  public loadAndHideOthers(component){
    this.reset();
    this.activeComponents[component] = true;
  }

  title = "FeelFood";
}
