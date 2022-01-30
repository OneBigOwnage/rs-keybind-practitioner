import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannedTickComponent } from './planned-tick.component';

describe('PlannedTickComponent', () => {
  let component: PlannedTickComponent;
  let fixture: ComponentFixture<PlannedTickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlannedTickComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannedTickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
