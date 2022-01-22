import { Inject, Injectable } from "@angular/core";
import { RunescapeModule } from "./runescape.module";
import { Tick } from "./Tick";

@Injectable({ providedIn: RunescapeModule })
export default class GameLoop {

  public readonly tickLengthInMs: number = 600;

  protected requestID?: number;

  protected ticks: Tick[] = [];


  start() {
    this.ticks = [];
    this.requestID = window.requestAnimationFrame(this.loop.bind(this));

    this.registerKeyPressCallback();
    this.registerMouseClickCallback();
  }

  stop() {
    this.ticks = [];

    if (this.requestID) {
      window.cancelAnimationFrame(this.requestID);
    }
  }

  loop(timestamp: number) {
    if (this.ticks.length === 0 || timestamp - this.ticks[this.ticks.length - 1].timestamp > this.tickLengthInMs) {
      this.ticks.push(new Tick(timestamp, [], []));

      console.log('Adding a new tick. Last tick looked like this:', this.ticks[this.ticks.length - 2]);
    }

    this.requestID = window.requestAnimationFrame(this.loop.bind(this));
  }

  protected registerKeyPressCallback() {
    window.addEventListener("keypress", event => {
      event.preventDefault();
      event.stopPropagation();

      let key = this.extractKey(event);

      if (this.ticks.length === 0) {
        return;
      }

      this.ticks[this.ticks.length - 1].keyPresses.push(key);
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

      if (this.ticks.length === 0) {
        return;
      }

      this.ticks[this.ticks.length - 1].clicks.push({
        x: event.clientX,
        y: event.clientY
      });
    });
  }
}
