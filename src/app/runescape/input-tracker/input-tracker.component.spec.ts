import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTrackerComponent } from './input-tracker.component';

describe('InputTrackerComponent', () => {
  let component: InputTrackerComponent;
  let fixture: ComponentFixture<InputTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputTrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
