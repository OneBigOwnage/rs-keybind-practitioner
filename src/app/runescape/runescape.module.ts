import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RotationBuilderComponent } from './rotation-builder/rotation-builder.component';
import { FormsModule } from '@angular/forms';
import { EditableTickComponent } from './editable-tick/editable-tick.component';
import { TimeVisualizerComponent } from './time-visualizer/time-visualizer.component';
import { PlannedTickComponent } from './planned-tick/planned-tick.component';
import { ActualTickComponent } from './actual-tick/actual-tick.component';
import { MatIconModule } from '@angular/material/icon';
import { InputTrackerComponent } from './input-tracker/input-tracker.component';
import { InputTrackerTickComponent } from './input-tracker-tick/input-tracker-tick.component';
import { RotationBuilderTickComponent } from './rotation-builder-tick/rotation-builder-tick.component';
import { TrackerResultsComponent } from './tracker-results/tracker-results.component';

@NgModule({
  declarations: [
    RotationBuilderComponent,
    EditableTickComponent,
    TimeVisualizerComponent,
    PlannedTickComponent,
    ActualTickComponent,
    InputTrackerComponent,
    InputTrackerTickComponent,
    RotationBuilderTickComponent,
    TrackerResultsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
  ],
  exports: [
    RotationBuilderComponent,
    EditableTickComponent,
    TimeVisualizerComponent,
    PlannedTickComponent,
    ActualTickComponent,
    InputTrackerComponent,
    InputTrackerTickComponent,
    RotationBuilderTickComponent,
    TrackerResultsComponent,
  ],
})
export class RunescapeModule { }
