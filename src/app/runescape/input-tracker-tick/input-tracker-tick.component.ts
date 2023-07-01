import { Component, Input, OnInit } from '@angular/core';
import { Interaction, MissedKeyPress, SuccessfulKeyPress, Tick, UnexpectedKeyPress } from '../Interactions';
import { KeybindRepository } from '../keybind-repository.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  constructor(public repo: KeybindRepository) { }

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

  public icon(interaction: Interaction): Observable<string | undefined> {
    return this.repo.keybinds$().pipe(map(keybinds => keybinds.find(keybind => keybind.keyCombination === interaction.key)?.ability.iconURL()));
  }
}
