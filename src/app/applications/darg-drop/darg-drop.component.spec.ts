/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DargDropComponent } from './darg-drop.component';

describe('DargDropComponent', () => {
  let component: DargDropComponent;
  let fixture: ComponentFixture<DargDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DargDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DargDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
