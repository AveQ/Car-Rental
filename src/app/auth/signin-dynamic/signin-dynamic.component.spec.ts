import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninDynamicComponent } from './signin-dynamic.component';

describe('SigninDynamicComponent', () => {
  let component: SigninDynamicComponent;
  let fixture: ComponentFixture<SigninDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
