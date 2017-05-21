import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTimelineComponent } from './category-timeline.component';

describe('CategoryTimelineComponent', () => {
  let component: CategoryTimelineComponent;
  let fixture: ComponentFixture<CategoryTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
