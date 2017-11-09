import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app-root/app.component';
import {HttpClientModule} from '@angular/common/http';
import {ManagementComponent} from "./app-root/management/management.component";
import { SignupComponent } from './app-root/signup/signup.component';
import { RestaurantFinderComponent } from './app-root/restaurantFinder/restaurantFinder.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ManagementComponent,
    SignupComponent,
    RestaurantFinderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    ManagementComponent,
    SignupComponent,
    RestaurantFinderComponent
  ]
})
export class AppModule { }
