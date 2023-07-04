import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotationsOverview } from './rotations-overview.component';

describe('RotationBuilderComponent', () => {
  let component: RotationsOverview;
  let fixture: ComponentFixture<RotationsOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RotationsOverview ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RotationsOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
