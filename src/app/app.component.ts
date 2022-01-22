import { Component } from '@angular/core';
import GameLoop from './runescape/GameLoop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public game: GameLoop) { }

  start() {
    this.game.start();
  }

  stop() {
    this.game.stop();
  }
}
