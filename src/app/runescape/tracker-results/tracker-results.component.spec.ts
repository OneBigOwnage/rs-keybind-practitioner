import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerResultsComponent } from './tracker-results.component';

describe('TrackerResultsComponent', () => {
  let component: TrackerResultsComponent;
  let fixture: ComponentFixture<TrackerResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackerResultsComponent]
    });
    fixture = TestBed.createComponent(TrackerResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
