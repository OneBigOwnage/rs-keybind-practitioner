import { Component, OnInit } from '@angular/core';
import Game from './runescape/Game.service';
import { tickFactory } from './runescape/Interactions';

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
    // This is the telos p1 rotation with my new 2023 binds
    this.game.setRotation([
      tickFactory('B CTRL-E A'),
      tickFactory(),
      tickFactory(),
      tickFactory('1 S D T'),
      tickFactory(),
      tickFactory(),
      tickFactory('ALT-3 ALT-B X A'),
      tickFactory(),
      tickFactory(),
      tickFactory('V S D'),
      tickFactory(),
      tickFactory(),
      tickFactory('H'),
      tickFactory(),
      tickFactory(),
      tickFactory('Z A'),
      tickFactory(),
      tickFactory(),
      tickFactory('2 S D T'),
      tickFactory(),
      tickFactory(),
      tickFactory('A Y'),
      tickFactory(),
      tickFactory(),
      tickFactory('2 3'),
      tickFactory(),
      tickFactory(),
      tickFactory('C'),
      tickFactory(),
      tickFactory(),
      tickFactory('1 S D T'),
      tickFactory(),
      tickFactory(),
      tickFactory('A CTRL-W'),
      tickFactory(),
      tickFactory(),
      tickFactory('CTRL-Q'),
      tickFactory(),
      tickFactory('5'),
      tickFactory('Y'),
    ]);
  }
}
