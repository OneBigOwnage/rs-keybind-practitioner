import { Component, OnInit } from '@angular/core';
import Game from './runescape/Game.service';
import { ShouldPressKey, Tick, tickFactory } from './runescape/Interactions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showRotationBuilder: boolean = false;

  percentage = 0;

  constructor(public game: Game) {
  }

  ngOnInit() {
    this.loadRotation();
  }

  loadRotation() {
    this.game.setRotation([
      tickFactory('AABAAB'),
      tickFactory('BB'),
      tickFactory(' '),
      tickFactory('C'),
    ]);
  }
}
