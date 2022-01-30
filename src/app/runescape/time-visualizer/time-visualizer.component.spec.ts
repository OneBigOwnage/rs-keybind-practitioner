import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeVisualizerComponent } from './time-visualizer.component';

describe('TimeVisualizerComponent', () => {
  let component: TimeVisualizerComponent;
  let fixture: ComponentFixture<TimeVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeVisualizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
