import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';
import { Restaurant } from '../../models/restaurant';
import { Order } from '../../models/order';
import { MapHelper } from '../../helpers/mapHelper'

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  orderId;
  private order: Order;
  private myRestaurant: Restaurant;
  private mapHelper: MapHelper;


  private ratings = [
    {
      key: "Star",
      value: 0
    },
    {
      key: "Hot",
      value: 0
    },
    {
      key: "Healty",
      value: 0
    },
    {
      key: "Vegetal",
      value: 0
    }
  ];


  constructor(private route: ActivatedRoute, private authService: AuthService, ) {
    this.mapHelper = new MapHelper();
  }

  ngOnInit() {
    this.orderId = this.route.snapshot.params['id'];
    if (this.orderId) {
      this.authService.getOrder(this.orderId).subscribe(data => {
        this.order = this.mapHelper.map(Order, data);
        console.log(this.order);       
      },
        err => console.log(err));
    }
  }

  sendRating() {
    console.log(JSON.stringify(this.ratings))
    this.authService.getProfileRestaurant(this.order.restaurant_id).subscribe(data => {
      this.myRestaurant = this.mapHelper.map(Restaurant, data);

      var numOrders = this.myRestaurant.orders.filter(o => o.isRated == true).length;
      console.log("This restaurant was rated "+numOrders+" times.")

      for (var index = 0; index < this.ratings.length; index++) {
        var selectedRate = this.ratings[index];
        var restaurantRate = this.myRestaurant.ratings.find(r => r.key == selectedRate.key).value;
        var newRate = restaurantRate ? (((restaurantRate * numOrders) + selectedRate.value) / (numOrders + 1)) : selectedRate.value;        
        this.ratings[index].value = newRate;
      }
      this.myRestaurant.ratings = this.ratings;
      this.authService.updateProfileRestaurant(this.myRestaurant).subscribe(data => {
      });

      this.order.isRated = true;
      this.authService.updateOrder(this.order).subscribe(data => {
      });    
    });
  }

}
