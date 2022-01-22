import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { take } from "rxjs/operators";
import { Delay } from "../Delay";
import { GlobalCooldown } from "../GlobalCooldown";
import { Tick } from "../runescape/Tick";
import { GlobalCooldownDataService } from "./GlobalCooldownDataService";
import { TickService } from "./TickService";

@Injectable({ providedIn: 'root' })
export class PractiseService {

  output$!: BehaviorSubject<string>;

  constructor(
    protected tickService: TickService,
    protected dataService: GlobalCooldownDataService,
  ) { }

  practise() {

    let toPerform = this.dataService.get();

    this.tickService.init();
    this.output$ = new BehaviorSubject<string>('');
    this.output$.subscribe(console.log);

    this.tickService.ticks$.pipe(take(toPerform.length)).subscribe(tick => {
      let toPerformInThisTick = toPerform[tick.timestamp];

      if (this.areEqual(toPerformInThisTick, tick)) {
        this.output$.next('Good job!')
      } else {
        this.output$.next('Try again!')
      }

    });
  }

  // TODO
  // We don't know which of the 3 ticks in the given GCD corresponds with the one we are checking right now.
  areEqual(expected: GlobalCooldown | Delay, actual: Tick): boolean {
    return false;
  }
}
