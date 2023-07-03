import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeybindConfiguratorComponent } from './keybind-configurator.component';

describe('KeybindConfiguratorComponent', () => {
  let component: KeybindConfiguratorComponent;
  let fixture: ComponentFixture<KeybindConfiguratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeybindConfiguratorComponent]
    });
    fixture = TestBed.createComponent(KeybindConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
