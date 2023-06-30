import { Component, OnInit } from '@angular/core';
import Game from './runescape/Game.service';
import { tickFactory } from './runescape/Interactions';
import { Observable, Subject, combineLatest, fromEvent, of, timer } from 'rxjs';
import { filter, finalize, map, scan, startWith, take, tap } from 'rxjs/operators';
import TickRepository from './runescape/TickRepository.service';
import { InputHandler } from './runescape/InputHandler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showRotationBuilder: boolean = false;
  percentage = 0;

  public countDown$?: Observable<number>;

  public isGameRunning$: Observable<boolean>;

  public isGameCompleted$: Observable<boolean>;

  constructor(public game: Game, repo: TickRepository, input: InputHandler) {
    this.isGameRunning$ = repo.ticks$().pipe(
      map(ticks => ticks.length > 0),
      startWith(false),
    );

    this.isGameCompleted$ = combineLatest([repo.ticks$(), repo.rotation$()])
      .pipe(
        map(([ticks, rotation]) => ticks.length > rotation.length),
        startWith(false),
      );


    input.allKeyPresses$().pipe(
      filter(keys => keys.length > 0),
      map(keys => keys[keys.length - 1].key)
    ).subscribe(key => {
      if (key === '<SPACE>') {
        this.startGame();
      }

      if (key === '<ESC>') {
        this.game.stopGameLoop();
      }
    });
  }

  ngOnInit() {
    this.loadRotation();
  }

  public startGame() {
    this.game.stopGameLoop();
    this.game.resetGameLoop();

    const countDownFrom = 5;

    this.countDown$ = timer(0, 600).pipe(
      take(countDownFrom + 1),
      map(i => countDownFrom - i),
      finalize(() => this.game.startGameLoop()),
      finalize(() => this.countDown$ = undefined),
    );
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
      tickFactory('H Z A'),
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
