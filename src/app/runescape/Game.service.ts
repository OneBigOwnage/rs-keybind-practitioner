import { Injectable } from "@angular/core";
import TickRepository from "./TickRepository.service";
import { GameLoop } from "./GameLoop.service";
import { InputHandler } from "./InputHandler.service";
import { BehaviorSubject, combineLatest } from "rxjs";
import { filter, map, takeWhile } from "rxjs/operators";
import { AbilityRotation } from "./rotation-repository.service";

export type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';

@Injectable({ providedIn: "root" })
export default class Game {

  protected difficulty: BehaviorSubject<Difficulty> = new BehaviorSubject<Difficulty>('BEGINNER');

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
    this.input.startCapturing();

    // We automatically stop the game loop from running when the rotation is complete.
    combineLatest([this.repo.rotation$(), this.repo.ticks$()])
      .pipe(
        map(([rotation, ticks]) => ticks.length > rotation.ticks.length),
        takeWhile(bool => !bool, true),
        filter(bool => bool)
      )
      .subscribe(() => this.stopGameLoop());

    this.loop.start();
  }

  public stopGameLoop() {
    this.loop.stop();
    this.input.stopCapturing();
  }

  public setRotation(rotation: AbilityRotation) {
    this.repo.setExpectedRotation(rotation);
  }

  public ticks$() {
    return this.repo.ticks$();
  }

  public resetGameLoop() {
    this.repo.clearTicks();
  }

  public difficulty$() {
    return this.difficulty.asObservable();
  }

  public setDifficulty(difficulty: Difficulty) {
    this.difficulty.next(difficulty);
  }
}
