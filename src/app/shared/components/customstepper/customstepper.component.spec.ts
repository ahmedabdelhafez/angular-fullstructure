import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomstepperComponent } from './customstepper.component';

describe('CustomstepperComponent', () => {
  let component: CustomstepperComponent;
  let fixture: ComponentFixture<CustomstepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomstepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomstepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
