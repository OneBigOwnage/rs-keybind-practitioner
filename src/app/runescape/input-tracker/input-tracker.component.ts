import { Component, OnInit } from '@angular/core';
import TickRepository from '../TickRepository.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Tick, tickFactory } from '../Interactions';

@Component({
  selector: 'app-input-tracker',
  templateUrl: './input-tracker.component.html',
  styleUrls: ['./input-tracker.component.scss']
})
export class InputTrackerComponent implements OnInit {

  public previousTicks$: Observable<Tick[]> = new BehaviorSubject([tickFactory('B CTRL-E A'), tickFactory('1 S D T')]);
  public currentTick$: Observable<Tick> = new BehaviorSubject(tickFactory('B CTRL-E A'));
  public upcomingTicks$: Observable<Tick[]> = new BehaviorSubject([tickFactory('1 S D T')]);

  constructor(protected repo: TickRepository) { }

  ngOnInit(): void {
  }

}
