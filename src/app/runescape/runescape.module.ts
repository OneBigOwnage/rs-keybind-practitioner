import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TickComponent } from './tick/tick.component';
import { RotationBuilderComponent } from './rotation-builder/rotation-builder.component';
import { RotationComponent } from './rotation/rotation.component';
import { FormsModule } from '@angular/forms';
import { EditableTickComponent } from './editable-tick/editable-tick.component';

@NgModule({
  declarations: [
    TickComponent,
    RotationBuilderComponent,
    RotationComponent,
    EditableTickComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [TickComponent, RotationBuilderComponent, RotationComponent, EditableTickComponent],
})
export class RunescapeModule { }
