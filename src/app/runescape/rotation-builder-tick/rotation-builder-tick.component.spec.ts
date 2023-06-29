import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotationBuilderTickComponent } from './rotation-builder-tick.component';

describe('RotationBuilderTickComponent', () => {
  let component: RotationBuilderTickComponent;
  let fixture: ComponentFixture<RotationBuilderTickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RotationBuilderTickComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RotationBuilderTickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
