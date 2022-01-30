import { Component, OnInit } from '@angular/core';
import GameLoop from './runescape/GameLoop';
import RotationRepository from './runescape/RotationRepository';
import { Tick } from './runescape/Tick';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showRotationBuilder: boolean = false;

  percentage = 0;

  constructor(public loop: GameLoop, public repo: RotationRepository) {
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
      new Tick(Date.now(), ['A'], []),
      new Tick(Date.now(), ['B', 'B'], []),
      new Tick(Date.now(), ['C'], []),
    ]);
  }
}
