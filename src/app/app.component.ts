import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { ActualTick } from './runescape/ActualTick';
import Comparator from './runescape/Comparator.service';
import GameLoop from './runescape/GameLoop.service';
import { PlannedTick } from './runescape/PlannedTick';
import ResultSet from './runescape/ResultSet';
import RotationRepository from './runescape/RotationRepository.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showRotationBuilder: boolean = false;

  percentage = 0;

  constructor(public loop: GameLoop, public repo: RotationRepository, public comparator: Comparator) {
    this.loop.emitter.subscribe((percentage) => this.percentage = percentage);
  }

  ngOnInit() {
    this.loadRotation();
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }

  loadRotation() {
    this.repo.rotation.next([
      new PlannedTick(this.hash(), ['A'], []),
      new PlannedTick(this.hash(), ['B', 'B'], []),
      new PlannedTick(this.hash(), [], []),
      new PlannedTick(this.hash(), ['C'], []),
    ]);
  }

  getResultSet(actual: ActualTick): ResultSet {
    let planned = this.repo.rotation.value.find(planned => planned.ID === actual.ID);

    if (!planned) {
      return new ResultSet(actual.ID, [], actual.keyPresses, [], []);
    }

    /**
     * TODO: We need a more sophisticated algorithm here.
     * This algorithm does not account for multiple of the same key within a single tick.
     */


    let correctKeyPresses = planned.keyPresses.filter(keyPress => actual.keyPresses.includes(keyPress));
    let incorrectKeyPresses = actual.keyPresses.filter(keyPress => !planned?.keyPresses.includes(keyPress));

    return new ResultSet(actual.ID, correctKeyPresses, incorrectKeyPresses, [], []);
  }

  hash() {
    return Math.random().toString(36).substring(2, 15)
      + Math.random().toString(36).substring(2, 15);
  }
}
