import { Component, Input, OnInit } from '@angular/core';
import { PlannedTick } from '../PlannedTick';
import RotationRepository from '../RotationRepository.service';

@Component({
  selector: 'app-rotation-builder',
  templateUrl: './rotation-builder.component.html',
  styleUrls: ['./rotation-builder.component.scss']
})
export class RotationBuilderComponent implements OnInit {

  constructor(public repo: RotationRepository) { }

  ngOnInit(): void {
  }

  addTick() {
    let ticks = this.repo.rotation.value;

    ticks.push(new PlannedTick(this.hash(), [], []));

    this.repo.rotation.next(ticks);
  }

  updateTick(tick: PlannedTick) {
    let ticks = this.repo.rotation.value;

    ticks[ticks.indexOf(tick)] = tick;

    this.repo.rotation.next(ticks);
  }

  removeTick(tick: PlannedTick) {
    let ticks = this.repo.rotation.value;

    ticks.splice(ticks.indexOf(tick), 1);

    this.repo.rotation.next(ticks);
  }

  hash() {
    return Math.random().toString(36).substring(2, 15)
      + Math.random().toString(36).substring(2, 15);
  }

  // saveKeyStroke() {
  //   if (this.keyStrokes == '') {
  //     return;
  //   }

  //   this.keyStrokes = this.keyStrokes.trim().toUpperCase();

  //   if (this.currentTick !== undefined) {
  //     this.currentTick.keyPresses = [this.keyStrokes];

  //     let ticks = this.repo.rotation.value;

  //     let index = ticks.indexOf(this.currentTick);
  //     ticks[index] = this.currentTick;

  //     this.repo.rotation.next(ticks);

  //     this.currentTick = undefined;
  //   } else {
  //     let ticks = this.repo.rotation.value;

  //     ticks.push(new Tick(Date.now(), [this.keyStrokes], []));

  //     this.repo.rotation.next(ticks);
  //   }

  //   this.keyStrokes = '';
  // }

  // setCurrentTick(tick: Tick) {
  //   if (tick == this.currentTick) {
  //     this.currentTick = undefined;
  //     this.keyStrokes = '';

  //     return;
  //   }

  //   this.keyStrokes = tick.keyPresses[0];
  //   this.currentTick = tick;
  // }

}
