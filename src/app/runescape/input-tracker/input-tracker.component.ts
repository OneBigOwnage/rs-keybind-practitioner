import { Component, OnInit } from '@angular/core';
import TickRepository from '../TickRepository.service';
import { Observable, combineLatest, of } from 'rxjs';
import { Interaction, MissedAction, PlannedTick, SuccessfullyPerformedAction, Tick } from '../Interactions';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-input-tracker',
  templateUrl: './input-tracker.component.html',
  styleUrls: ['./input-tracker.component.scss']
})
export class InputTrackerComponent implements OnInit {

  public previousTicks$: Observable<Tick[]>;
  public currentTick$: Observable<Tick>;
  public upcomingTicks$: Observable<Tick[]>;
  public currentTickIndex: Observable<number | undefined>;
  public doesCurrenttickIncurGCD: Observable<boolean> = of(false);

  constructor(protected repo: TickRepository) {
    this.previousTicks$ = repo.ticks$().pipe(map(ticks => ticks.slice(-4, -1)));

    this.currentTick$ = combineLatest([repo.ticks$(), repo.rotationWithKeybinds$()])
      .pipe(
        filter(([ticks]) => ticks.length > 0),
        map(([ticks, rotation]) => {
          let index = ticks.length - 1;
          let rotationTick = rotation.ticks[index];

          return { gameTick: ticks[index], rotationTick: rotationTick };
        }),
        map(({ gameTick, rotationTick }) => {
          if (!(rotationTick instanceof PlannedTick)) {
            return gameTick;
          }

          let interactions: Interaction[] = gameTick.interactions;
          let indexToStartAddingShoulds = interactions.filter(i => i instanceof SuccessfullyPerformedAction || i instanceof MissedAction).length;
          let shoulds = rotationTick.interactions.slice(indexToStartAddingShoulds);

          return new Tick(interactions.concat(shoulds));
        }));

    this.upcomingTicks$ = combineLatest([repo.ticks$(), repo.rotationWithKeybinds$()])
      .pipe(map(([ticks, rotation]) => {
        let index = ticks.length;

        return rotation.ticks.slice(index, index + 3);
      }));

    this.currentTickIndex = repo.ticks$().pipe(map(ticks => ticks.length - 1));

    this.doesCurrenttickIncurGCD = combineLatest([this.currentTickIndex, repo.GCDIncurringTicks$()])
      .pipe(
        map(([index, indexes]) => {
          if (index === undefined) {
            return false;
          }

          return indexes.includes(index);
        }));
  }

  ngOnInit(): void {
  }

}
