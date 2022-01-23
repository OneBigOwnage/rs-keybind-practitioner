import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotationBuilderComponent } from './rotation-builder.component';

describe('RotationBuilderComponent', () => {
  let component: RotationBuilderComponent;
  let fixture: ComponentFixture<RotationBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RotationBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RotationBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
