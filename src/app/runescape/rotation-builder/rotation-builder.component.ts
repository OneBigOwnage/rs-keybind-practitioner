import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import TickRepository from '../TickRepository.service';
import { PlannedTick } from '../Interactions';

@Component({
  selector: 'app-rotation-builder',
  templateUrl: './rotation-builder.component.html',
  styleUrls: ['./rotation-builder.component.scss']
})
export class RotationBuilderComponent implements OnInit {

  constructor(public repo: TickRepository) { }

  ngOnInit(): void {
  }

  addTick() {
    this.repo.rotation$().pipe(take(1)).subscribe(ticks => {

      ticks.push(new PlannedTick());

      this.repo.setExpectedRotation(ticks);
    }).unsubscribe();
  }

  updateTick(index: number, tick: PlannedTick) {
    this.repo.rotation$().pipe(take(1)).subscribe(ticks => {
      ticks[index] = tick;

      this.repo.setExpectedRotation(ticks);
    }).unsubscribe();
  }

  removeTick(index: number) {
    this.repo.rotation$().pipe(take(1)).subscribe(ticks => {
      ticks.splice(index, 1);

      this.repo.setExpectedRotation(ticks);
    }).unsubscribe();
  }
}
