import {Component, Input, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import { EnvironmentHelper } from '../../../environments/environment';
import { AuthService } from '../../services/authentication/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {forEach} from '@angular/router/src/utils/collection';


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
  namesList;
  showItemDictionary= { someRangePrice: false, someRangeDistance: false, Others: false };
  @Input() someRangePrice: number[];
  @Input() someRangeDistance: number[];

  constructor(private authservice: AuthService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    this.searchDetails = this.formBuilder.group({
      priceMin: [],
      priceMax: [],
      distanceMin: [],
      distanceMax: [],
      homeDelivery: [false],
      takeAway: [false]
    });
    this.someRangePrice = [25, 75];
    this.someRangeDistance = [25, 75];
    this.search = true;
  }

  changeShowStatus(key) {
    this.showItemDictionary[key] = ! this.showItemDictionary[key];
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
  speedSearch(name) {
    this.authservice.speedSerachRestaurantByName(name).subscribe(data => {
      this.namesList = data;
    });
  }
  searchByName(name) {
    this.authservice.searchReastaurantByName(name).subscribe(data => {
    this.restaurants = data;
    });
  }
  searchByDetails() {
    let details = {
      homeDelivery: false,
      takeAway: false,
      priceMin: null,
      priceMax: null,
      distanceMin: null,
      distanceMax: null
    };
    if (this.showItemDictionary.Others) {
      details.homeDelivery = this.searchDetails.value.homeDelivery;
      details.takeAway = this.searchDetails.get('takeAway').value;
    }
    if (this.showItemDictionary.someRangeDistance) {
      details.priceMin = this.someRangePrice[0];
      details.priceMax = this.someRangePrice[1];
    }
    if (this.showItemDictionary.someRangePrice) {
      details.distanceMin = this.someRangeDistance[0];
      details.distanceMax = this.someRangeDistance[1];
    }
    this.authservice.searchReastaurantByConditions(details).subscribe(data => {
      this.restaurants = data;
    });
  }
  onChange(event) {
  }
}
