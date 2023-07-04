import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import TickRepository from '../TickRepository.service';
import { PlannedTick } from '../Interactions';
import { RotationRepository } from '../rotation-repository.service';

@Component({
  selector: 'app-rotations-overview',
  templateUrl: './rotations-overview.component.html',
  styleUrls: ['./rotations-overview.component.scss']
})
export class RotationsOverview implements OnInit {

  constructor(public repo: RotationRepository) { }

  ngOnInit(): void {
  }

  // addTick() {
  //   this.repo.rotation$().pipe(take(1)).subscribe(ticks => {

  //     ticks.push(new PlannedTick());

  //     this.repo.setExpectedRotation(ticks);
  //   }).unsubscribe();
  // }

  // updateTick(index: number, tick: PlannedTick) {
  //   this.repo.rotation$().pipe(take(1)).subscribe(ticks => {
  //     ticks[index] = tick;

  //     this.repo.setExpectedRotation(ticks);
  //   }).unsubscribe();
  // }

  // removeTick(index: number) {
  //   this.repo.rotation$().pipe(take(1)).subscribe(ticks => {
  //     ticks.splice(index, 1);

  //     this.repo.setExpectedRotation(ticks);
  //   }).unsubscribe();
  // }

}
