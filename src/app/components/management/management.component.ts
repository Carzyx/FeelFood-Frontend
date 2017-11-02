import { Component, Injectable, OnInit } from '@angular/core';
import "rxjs/add/operator/map";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Subscriber} from "rxjs/Subscriber";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html'
})
export class ManagementComponent implements OnInit{
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:3001/user').subscribe(data => {
      this.users = data;
    });
  }

  title: string = 'User management';
  users;
}
