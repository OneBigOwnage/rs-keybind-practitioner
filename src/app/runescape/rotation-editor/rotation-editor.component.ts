import { Component, Input, OnInit } from '@angular/core';
import { AbilityRotation, RotationRepository } from '../rotation-repository.service';
import { PlannedTick } from '../Interactions';
import { RunescapeAction, RunescapeActions } from '../RunescapeActions';
import { Ability, KeybindRepository } from '../keybind-repository.service';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rotation-editor',
  templateUrl: './rotation-editor.component.html',
  styleUrls: ['./rotation-editor.component.scss']
})
export class RotationEditorComponent implements OnInit {

  public rotationName: string = '';
  public readonly allAvailableActions = Object.values(RunescapeActions);

  public showAddAction: number | undefined = undefined;

  @Input({ required: true })
  public rotation!: AbilityRotation;

  constructor(public repo: RotationRepository, public keybinds: KeybindRepository) { }

  public ngOnInit(): void {
    this.rotationName = this.rotation.name;
  }

  public removeAction(tickIndex: number, actionIndex: number): void {
    this.repo.rotations$().pipe(take(1)).subscribe(rotations => {
      rotations.find(r => r.ID === this.rotation.ID)?.ticks[tickIndex].actions.splice(actionIndex, 1);

      this.repo.updateRotation(this.rotation);
    });
  }

  public removeTick(tick: PlannedTick): void {
    this.repo.rotations$().pipe(take(1)).subscribe(rotations => {
      let rotation = rotations.find(r => r.ID === this.rotation.ID);

      if (rotation === undefined) {
        throw new Error(`Could not find rotation with ID ${this.rotation.ID}`);
      }

      rotation.ticks.splice(rotation.ticks.indexOf(tick), 1);

      this.repo.updateRotation(this.rotation);
    });
  }

  public moveActionLeft(tick: PlannedTick, action: Ability) {
    this.repo.rotations$().pipe(take(1)).subscribe(rotations => {
      let rotation = rotations.find(r => r.ID === this.rotation.ID);

      if (!rotation) {
        throw new Error(`Could not find rotation with ID ${this.rotation.ID}`);
      }

      let actionIndex = tick.actions.findIndex(a => a === action);

      if (actionIndex === 0) {
        return;
      }

      let previousAction = tick.actions[actionIndex - 1];
      tick.actions[actionIndex - 1] = action;
      tick.actions[actionIndex] = previousAction;

      this.repo.updateRotation(rotation);
    });
  }

  public moveActionRight(tick: PlannedTick, action: Ability) {
    this.repo.rotations$().pipe(take(1)).subscribe(rotations => {
      let rotation = rotations.find(r => r.ID === this.rotation.ID);

      if (!rotation) {
        throw new Error(`Could not find rotation with ID ${this.rotation.ID}`);
      }

      let actionIndex = tick.actions.findIndex(a => a === action);

      if (actionIndex === tick.actions.length - 1) {
        return;
      }

      let nextAction = tick.actions[actionIndex + 1];
      tick.actions[actionIndex + 1] = action;
      tick.actions[actionIndex] = nextAction;

      this.repo.updateRotation(rotation);
    });
  }

  public moveTickLeft(tick: PlannedTick) {
    this.repo.rotations$().pipe(take(1)).subscribe(rotations => {
      let rotation = rotations.find(r => r.ID === this.rotation.ID);

      if (!rotation) {
        throw new Error(`Could not find rotation with ID ${this.rotation.ID}`);
      }

      let tickIndex = rotation.ticks.findIndex(t => t === tick);

      if (tickIndex === 0) {
        return;
      }

      let previousTick = rotation.ticks[tickIndex - 1];
      rotation.ticks[tickIndex - 1] = tick;
      rotation.ticks[tickIndex] = previousTick;

      this.repo.updateRotation(rotation);
    });
  }

  public moveTickRight(tick: PlannedTick) {
    this.repo.rotations$().pipe(take(1)).subscribe(rotations => {
      let rotation = rotations.find(r => r.ID === this.rotation.ID);

      if (!rotation) {
        throw new Error(`Could not find rotation with ID ${this.rotation.ID}`);
      }

      let tickIndex = rotation.ticks.findIndex(t => t === tick);

      if (tickIndex === rotation.ticks.length - 1) {
        return;
      }

      let previousTick = rotation.ticks[tickIndex + 1];
      rotation.ticks[tickIndex + 1] = tick;
      rotation.ticks[tickIndex] = previousTick;

      this.repo.updateRotation(rotation);
    });
  }

  public onSelectionChange(tickIndex: number, ref: HTMLSelectElement): void {
    if (ref.value === '') {
      return;
    }

    let action = ref.value as RunescapeAction;

    this.repo.rotations$().pipe(take(1)).subscribe(rotations => {
      let rotation = rotations.find(r => r.ID === this.rotation.ID);

      if (!rotation) {
        throw new Error(`Could not find rotation with ID ${this.rotation.ID}`);
      }

      rotation.ticks[tickIndex].actions.push(new Ability(action));

      this.repo.updateRotation(rotation);
    });

    ref.selectedIndex = 0;
    this.showAddAction = undefined;
  }

  public findKeyCombinationForAction(action: Ability): Observable<string | undefined> {
    return this.keybinds.keybinds$().pipe(take(1), map(keybinds => {
      let keybind = keybinds.find(keybind => keybind.ability.name === action.name);

      return keybind?.keyCombination;
    }));
  }

  public addTick(): void {
    this.repo.rotations$().pipe(take(1)).subscribe(rotations => {
      let rotation = rotations.find(r => r.ID === this.rotation.ID);

      if (!rotation) {
        throw new Error(`Could not find rotation with ID ${this.rotation.ID}`);
      }

      rotation.ticks.push(new PlannedTick());

      this.repo.updateRotation(rotation);
    });
  }

  public setName(): void {
    this.repo.rotations$().pipe(take(1)).subscribe(rotations => {
      let rotation = rotations.find(r => r.ID === this.rotation.ID);

      if (!rotation) {
        throw new Error(`Could not find rotation with ID ${this.rotation.ID}`);
      }

      rotation.name = this.rotationName;

      this.repo.updateRotation(rotation);
    });
  }
}
