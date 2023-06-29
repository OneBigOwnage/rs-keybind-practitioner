import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class GameLoop {
  protected running: boolean = false;
  protected tickInterval: number = 5000;
  protected ticks: Subject<void> = new Subject();

  public start() {
    if (this.running) {
      return;
    }

    this.running = true;
    this.gameLoop();
  }

  public stop() {
    this.running = false;
  }

  public ticks$(): Observable<void> {
    return this.ticks.asObservable();
  }

  protected gameLoop() {
    let lastTimestamp = performance.now();
    let delta = 0;

    const loop = (timestamp: number) => {
      delta += timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      while (delta >= this.tickInterval) {
        delta -= this.tickInterval;
        this.tick();
      }

      if (this.running) {
        requestAnimationFrame(loop);
      }
    }

    this.tick();
    requestAnimationFrame(loop);
  }

  protected tick() {
    this.ticks.next();
  }
}
