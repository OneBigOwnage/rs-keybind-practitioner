import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualTickComponent } from './actual-tick.component';

describe('ActualTickComponent', () => {
  let component: ActualTickComponent;
  let fixture: ComponentFixture<ActualTickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualTickComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualTickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
