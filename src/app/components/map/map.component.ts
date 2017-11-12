import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat = 41.275103;
  lng = 1.985314;
  constructor() { }

  ngOnInit() {
  }
}

