import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { RunescapeModule } from "./runescape.module";
import { Tick } from "./Tick";

@Injectable({ providedIn: RunescapeModule })
export default class GameLoop {

  public readonly tickLengthInMs: number = 600;

  protected requestID?: number;

  public ticks: BehaviorSubject<Tick[]> = new BehaviorSubject([] as Tick[]);

  start() {
    this.ticks = new BehaviorSubject([] as Tick[]);
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

      console.log('Adding a new tick. Last tick looked like this:', this.ticks.value[this.ticks.value.length - 2]);
    }

    this.requestID = window.requestAnimationFrame(this.loop.bind(this));
  }

  protected registerKeyPressCallback() {
    window.addEventListener("keydown", event => {
      event.preventDefault();
      event.stopPropagation();

      let key = this.extractKey(event);

      if (this.ticks.value.length === 0) {
        return;
      }

      let ticks = this.ticks.value;
      let tick = this.ticks.value[this.ticks.value.length - 1];
      tick.keyPresses.push(key);
      ticks[ticks.length - 1] = tick;

      this.ticks.next(ticks);
    });
  }

  protected extractKey(event: KeyboardEvent): string {
    let key = '';

    if (event.ctrlKey) {
      key += 'CTRL-';
    }

    if (event.altKey) {
      key += 'ALT-';
    }

    if (event.shiftKey) {
      key += 'SHIFT-';
    }

    return key + event.key.toUpperCase();
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
