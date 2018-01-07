import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFbComponent } from './authFb.component';

describe('AuthFbComponent', () => {
  let component: AuthFbComponent;
  let fixture: ComponentFixture<AuthFbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthFbComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthFbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
