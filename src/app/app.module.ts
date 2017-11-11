import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from "./login.component";
import {ManagementComponent} from "./management.component";

@NgModule({
  declarations: [
    AppComponent,
    ManagementComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    ManagementComponent,
    LoginComponent
  ]
})
export class AppModule { }
