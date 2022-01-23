import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import KeypressPrettifier from "./KeypressPrettifier";
import { Tick } from "./Tick";

@Injectable({ providedIn: "root" })
export default class GameLoop {

  public readonly tickLengthInMs: number = 600;

  protected requestID?: number;

  public ticks: BehaviorSubject<Tick[]> = new BehaviorSubject<Tick[]>([]);

  constructor(protected prettifier: KeypressPrettifier) { }

  start() {
    this.ticks = new BehaviorSubject<Tick[]>([]);
    this.requestID = window.requestAnimationFrame(this.loop.bind(this));

    this.registerKeyPressCallback();
    this.registerMouseClickCallback();
  }

  stop() {
    if (this.requestID !== undefined) {
      window.cancelAnimationFrame(this.requestID);
    }
  }

  loop(timestamp: number) {
    let ticks = this.ticks.value;
    let latestTick = ticks[ticks.length - 1];

    if (ticks.length === 0 || timestamp - latestTick.timestamp > this.tickLengthInMs) {
      ticks.push(new Tick(timestamp, [], []));

      this.ticks.next(ticks);
    }

    this.requestID = window.requestAnimationFrame(this.loop.bind(this));
  }

  protected registerKeyPressCallback() {
    window.addEventListener("keydown", event => {
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
    });
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

  protected registerMouseClickCallback() {
    window.addEventListener("click", event => {
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
    });
  }
}
