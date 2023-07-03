import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Interaction, MissedAction, PlannedTick, SuccessfullyPerformedAction, Tick, UnexpectedKeyPress } from "./Interactions";
import { UserInput } from "./InputHandler.service";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export default class TickRepository {
  /** The list of ticks with their associated expected interactions. */
  protected rotation: BehaviorSubject<PlannedTick[]> = new BehaviorSubject<PlannedTick[]>([]);

  /** The list of ticks that have happened in the game. */
  protected ticks: BehaviorSubject<Tick[]> = new BehaviorSubject<Tick[]>([]);

  constructor() { }

  public rotation$(): Observable<PlannedTick[]> {
    return this.rotation.asObservable();
  }

  public setExpectedRotation(rotation: PlannedTick[]) {
    this.rotation.next(rotation);
  }

  public ticks$(): Observable<Tick[]> {
    return this.ticks.asObservable();
  }

  public tick() {
    if (this.rotation.value.length === 0 || this.ticks.value.length === 0 || this.ticks.value.length > this.rotation.value.length) {
      this.ticks.next([...this.ticks.value, new Tick()]);
      return;
    }

    let ticks = this.ticks.value;
    let plannedTick = this.rotation.value[this.ticks.value.length - 1];
    let recordedTick = this.ticks.value[this.ticks.value.length - 1];

    // At the end of the tick, we need to check if there's any missed interactions.
    let indexToStartTakeMissing = recordedTick.interactions.filter(interaction => interaction instanceof SuccessfullyPerformedAction || interaction instanceof MissedAction).length;

    if (indexToStartTakeMissing < plannedTick.interactions.length) {
      recordedTick.interactions.push(...plannedTick.interactions.slice(indexToStartTakeMissing).map(interaction => new MissedAction(interaction.keybind)));
    }

    this.ticks.next([...ticks, new Tick()]);
  }

  public clearTicks() {
    this.ticks.next([]);
  }

  public recordUserInput(input: UserInput) {
    if (this.ticks.value.length === 0) {
      return;
    }

    let ticks = this.ticks.value;
    let recordedTick = ticks[ticks.length - 1];

    // If we don't expect any user input at all, we can skip all logic and simply add an unexpected interaction.
    if (this.rotation.value.length === 0 || this.rotation.value.length < ticks.length || this.rotation.value[ticks.length - 1].interactions.length === 0) {
      recordedTick.interactions.push(new UnexpectedKeyPress(input.key));
      ticks[ticks.length - 1] = recordedTick;
      this.ticks.next(ticks);

      return;
    }

    let plannedTick = this.rotation.value[ticks.length - 1];
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
}
