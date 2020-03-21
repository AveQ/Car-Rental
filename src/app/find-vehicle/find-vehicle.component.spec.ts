import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindVehicleComponent } from './find-vehicle.component';

describe('FindVehicleComponent', () => {
  let component: FindVehicleComponent;
  let fixture: ComponentFixture<FindVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
