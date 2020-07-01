import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterViewerComponent } from './filter-viewer.component';

describe('FilterViewerComponent', () => {
  let component: FilterViewerComponent;
  let fixture: ComponentFixture<FilterViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
