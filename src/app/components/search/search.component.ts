import {Component, Input, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import { EnvironmentHelper } from '../../../environments/environment';
import { AuthService } from '../../services/authentication/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-menu',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchDetails;
  restaurants;
  image;
  search: boolean;

  constructor(private authservice: AuthService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    this.searchDetails = this.formBuilder.group({
      priceMin: [0],
      priceMax: [100],
      distanceMin: [0],
      distanceMax: [100],
      homeDelivery: [false],
      takeAway: [false]
    });
    this.search = true;
  }


  ngOnInit() {
    console.log('INIT');
    this.ngOnChanges();
  }
  ngOnChanges() {
    console.log('Change');
    const search = this.route.snapshot.paramMap.get('search');
    this.searchByName(search);
  }
  ChangeStatus() {
    this.search = !this.search;
  }

  plainValueChanged(event, container: any) {
    const el = this.getElement(container);

  }

  getElement(data) {
    if (typeof(data) === 'string') {
      return document.getElementById(data);
    }
    if (typeof(data) === 'object' && data instanceof Element) {
      return data;
    }
    return null;
  }
  searchByName(name) {
    this.authservice.searchReastaurantByName(name).subscribe(data => {
    this.restaurants = data;
    });
  }
  searchByDetails() {
    const details = {
      homeDelivery: this.searchDetails.value.homeDelivery,
      takeAway: this.searchDetails.get('takeAway').value,
      priceMin: this.searchDetails.get('priceMin').value,
      priceMax: this.searchDetails.get('priceMax').value,
      distanceMin: this.searchDetails.get('distanceMin').value,
      distanceMax: this.searchDetails.get('distanceMax').value
    };
    this.authservice.searchReastaurantByConditions(details).subscribe(data => {
      this.restaurants = data;
    });
  }

}
