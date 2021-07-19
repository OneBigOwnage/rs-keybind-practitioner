import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalCooldownComponent } from './global-cooldown.component';

describe('GlobalCooldownComponent', () => {
  let component: GlobalCooldownComponent;
  let fixture: ComponentFixture<GlobalCooldownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalCooldownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalCooldownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
