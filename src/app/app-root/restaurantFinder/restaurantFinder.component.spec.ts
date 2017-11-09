import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantFinderComponent } from './restaurantFinder.component';

describe('RestaurantFinderComponent', () => {
  let component: RestaurantFinderComponent;
  let fixture: ComponentFixture<RestaurantFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantFinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
