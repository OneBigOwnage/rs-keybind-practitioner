import { Component, OnInit } from '@angular/core';
import Game, { Difficulty } from './runescape/Game.service';
import { tickFactory } from './runescape/Interactions';
import { Observable, combineLatest, timer } from 'rxjs';
import { filter, finalize, map, startWith, take } from 'rxjs/operators';
import TickRepository from './runescape/TickRepository.service';
import { InputHandler } from './runescape/InputHandler.service';
import { KeybindRepository } from './runescape/keybind-repository.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public showRotationBuilder: boolean = false;
  public showKeybindConfigurator: boolean = false;

  public countDown$?: Observable<number>;

  public isGameRunning$: Observable<boolean>;
  public isGameCompleted$: Observable<boolean>;

  constructor(public game: Game, repo: TickRepository, input: InputHandler, protected keybinds: KeybindRepository) {
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

  public get showGame() {
    return !this.showRotationBuilder && !this.showKeybindConfigurator;
  }

  public canShowRotationBuilder() {
    return !this.showRotationBuilder && !this.showKeybindConfigurator;
  }

  public canShowKeybindConfigurator() {
    return !this.showRotationBuilder && !this.showKeybindConfigurator;
  }

  public canShowGame() {
    return this.showRotationBuilder || this.showKeybindConfigurator;
  }

  public onDifficultyChange(event: Event, difficulty: Difficulty) {
    if ((event.target as HTMLInputElement).checked) {
      this.game.setDifficulty(difficulty);
    }
  }

  loadRotation() {
    // This is the telos p1 rotation with my new 2023 binds
    this.keybinds.keybinds$().subscribe(keybinds => {
      this.game.setRotation(tickFactory([
        ['Target cycle', 'Greater Sunshine', 'Inquisitor staff'],
        [],
        [],
        ['Blood Blitz', 'Wand of the praesul', 'Imperium core', 'Greater Concentrated Blast'],
        [],
        [],
        ['Masterwork Spear of Annihilation', 'Ingenuity of the Humans', 'Essence of Finality spec', 'Inquisitor staff'],
        [],
        [],
        ['Combust', 'Wand of the praesul', 'Imperium core'],
        [],
        [],
        ['Smoke Cloud', 'Freedom', 'Inquisitor staff'],
        [],
        [],
        ['Ice Barrage', 'Wand of the praesul', 'Imperium core', 'Greater Concentrated Blast'],
        [],
        [],
        ['Inquisitor staff', 'Dragon Breath'],
        [],
        [],
        ['Ice Barrage', 'Wild Magic'],
        [],
        [],
        ['Wrack'],
        [],
        [],
        ['Blood Blitz', 'Wand of the praesul', 'Imperium core', 'Greater Concentrated Blast'],
        [],
        [],
        ['Inquisitor staff', 'Omnipower'],
        [],
        [],
        ['Tsunami'],
        [],
        ['Dive'],
        ['Dragon Breath']
      ], keybinds));
    });
  }
}
