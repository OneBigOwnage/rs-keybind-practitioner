import { Injectable } from "@angular/core";
import TickRepository from "./TickRepository.service";
import { GameLoop } from "./GameLoop.service";
import { InputHandler } from "./InputHandler.service";
import { Tick } from "./Interactions";
import { combineLatest } from "rxjs";
import { filter, map, takeWhile } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export default class Game {
  constructor(
    protected loop: GameLoop,
    protected input: InputHandler,
    protected repo: TickRepository,
  ) {
    this.loop.ticks$().subscribe(() => this.repo.tick());
    this.input.keyPresses$().subscribe(input => this.repo.recordUserInput(input));
  }

  public startGameLoop() {
    this.repo.clearTicks();

    // We automatically stop the game loop from running when the rotation is complete.
    combineLatest([this.repo.rotation$(), this.repo.ticks$()])
      .pipe(
        map(([rotation, ticks]) => ticks.length > rotation.length),
        takeWhile(bool => !bool, true),
        filter(bool => bool)
      )
      .subscribe(() => this.loop.stop());

    this.loop.start();
  }

  public stopGameLoop() {
    this.loop.stop();
  }

  public setRotation(rotation: Tick[]) {
    this.repo.setExpectedRotation(rotation);
  }

  public ticks$() {
    return this.repo.ticks$();
  }

  public resetGameLoop() {
    this.repo.clearTicks();
  }
}
