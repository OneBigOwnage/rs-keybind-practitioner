import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, ReplaySubject, combineLatest } from "rxjs";
import { Interaction, MissedAction, PlannedTick, SuccessfullyPerformedAction, Tick, UnexpectedKeyPress } from "./Interactions";
import { UserInput } from "./InputHandler.service";
import { distinctUntilChanged, filter, map, take } from "rxjs/operators";
import { AbilityRotation, AbilityRotationWithKeybinds } from "./rotation-repository.service";
import { KeybindRepository } from "./keybind-repository.service";
import { NonGCDActions } from "./RunescapeActions";

@Injectable({ providedIn: "root" })
export default class TickRepository {
  /** The list of ticks with their associated expected interactions. */
  protected rotation: ReplaySubject<AbilityRotation> = new ReplaySubject<AbilityRotation>(1);

  /** The list of ticks with their associated expected abilities and keybinds */
  protected rotationWithKeybinds: ReplaySubject<AbilityRotationWithKeybinds> = new ReplaySubject<AbilityRotationWithKeybinds>(1);

  /** The list of ticks that have happened in the game. */
  protected ticks: BehaviorSubject<Tick[]> = new BehaviorSubject<Tick[]>([]);

  constructor(public keybindRepository: KeybindRepository) {
    combineLatest([this.rotation, this.keybindRepository.keybinds$()]).subscribe(([rotation, keybinds]) => {
      this.rotationWithKeybinds.next(rotation.withKeybinds(keybinds));
    });
  }

  public rotation$(): Observable<AbilityRotation> {
    return this.rotation.asObservable();
  }

  public rotationWithKeybinds$(): Observable<AbilityRotationWithKeybinds> {
    return this.rotationWithKeybinds.asObservable();
  }

  public setExpectedRotation(rotation: AbilityRotation) {
    this.rotation.next(rotation);
  }

  public ticks$(): Observable<Tick[]> {
    return this.ticks.asObservable();
  }

  public tick() {
    this.rotationWithKeybinds.pipe(take(1)).subscribe(rotation => {
      if (rotation.ticks.length === 0 || this.ticks.value.length === 0 || this.ticks.value.length > rotation.ticks.length) {
        this.ticks.next([...this.ticks.value, new Tick()]);
        return;
      }

      let ticks = this.ticks.value;
      let plannedTick = rotation.ticks[this.ticks.value.length - 1];
      let recordedTick = this.ticks.value[this.ticks.value.length - 1];

      // At the end of the tick, we need to check if there's any missed interactions.
      let indexToStartTakeMissing = recordedTick.interactions.filter(interaction => interaction instanceof SuccessfullyPerformedAction || interaction instanceof MissedAction).length;

      if (indexToStartTakeMissing < plannedTick.actions.length) {
        recordedTick.interactions.push(...plannedTick.interactions.slice(indexToStartTakeMissing).map(interaction => new MissedAction(interaction.keybind)));
      }

      this.ticks.next([...ticks, new Tick()]);
    });
  }

  public clearTicks() {
    this.ticks.next([]);
  }

  public recordUserInput(input: UserInput) {
    this.rotationWithKeybinds.pipe(take(1)).subscribe(rotation => {
      if (this.ticks.value.length === 0) {

        return;
      }

      let ticks = this.ticks.value;
      let recordedTick = ticks[ticks.length - 1];

      // If we don't expect any user input at all, we can skip all logic and simply add an unexpected interaction.
      if (rotation.ticks.length === 0 || rotation.ticks.length < ticks.length || rotation.ticks[ticks.length - 1].actions.length === 0) {
        recordedTick.interactions.push(new UnexpectedKeyPress(input.key));
        ticks[ticks.length - 1] = recordedTick;
        this.ticks.next(ticks);

        return;
      }

      let plannedTick = rotation.ticks[ticks.length - 1];
      let nrOfExpectedInteractions = plannedTick.interactions.filter(interaction => interaction.key() === input.key).length;
      let nrOfRecordedInteractionsSoFar = recordedTick.interactions.filter(interaction => interaction.key() === input.key).length;

      if (nrOfExpectedInteractions > nrOfRecordedInteractionsSoFar) {
        // Sometimes the input order within the context of a single tick doesn't matter, but sometimes it does.
        // If we want to account for the the order of input, when replacing an expected input with a successful one,
        // we need to check if there's any expected input before the successful one we just inserted. If so,
        // we need to replace all expected inputs before the one we inserted with missed interactions.
        let action = plannedTick.interactions.find(interaction => interaction.key() === input.key);

        if (action === undefined) {
          throw new Error(`Expected action with key ${input.key} not found.`);
        }

        let indexToInsertBefore = recordedTick.interactions.push(new SuccessfullyPerformedAction(action.keybind)) - 1;
        let startIndexToFindMissing = recordedTick.interactions.filter(interaction => interaction instanceof SuccessfullyPerformedAction || interaction instanceof MissedAction).length - 1;
        let endIndexToFindMissing = plannedTick.interactions.findIndex((interaction, index) => index >= startIndexToFindMissing && interaction.key() === input.key);
        let missingInput = plannedTick.interactions.slice(startIndexToFindMissing, endIndexToFindMissing).map(interaction => new MissedAction(interaction.keybind));

        recordedTick.interactions.splice(indexToInsertBefore, 0, ...missingInput);
      } else {
        recordedTick.interactions.push(new UnexpectedKeyPress(input.key));
      }

      ticks[ticks.length - 1] = recordedTick;
      this.ticks.next(ticks);
    });
  }

  public correctCount$(): Observable<number> {
    return this.ticks.pipe(
      map(ticks => ticks.reduce((total: Interaction[], tick) => [...total, ...tick.interactions], []).filter(interaction => interaction instanceof SuccessfullyPerformedAction).length)
    );
  }

  public missedCount$(): Observable<number> {
    return this.ticks.pipe(
      map(ticks => ticks.reduce((total: Interaction[], tick) => [...total, ...tick.interactions], []).filter(interaction => interaction instanceof MissedAction).length)
    );
  }

  public unexpectedCount$(): Observable<number> {
    return this.ticks.pipe(
      map(ticks => ticks.reduce((total: Interaction[], tick) => [...total, ...tick.interactions], []).filter(interaction => interaction instanceof UnexpectedKeyPress).length)
    );
  }

  public GCDIncurringTicks$(): Observable<number[]> {
    const gcdTicks: number[] = [];
    let gcdCooldownRemaining = 0;

    return this.rotation.pipe(map(rotation => {
      rotation.ticks.forEach((tick: PlannedTick, index: number) => {
        if (gcdCooldownRemaining > 1) {
          gcdCooldownRemaining--;
          return;
        }

        const hasGcdIncurringAction = tick.actions.some(action => !NonGCDActions.includes(action.name as any));

        if (hasGcdIncurringAction) {
          gcdTicks.push(index);
          gcdCooldownRemaining = 3;
        }
      });

      return gcdTicks;
    }));
  }

  public triggerGCD$(): Observable<void> {
    return combineLatest([this.ticks, this.GCDIncurringTicks$()]).pipe(
      distinctUntilChanged(([aTicks, aGcdTicks], [bTicks, bGcdTicks]) => aTicks.length === bTicks.length),
      filter(([ticks, gcdTicks]) => {
        return gcdTicks.includes(ticks.length - 1);
      }),
      map(() => { })
    );
  }
}
