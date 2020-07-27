import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyinputComponent } from './myinput.component';

describe('MyinputComponent', () => {
  let component: MyinputComponent;
  let fixture: ComponentFixture<MyinputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyinputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
