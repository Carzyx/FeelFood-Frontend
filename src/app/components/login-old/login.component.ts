import { Component, Injectable, OnInit } from '@angular/core';
import "rxjs/add/operator/map";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Subscriber} from "rxjs/Subscriber";
import {AppModule} from "../../app.module";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./app.component.css'],
})
export class LoginComponent{
}
