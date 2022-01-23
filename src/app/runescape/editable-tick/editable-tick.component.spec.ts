import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableTickComponent } from './editable-tick.component';

describe('EditableTickComponent', () => {
  let component: EditableTickComponent;
  let fixture: ComponentFixture<EditableTickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditableTickComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableTickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
