import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() lat = 41.275103;
  @Input() lng = 1.985314;
  constructor() {
    this.lat = 41.275103;
    this.lng = 1.985314;
  }

  ngOnInit() {
    this.lat = 41.275103;
    this.lng = 1.985314;
  }
}

