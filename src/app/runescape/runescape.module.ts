import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RotationsOverview } from './rotations-overview/rotations-overview.component';
import { FormsModule } from '@angular/forms';
import { TimeVisualizerComponent } from './time-visualizer/time-visualizer.component';
import { MatIconModule } from '@angular/material/icon';
import { InputTrackerComponent } from './input-tracker/input-tracker.component';
import { InputTrackerTickComponent } from './input-tracker-tick/input-tracker-tick.component';
import { RotationBuilderTickComponent } from './rotation-builder-tick/rotation-builder-tick.component';
import { TrackerResultsComponent } from './tracker-results/tracker-results.component';
import { KeybindConfiguratorComponent } from './keybind-configurator/keybind-configurator.component';
import { RotationEditorComponent } from './rotation-editor/rotation-editor.component';

@NgModule({
  declarations: [
    RotationsOverview,
    TimeVisualizerComponent,
    InputTrackerComponent,
    InputTrackerTickComponent,
    RotationBuilderTickComponent,
    TrackerResultsComponent,
    KeybindConfiguratorComponent,
    RotationEditorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
  ],
  exports: [
    RotationsOverview,
    TimeVisualizerComponent,
    InputTrackerComponent,
    InputTrackerTickComponent,
    RotationBuilderTickComponent,
    TrackerResultsComponent,
    KeybindConfiguratorComponent,
  ],
})
export class RunescapeModule { }
