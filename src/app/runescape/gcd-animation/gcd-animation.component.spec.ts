import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GcdAnimationComponent } from './gcd-animation.component';

describe('GcdAnimationComponent', () => {
  let component: GcdAnimationComponent;
  let fixture: ComponentFixture<GcdAnimationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GcdAnimationComponent]
    });
    fixture = TestBed.createComponent(GcdAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
