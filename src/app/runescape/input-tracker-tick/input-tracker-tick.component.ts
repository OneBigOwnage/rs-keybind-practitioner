import { Component, Input, OnInit } from '@angular/core';
import { Interaction, MissedKeyPress, SuccessfulKeyPress, Tick, UnexpectedKeyPress } from '../Interactions';

export type InputTrackerTickContextType = 'PREVIOUS' | 'CURRENT' | 'UPCOMING';

@Component({
  selector: 'app-input-tracker-tick',
  templateUrl: './input-tracker-tick.component.html',
  styleUrls: ['./input-tracker-tick.component.scss']
})
export class InputTrackerTickComponent implements OnInit {

  @Input({ required: true })
  tick!: Tick;

  @Input({ required: true })
  context!: InputTrackerTickContextType;

  constructor() { }

  ngOnInit(): void {
  }

  public isSuccessful(interaction: Interaction): boolean {
    return interaction instanceof SuccessfulKeyPress;
  }

  public isUnexpected(interaction: Interaction): boolean {
    return interaction instanceof UnexpectedKeyPress;
  }

  public isMissed(interaction: Interaction): boolean {
    return interaction instanceof MissedKeyPress;
  }
}
