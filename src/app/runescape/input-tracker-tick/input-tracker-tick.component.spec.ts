import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTrackerTickComponent } from './input-tracker-tick.component';

describe('InputTrackerTickComponent', () => {
  let component: InputTrackerTickComponent;
  let fixture: ComponentFixture<InputTrackerTickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputTrackerTickComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTrackerTickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
