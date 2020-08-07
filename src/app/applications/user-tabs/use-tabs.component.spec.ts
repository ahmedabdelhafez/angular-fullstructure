import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseTabsComponent } from './use-tabs.component';

describe('UseTabsComponent', () => {
  let component: UseTabsComponent;
  let fixture: ComponentFixture<UseTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
