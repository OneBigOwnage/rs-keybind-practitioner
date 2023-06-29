import { Component, OnInit } from '@angular/core';
import TickRepository from '../TickRepository.service';
import { Observable, combineLatest } from 'rxjs';
import { Interaction, MissedKeyPress, SuccessfulKeyPress, Tick } from '../Interactions';
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

  constructor(protected repo: TickRepository) {
    this.previousTicks$ = repo.ticks$().pipe(map(ticks => ticks.slice(-4, -1)));

    this.currentTick$ = combineLatest([repo.ticks$(), repo.rotation$()])
      .pipe(
        filter(([ticks]) => ticks.length > 0),
        map(([ticks, rotation]) => {
          let index = ticks.length - 1;
          let rotationTick = rotation[index];

          return [ticks[index], rotationTick];
        }),
        map(([tick, rotationTick]) => {
          if (!(rotationTick instanceof Tick)) {
            return tick;
          }

          let interactions: Interaction[] = tick.interactions;
          let indexToStartAddingShoulds = interactions.filter(i => i instanceof SuccessfulKeyPress || i instanceof MissedKeyPress).length;
          let shoulds = rotationTick.interactions.slice(indexToStartAddingShoulds);

          return new Tick(interactions.concat(shoulds));
        }));

    this.upcomingTicks$ = combineLatest([repo.ticks$(), repo.rotation$()])
      .pipe(map(([ticks, rotation]) => {
        let index = ticks.length;

        return rotation.slice(index, index + 3);
      }));
  }

  ngOnInit(): void {
  }

}
