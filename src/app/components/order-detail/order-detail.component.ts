import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/authentication/auth.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  orderId;
  order;
  constructor(private route: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit() {
    this.orderId = this.route.snapshot.params['id'];
    if (this.orderId) {
      this.authService.getOrder(this.orderId).subscribe(data => {
          this.order = data;
        },
        err => console.log(err));
    }
  }

}
