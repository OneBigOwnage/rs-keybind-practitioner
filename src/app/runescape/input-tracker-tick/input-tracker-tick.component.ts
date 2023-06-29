import { Component, Input, OnInit } from '@angular/core';
import { Tick } from '../Interactions';

export type InputTrackerTickContextType = 'PREVIOUS' | 'CURRENT' | 'UPCOMING';

@Component({
  selector: 'app-input-tracker-tick',
  templateUrl: './input-tracker-tick.component.html',
  styleUrls: ['./input-tracker-tick.component.scss']
})
export class InputTrackerTickComponent implements OnInit {

  @Input()
  tick?: Tick;

  @Input()
  context?: InputTrackerTickContextType;

  constructor() { }

  ngOnInit(): void {
  }

}
