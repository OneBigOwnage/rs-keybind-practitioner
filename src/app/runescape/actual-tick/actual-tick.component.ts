import { Component, Input, OnInit } from '@angular/core';
import { Interaction, MissedKeyPress, SuccessfulKeyPress, Tick, UnexpectedKeyPress } from '../Interactions';

@Component({
  selector: 'app-actual-tick',
  templateUrl: './actual-tick.component.html',
  styleUrls: ['./actual-tick.component.scss']
})
export class ActualTickComponent implements OnInit {

  @Input()
  tick?: Tick;

  constructor() { }

  public ngOnInit(): void {
  }

  public isSuccessful(interaction: Interaction) {
    return interaction instanceof SuccessfulKeyPress;
  }

  public isMissed(interaction: Interaction) {
    return interaction instanceof MissedKeyPress;
  }

  public isUnexpected(interaction: Interaction) {
    return interaction instanceof UnexpectedKeyPress;
  }

  public isMissedOrUnexpected(interaction: Interaction) {
    return interaction instanceof MissedKeyPress
      || interaction instanceof UnexpectedKeyPress;
  }
}
