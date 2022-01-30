import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ActualTick } from "./ActualTick";
import KeypressPrettifier from "./KeypressPrettifier.service";
import RotationRepository from "./RotationRepository.service";

@Injectable({ providedIn: "root" })
export default class GameLoop {

  public readonly tickLengthInMs: number = 600;

  public ticks: BehaviorSubject<ActualTick[]> = new BehaviorSubject<ActualTick[]>([]);

  public emitter = new EventEmitter<number>();

  /**
   * The epoch is the time when the game loop started.
   */
  protected epoch: number = performance.now();

  /**
   * The requestAnimationFrame ID.
   */
  protected requestID?: number;

  /**
   * We need a bound method to be able to remove the event listeners.
   */
  protected boundOnKeyPress = this.onKeyPress.bind(this);

  /**
   * We need a bound method to be able to remove the event listeners.
   */
  protected boundOnClick = this.onClick.bind(this);

  constructor(protected prettifier: KeypressPrettifier, public repo: RotationRepository) { }

  start() {
    this.reset();
    this.requestID = window.requestAnimationFrame(this.loop.bind(this));

    this.registerEventListeners();
  }

  stop() {
    this.unregisterEventListeners();

    if (this.requestID !== undefined) {
      window.cancelAnimationFrame(this.requestID);
    }
  }

  reset() {
    this.epoch = performance.now();
    this.ticks = new BehaviorSubject<ActualTick[]>([]);
  }

  loop(timestamp: number) {
    timestamp = timestamp - this.epoch;

    let globalCoolDownLength = this.tickLengthInMs * 3;

    this.emitter.emit(timestamp % globalCoolDownLength / globalCoolDownLength * 100);

    let ticks = this.ticks.value;
    let latestTick = ticks[ticks.length - 1];

    if (ticks.length === 0 || timestamp - latestTick.timestamp >= this.tickLengthInMs) {
      ticks.push(new ActualTick(this.hash(ticks.length), timestamp, [], []));

      this.ticks.next(ticks);
    }

    this.requestID = window.requestAnimationFrame(this.loop.bind(this));
  }

  protected registerEventListeners() {
    window.addEventListener("keydown", this.boundOnKeyPress);
    window.addEventListener("click", this.boundOnClick);
  }

  protected unregisterEventListeners() {
    window.removeEventListener("keydown", this.boundOnKeyPress);
    window.removeEventListener("click", this.boundOnClick);
  }

  protected onKeyPress(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();

    let key = this.prettifier.extractKey(event);

    if (!this.shouldRecordKeystroke(key, event)) {
      return;
    }

    let ticks = this.ticks.value;
    let tick = this.ticks.value[ticks.length - 1];

    tick.keyPresses.push(key);
    ticks[ticks.length - 1] = tick;

    this.ticks.next(ticks);
  }

  protected onClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (this.ticks.value.length === 0) {
      return;
    }

    let ticks = this.ticks.value;
    let tick = this.ticks.value[this.ticks.value.length - 1];
    tick.clicks.push({ x: event.clientX, y: event.clientY });
    ticks[ticks.length - 1] = tick;

    this.ticks.next(ticks);
  }

  protected shouldRecordKeystroke(key: string, event: KeyboardEvent): boolean {
    if (this.ticks.value.length === 0) {
      return false;
    }

    if (['Control', 'Alt', 'Shift'].includes(event.key)) {
      return false;
    }

    return true;
  }

  hash(index: number) {
    // If the index exists in the repository, we use the existing ID.
    // Otherwise, we create a new ID.
    if (this.repo.rotation.value.length > index) {
      console.log('Using existing ID.');

      return this.repo.rotation.value[index].ID;
    }

    return Math.random().toString(36).substring(2, 15)
      + Math.random().toString(36).substring(2, 15);
  }
}
