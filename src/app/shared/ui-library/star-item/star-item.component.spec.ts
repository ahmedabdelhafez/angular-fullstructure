import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarItemComponent } from './star-item.component';

describe('StarItemComponent', () => {
  let component: StarItemComponent;
  let fixture: ComponentFixture<StarItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
