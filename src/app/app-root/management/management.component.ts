import { Component, Injectable, OnInit } from '@angular/core';
import "rxjs/add/operator/map";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'management',
  templateUrl: './management.component.html',
  styleUrls: ['../app.component.css'],
})
export class ManagementComponent implements OnInit{
  constructor(private http: HttpClient) {}

  public deleteUser(id){
    let url = 'http://localhost:3001/user?id=' + id;
    this.http.delete(url);
  }

  ngOnInit(): void {
    this.http.get('http://localhost:3001/user').subscribe(data => {
      this.users = data;
    });
  }

  title: string = 'User management';
  users;
}
